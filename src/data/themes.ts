import type { BasicTheme } from '../types';

// Current flower converted to new format - all pixels are progressive
export const flowerTheme: BasicTheme = {
  id: 'classic-flower',
  name: 'Classic Flower',
  gridSize: { width: 5, height: 7 },
  
  // All pixels build progressively: soil → stem → leaves → bloom
  pixels: [
    // Stage 0: Soil preparation (pixels 0-4)
    { type: 'soil', row: 0, col: 0 },
    { type: 'soil', row: 0, col: 1 },
    { type: 'soil', row: 0, col: 2 },
    { type: 'soil', row: 0, col: 3 },
    { type: 'soil', row: 0, col: 4 },
    
    // Stage 1: Stem growth (pixels 5-7)
    { type: 'stem', row: 1, col: 2 },
    { type: 'stem', row: 2, col: 2 },
    { type: 'stem', row: 3, col: 2 },
    
    // Stage 2: Leaves emerge (pixels 8-9)
    { type: 'stem', row: 1, col: 2 },
    { type: 'stem', row: 2, col: 2 },
    { type: 'stem', row: 3, col: 2 },
    
    // Leaves (pixels 3-4) - same as before  
    // Stage 2: Leaves emerge (pixels 8-9)
    { type: 'leaf', row: 3, col: 1 },
    { type: 'leaf', row: 3, col: 3 },
    
    // Stage 3: Bud formation (pixels 10-12)
    { type: 'petal', row: 4, col: 1 },
    { type: 'petal', row: 4, col: 2 },
    { type: 'petal', row: 4, col: 3 },
    
    // Stage 4: Full bloom (pixels 13-18)
    { type: 'petal', row: 5, col: 1 },
    { type: 'center-bright', row: 5, col: 2 },
    { type: 'petal', row: 5, col: 3 },
    { type: 'petal', row: 6, col: 1 },
    { type: 'petal', row: 6, col: 2 },
    { type: 'petal', row: 6, col: 3 },
  ]
};

// Simple tree theme to test multi-theme system
export const treeTheme: BasicTheme = {
  id: 'oak-tree',
  name: 'Oak Tree',
  gridSize: { width: 7, height: 8 },
  
  // All pixels build progressively: soil → trunk → branches → leaves
  pixels: [
    // Stage 0: Soil preparation (pixels 0-6)
    { type: 'soil', row: 0, col: 0 },
    { type: 'soil', row: 0, col: 1 },
    { type: 'soil', row: 0, col: 2 },
    { type: 'soil', row: 0, col: 3 },
    { type: 'soil', row: 0, col: 4 },
    { type: 'soil', row: 0, col: 5 },
    { type: 'soil', row: 0, col: 6 },
    
    // Stage 1: Trunk growth (pixels 7-10)
    { type: 'trunk', row: 1, col: 3 },
    { type: 'trunk', row: 2, col: 3 },
    { type: 'trunk', row: 3, col: 3 },
    { type: 'trunk', row: 4, col: 3 },
    
    // Stage 2: Branch development (pixels 11-14)
    { type: 'branch', row: 5, col: 2 },
    { type: 'branch', row: 5, col: 3 },
    { type: 'branch', row: 5, col: 4 },
    { type: 'branch', row: 6, col: 1 },
    
    // Stage 3: More branches (pixels 15-18)
    { type: 'branch', row: 6, col: 5 },
    { type: 'branch', row: 7, col: 0 },
    { type: 'branch', row: 7, col: 2 },
    { type: 'branch', row: 7, col: 4 },
    
    // Stage 4: Leaves fill in (pixels 19-24)
    { type: 'leaves', row: 7, col: 1 },
    { type: 'leaves', row: 7, col: 3 },
    { type: 'leaves', row: 7, col: 5 },
    { type: 'leaves', row: 7, col: 6 },
    { type: 'leaves', row: 6, col: 2 },
    { type: 'leaves', row: 6, col: 4 },
  ]
};
