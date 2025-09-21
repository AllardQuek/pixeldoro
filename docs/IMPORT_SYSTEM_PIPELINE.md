# Import System: Data Flow & Processing Pipeline

## 🎯 **Complete Import Pipeline Overview**

```
Input Image → Pixel Extraction → Build Sequence → Theme JSON → Animated Timer
```

---

## 📥 **Step 1: Input Sources**

### **Supported Inputs**
```typescript
type ImportInput = 
  | File              // PNG/JPG image file
  | HTMLCanvasElement // Canvas data
  | ImageData         // Raw pixel data
  | string;           // Base64 or URL

// Example inputs:
const ronaldoImage = new File([...], 'ronaldo-siu.png', { type: 'image/png' });
const marioUrl = 'https://example.com/mario-sprite.png';
const canvasData = canvas.getImageData(0, 0, width, height);
```

### **Input Requirements**
- **Format**: PNG, JPG, GIF (static)
- **Size**: Any size (will be scaled)
- **Colors**: Any number (will be quantized)
- **Background**: Transparent or solid color

---

## 🔄 **Step 2: Image Processing Pipeline**

### **2A: Load & Normalize**
```typescript
class ImageProcessor {
  async loadImage(input: ImportInput): Promise<ProcessedImage> {
    // Convert any input to standardized format
    const canvas = await this.inputToCanvas(input);
    const imageData = canvas.getImageData(0, 0, canvas.width, canvas.height);
    
    return {
      width: canvas.width,
      height: canvas.height,
      pixels: imageData.data, // Uint8Array [R,G,B,A, R,G,B,A, ...]
      canvas: canvas
    };
  }
}

// Example: Ronaldo SIU image (16x20 pixels)
const processedImage = {
  width: 16,
  height: 20,
  pixels: [255,219,172,255, 74,60,29,255, ...] // RGBA values
};
```

### **2B: Color Quantization**
```typescript
class ColorQuantizer {
  reduceColors(imageData: ProcessedImage, maxColors: number = 8): QuantizedImage {
    // Use k-means clustering or median cut algorithm
    const palette = this.extractPalette(imageData.pixels, maxColors);
    const mappedPixels = this.mapPixelsToPalette(imageData.pixels, palette);
    
    return {
      ...imageData,
      palette: palette,
      indexedPixels: mappedPixels // Each pixel is now a palette index
    };
  }
}

// Example output:
const quantizedRonaldo = {
  width: 16,
  height: 20,
  palette: {
    'skin': '#FFDBAC',
    'hair': '#4A3C1D', 
    'jersey': '#FFFFFF',
    'shorts': '#003366',
    'background': 'transparent'
  },
  indexedPixels: [0, 1, 0, 1, 2, 2, ...] // Indices into palette
};
```

### **2C: Grid Conversion**
```typescript
class GridConverter {
  convertToGrid(quantized: QuantizedImage, targetSize?: GridSize): PixelGrid {
    // Scale if needed
    const scaled = targetSize 
      ? this.scaleImage(quantized, targetSize)
      : quantized;
    
    // Convert to grid format
    const grid: PixelCell[][] = [];
    for (let y = 0; y < scaled.height; y++) {
      const row: PixelCell[] = [];
      for (let x = 0; x < scaled.width; x++) {
        const pixelIndex = y * scaled.width + x;
        const colorIndex = scaled.indexedPixels[pixelIndex];
        const color = Object.values(scaled.palette)[colorIndex];
        
        row.push({
          x, y,
          color: color,
          colorName: Object.keys(scaled.palette)[colorIndex],
          isEmpty: color === 'transparent'
        });
      }
      grid.push(row);
    }
    
    return {
      width: scaled.width,
      height: scaled.height,
      cells: grid,
      palette: scaled.palette
    };
  }
}

// Example output:
const ronaldoGrid = {
  width: 16,
  height: 20,
  cells: [
    [ // Row 0 (top)
      { x: 0, y: 0, color: 'transparent', colorName: 'background', isEmpty: true },
      { x: 1, y: 0, color: '#4A3C1D', colorName: 'hair', isEmpty: false },
      // ... more cells
    ],
    // ... more rows
  ],
  palette: { /* same as above */ }
};
```

---

## 🏗️ **Step 3: Build Sequence Generation**

### **3A: Analyze Structure**
```typescript
class StructureAnalyzer {
  analyzePixelImportance(grid: PixelGrid): AnalyzedPixel[] {
    const pixels: AnalyzedPixel[] = [];
    
    grid.cells.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (!cell.isEmpty) {
          pixels.push({
            ...cell,
            importance: this.calculateImportance(cell, grid),
            structuralRole: this.detectRole(cell, grid), // 'foundation', 'detail', 'outline'
            connections: this.findConnections(cell, grid)
          });
        }
      });
    });
    
    return pixels;
  }
  
  private calculateImportance(cell: PixelCell, grid: PixelGrid): number {
    // Algorithm factors:
    // - Position (bottom = more important)
    // - Connectivity (connected pixels = more important)  
    // - Color frequency (rare colors = less important)
    
    const positionWeight = (grid.height - cell.y) / grid.height; // 0-1, bottom is 1
    const connectivityWeight = this.countNeighbors(cell, grid) / 8; // 0-1
    const colorWeight = this.calculateColorRarity(cell.colorName, grid); // 0-1
    
    return (positionWeight * 0.5) + (connectivityWeight * 0.3) + (colorWeight * 0.2);
  }
}

// Example output:
const analyzedPixels = [
  {
    x: 8, y: 18, color: '#003366', colorName: 'shorts',
    importance: 0.95, // High - bottom of image, connected
    structuralRole: 'foundation',
    connections: ['shorts', 'skin']
  },
  {
    x: 7, y: 5, color: '#4A3C1D', colorName: 'hair', 
    importance: 0.2, // Low - top detail
    structuralRole: 'detail',
    connections: ['hair', 'skin']
  }
  // ... more pixels
];
```

### **3B: Generate Build Sequence**
```typescript
class BuildSequenceGenerator {
  generateSequence(analyzedPixels: AnalyzedPixel[], strategy: BuildStrategy): BuildSequence {
    let sortedPixels: AnalyzedPixel[];
    
    switch (strategy) {
      case 'bottom-to-top':
        sortedPixels = analyzedPixels.sort((a, b) => b.y - a.y); // Bottom first
        break;
        
      case 'importance-based':
        sortedPixels = analyzedPixels.sort((a, b) => b.importance - a.importance);
        break;
        
      case 'foundation-first':
        sortedPixels = this.sortByStructuralRole(analyzedPixels);
        break;
        
      case 'center-out':
        sortedPixels = this.sortByCenterDistance(analyzedPixels);
        break;
    }
    
    // Group into stages
    const stages = this.groupIntoStages(sortedPixels, 5); // 5 stages
    
    return {
      totalPixels: analyzedPixels.length,
      stages: stages,
      strategy: strategy
    };
  }
  
  private groupIntoStages(pixels: AnalyzedPixel[], stageCount: number): BuildStage[] {
    const pixelsPerStage = Math.ceil(pixels.length / stageCount);
    const stages: BuildStage[] = [];
    
    for (let i = 0; i < stageCount; i++) {
      const startIndex = i * pixelsPerStage;
      const endIndex = Math.min(startIndex + pixelsPerStage, pixels.length);
      const stagePixels = pixels.slice(startIndex, endIndex);
      
      stages.push({
        id: `stage-${i}`,
        name: this.generateStageName(i, stagePixels),
        pixelIndices: stagePixels.map(p => pixels.indexOf(p)),
        duration: 1.0 / stageCount, // Equal duration stages
        description: this.generateStageDescription(stagePixels)
      });
    }
    
    return stages;
  }
}

// Example output for Ronaldo:
const ronaldoBuildSequence = {
  totalPixels: 89,
  strategy: 'bottom-to-top',
  stages: [
    {
      id: 'stage-0',
      name: 'Foundation',
      pixelIndices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], // Bottom pixels
      duration: 0.2,
      description: 'Legs and shorts base'
    },
    {
      id: 'stage-1', 
      name: 'Body Structure',
      pixelIndices: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
      duration: 0.2,
      description: 'Torso and arms outline'
    },
    {
      id: 'stage-2',
      name: 'Pose Details', 
      pixelIndices: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53],
      duration: 0.2,
      description: 'Arms positioning and jersey details'
    },
    {
      id: 'stage-3',
      name: 'Head & Neck',
      pixelIndices: [54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71],
      duration: 0.2,
      description: 'Head shape and skin tone'
    },
    {
      id: 'stage-4',
      name: 'Facial Features',
      pixelIndices: [72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88],
      duration: 0.2,
      description: 'Hair, eyes, and final details'
    }
  ]
};
```

---

## 📄 **Step 4: Theme JSON Generation**

### **4A: Compile Final Theme**
```typescript
class ThemeCompiler {
  compileTheme(
    originalImage: ProcessedImage,
    grid: PixelGrid, 
    buildSequence: BuildSequence,
    metadata: ThemeMetadata
  ): PixelArtTheme {
    
    return {
      // Metadata
      id: generateId(),
      name: metadata.name || 'Imported Theme',
      author: metadata.author || 'User',
      description: metadata.description || 'Imported pixel art',
      tags: metadata.tags || [],
      difficulty: this.calculateDifficulty(buildSequence),
      category: metadata.category || 'imported',
      
      // Technical specs
      originalDimensions: { 
        width: originalImage.width, 
        height: originalImage.height 
      },
      gridSize: { 
        width: grid.width, 
        height: grid.height 
      },
      colorPalette: grid.palette,
      
      // Art definition
      pixels: this.convertGridToPixelDefinitions(grid),
      buildSequence: buildSequence,
      
      // Metadata
      metadata: {
        source: 'imported',
        createdAt: new Date().toISOString(),
        version: '1.0',
        importStrategy: buildSequence.strategy
      }
    };
  }
}
```

### **4B: Final JSON Output**
```json
{
  "id": "ronaldo-siu-celebration",
  "name": "Ronaldo SIU Celebration", 
  "author": "User",
  "description": "Iconic Cristiano Ronaldo celebration pose",
  "tags": ["sports", "football", "celebration"],
  "difficulty": "medium",
  "category": "sports",
  
  "originalDimensions": { "width": 16, "height": 20 },
  "gridSize": { "width": 16, "height": 20 },
  
  "colorPalette": {
    "skin": "#FFDBAC",
    "hair": "#4A3C1D",
    "jersey": "#FFFFFF", 
    "shorts": "#003366",
    "background": "transparent"
  },
  
  "pixels": [
    { "x": 7, "y": 18, "color": "shorts", "stage": 0 },
    { "x": 8, "y": 18, "color": "shorts", "stage": 0 },
    { "x": 9, "y": 18, "color": "shorts", "stage": 0 },
    { "x": 7, "y": 17, "color": "skin", "stage": 1 },
    // ... 85 more pixels with coordinates and stage assignments
  ],
  
  "buildSequence": {
    "totalPixels": 89,
    "strategy": "bottom-to-top",
    "stages": [
      {
        "id": "stage-0",
        "name": "Foundation", 
        "pixelIndices": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        "duration": 0.2,
        "description": "Legs and shorts base"
      },
      // ... 4 more stages
    ]
  },
  
  "metadata": {
    "source": "imported",
    "createdAt": "2025-09-21T10:30:00Z",
    "version": "1.0",
    "importStrategy": "bottom-to-top"
  }
}
```

---

## ⚙️ **Step 5: Runtime Animation Integration**

### **5A: Theme Loader**
```typescript
class ThemeRenderer {
  loadTheme(themeJson: PixelArtTheme): LoadedTheme {
    // Pre-calculate animation frames for performance
    const animationFrames = this.precalculateFrames(themeJson);
    
    return {
      theme: themeJson,
      frames: animationFrames,
      getCurrentFrame: (progress: number) => this.getFrameAtProgress(progress, animationFrames)
    };
  }
  
  private precalculateFrames(theme: PixelArtTheme): AnimationFrame[] {
    const frames: AnimationFrame[] = [];
    const totalPixels = theme.pixels.length;
    
    // Create frame for each pixel reveal
    for (let i = 0; i <= totalPixels; i++) {
      const visiblePixels = theme.pixels.slice(0, i);
      frames.push({
        pixelCount: i,
        progress: i / totalPixels,
        visiblePixels: visiblePixels,
        currentStage: this.determineStage(i, theme.buildSequence)
      });
    }
    
    return frames;
  }
}
```

### **5B: Integration with Timer**
```typescript
// In your existing useAnimation hook
export const useAnimation = ({ timeRemaining, phase, sessionStartTime }) => {
  const [currentTheme] = useTheme(); // New hook to get selected theme
  
  const progress = calculateProgress(timeRemaining, sessionStartTime);
  const animationFrame = currentTheme.getCurrentFrame(progress);
  
  return {
    // Your existing animation data
    stage: animationFrame.currentStage,
    progress: progress,
    overallProgress: progress,
    
    // New theme-specific data
    themeData: {
      visiblePixels: animationFrame.visiblePixels,
      totalPixels: currentTheme.theme.pixels.length,
      palette: currentTheme.theme.colorPalette,
      gridSize: currentTheme.theme.gridSize
    }
  };
};
```

### **5C: Render in Component**
```typescript
// Updated PixelFlower component
export const PixelFlower: React.FC<PixelFlowerProps> = ({ themeData, progress }) => {
  const grid = useMemo(() => {
    // Create empty grid
    const emptyGrid = Array(themeData.gridSize.height)
      .fill(null)
      .map(() => Array(themeData.gridSize.width).fill(null));
    
    // Fill with visible pixels
    themeData.visiblePixels.forEach(pixel => {
      emptyGrid[pixel.y][pixel.x] = pixel.color;
    });
    
    return emptyGrid;
  }, [themeData.visiblePixels, themeData.gridSize]);
  
  return (
    <div className="pixel-art-container">
      {grid.map((row, y) => (
        <div key={y} className="pixel-row">
          {row.map((colorName, x) => (
            <div 
              key={`${y}-${x}`}
              className="pixel"
              style={{ 
                backgroundColor: colorName ? themeData.palette[colorName] : 'transparent',
                opacity: colorName ? 1 : 0
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
```

---

## 🎯 **Complete Data Flow Example**

### **Input**: Ronaldo SIU PNG file (16x20 pixels)
### **Output**: Animated theme that builds during 25-minute timer

```
PNG File (16x20) 
  ↓ [Image Processing]
RGBA pixel array [255,219,172,255, 74,60,29,255, ...]
  ↓ [Color Quantization] 
5-color palette + indexed pixels [0,1,0,1,2,2,...]
  ↓ [Grid Conversion]
2D grid with coordinate + color data
  ↓ [Structure Analysis]
Analyzed pixels with importance scores
  ↓ [Build Sequence Generation]
89 pixels grouped into 5 logical stages
  ↓ [Theme Compilation]
Complete JSON theme file
  ↓ [Runtime Loading]
Pre-calculated animation frames
  ↓ [Timer Integration]
Progressive pixel reveal during work session
```

**Result**: User imports Ronaldo image, and during their 25-minute focus session, Ronaldo builds up pixel by pixel from feet to head, perfectly timed to complete when the timer ends!

---

This pipeline converts **any pixel art** into a **perfectly timed animation** for your Pomodoro timer. The beauty is that once this system works, you can import Mario, Minecraft Steve, Pokemon, or any pixel art with zero additional development effort.

Does this clarify how the import system transforms images into animated timer themes?
