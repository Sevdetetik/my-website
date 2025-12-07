import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Database Data
const PROJECTS = [
  {
    _id: '1',
    projectName: 'AI Aris888 Platform',
    shortDescription: 'Yapay zeka destekli bilgi alma ve sohbet platformu.',
    detailedDescription: 'AI Aris888, üretken yapay zeka ve RAG (Retrieval-Augmented Generation) tekniklerini birleştiren modern bir yapay zeka platformudur. Projenin geliştirilme sürecinde backend API tasarımı, Python tabanlı RAG pipeline entegrasyonu, belge indeksleme, vektör veritabanı yapılandırması ve React arayüz bileşenlerinin geliştirilmesinde aktif rol aldım. Sistem; gerçek zamanlı bilgi alma, kullanıcı etkileşimi, yüksek performanslı sorgu işleme ve ölçeklenebilir mimari özellikleriyle öne çıkar.',
    technologiesUsed: 'Node.js, Python, React, RAG, Vector Databases, Tailwind CSS',
    mainImage: '/images/chat.png',
    projectUrl: 'https://ai.aris888.io/',
    completionDate: '05.12.2025',
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

// Routes

// GET: All Projects
app.get('/api/projects', (req, res) => {
  console.log('GET /api/projects called');
  res.json({ items: PROJECTS });
});

// GET: Single Project by ID
app.get('/api/projects/:id', (req, res) => {
  console.log(`GET /api/projects/${req.params.id} called`);
  const project = PROJECTS.find(p => p._id === req.params.id);
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});

// POST: Contact Form
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  console.log('--- New Contact Form Submission ---');
  console.log(`From: ${name} <${email}>`);
  console.log(`Subject: ${subject}`);
  console.log(`Message: ${message}`);
  console.log('-----------------------------------');

  // Simulate delay and success
  setTimeout(() => {
    res.json({ success: true, message: 'Message received successfully' });
  }, 1000);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend Server running on http://localhost:${PORT}`);
});