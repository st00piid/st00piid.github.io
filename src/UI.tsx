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
            <a key={index} href={item.url} className="nav-link" style={{ '--i': index } as React.CSSProperties} target="_blank" onMouseEnter={() => SFX.hover_pop.play()}>
              {item.name}
            </a>
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
        </>
    )

};

