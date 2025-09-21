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

// Space rocket theme - journey to the stars
export const rocketTheme: BasicTheme = {
  id: 'space-rocket',
  name: 'Space Rocket',
  gridSize: { width: 5, height: 9 },
  
  // Progressive build: launchpad → rocket → ignition → liftoff → stars
  pixels: [
    // Stage 0: Launchpad (pixels 0-4)
    { type: 'platform', row: 0, col: 0 },
    { type: 'platform', row: 0, col: 1 },
    { type: 'platform', row: 0, col: 2 },
    { type: 'platform', row: 0, col: 3 },
    { type: 'platform', row: 0, col: 4 },
    
    // Stage 1: Rocket body (pixels 5-12)
    { type: 'engine', row: 1, col: 2 },
    { type: 'body', row: 2, col: 2 },
    { type: 'body', row: 3, col: 2 },
    { type: 'body', row: 4, col: 2 },
    { type: 'body', row: 5, col: 2 },
    { type: 'window', row: 6, col: 2 },
    { type: 'nose', row: 7, col: 2 },
    { type: 'tip', row: 8, col: 2 },
    
    // Stage 2: Ignition flames (pixels 13-16)
    { type: 'flame', row: 1, col: 1 },
    { type: 'flame', row: 1, col: 3 },
    { type: 'flame-bright', row: 0, col: 1 },
    { type: 'flame-bright', row: 0, col: 3 },
    
    // Stage 3: Liftoff boosters (pixels 17-20)
    { type: 'booster', row: 3, col: 0 },
    { type: 'booster', row: 3, col: 4 },
    { type: 'booster', row: 4, col: 0 },
    { type: 'booster', row: 4, col: 4 },
    
    // Stage 4: Deep space stars (pixels 21-26)
    { type: 'star', row: 8, col: 0 },
    { type: 'star', row: 8, col: 4 },
    { type: 'star', row: 7, col: 1 },
    { type: 'star', row: 7, col: 3 },
    { type: 'star-bright', row: 8, col: 1 },
    { type: 'star-bright', row: 7, col: 4 },
  ]
};

// Sunflower theme - bright and cheerful
export const sunflowerTheme: BasicTheme = {
  id: 'sunflower',
  name: 'Sunflower',
  gridSize: { width: 7, height: 8 },
  
  // Progressive build: soil → stem → leaves → petals → center
  pixels: [
    // Stage 0: Soil base (pixels 0-6)
    { type: 'soil', row: 0, col: 0 },
    { type: 'soil', row: 0, col: 1 },
    { type: 'soil', row: 0, col: 2 },
    { type: 'soil', row: 0, col: 3 },
    { type: 'soil', row: 0, col: 4 },
    { type: 'soil', row: 0, col: 5 },
    { type: 'soil', row: 0, col: 6 },
    
    // Stage 1: Tall stem (pixels 7-10)
    { type: 'stem', row: 1, col: 3 },
    { type: 'stem', row: 2, col: 3 },
    { type: 'stem', row: 3, col: 3 },
    { type: 'stem', row: 4, col: 3 },
    
    // Stage 2: Leaves (pixels 11-14)
    { type: 'leaf', row: 2, col: 2 },
    { type: 'leaf', row: 2, col: 4 },
    { type: 'leaf', row: 3, col: 1 },
    { type: 'leaf', row: 3, col: 5 },
    
    // Stage 3: Yellow petals (pixels 15-22)
    { type: 'sun-petal', row: 6, col: 1 },
    { type: 'sun-petal', row: 6, col: 2 },
    { type: 'sun-petal', row: 6, col: 4 },
    { type: 'sun-petal', row: 6, col: 5 },
    { type: 'sun-petal', row: 7, col: 2 },
    { type: 'sun-petal', row: 7, col: 4 },
    { type: 'sun-petal', row: 5, col: 2 },
    { type: 'sun-petal', row: 5, col: 4 },
    
    // Stage 4: Dark center (pixels 23-25)
    { type: 'sun-center', row: 6, col: 3 },
    { type: 'sun-center', row: 5, col: 3 },
    { type: 'sun-center', row: 7, col: 3 },
  ]
};

// Rose theme - elegant and romantic
export const roseTheme: BasicTheme = {
  id: 'rose',
  name: 'Rose',
  gridSize: { width: 5, height: 8 },
  
  // Progressive build: soil → stem → thorns → buds → full bloom
  pixels: [
    // Stage 0: Soil (pixels 0-4)
    { type: 'soil', row: 0, col: 0 },
    { type: 'soil', row: 0, col: 1 },
    { type: 'soil', row: 0, col: 2 },
    { type: 'soil', row: 0, col: 3 },
    { type: 'soil', row: 0, col: 4 },
    
    // Stage 1: Thorny stem (pixels 5-10)
    { type: 'rose-stem', row: 1, col: 2 },
    { type: 'rose-stem', row: 2, col: 2 },
    { type: 'rose-stem', row: 3, col: 2 },
    { type: 'thorn', row: 2, col: 1 },
    { type: 'thorn', row: 3, col: 3 },
    { type: 'rose-stem', row: 4, col: 2 },
    
    // Stage 2: Leaves (pixels 11-14)
    { type: 'rose-leaf', row: 3, col: 0 },
    { type: 'rose-leaf', row: 3, col: 4 },
    { type: 'rose-leaf', row: 4, col: 1 },
    { type: 'rose-leaf', row: 4, col: 3 },
    
    // Stage 3: Rose buds (pixels 15-18)
    { type: 'rose-bud', row: 5, col: 1 },
    { type: 'rose-bud', row: 5, col: 2 },
    { type: 'rose-bud', row: 5, col: 3 },
    { type: 'rose-bud', row: 6, col: 2 },
    
    // Stage 4: Full bloom (pixels 19-22)
    { type: 'rose-petal', row: 6, col: 1 },
    { type: 'rose-petal', row: 6, col: 3 },
    { type: 'rose-petal', row: 7, col: 1 },
    { type: 'rose-petal', row: 7, col: 2 },
    { type: 'rose-petal', row: 7, col: 3 },
  ]
};
