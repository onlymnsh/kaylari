export interface GalleryImage {
  id: string;
  src: string;
  title: string;
  category: string;
  description?: string;
  createdAt: string;
}

export interface GalleryVideo {
  id: string;
  src: string;
  thumbnail: string;
  title: string;
  category: string;
  description?: string;
  createdAt: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface SiteContent {
  images: GalleryImage[];
  videos: GalleryVideo[];
  collections: Collection[];
}

export interface AdminContextType {
  content: SiteContent;
  addImage: (image: Omit<GalleryImage, 'id' | 'createdAt'>) => void;
  addVideo: (video: Omit<GalleryVideo, 'id' | 'createdAt'>) => void;
  addCollection: (collection: Omit<Collection, 'id'>) => void;
  deleteImage: (id: string) => void;
  deleteVideo: (id: string) => void;
  deleteCollection: (id: string) => void;
  updateCollection: (id: string, updates: Partial<Collection>) => void;
}
