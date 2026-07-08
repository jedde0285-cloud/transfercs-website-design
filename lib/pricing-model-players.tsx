// src/lib/pricing-model.ts
import { PlayerStats } from "./players-data";

export interface PlayerWithPrice extends PlayerStats {
  price: number;
}

// ==========================
// 1. БАЗОВАЯ СТОИМОСТЬ ИГРОКА
// ==========================
function getBasePrice(rating: number): number {
  if (rating < 0.90) return 50000;
  if (rating < 1.00) return 100000 + (rating - 0.90) * 200000;
  if (rating < 1.10) return 250000 + (rating - 1.00) * 500000;
  if (rating < 1.20) return 600000 + (rating - 1.10) * 1000000;
  if (rating < 1.30) return 1200000 + (rating - 1.20) * 4000000;
  return 2000000 + (rating - 1.30) * 6000000;
}

// ==========================
// 2. КОЭФФИЦИЕНТ РОЛИ
// ==========================
function getRoleCoef(role: string, rating: number): number {
  if (role === "AWP" && rating > 1.05) return 1.10;
  return 1.00;
}

// ==========================
// 3. КОЭФФИЦИЕНТ ВОЗРАСТА
// ==========================
function getAgeCoef(age: number, role: string): number {
  if (role === "Coach") return 1.00; // Для тренеров возраст не так критичен
  if (role === "IGL" && age >= 30) return 0.65;
  if (age <= 16) return 1.35;
  if (age <= 23) return 1.35 - (age - 16) * 0.05;
  
  const coef = 1.0 - (age - 23) * 0.02;
  return Math.max(0.65, coef);
}

// ==========================
// 4. ЗАЩИТА ОТ МЫЛЬНЫХ ПУЗЫРЕЙ
// ==========================
function applyBubbleProtection(basePrice: number, age: number, ageCoef: number): number {
  if (basePrice > 1200000 && age >= 16 && age <= 22) return 1.00;
  return ageCoef;
}

// ==========================
// 5. НАДБАВКА ЗА ОПЫТ
// ==========================
function getExperienceBonus(player: PlayerStats): number {
  const { age, role, trophies_s = 0, trophies_a = 0, maps = 0 } = player;

  let trophyBonus = trophies_s * 40000 + trophies_a * 20000;

  let relevance: number;
  if (role === "Coach" || role === "IGL") relevance = 1.0;
  else if (age <= 22) relevance = 1.0;
  else if (age <= 27) relevance = 0.8;
  else relevance = 0.4;

  trophyBonus *= relevance;

  let mapPrice: number;
  if (age <= 16) mapPrice = 200;
  else if (age <= 25) mapPrice = 200 - (age - 16) * 10;
  else {
    mapPrice = 110 - (age - 25) * 5;
    mapPrice = Math.max(55, mapPrice);
  }

  const mapBonus = (maps || 0) * mapPrice;
  return trophyBonus + mapBonus;
}

// ==========================
// 6. МНОЖИТЕЛЬ СЦЕНЫ
// ==========================
function getSceneMultiplier(teamRank: number): number {
  if (teamRank <= 10) return 1.0;
  if (teamRank <= 15) return 0.95;
  if (teamRank <= 20) return 0.85;
  if (teamRank <= 30) return 0.75;
  return 0.65;
}

// ==========================
// 7. РЕГИОНАЛЬНЫЙ КОЭФФИЦИЕНТ
// ==========================
function getRegionMultiplier(teamRank: number, region: string): number {
  if (teamRank <= 10) return 1.0;
  const regionMap: Record<string, number> = {
    EU: 1.0,
    SA: 0.90,
    NA: 0.85,
    AS: 0.85,
  };
  return regionMap[region] || 1.0;
}

// ==========================
// 8. ПОПУЛЯРНОСТЬ
// ==========================
function getPopularityMultiplier(player: PlayerStats): number {
  const rating = player.rating || 1.0;
  const role = player.role;
  const basePopularity = player.popularity || 1.20;

  if (role !== "IGL" && role !== "Coach") {
    if (rating < 0.90) return 0.80;
    if (rating < 1.00) return 1.00;
  }
  return basePopularity;
}

// ==========================
// 9. РАСЧЁТ ЦЕНЫ ИГРОКА / ТРЕНЕРА
// ==========================
export function calculatePrice(player: PlayerStats): number {
  const age = player.age || 22;
  const role = player.role || "Rifler";
  const teamRank = player.team_rank || 50;
  const region = player.region || "EU";

  // Логика для тренера
  if (role === "Coach") {
    const baseCoachPrice = 150000;
    const tacticsBonus = (player.tactics || 0) * 40000;
    const devBonus = (player.development || 0) * 30000;
    const expBonus = getExperienceBonus(player);
    const sceneMult = getSceneMultiplier(teamRank);
    
    let coachPrice = (baseCoachPrice + tacticsBonus + devBonus) * sceneMult + expBonus;
    
    // Эффект бенча для тренера (если применимо)
    if (player.is_bench) coachPrice *= 0.60;
    
    return Math.round(coachPrice);
  }

  // Логика для игроков
  const rating = player.rating || 1.0;
  const basePrice = getBasePrice(rating);
  const roleCoef = getRoleCoef(role, rating);
  let ageCoef = getAgeCoef(age, role);
  ageCoef = applyBubbleProtection(basePrice, age, ageCoef);
  const experienceBonus = getExperienceBonus(player);
  const sceneMult = getSceneMultiplier(teamRank);
  const regionMult = getRegionMultiplier(teamRank, region);
  const popularity = getPopularityMultiplier(player);

  let price =
    basePrice * roleCoef * ageCoef * popularity * sceneMult * regionMult +
    experienceBonus;

  // Штраф за бенч (урезаем цену на 40%)
  if (player.is_bench) {
    price *= 0.60;
  }

  return Math.round(price);
}

// ==========================
// 10. МАССОВЫЙ РАСЧЁТ
// ==========================
export function calculatePrices(players: PlayerStats[]): PlayerWithPrice[] {
  return players.map((player) => ({
    ...player,
    price: calculatePrice(player),
  }));
}