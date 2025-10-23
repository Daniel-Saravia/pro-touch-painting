'use client'

import { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useFBX, Html } from '@react-three/drei'
import * as THREE from 'three'
import styles from './Hero3DModel.module.css'

function Spinner() {
  return (
    <div className={styles.canvasLoader} role="status" aria-label="Loading 3D model" />
  )
}

function CanvasLoader() {
  return (
    <Html center>
      <Spinner />
    </Html>
  )
}

function FBXModel({ isMobile, scale }: { isMobile: boolean, scale: number }) {
  const fbx = useFBX('/assets/models/PROTOUCH_SIMPLE.fbx')
  const meshRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      if (isMobile) {
        meshRef.current.rotation.y += 0.007
      } else {
        const mouseX = state.pointer.x * 0.5
        const mouseY = state.pointer.y * 0.5
        meshRef.current.rotation.x = mouseY * 0.3
        meshRef.current.rotation.y = mouseX * 0.3
      }
    }
  })
  
  return (
    <group ref={meshRef} scale={scale}>
      <primitive object={fbx} />
    </group>
  )
}

export default function Hero3DModel() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [modelScale, setModelScale] = useState(5)
  const overlayClass = styles.canvasOverlay
  
  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      // Set scale based on screen size
      if (window.innerWidth < 768) {
        setModelScale(2.5)
      } else {
        setModelScale(5)
      }
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  if (!mounted) {
    return (
      <div className={overlayClass}>
        <div className={styles.canvasLoaderWrapper}>
          <Spinner />
        </div>
      </div>
    )
  }
  
  return (
    <>
      <div className={overlayClass}>
      <Canvas
        camera={{ 
          position: [0, 0, 20],
          fov: 30
        }}
        gl={{ 
          alpha: true,
          antialias: true 
        }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2.0} />
        <directionalLight position={[-10, -10, -5]} intensity={1.8} />
        <directionalLight position={[5, -5, 3]} intensity={1.5} />
        <directionalLight position={[-5, 5, -3]} intensity={1.2} />
        <directionalLight position={[0, -10, 8]} intensity={1.0} />
        <pointLight position={[0, 0, 10]} intensity={1.5} />
        <pointLight position={[-5, 5, -5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[8, -3, 4]} intensity={1.0} color="#ffeaa7" />
        <pointLight position={[-8, 3, -4]} intensity={0.8} color="#74b9ff" />
        <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={2.0} castShadow />
        <spotLight position={[10, 5, 10]} angle={0.4} penumbra={0.8} intensity={1.5} />
        <spotLight position={[-10, 5, 10]} angle={0.4} penumbra={0.8} intensity={1.5} />
        
        <Suspense fallback={<CanvasLoader />}>
          <FBXModel isMobile={isMobile} scale={modelScale} />
        </Suspense>
        
        {!isMobile && (
          <OrbitControls 
            enablePan={false} 
            enableZoom={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
        )}
      </Canvas>
      </div>
      
    </>
  )
}
