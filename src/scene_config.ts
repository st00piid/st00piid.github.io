import { Howl } from 'howler';
import { FAM_LINKS, HOME_LINKS, BIO } from './data';

export interface SceneConfig {
  camera: [number, number, number];
  target: [number, number, number];
  title: string;
  description?: string;
  link?: any;
  fov?: number;
  entrySound: keyof typeof SFX;
  data?: any
}

export const SFX: Record<string, Howl> = {
  homewhoosh : new Howl({
        src: ['sounds/home_whoosh.mp3'],
        volume: 0.8, 
        preload: true,
        html5: false, 
    }),
  bio_whoosh : new Howl({
        src: ['sounds/bio_whoosh.mp3'],
        volume: 0.8,
        preload: true, 
        html5: false, 
    }),
  links_whoosh : new Howl({
        src: ['sounds/links_whoosh.mp3'],
        volume: 0.8,
        preload: true, 
        html5: false, 
    }),
  stuck_whoosh : new Howl({
        src: ['sounds/stuck_whoosh.mp3'],
        volume: 0.5, 
        preload: true,
        html5: false, 
    }),
  intro_whoosh : new Howl({
        src: ['sounds/intro_whoosh.mp3'],
        volume: 0.8, 
        preload: true,
        html5: false, 
    }),
  hover_pop : new Howl({
        src: ['sounds/pop.mp3'],
        volume: 0.4, 
        preload: true,
        html5: false, 
    }),
}

export const SCENES: Record<string, SceneConfig> = {
  'START': {
    camera: [0, 0, 100],
    target: [0, 0, 0],
    link: null,
    title: 'S2PIID',
    entrySound: 'introwhoosh',
    description: '[connect: @s2piid]'
  },
  'HOME': {
    camera: [0, 0, 2.7],
    target: [0, 0.3, 0],
    link: HOME_LINKS,
    title: 'home',
    entrySound: 'homewhoosh', 
  },

  'BIO': {
    camera: [-0.6, 0, 1.3],
    target: [-2, 0.4, 2.2],
    fov: 110,
    link: BIO,
    title: 'bio',
    entrySound: 'bio_whoosh',
  },
  'LINKS': {
    camera: [0, -0.3, 0.5],
    target: [-1, 0, -0.01],
    fov: 110,
    link: FAM_LINKS,
    title: 'fam',
    entrySound: 'links_whoosh',
  }
}