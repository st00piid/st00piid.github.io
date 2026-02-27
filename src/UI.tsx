import React from 'react';
import {Howl} from 'howler';
import { SCENES, SFX} from './scene_config';

export const UI = ({currentScene , goToScene}) => {
    const menuOrder = ['HOME', 'LINKS', 'BIO'];
    const scene = SCENES[currentScene];
    return(
    <>
        <div className="overlay">
        {scene.link && (
        <div className="overlay-links" key={currentScene}>
        {scene.link.map((item, index) => (
          item.url ? (
            <a key={index} href={item.url} className="nav-link" style={{ '--i': index } as React.CSSProperties} target="_blank" onMouseEnter={() => SFX.hover_pop.play()}>
              {item.name}
            </a>
          ) : (
            <span key={index} className="nav-link text-only" style={{ '--i': index , '--random-padding' : `${Math.floor(Math.random() * 800)}px`} as React.CSSProperties} target="_blank" onMouseEnter={() => SFX.hover_pop.play()}>
              {item.name}
            </span>
          )
          ))}
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
                {/* DEV / DESIGN <br /> 3D / SFX / SCAN <br /> */}
                {/* CORE <br /> */}
                by s2piid
            </div>
        </>
    )

};

