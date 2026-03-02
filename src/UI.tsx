import React from 'react';
import {Howl} from 'howler';
import { SCENES, SFX} from './scene_config';

export const UI = ({currentScene , goToScene, showLabel}) => {
    const menuOrder = ['HOME', 'LINKS', 'BIO'];
    const scene = SCENES[currentScene];

    return(
    <>
        <div className="overlay">
        {scene.link && (
        <div className="overlay-links" key={currentScene}>
        {scene.link.map((item, index) => {
          const isCenter = item.pos === 'center';
          return (
          item.url ? (
            <a key={index} href={item.url} className={`nav-link ${isCenter ? 'pos-center' : ''}`} style={{ '--i': index} as React.CSSProperties} target="_blank" onMouseEnter={() => SFX.hover_pop.play()}>
              {item.name}
            </a>
          ) : (
            <span key={index} className="nav-link text-only" style={{ '--i': index , '--random-padding' : `${Math.floor(Math.random() * 800)}px`} as React.CSSProperties} target="_blank" onMouseEnter={() => SFX.hover_pop.play()}>
              {item.name}
            </span>
          )
        )
          })}
        </div>
      )}
      </div>
        <div className="nav-container">
        {menuOrder.map((key) => (
            <button
            key={key}
            className={`nav-button ${currentScene === key ? 'active' : ''}`}
            onClick={() => goToScene(key)}
            >
            {SCENES[key].title}
            </button>
        ))}
        
        </div>

        <div className="watermark">
                by s2piid
            </div>

          <div 
        style={{
          /* Копируем шрифт и базовый вид из .nav-link / .overlay */
          fontFamily: '"Times New Roman", Times, serif',
          fontSize: '20px',
          color: 'white',
          letterSpacing: '0px',
          
          /* Копируем свечение из .overlay */
          textShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
          
          /* Центрируем текст по экрану */
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          
          /* Логика появления */
          opacity: showLabel ? 0.8 : 0,
          transition: 'opacity 0.2s ease', // Сделал чуть медленнее (0.5s) для благородства
          
          /* Технические параметры */
          zIndex: 100,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          textAlign: 'center'
        }}
      >
        [ dva spina radio ]
      </div>
        </>
    )

};

