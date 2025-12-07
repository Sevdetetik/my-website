import { Projects } from '../types';

const API_URL = 'http://localhost:3001/api';

// Fallback Mock Data (in case Node server isn't running in this preview)
const MOCK_PROJECTS: Projects[] = [
  {
    _id: '1',
    projectName: 'AI Aris888 Platform',
    shortDescription: 'Yapay zeka destekli bilgi alma ve sohbet platformu.',
    detailedDescription: 'AI Aris888, üretken yapay zeka ve RAG (Retrieval-Augmented Generation) tekniklerini birleştiren modern bir yapay zeka platformudur. Projenin geliştirilme sürecinde backend API tasarımı, Python tabanlı RAG pipeline entegrasyonu, belge indeksleme, vektör veritabanı yapılandırması ve React arayüz bileşenlerinin geliştirilmesinde aktif rol aldım. Sistem; gerçek zamanlı bilgi alma, kullanıcı etkileşimi, yüksek performanslı sorgu işleme ve ölçeklenebilir mimari özellikleriyle öne çıkar.',
    technologiesUsed: 'Node.js, Python, React, RAG, Vector Databases, Tailwind CSS',
    mainImage: '/images/ca.png',
    projectUrl: 'https://ai.aris888.io/',
    completionDate: '10.12.2025',
    isFeatured: true
  },
  {
    _id: '2',
    projectName: 'Social Media App',
    shortDescription: 'Gerçek zamanlı sosyal medya platformu.',
    detailedDescription: 'Kullanıcıların fotoğraf paylaşabildiği, yorum yapabildiği ve birbirini takip edebildiği tam kapsamlı bir sosyal medya uygulaması. Socket.io ile anlık mesajlaşma özelliği entegre edilmiştir.',
    technologiesUsed: 'Next.js, Prisma, PostgreSQL, Socket.io',
    mainImage: 'https://picsum.photos/id/20/1200/800',
    projectUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    completionDate: '2023-10-20',
    isFeatured: true
  },
  {
    _id: '3',
    projectName: 'Task Management System',
    shortDescription: 'Kurumsal görev ve proje takip sistemi.',
    detailedDescription: 'Takımların projelerini yönetebileceği, görev atayabileceği ve ilerlemeyi takip edebileceği bir SaaS uygulaması. Kanban board görünümü ve takvim entegrasyonu mevcuttur.',
    technologiesUsed: 'Vue.js, Firebase, Pinia',
    mainImage: 'https://picsum.photos/id/48/1200/800',
    projectUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    completionDate: '2024-01-10',
    isFeatured: true
  },
  {
    _id: '4',
    projectName: 'AI Content Generator',
    shortDescription: 'Yapay zeka destekli içerik üreticisi.',
    detailedDescription: 'OpenAI API kullanılarak geliştirilen, blog yazıları ve sosyal medya içerikleri üreten bir araç. Kullanıcı dostu arayüzü ile saniyeler içinde özgün içerikler oluşturur.',
    technologiesUsed: 'React, OpenAI API, Express',
    mainImage: 'https://picsum.photos/id/60/1200/800',
    projectUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    completionDate: '2024-02-01',
    isFeatured: false
  }
];

export const BaseCrudService = {
  getAll: async <T>(collection: string): Promise<{ items: T[] }> => {
    try {
      const response = await fetch(`${API_URL}/${collection}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.warn('Backend not reachable, using mock data:', error);
      // Fallback logic for demo purposes
      await new Promise(resolve => setTimeout(resolve, 800));
      if (collection === 'projects') {
        return { items: MOCK_PROJECTS as unknown as T[] };
      }
      return { items: [] };
    }
  },

  getById: async <T>(collection: string, id: string): Promise<T | null> => {
    try {
      const response = await fetch(`${API_URL}/${collection}/${id}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.warn('Backend not reachable, using mock data:', error);
      await new Promise(resolve => setTimeout(resolve, 600));
      if (collection === 'projects') {
        const project = MOCK_PROJECTS.find(p => p._id === id);
        return (project as unknown as T) || null;
      }
      return null;
    }
  },

  post: async (collection: string, data: any): Promise<any> => {
    try {
      const response = await fetch(`${API_URL}/${collection}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.warn('Backend not reachable, simulating success:', error);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    }
  }
};