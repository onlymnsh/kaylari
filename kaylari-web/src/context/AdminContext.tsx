import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { SiteContent, GalleryImage, GalleryVideo, Collection, AdminContextType } from '@/types';

const defaultContent: SiteContent = {
  images: [
    {
      id: '1',
      src: '/collection-bridal.jpg',
      title: 'Bridal Lehenga',
      category: 'Bridal',
      description: 'Traditional red and gold embroidered bridal lehenga',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      src: '/collection-festive.jpg',
      title: 'Festive Saree',
      category: 'Festive',
      description: 'Royal blue silk saree with gold zari border',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      src: '/collection-fusion.jpg',
      title: 'Fusion Anarkali',
      category: 'Fusion',
      description: 'Contemporary pastel pink anarkali with modern cut',
      createdAt: new Date().toISOString(),
    },
    {
      id: '4',
      src: '/collection-saree.jpg',
      title: 'Banarasi Saree',
      category: 'Traditional',
      description: 'Emerald green Banarasi silk with gold brocade',
      createdAt: new Date().toISOString(),
    },
    {
      id: '5',
      src: '/collection-mens.jpg',
      title: 'Men\'s Kurta Set',
      category: 'Menswear',
      description: 'Cream embroidered kurta with nehru jacket',
      createdAt: new Date().toISOString(),
    },
    {
      id: '6',
      src: '/collection-accessories.jpg',
      title: 'Bridal Jewelry',
      category: 'Accessories',
      description: 'Traditional jhumkas, maang tikka, and bangles',
      createdAt: new Date().toISOString(),
    },
  ],
  videos: [],
  collections: [
    {
      id: '1',
      name: 'Bridal Wear',
      description: 'Exquisite bridal lehengas and sarees for your special day',
      image: '/collection-bridal.jpg',
      itemCount: 24,
    },
    {
      id: '2',
      name: 'Festive Collection',
      description: 'Vibrant outfits perfect for celebrations and festivals',
      image: '/collection-festive.jpg',
      itemCount: 36,
    },
    {
      id: '3',
      name: 'Contemporary Fusion',
      description: 'Modern silhouettes with traditional Indian craftsmanship',
      image: '/collection-fusion.jpg',
      itemCount: 18,
    },
    {
      id: '4',
      name: 'Traditional Sarees',
      description: 'Handwoven sarees from across India',
      image: '/collection-saree.jpg',
      itemCount: 42,
    },
    {
      id: '5',
      name: 'Menswear',
      description: 'Elegant kurtas, sherwanis, and accessories for men',
      image: '/collection-mens.jpg',
      itemCount: 28,
    },
    {
      id: '6',
      name: 'Accessories',
      description: 'Complete your look with our jewelry and accessories',
      image: '/collection-accessories.jpg',
      itemCount: 56,
    },
  ],
};

const STORAGE_KEY = 'rang-site-content';

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return defaultContent;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  const addImage = useCallback((image: Omit<GalleryImage, 'id' | 'createdAt'>) => {
    const newImage: GalleryImage = {
      ...image,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setContent((prev) => ({
      ...prev,
      images: [newImage, ...prev.images],
    }));
  }, []);

  const addVideo = useCallback((video: Omit<GalleryVideo, 'id' | 'createdAt'>) => {
    const newVideo: GalleryVideo = {
      ...video,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setContent((prev) => ({
      ...prev,
      videos: [newVideo, ...prev.videos],
    }));
  }, []);

  const addCollection = useCallback((collection: Omit<Collection, 'id'>) => {
    const newCollection: Collection = {
      ...collection,
      id: Date.now().toString(),
    };
    setContent((prev) => ({
      ...prev,
      collections: [...prev.collections, newCollection],
    }));
  }, []);

  const deleteImage = useCallback((id: string) => {
    setContent((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== id),
    }));
  }, []);

  const deleteVideo = useCallback((id: string) => {
    setContent((prev) => ({
      ...prev,
      videos: prev.videos.filter((vid) => vid.id !== id),
    }));
  }, []);

  const deleteCollection = useCallback((id: string) => {
    setContent((prev) => ({
      ...prev,
      collections: prev.collections.filter((col) => col.id !== id),
    }));
  }, []);

  const updateCollection = useCallback((id: string, updates: Partial<Collection>) => {
    setContent((prev) => ({
      ...prev,
      collections: prev.collections.map((col) =>
        col.id === id ? { ...col, ...updates } : col
      ),
    }));
  }, []);

  const value: AdminContextType = {
    content,
    addImage,
    addVideo,
    addCollection,
    deleteImage,
    deleteVideo,
    deleteCollection,
    updateCollection,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
