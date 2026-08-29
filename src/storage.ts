import type { GardenData } from './types';
import { emptyGarden, sampleGarden } from './data';
import { isGardenData } from './schema';

const DB_NAME = 'garden-care-map-v1';
const STORE = 'gardens';

export class CorruptGardenError extends Error {
  constructor() { super('Saved garden data is not valid.'); }
}

const keyFor = (demo: boolean) => demo ? 'demo:garden' : 'real:garden';
const pendingKeyFor = (demo: boolean) => `garden-care-map:pending:${keyFor(demo)}`;

function readPendingGarden(demo: boolean): GardenData | undefined {
  try {
    const raw = localStorage.getItem(pendingKeyFor(demo));
    if (!raw) return undefined;
    const pending: unknown = JSON.parse(raw);
    if (!isGardenData(pending)) throw new Error('invalid pending garden');
    return pending;
  } catch {
    localStorage.removeItem(pendingKeyFor(demo));
    return undefined;
  }
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE)) request.result.createObjectStore(STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function loadGarden(demo: boolean): Promise<GardenData> {
  const db = await openDb();
  const key = keyFor(demo);
  const saved = await new Promise<GardenData | undefined>((resolve, reject) => {
    const request = db.transaction(STORE).objectStore(STORE).get(key);
    request.onsuccess = () => resolve(request.result as GardenData | undefined);
    request.onerror = () => reject(request.error);
  });
  db.close();
  const pending = readPendingGarden(demo);
  if (pending) {
    await saveGarden(pending, demo);
    return pending;
  }
  if (saved) {
    if (!isGardenData(saved)) throw new CorruptGardenError();
    return saved;
  }
  const initial = demo ? sampleGarden() : emptyGarden();
  await saveGarden(initial, demo);
  return initial;
}

export async function saveGarden(data: GardenData, demo: boolean): Promise<void> {
  if (!isGardenData(data)) throw new CorruptGardenError();
  const key = keyFor(demo);
  try { localStorage.setItem(pendingKeyFor(demo), JSON.stringify(data)); } catch { /* IndexedDB remains the durable store for large local photos. */ }
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).put(data, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
  localStorage.removeItem(pendingKeyFor(demo));
}

export async function resetDemo(): Promise<GardenData> {
  const data = sampleGarden();
  await saveGarden(data, true);
  return data;
}

export async function clearDemoGarden(): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).delete('demo:garden');
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
  localStorage.removeItem(pendingKeyFor(true));
}

export async function clearRealGarden(): Promise<GardenData> {
  const data = emptyGarden();
  await saveGarden(data, false);
  return data;
}

export async function recoverGarden(demo: boolean): Promise<GardenData> {
  const data = demo ? sampleGarden() : emptyGarden();
  await saveGarden(data, demo);
  return data;
}
