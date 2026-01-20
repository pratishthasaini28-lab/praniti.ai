
import React from 'react';
import { ImageStyle } from './types';

export const STYLE_OPTIONS = [
  { 
    id: ImageStyle.TWO_D, 
    label: '2D Illustration', 
    icon: <i className="fa-solid fa-pen-nib"></i>,
    promptSuffix: "flat 2D vector illustration, clean lines, minimalist, high quality, digital art" 
  },
  { 
    id: ImageStyle.THREE_D, 
    label: 'Cinematic 3D', 
    icon: <i className="fa-solid fa-cube"></i>,
    promptSuffix: "hyper-realistic 3D render, Unreal Engine 5 style, volumetric lighting, 8k resolution, cinematic composition" 
  },
  { 
    id: ImageStyle.CUTE_3D, 
    label: 'Cute 3D Toy', 
    icon: <i className="fa-solid fa-shapes"></i>,
    promptSuffix: "cute stylized 3D toy, claymation style, soft lighting, vibrant colors, C4D render, glossy texture" 
  },
  { 
    id: ImageStyle.VECTOR, 
    label: 'Flat Vector', 
    icon: <i className="fa-solid fa-draw-polygon"></i>,
    promptSuffix: "professional corporate flat vector design, solid colors, clean geometric shapes, modern look" 
  },
  { 
    id: ImageStyle.CYBERPUNK, 
    label: 'Cyberpunk', 
    icon: <i className="fa-solid fa-microchip"></i>,
    promptSuffix: "cyberpunk aesthetic, neon lighting, futuristic city, dark atmosphere, highly detailed, synthwave style" 
  },
  { 
    id: ImageStyle.ANIME, 
    label: 'Vibrant Anime', 
    icon: <i className="fa-solid fa-wand-magic-sparkles"></i>,
    promptSuffix: "studio ghibli meets makoto shinkai anime style, vibrant colors, beautiful lighting, emotional atmosphere, high detail" 
  },
];

export const ASPECT_RATIOS = [
  { id: "1:1", label: "1:1 Square" },
  { id: "4:3", label: "4:3 Desktop" },
  { id: "3:4", label: "3:4 Portrait" },
  { id: "16:9", label: "16:9 Wide" },
  { id: "9:16", label: "9:16 Mobile" },
] as const;

export const LOADING_MESSAGES = [
  "Dreaming in 2D and 3D...",
  "Applying digital paint...",
  "Rendering pixels with love...",
  "Visualizing your imagination...",
  "Almost there, polishing the details...",
  "Igniting the creative sparks...",
];
