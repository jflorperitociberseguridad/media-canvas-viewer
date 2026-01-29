export interface Resource {
  id: number;
  type: string;
  url: string;
  description: string;
}

// Sample video data
export const resources: Resource[] = [
  { id: 1, type: "Tutoriales", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", description: "Introducción a React desde cero" },
  { id: 2, type: "Tutoriales", url: "https://www.youtube.com/watch?v=w7ejDZ8SWv8", description: "TypeScript para principiantes" },
  { id: 3, type: "Herramientas", url: "https://www.youtube.com/watch?v=Tn6-PIqc4UM", description: "VS Code: Tips y trucos esenciales" },
  { id: 4, type: "Herramientas", url: "https://www.youtube.com/watch?v=RGOj5yH7evk", description: "Git y GitHub desde cero" },
  { id: 5, type: "Prompts", url: "https://www.youtube.com/watch?v=aircAruvnKk", description: "Mejores prompts para ChatGPT" },
  { id: 6, type: "Prompts", url: "https://www.youtube.com/watch?v=kCc8FmEb1nY", description: "Ingeniería de prompts avanzada" },
  { id: 7, type: "IA Generativa", url: "https://www.youtube.com/watch?v=x7psGHgatGM", description: "Cómo funciona Stable Diffusion" },
  { id: 8, type: "IA Generativa", url: "https://www.youtube.com/watch?v=HK6y8DAPN_0", description: "Midjourney: Guía completa" },
  { id: 9, type: "Automatización", url: "https://www.youtube.com/watch?v=s_o8dwzRlu4", description: "Automatiza tareas con Python" },
  { id: 10, type: "Automatización", url: "https://www.youtube.com/watch?v=XqZsoesa55w", description: "Zapier para principiantes" },
  { id: 11, type: "Diseño", url: "https://www.youtube.com/watch?v=c9Wg6Cb_YlU", description: "Figma desde cero" },
  { id: 12, type: "Diseño", url: "https://www.youtube.com/watch?v=FK4YusHIIj0", description: "Principios de diseño UI/UX" },
  { id: 13, type: "Productividad", url: "https://www.youtube.com/watch?v=oTugjssqOT0", description: "Notion: Sistema de productividad" },
  { id: 14, type: "Productividad", url: "https://www.youtube.com/watch?v=hbxQw4LQwws", description: "Obsidian para gestión del conocimiento" },
  { id: 15, type: "Desarrollo Web", url: "https://www.youtube.com/watch?v=UB1O30fR-EE", description: "HTML y CSS en una hora" },
  { id: 16, type: "Desarrollo Web", url: "https://www.youtube.com/watch?v=hdI2bqOjy3c", description: "JavaScript moderno ES6+" },
  { id: 17, type: "Tutoriales", url: "https://www.youtube.com/watch?v=Ke90Tje7VS0", description: "React Hooks explicados" },
  { id: 18, type: "Herramientas", url: "https://www.youtube.com/watch?v=9boMnm5X9ak", description: "Docker para desarrolladores" },
  { id: 19, type: "IA Generativa", url: "https://www.youtube.com/watch?v=5MgBikgcWnY", description: "DALL-E 3: Creación de imágenes" },
  { id: 20, type: "Diseño", url: "https://www.youtube.com/watch?v=wIuVvCuiJhU", description: "Tailwind CSS en profundidad" },
];

// Get unique categories
export const getCategories = (data: Resource[]): string[] => {
  return [...new Set(data.map(r => r.type))].sort();
};

// Color mapping for categories
export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    "Tutoriales": "217 91% 60%",
    "Herramientas": "142 76% 36%",
    "Prompts": "45 93% 47%",
    "IA Generativa": "280 87% 65%",
    "Automatización": "15 90% 55%",
    "Diseño": "330 81% 60%",
    "Productividad": "190 90% 50%",
    "Desarrollo Web": "0 84% 60%",
  };
  return colors[category] || "217 33% 50%";
};

// Convert YouTube URL to embed URL
export const getVideoEmbedUrl = (url: string): string | null => {
  // YouTube standard
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }
  
  // YouTube Shorts
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) {
    return `https://www.youtube.com/embed/${shortsMatch[1]}`;
  }
  
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }
  
  return null;
};

// Check if URL is a playable video
export const isPlayableVideo = (url: string): boolean => {
  return getVideoEmbedUrl(url) !== null;
};
