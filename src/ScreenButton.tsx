import {SFX } from './scene_config';
import './App.css';
import { Html } from '@react-three/drei'

export function ScreenButton({ onHover, onUnhover }) {
  return (

    <group position={[-0.98, -0.07, -0.08]} rotation={[0, Math.PI / 2.2, 0]}>
      <Html
        transform // Позволяет кнопке вращаться и масштабироваться вместе со сценой
        distanceFactor={2.24} // Подбери масштаб
      >
        <div 
          onClick={() => {SFX.hover_pop.play(); window.open('https://dva-spina.github.io', '_blank');}}
          className='screen-interactive'
          onMouseEnter={() => {SFX.hover_whoop.play(); onHover();}}
          onMouseLeave={onUnhover}
        />
      </Html>
    </group>
  )
}