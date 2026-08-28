import type { GardenData } from './types';

export const emptyGarden = (): GardenData => ({
  name: 'My garden',
  unit: 'metric',
  beds: [],
  plants: [],
  waterLines: [],
  notes: [],
  archives: [],
  updatedAt: new Date().toISOString()
});

export const sampleGarden = (): GardenData => ({
  name: 'Courtyard kitchen garden',
  unit: 'metric',
  beds: [
    { id: 'bed-herbs', name: 'Herb bed', x: 8, y: 10, width: 38, height: 28, pattern: 0 },
    { id: 'bed-salad', name: 'Salad bed', x: 55, y: 10, width: 35, height: 28, pattern: 1 },
    { id: 'bed-tomato', name: 'Tomato pots', x: 16, y: 55, width: 30, height: 28, pattern: 2 },
    { id: 'bed-beans', name: 'Bean trough', x: 57, y: 55, width: 31, height: 24, pattern: 3 }
  ],
  plants: [
    { id: 'plant-basil', bedId: 'bed-herbs', name: 'Basil', variety: 'Genovese', x: 20, y: 22, status: 'active' },
    { id: 'plant-thyme', bedId: 'bed-herbs', name: 'Thyme', variety: 'Common', x: 36, y: 26, status: 'active' },
    { id: 'plant-lettuce', bedId: 'bed-salad', name: 'Lettuce', variety: 'Little Gem', x: 68, y: 22, status: 'active' },
    { id: 'plant-tomato', bedId: 'bed-tomato', name: 'Tomato', variety: 'Gardener’s Delight', x: 31, y: 68, status: 'active' },
    { id: 'plant-bean', bedId: 'bed-beans', name: 'Bean', variety: 'Blue Lake', x: 71, y: 67, status: 'active' }
  ],
  waterLines: [
    { id: 'water-1', x1: 4, y1: 88, x2: 31, y2: 68 },
    { id: 'water-2', x1: 31, y1: 68, x2: 26, y2: 24 },
    { id: 'water-3', x1: 26, y1: 24, x2: 71, y2: 22 },
    { id: 'water-4', x1: 71, y1: 22, x2: 71, y2: 67 }
  ],
  notes: [
    { id: 'note-1', plantId: 'plant-basil', date: '2026-08-27', action: 'Watered', note: 'Soil was dry two fingers down.' },
    { id: 'note-2', plantId: 'plant-tomato', date: '2026-08-25', action: 'Tied in', note: 'Added a soft tie below the third truss.' },
    { id: 'note-3', plantId: 'plant-lettuce', date: '2026-08-23', action: 'Harvested', note: 'Picked the outer leaves.' }
  ],
  archives: [],
  updatedAt: '2026-08-27T09:30:00.000Z'
});
