import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Calendar } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BaseCrudService } from '../services/api';
import { Projects } from '../types';
import { Image } from '../components/ui/Image';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Projects | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      if (!id) return;
      
      try {
        const projectData = await BaseCrudService.getById<Projects>('projects', id);
        setProject(projectData);
      } catch (error) {
        console.error('Error loading project:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 pt-24 pb-16 flex items-center justify-center">
          <div className="animate-spin inline-block w-8 h-8 border-2 border-primary border-r-transparent rounded-full"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <p className="font-paragraph text-lg text-primary/60 mb-6">Proje bulunamadı.</p>
            <Link 
              to="/portfolio"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-paragraph font-semibold inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <ArrowLeft className="w-4 h-4" />
              Portföye Dön
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        {/* Back Button */}
        <div className="max-w-[100rem] mx-auto px-6 py-6">
          <Link 
            to="/portfolio"
            className="inline-flex items-center gap-2 font-paragraph text-primary/80 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Portföye Dön
          </Link>
        </div>

        {/* Project Header */}
        <section className="w-full bg-gradient-to-br from-secondary to-background py-16">
          <div className="max-w-[100rem] mx-auto px-6">
            <motion.h1 
              className="font-heading text-5xl md:text-6xl text-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {project.projectName}
            </motion.h1>
            
            <motion.p 
              className="font-paragraph text-xl text-primary/80 mb-8 max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {project.shortDescription}
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {project.projectUrl && (
                <a 
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-paragraph font-semibold inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <ExternalLink className="w-5 h-5" />
                  Canlı Demo
                </a>
              )}
              
              {project.githubUrl && (
                <a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-primary/20 text-primary px-6 py-3 rounded-lg font-paragraph font-semibold inline-flex items-center gap-2 hover:bg-secondary transition-colors"
                >
                  <Github className="w-5 h-5" />
                  GitHub'da Görüntüle
                </a>
              )}
            </motion.div>
          </div>
        </section>

        {/* Project Image */}
        {project.mainImage && (
          <section className="w-full bg-background py-12">
            <div className="max-w-[100rem] mx-auto px-6">
              <motion.div
                className="rounded-3xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Image 
                  src={project.mainImage} 
                  alt={project.projectName || 'Project image'}
                  className="w-full h-auto"
                  width={1600}
                />
              </motion.div>
            </div>
          </section>
        )}

        {/* Project Details */}
        <section className="w-full bg-background py-16">
          <div className="max-w-[100rem] mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="md:col-span-2">
                <h2 className="font-heading text-3xl text-primary mb-6">Proje Hakkında</h2>
                <div className="font-paragraph text-lg text-primary/80 whitespace-pre-line leading-relaxed">
                  {project.detailedDescription || project.shortDescription}
                </div>
              </div>

              {/* Sidebar */}
              <div className="md:col-span-1">
                <div className="bg-secondary rounded-3xl p-8 sticky top-28">
                  <h3 className="font-heading text-2xl text-primary mb-6">Proje Bilgileri</h3>
                  
                  {project.technologiesUsed && (
                    <div className="mb-6">
                      <h4 className="font-paragraph font-semibold text-primary mb-2">Kullanılan Teknolojiler</h4>
                      <p className="font-paragraph text-base text-primary/80">
                        {project.technologiesUsed}
                      </p>
                    </div>
                  )}
                  
                  {project.completionDate && (
                    <div className="mb-6">
                      <h4 className="font-paragraph font-semibold text-primary mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Tamamlanma Tarihi
                      </h4>
                      <p className="font-paragraph text-base text-primary/80">
                        {new Date(project.completionDate).toLocaleDateString('tr-TR', { 
                          year: 'numeric', 
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  )}
                  
                  {project.isFeatured && (
                    <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg inline-block">
                      <p className="font-paragraph text-sm font-semibold">⭐ Öne Çıkan Proje</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full bg-secondary py-16">
          <div className="max-w-[100rem] mx-auto px-6 text-center">
            <h2 className="font-heading text-4xl text-primary mb-6">
              Benzer Bir Proje mi İstiyorsunuz?
            </h2>
            <p className="font-paragraph text-lg text-primary/80 mb-8 max-w-2xl mx-auto">
              Sizin için de özel çözümler geliştirebilirim. Hemen iletişime geçin.
            </p>
            <Link 
              to="/contact"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-paragraph font-semibold text-lg inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              İletişime Geç
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}