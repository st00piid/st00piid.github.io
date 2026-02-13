import { Canvas } from '@react-three/fiber'
import { Stage, Environment, Stars, CameraControls, useProgress} from '@react-three/drei'
import { Model } from './Model'
import { useRef, Suspense, useState, useEffect} from 'react'
import './App.css';
import { Howl } from 'howler';
import { SCENES, SFX } from './scene_config';
import { EffectComposer, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'


function LoadingScreen({ isReady, onEntered, hasStarted }) {
  const { progress } = useProgress();

  // Если уже зашли, полностью убираем компонент из памяти
  if (hasStarted) return null;

  return (
    <div 
      className={`loader-container ${isReady ? 'ready' : ''}`}
      onClick={() => isReady && onEntered()} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: '#000',
        color: '#fff',
        cursor: isReady ? 'pointer' : 'wait',
        zIndex: 9999
      }}
    >
      <div className="loader-content" style={{ textAlign: 'center' }}>
        <h1>{Math.round(progress)}%</h1>
        
        {isReady ? (
          <p className="blink-text">CLICK ANYWHERE TO START</p>
        ) : (
          <p>LOADING SCENE...</p>
        )}
      </div>
    </div>
  );
}

const shakeCamera = (shakecurrent) => {
  const controls = shakecurrent;
  if (!controls) return;

  let startTime = performance.now();
  const duration = 500; // Длительность тряски в мс
  const frequency = 0.5; // Скорость болтанки
  const intensity = 0.01; // Начальная амплитуда (сила)

  let lastOffset = 0;

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = elapsed / duration;

    if (progress < 1) {
      const decay = 1 - progress;
      
      const newOffset = intensity * decay * Math.sin(elapsed * frequency * 0.1);
      
      controls.truck(newOffset - lastOffset, 0, false);

      lastOffset = newOffset;

      requestAnimationFrame(animate);
    } else {
      controls.truck(-lastOffset, 0, true);
    }
  }; 

requestAnimationFrame(animate);
};
export default function App() {
  const cameraRef = useRef<CameraControls>(null!)
  const [currentScene, setCurrentScene] = useState('START')
  const [hasStarted, setHasStarted] = useState(false);

  const { progress, active } = useProgress();
  const isReady = progress === 100 && !active;

  const goToScene = (key) => {
    if (Howler.ctx && Howler.ctx.state === 'suspended') {
      Howler.ctx.resume();
    }
    
    if (currentScene === key) {
      SFX.stuck_whoosh.play()
      if (cameraRef.current) {
        shakeCamera(cameraRef.current);
      }
      return 
    }

    const scene = SCENES[key];
    if (scene) {
      SFX[scene.entrySound].play();
      cameraRef.current?.setLookAt(...scene.camera, ...scene.target, true);
      setCurrentScene(key)
    }
  }

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000000', position: 'relative' }}>
      
      <LoadingScreen 
        isReady={isReady} 
        hasStarted={hasStarted} 
        onEntered={() => {
          setHasStarted(true);
          goToScene('HOME')
        }} />
      {hasStarted && (
        <div className="nav-container">
        <button className="nav-button" onClick={() => goToScene('HOME')}>HOME</button>
        <button className="nav-button" onClick={() => goToScene('LINKS')}>LINKS</button>
        <button className="nav-button" onClick={() => goToScene('BIO')}>BIO</button>
      </div>
      )}


      <Canvas camera={{ fov: 90 }}>
        <Suspense fallback={null}>
          <Stage intensity={0.5} environment="city" adjustCamera={false}>
            <Model />
          </Stage>
          <Environment preset="city" />
        </Suspense>

        <EffectComposer>
          <Noise 
            opacity={0.08} // Сила шума
            // blendFunction={BlendFunction.ADD} // Как шум накладывается на свет // Делает шум более мягким
          />
        </EffectComposer>
        <CameraControls 
          ref={cameraRef} 
          smoothTime={0.4}
          mouseButtons={{ left: 0, middle: 0, right: 0, wheel: 0 }} 
          touches={{ one: 0, two: 0, three: 0 }}
        />
      </Canvas>

    </div>
  );
}