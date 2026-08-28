import type { Bed, CareNote, GardenData, Plant, SeasonArchive, WaterLine } from './types';

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord => typeof value === 'object' && value !== null && !Array.isArray(value);
const isString = (value: unknown, maximum = 240): value is string => typeof value === 'string' && value.length <= maximum;
const isId = (value: unknown): value is string => isString(value, 120) && value.trim().length > 0;
const isCoordinate = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 100;
const isPattern = (value: unknown): value is number => typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 3;

function isBed(value: unknown): value is Bed {
  if (!isRecord(value)) return false;
  return isId(value.id) && isString(value.name, 50) && value.name.trim().length > 0 &&
    isCoordinate(value.x) && isCoordinate(value.y) && isCoordinate(value.width) && value.width > 0 &&
    isCoordinate(value.height) && value.height > 0 && isPattern(value.pattern);
}

function isPlant(value: unknown): value is Plant {
  if (!isRecord(value)) return false;
  return isId(value.id) && isId(value.bedId) && isString(value.name, 80) && value.name.trim().length > 0 &&
    isString(value.variety, 120) && isCoordinate(value.x) && isCoordinate(value.y) &&
    (value.status === 'active' || value.status === 'finished');
}

function isWaterLine(value: unknown): value is WaterLine {
  return isRecord(value) && isId(value.id) && isCoordinate(value.x1) && isCoordinate(value.y1) && isCoordinate(value.x2) && isCoordinate(value.y2);
}

function isCareNote(value: unknown): value is CareNote {
  if (!isRecord(value)) return false;
  return isId(value.id) && isId(value.plantId) && isString(value.date, 10) && /^\d{4}-\d{2}-\d{2}$/.test(value.date) &&
    isString(value.action, 40) && isString(value.note, 240) && value.note.trim().length > 0 &&
    (value.photo === undefined || (isString(value.photo, 2_100_000) && value.photo.startsWith('data:image/')));
}

function isArchive(value: unknown): value is SeasonArchive {
  if (!isRecord(value) || !isId(value.id) || !isString(value.name, 40) || !isString(value.createdAt, 40) || !isRecord(value.counts) || !isRecord(value.snapshot)) return false;
  const counts = value.counts;
  const snapshot = value.snapshot;
  return ['beds', 'plants', 'notes'].every(key => typeof counts[key] === 'number' && Number.isInteger(counts[key]) && (counts[key] as number) >= 0) &&
    (snapshot.unit === 'metric' || snapshot.unit === 'imperial') && Array.isArray(snapshot.beds) && snapshot.beds.every(isBed) &&
    Array.isArray(snapshot.plants) && snapshot.plants.every(isPlant) && Array.isArray(snapshot.waterLines) && snapshot.waterLines.every(isWaterLine) &&
    Array.isArray(snapshot.notes) && snapshot.notes.every(isCareNote);
}

/** Validates persisted and imported data before it can replace a working garden. */
export function isGardenData(value: unknown): value is GardenData {
  if (!isRecord(value) || !isString(value.name, 50) || value.name.trim().length === 0 ||
    (value.unit !== 'metric' && value.unit !== 'imperial') || !isString(value.updatedAt, 40) ||
    !Array.isArray(value.beds) || !value.beds.every(isBed) || !Array.isArray(value.plants) || !value.plants.every(isPlant) ||
    !Array.isArray(value.waterLines) || !value.waterLines.every(isWaterLine) || !Array.isArray(value.notes) || !value.notes.every(isCareNote) ||
    !Array.isArray(value.archives) || !value.archives.every(isArchive)) return false;

  const ids = (items: Array<{ id: string }>) => new Set(items.map(item => item.id));
  const bedIds = ids(value.beds);
  const plantIds = ids(value.plants);
  if (bedIds.size !== value.beds.length || plantIds.size !== value.plants.length || ids(value.waterLines).size !== value.waterLines.length || ids(value.notes).size !== value.notes.length) return false;
  return value.plants.every(plant => bedIds.has(plant.bedId)) && value.notes.every(note => plantIds.has(note.plantId));
}
