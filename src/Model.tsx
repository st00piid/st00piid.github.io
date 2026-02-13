import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function Model(props: any) {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('/roomsite-v1-v1.glb') as any
  
  const logRef4 = useRef<THREE.Mesh>(null!)
  const logRef3 = useRef<THREE.Mesh>(null!)
  const logRef2 = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    const floatHeight = 0.1
    const floatSpeed = 1.0

    if (logRef4.current) {
      logRef4.current.rotation.z += delta * 1.5
      logRef4.current.position.y = 0.28 + Math.sin(time * 0.5) * floatHeight
    }
    if (logRef3.current) {
      logRef3.current.rotation.z += delta * 1.2
      logRef3.current.position.y = 0.14 + Math.sin(time * 0.7 + 2.0) * floatHeight
    }
    if (logRef2.current) {
      logRef2.current.rotation.z -= delta * 1.0
      logRef2.current.position.y = 0.42 + Math.sin(time + 4.0) * floatHeight
    }
  })

  const glassProps = {
    transparent: true,
    opacity: 0.5,           
    metalness: 0.1,         
    roughness: 0.05,        
    side: THREE.DoubleSide, 
    toneMapped: false,      
    depthWrite: false,      
  }

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group position={[0, 1.06, 0]}>
          <mesh geometry={nodes.Mesh_1_1.geometry} material={materials.Material_1} />
          <mesh geometry={nodes.Mesh_1_2.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.Mesh_1_3.geometry} material={materials.Material} />
        </group>

        {/* LOGO 4 - СЕРЕБРО */}
        <mesh
          ref={logRef4}
          geometry={nodes.logo_01004.geometry}
          position={[-0.68, 0.28, -1.5]}
          rotation={[1.58, -0.02, -0.01]}
          scale={[0.17, 0.03, 0.17]}
        >
          <meshPhysicalMaterial {...glassProps} color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
        </mesh>

        {/* LOGO 3 - РОЗОВЫЙ */}
        <mesh
          ref={logRef3}
          geometry={nodes.logo_01003.geometry}
          position={[0.66, 0.14, -0.56]}
          rotation={[1.58, -0.34, 0]}
          scale={[0.17, 0.03, 0.17]}
        >
          <meshPhysicalMaterial {...glassProps} color="#926775" emissive="#926775" emissiveIntensity={0.5} />
        </mesh>

        {/* LOGO 2 - ЗЕЛЕНЫЙ */}
        <mesh
          ref={logRef2}
          geometry={nodes.logo_01002.geometry}
          position={[-0.23, 0.42, 1.87]}
          rotation={[1.58, -0.1, 0]}
          scale={[0.17, 0.03, 0.17]}
          onClick={() => window.open('https://t.me/g0s2piid', '_blank')}
        >
          <meshPhysicalMaterial {...glassProps} color="#3E625A" emissive="#3E625A" emissiveIntensity={0.6} />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/roomsite-v1-v1.glb')