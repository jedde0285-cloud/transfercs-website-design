import { playersData } from "./players-data";
import { calculatePrices } from "./pricing-model-players";
import fs from "fs";
import path from "path";

const CACHE_PATH = path.join(process.cwd(), "public", "prices_cache.json");

interface PriceCacheEntry {
  price: number;
  previous_price: number | null;
  last_updated: string;
}

interface PriceCache {
  [playerName: string]: PriceCacheEntry;
}

function readCache(): PriceCache {
  try {
    const data = fs.readFileSync(CACHE_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

function writeCache(cache: PriceCache): void {
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2), "utf-8");
}

export function updatePriceCache(): void {
  const oldCache = readCache();
  const newCache: PriceCache = {};

  const playersWithPrices = calculatePrices(playersData);

  for (const player of playersWithPrices) {
    const name = player.name;
    const newPrice = player.price;
    const oldEntry = oldCache[name];

    newCache[name] = {
      price: newPrice,
      previous_price: oldEntry ? oldEntry.price : null,
      last_updated: new Date().toISOString(),
    };
  }

  writeCache(newCache);
  console.log(`✅ Price cache updated for ${Object.keys(newCache).length} players.`);
}

export function getPriceChange(playerName: string): { price: number; changePercent: number | null } | null {
  const cache = readCache();
  const entry = cache[playerName];
  if (!entry) return null;

  const { price, previous_price } = entry;
  let changePercent: number | null = null;

  if (previous_price !== null && previous_price !== 0) {
    changePercent = ((price - previous_price) / previous_price) * 100;
  }

  return { price, changePercent };
}