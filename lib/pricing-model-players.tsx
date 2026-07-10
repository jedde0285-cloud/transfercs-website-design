// src/lib/pricing-model.ts
import { PlayerStats } from "./players-data";

// Расширяем интерфейс PlayerStats, чтобы TypeScript не ругался на новые маркеры в базе данных
export interface CustomPlayerStats extends PlayerStats {
  country?: string;
  is_bench?: boolean;
  // Наш новый маркер: ручной множитель сцены при переходе из более слабой команды
  previous_team_multiplier?: number;
}

export interface PlayerWithPrice extends CustomPlayerStats {
  price: number;
}

// ==========================================
// ТИР-СИСТЕМА КОМАНД ДЛЯ МНОЖИТЕЛЯ СЦЕНЫ
// ==========================================
// Сюда ты можешь в любой момент дописывать новые команды (строго маленькими буквами для защиты от ошибок регистра)
const teamTierMultipliers: Record<string, number> = {
  // Тир-1 команды (1.0)
  "vitality": 1.0, "falcons": 1.0, "furia": 1.0, "natus vincere": 1.0,
  "spirit": 1.0, "mouz": 1.0, "aurora": 1.0, "g2": 1.0, "the mongolz": 1.0,

  // Тир-1.5 команды (0.95)
  "fut": 0.95, "astralis": 0.95, "faze": 0.95, "betboom": 0.95, "gamerlegion": 0.95, "parivision": 0.95,

  // Тир-2 команды (0.90)
  "3dmax": 0.90, "legacy": 0.90, "mibr": 0.90, "luminosity": 0.90, "9z": 0.90, "pain": 0.90,

  // Тир-2.5 команды (0.85)
  "b8": 0.85, "heroic": 0.85, "nip": 0.85, "big": 0.85, "liquid": 0.85,

  // Тир-3 команды (0.75)
  "gentle mates": 0.75, "nrg": 0.75, "hotu": 0.75, "alliance": 0.75, "m80": 0.75, "sinners": 0.75, "eyeballers": 0.75,

  // Тир-3.5 команды (0.65)
  "sharks": 0.65, "inner circle": 0.65
};

// ==========================================
// 1. БАЗОВАЯ СТОИМОСТЬ ИГРОКА (С УЧЕТОМ IGL)
// ==========================================
function getBasePrice(rating: number, role: string): number {
  const isIGL = role === "IGL";

  if (rating < 0.90) {
    // Для категории ниже 0.90 стартовая цена обычных $50,000, для IGL — $80,000
    return isIGL ? 80000 : 50000;
  }
  if (rating < 1.00) {
    // В категории 0.90–1.00 стартовая цена обычных $100,000, для IGL — $150,000
    const startPrice = isIGL ? 150000 : 100000;
    return startPrice + (rating - 0.90) * 200000;
  }

  // Для остальных категорий базовая стоимость остается прежней
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
function getExperienceBonus(player: CustomPlayerStats): number {
  const { age, role, trophies_s = 0, trophies_a = 0, maps = 0 } = player;

  let trophyBonus = trophies_s * 40000 + trophies_a * 20000;

  let relevance: number;
  // Убрали проверку "Coach", так как тренеры теперь считаются в другой модели
  if (role === "IGL") relevance = 1.0;
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

// ============================================
// 6. УМНЫЙ МНОЖИТЕЛЬ СЦЕНЫ И ТРАНСФЕРНЫЙ МАРКЕР
// ============================================
function getSceneMultiplier(player: CustomPlayerStats): number {
  // Пятый пункт: проверяем, вписал ли ты игроку маркер старого множителя
  if (player.previous_team_multiplier !== undefined && player.previous_team_multiplier !== null) {
    return player.previous_team_multiplier;
  }

  // Если маркера нет, рассчитываем стандартно по текущей команде
  const teamNameClean = (player.team_name || "").toLowerCase().trim();

  // Ищем команду в нашем списке. Если нашли — берем её тир, если нет — дефолтный тир-4 (0.60)
  return teamTierMultipliers[teamNameClean] !== undefined ? teamTierMultipliers[teamNameClean] : 0.60;
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
function getPopularityMultiplier(player: CustomPlayerStats): number {
  const rating = player.rating || 1.0;
  const role = player.role;
  const basePopularity = player.popularity || 1.20;

  // Убрали проверку "Coach"
  if (role !== "IGL") {
    if (rating < 0.90) return 0.80;
    if (rating < 1.00) return 1.00;
  }
  return basePopularity;
}

// ==========================
// 9. ЧИСТЫЙ РАСЧЁТ ЦЕНЫ ИГРОКА
// ==========================
export function calculatePrice(player: CustomPlayerStats): number {
  const age = player.age || 22;
  const role = player.role || "Rifler";
  const teamRank = player.team_rank || 50;
  const region = player.region || "EU";
  const rating = player.rating || 1.0;

  // Во вторых: полностью вырезали блок `if (role === "Coach")`, теперь код работает только с игроками

  const basePrice = getBasePrice(rating, role); // Передаем роль для учета IGL наценки
  const roleCoef = getRoleCoef(role, rating);

  let ageCoef = getAgeCoef(age, role);
  ageCoef = applyBubbleProtection(basePrice, age, ageCoef);

  const experienceBonus = getExperienceBonus(player);

  // В третьих и пятых: теперь множитель сцены зависит от игрока и его маркера/команды
  const sceneMult = getSceneMultiplier(player);
  const regionMult = getRegionMultiplier(teamRank, region);
  const popularity = getPopularityMultiplier(player);

  const price =
    basePrice * roleCoef * ageCoef * popularity * sceneMult * regionMult +
    experienceBonus;

  // В первых: Полностью удален блок снижения стоимости `if (player.is_bench) price *= 0.60;`

  return Math.round(price);
}

// ==========================
// 10. МАССОВЫЙ РАСЧЁТ
// ==========================
export function calculatePrices(players: CustomPlayerStats[]): PlayerWithPrice[] {
  return players.map((player) => ({
    ...player,
    price: calculatePrice(player),
  }));
}