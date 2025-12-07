import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BaseCrudService } from '../services/api';
import { Projects } from '../types';
import { Image } from '../components/ui/Image';

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Projects[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const { items } = await BaseCrudService.getAll<Projects>('projects');
        setProjects(items);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pb-16">
        {/* Page Header */}
        <section className="w-full bg-gradient-to-br from-secondary to-background pt-36 py-20">
          <div className="max-w-[100rem] mx-auto px-6 text-center">
            <motion.h1
              className="font-heading text-5xl md:text-6xl text-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Projelerim
            </motion.h1>
            <motion.p
              className="font-paragraph text-xl text-primary/80 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Farklı teknolojiler ve yaklaşımlar kullanarak geliştirdiğim projelerin koleksiyonu
            </motion.p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="w-full bg-background py-16">
          <div className="max-w-[100rem] mx-auto px-6">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin inline-block w-8 h-8 border-2 border-primary border-r-transparent rounded-full"></div>
                <p className="font-paragraph text-lg text-primary/60 mt-4">Projeler yükleniyor...</p>
              </div>
            ) : projects.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    className="bg-secondary rounded-3xl overflow-hidden hover:shadow-xl transition-shadow border border-primary/5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {project.mainImage && (
                      <Link to={`/portfolio/${project._id}`}>
                        <div className="aspect-video overflow-hidden">
                          <Image
                            src={project.mainImage}
                            alt={project.projectName || 'Project image'}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            width={800}
                          />
                        </div>
                      </Link>
                    )}

                    <div className="p-8">
                      <Link to={`/portfolio/${project._id}`}>
                        <h2 className="font-heading text-3xl text-primary mb-4 hover:opacity-80 transition-opacity">
                          {project.projectName}
                        </h2>
                      </Link>

                      <p className="font-paragraph text-base text-primary/80 mb-6">
                        {project.shortDescription}
                      </p>

                      {project.technologiesUsed && (
                        <div className="mb-6">
                          <p className="font-paragraph text-sm text-primary/60">
                            <span className="font-semibold">Teknolojiler:</span> {project.technologiesUsed}
                          </p>
                        </div>
                      )}

                      {project.completionDate && (
                        <p className="font-paragraph text-sm text-primary/60 mb-6">
                          <span className="font-semibold">Tamamlanma:</span>{' '}
                          {new Date(project.completionDate).toLocaleDateString('tr-TR', {
                            year: 'numeric',
                            month: 'long'
                          })}
                        </p>
                      )}

                      <div className="flex gap-4">
                        <Link
                          to={`/portfolio/${project._id}`}
                          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-paragraph font-semibold inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
                        >
                          Detayları Gör
                        </Link>

                        {project.projectUrl && (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-background text-primary px-6 py-3 rounded-lg font-paragraph font-semibold inline-flex items-center gap-2 hover:opacity-80 transition-opacity border border-primary/10"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Canlı Demo
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-background text-primary px-6 py-3 rounded-lg font-paragraph font-semibold inline-flex items-center gap-2 hover:opacity-80 transition-opacity border border-primary/10"
                          >
                            <Github className="w-4 h-4" />
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-lg text-primary/60">Henüz proje bulunmuyor.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}