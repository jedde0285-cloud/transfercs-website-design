export interface Coach {
  name: string;
  age: number;
  team_name: string;
  team_rank: number;
  region: string;
  popularity: number;
  trophies_s: number;
  trophies_a: number;
  trophies: number;
  majors: number;
  tactics: number;
  development: number;
  trophies_last_3_years: number;
  teamLogo?: string;
  is_bench?: boolean;
  role: "Coach"; // Добавим жесткую привязку к роли
}

export interface CoachWithPrice extends Coach {
  price: number;
}

function getBasePrice(teamRank: number): number {
  if (teamRank <= 10) return 100000;
  if (teamRank <= 20) return 75000;
  return 50000;
}

function getSkillValue(skill: number): number {
  if (skill <= 0) return 0;
  if (skill <= 1) return skill * 50000; 
  if (skill <= 2) return 50000 + (skill - 1) * 100000; 
  return 150000; 
}

function getQuality(tactics: number, development: number): number {
  return getSkillValue(tactics) + getSkillValue(development);
}

function getRelevanceCoefficient(coach: Coach): number {
  const totalTrophies = coach.trophies_s + coach.trophies_a;
  if (totalTrophies === 0) return 1.0;

  const relevancePercent = coach.trophies_last_3_years / totalTrophies;
  return 0.4 + relevancePercent * 0.6;
}

function getAchievements(coach: Coach): number {
  const relevance = getRelevanceCoefficient(coach);
  const sTierBonus = coach.trophies_s * 50000;
  const aTierBonus = coach.trophies_a * 30000;
  const majorBonus = coach.majors * 15000;

  return (sTierBonus + aTierBonus + majorBonus) * relevance;
}

function getAgeCoefficient(coach: Coach): number {
  const age = coach.age;
  const totalTrophies = coach.trophies_s + coach.trophies_a;

  if (age < 32) {
    if (totalTrophies >= 8) return 1.15;
    return 1.0;
  }

  if (age >= 32 && age <= 37) return 1.20;
  return 1.10;
}

function getSceneMultiplier(teamRank: number): number {
  if (teamRank <= 10) return 1.0;
  if (teamRank <= 20) return 0.85;
  if (teamRank <= 35) return 0.75;
  return 0.65;
}

export function calculateCoachPrice(coach: Coach): number {
  const basePrice = getBasePrice(coach.team_rank);
  const quality = getQuality(coach.tactics, coach.development);
  const achievements = getAchievements(coach);
  const ageCoeff = getAgeCoefficient(coach);
  const sceneMult = getSceneMultiplier(coach.team_rank);
  const popularity = coach.popularity || 1.0;

  let price = (basePrice + achievements + quality) * ageCoeff * popularity * sceneMult;
  return Math.round(price);
}