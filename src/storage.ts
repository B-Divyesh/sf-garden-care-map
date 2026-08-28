import type { GardenData } from './types';
import { emptyGarden, sampleGarden } from './data';

const DB_NAME = 'garden-care-map-v1';
const STORE = 'gardens';

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
  const key = demo ? 'demo:garden' : 'real:garden';
  const saved = await new Promise<GardenData | undefined>((resolve, reject) => {
    const request = db.transaction(STORE).objectStore(STORE).get(key);
    request.onsuccess = () => resolve(request.result as GardenData | undefined);
    request.onerror = () => reject(request.error);
  });
  db.close();
  if (saved) return saved;
  const initial = demo ? sampleGarden() : emptyGarden();
  await saveGarden(initial, demo);
  return initial;
}

export async function saveGarden(data: GardenData, demo: boolean): Promise<void> {
  const db = await openDb();
  const key = demo ? 'demo:garden' : 'real:garden';
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).put(data, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  db.close();
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
}

export async function clearRealGarden(): Promise<GardenData> {
  const data = emptyGarden();
  await saveGarden(data, false);
  return data;
}
