import { Howl } from 'howler';


export interface SceneConfig {
  camera: [number, number, number];
  target: [number, number, number];
  title: string;
  description?: string;
  link?: string | null;
  fov?: number;
  entrySound: string;
}

export const SFX: Record<string, Howl> = {
  homewhoosh : new Howl({
        src: ['/sounds/home_whoosh.wav'],
        volume: 1.0, 
        html5: true, 
    }),
  bio_whoosh : new Howl({
        src: ['/sounds/bio_whoosh.wav'],
        volume: 1.0, 
        html5: true, 
    }),
  links_whoosh : new Howl({
        src: ['/sounds/links_whoosh.wav'],
        volume: 1.0, 
        html5: true, 
    }),
  stuck_whoosh : new Howl({
        src: ['/sounds/stuck_whoosh.wav'],
        volume: 1.0, 
        html5: true, 
    }),
  intro_whoosh : new Howl({
        src: ['/sounds/intro_whoosh.wav'],
        volume: 1.0, 
        html5: true, 
    }),
}

export const SCENES: Record<string, SceneConfig> = {
  'START': {
    camera: [0, 0, 100],
    target: [0, 0, 0],
    link: null,
    title: 'S2PIID',
    entrySound: 'homewhoosh',
  },
  'HOME': {
    camera: [0, 0, 2.7],
    target: [0, 0, 0],
    link: null,
    title: 'ЛОББИ',
    entrySound: 'homewhoosh', 
  },

  'BIO': {
    camera: [-0.6, 0, 1.3],
    target: [-2, 0.4, 2.2],
    fov: 110,
    link: null,
    title: 'БИО',
    entrySound: 'bio_whoosh',
  },
  'LINKS': {
    camera: [0, -0.3, 0.5],
    target: [-1, 0, 0],
    fov: 110,
    link: null,
    title: 'ССЫЛКИ',
    entrySound: 'links_whoosh'
  }
}