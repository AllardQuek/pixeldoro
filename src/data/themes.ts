import type { BasicTheme } from '../types';

// Current flower converted to new format - same pixels, just structured
export const flowerTheme: BasicTheme = {
  id: 'classic-flower',
  name: 'Classic Flower',
  gridSize: { width: 5, height: 7 },
  pixels: [
    // Stem (pixels 0-2) - same as before
    { type: 'stem', row: 1, col: 2 },
    { type: 'stem', row: 2, col: 2 },
    { type: 'stem', row: 3, col: 2 },
    
    // Leaves (pixels 3-4) - same as before  
    { type: 'leaf', row: 3, col: 1 },
    { type: 'leaf', row: 3, col: 3 },
    
    // Bloom 3x3 grid (pixels 5-13) - same as before
    { type: 'petal', row: 4, col: 1 },
    { type: 'petal', row: 4, col: 2 },
    { type: 'petal', row: 4, col: 3 },
    { type: 'petal', row: 5, col: 1 },
    { type: 'center-bright', row: 5, col: 2 },
    { type: 'petal', row: 5, col: 3 },
    { type: 'petal', row: 6, col: 1 },
    { type: 'petal', row: 6, col: 2 },
    { type: 'petal', row: 6, col: 3 },
  ]
};
