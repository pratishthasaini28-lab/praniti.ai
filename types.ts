
export enum ImageStyle {
  TWO_D = '2D',
  THREE_D = '3D',
  CUTE_3D = 'Cute 3D',
  VECTOR = 'Vector Illustration',
  CYBERPUNK = 'Cyberpunk',
  ANIME = 'Anime'
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  style: ImageStyle;
  timestamp: number;
}

export interface GenerationRequest {
  prompt: string;
  style: ImageStyle;
  aspectRatio: "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
}
