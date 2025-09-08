i want this to get setup here in the hero section using this file public/assets/models/PROTOUCHYES.fbx

# Detailed 3D Model Rendering Explanation (FBX)

## Core Libraries & Setup

### React Three Fiber (R3F)
```tsx
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
```
- **Canvas**: Creates WebGL context and Three.js scene
- **useFrame**: Hook for animation loop (60 FPS)
- **useLoader**: Generic loader hook for Three.js loaders

### Three.js FBX Support
```tsx
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OrbitControls, Center } from '@react-three/drei'
```
- **FBXLoader**: Loads and parses FBX files (Autodesk format)
- **OrbitControls**: Camera orbit interaction
- **Center**: Auto-centers geometry

## Model Component Deep Dive

### 1. Model Loading Process
```tsx
const fbxModel = useLoader(FBXLoader, '/sda.fbx')
```
- Fetches FBX file from public directory
- Parses FBX format (supports ASCII and binary)
- Returns Three.js Group with meshes, materials, animations
- FBX preserves more complex data than GLB (bones, deformers, constraints)

### 2. Material Application
```tsx
const goldMaterial = new THREE.MeshStandardMaterial({
  color: '#FFD700',      // Base gold color
  metalness: 0.9,        // 90% metallic (0=plastic, 1=metal)
  roughness: 0.1,        // 10% rough (0=mirror, 1=diffuse)
  emissive: '#332200',   // Dark gold self-illumination
  emissiveIntensity: 0.05 // Subtle glow strength
})

// FBX models return a Group, not a scene
fbxModel.traverse((child) => {
  if (child instanceof THREE.Mesh) {
    // Preserve UV mapping from FBX
    child.material = goldMaterial
    // FBX often includes multiple materials per mesh
    if (Array.isArray(child.material)) {
      child.material = goldMaterial
    }
  }
})
```
- **traverse**: Recursively visits all nodes in FBX Group
- Replaces FBX materials (often Phong/Lambert) with PBR gold
- Preserves UV coordinates from FBX file

### 3. Animation System
```tsx
useFrame((state) => {
  if (meshRef.current) {
    if (isMobile) {
      // Continuous rotation
      meshRef.current.rotation.y += 0.01  // ~0.57 degrees/frame
    } else {
      // Mouse tracking
      const mouseX = state.pointer.x * 0.5  // Normalized -0.5 to 0.5
      const mouseY = state.pointer.y * 0.5
      meshRef.current.rotation.x = mouseY * 0.3  // Max ±0.15 radians
      meshRef.current.rotation.y = mouseX * 0.3
    }
  }
})
```
- **state.pointer**: Normalized mouse coordinates (-1 to 1)
- Euler rotation applied to mesh transform
- Mobile: Y-axis rotation accumulates each frame
- Desktop: Direct rotation mapping from mouse position

### 4. Scene Composition
```tsx
<Canvas
  camera={{ 
    position: [0, 0, 5],  // 5 units back on Z-axis
    fov: 45               // Field of view in degrees
  }}
>
  {/* Lights */}
  <ambientLight intensity={2.5} />
  
  {/* Model wrapper */}
  <Center>
    <mesh ref={meshRef}>
      <primitive 
        object={fbxModel} 
        scale={3}  // FBX units might differ from GLB
        rotation={[0, 0, 0]}  // FBX may need rotation correction
      />
    </mesh>
  </Center>
</Canvas>
```

## Rendering Pipeline (Frame by Frame)

### Frame 0: Initialization
1. Canvas creates WebGL context
2. Three.js renderer initialized
3. Default camera positioned at [0, 0, 5]

### Frame 1-N: Loading
1. `useLoader(FBXLoader, '/sda.fbx')` triggers async fetch
2. Loading state (model not visible)
3. Parse FBX data (ASCII or binary format)
4. Build Three.js Group with:
   - Mesh geometry
   - Material definitions
   - Transform hierarchies
   - Animation clips (if present)

### Frame N+1: First Render
1. Scene graph available
2. `traverse` applies gold material
3. Mesh positioned at origin
4. Lights illuminate geometry

### Every Frame (60 FPS):
1. **Input Processing**
   - Read mouse/touch position
   - Calculate rotation deltas

2. **Update Phase** (useFrame)
   - Apply rotation to mesh transform matrix
   - Update material uniforms if needed

3. **Render Phase**
   - Vertex shader: Transform vertices to screen space
   - Fragment shader: Calculate pixel colors using:
     - Material properties (metalness, roughness)
     - Light contributions (11 light sources)
     - PBR shading model

4. **Composition**
   - Render to transparent canvas
   - Composite over background image via CSS layers

## WebGL Shaders (Under the Hood)

### Vertex Shader (simplified)
```glsl
attribute vec3 position;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

### Fragment Shader (PBR metallic-roughness)
```glsl
// Calculates final pixel color based on:
// - Base color (#FFD700)
// - Metalness (reflectivity)
// - Roughness (surface micro-facets)
// - Light positions and intensities
// - View angle (camera position)
```

## Performance Optimizations

### 1. Conditional Rendering
- OrbitControls only on desktop (reduces touch event overhead)
- Pointer events disabled on mobile

### 2. Material Reuse
- Single material instance shared across all meshes
- Reduces GPU state changes

### 3. Camera Settings
- Lower FOV on mobile (35° vs 45°)
- Reduces visible geometry, improves performance

### 4. Light Optimization
- Static light positions (no per-frame updates)
- Pre-calculated light uniforms

## Browser Rendering Flow

1. **JavaScript Execution**
   - React renders component tree
   - R3F creates Three.js objects

2. **WebGL Commands**
   - Upload geometry buffers to GPU
   - Set shader programs
   - Bind textures and uniforms

3. **GPU Processing**
   - Vertex processing (3D → 2D projection)
   - Rasterization (triangles → pixels)
   - Fragment shading (pixel colors)

4. **Compositing**
   - WebGL canvas layer
   - CSS background image layer
   - Browser compositor merges layers

## Memory Management

- **Geometry**: ~200-500KB (FBX typically larger than GLB)
- **Materials**: Single instance after replacement, ~4KB
- **FBX Parser Overhead**: ~1-2MB during loading
- **WebGL Context**: ~2-5MB overhead
- **Total**: ~8-15MB GPU memory usage

## FBX vs GLB Considerations

### FBX Advantages
- Native support for complex animations
- Preserves modeling software data (Maya, 3ds Max, Blender)
- Better for complex rigged models
- Supports multiple UV sets

### FBX Disadvantages
- Larger file size (not compressed like GLB)
- Slower parsing than binary GLB
- Requires additional loader (~40KB)
- May need coordinate system corrections

### Code Adjustments for FBX
```tsx
// Complete FBX implementation
import { Suspense } from 'react'
import { useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

function Model() {
  const fbx = useLoader(FBXLoader, '/sda.fbx')
  const meshRef = useRef()
  
  // FBX specific adjustments
  useEffect(() => {
    if (fbx) {
      // Fix coordinate system if needed (FBX uses Y-up)
      fbx.rotation.x = -Math.PI / 2  // Rotate if needed
      
      // Scale adjustment (FBX units vary)
      const box = new THREE.Box3().setFromObject(fbx)
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 5 / maxDim  // Normalize to 5 units
      fbx.scale.setScalar(scale)
    }
  }, [fbx])
  
  return <primitive object={fbx} ref={meshRef} />
}

// Wrap with Suspense for loading state
<Suspense fallback={null}>
  <Model />
</Suspense>
```