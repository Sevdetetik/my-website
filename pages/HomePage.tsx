import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Database, Globe, ArrowUpRight, Layers, Terminal, Cpu } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BaseCrudService } from '../services/api';
import { Projects } from '../types';
import { Image } from '../components/ui/Image';

// --- Utility Components ---

type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          element.classList.add('is-visible');
        }, delay);
        observer.unobserve(element);
      }
    }, { threshold: 0.1 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out opacity-0 translate-y-12 motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0 ${className || ''}`}
    >
      {children}
    </div>
  );
};

// --- Code Window Component (The "Engineer" Touch) ---
const CodeWindow = () => {
  return (
    <div className="w-full max-w-lg mx-auto bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-gray-800 font-mono text-sm opacity-90 hover:opacity-100 transition-opacity duration-300">
      <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-gray-700">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-gray-400 text-xs">developer.tsx</span>
      </div>
      <div className="p-6 text-gray-300 overflow-hidden">
        <div className="flex">
          <span className="text-gray-500 mr-4 select-none">1</span>
          <span className="text-pink-400">const</span> <span className="text-blue-400 ml-2">Engineer</span> <span className="text-white">=</span> <span className="text-yellow-300">{"{"}</span>
        </div>
        <div className="flex">
          <span className="text-gray-500 mr-4 select-none">2</span>
          <span className="ml-4 text-blue-300">name:</span> <span className="text-green-400 ml-2">'Sevde Tetik'</span><span className="text-white">,</span>
        </div>
        <div className="flex">
          <span className="text-gray-500 mr-4 select-none">3</span>
          <span className="ml-4 text-blue-300">role:</span> <span className="text-green-400 ml-2">'Full Stack Developer'</span><span className="text-white">,</span>
        </div>
        <div className="flex">
          <span className="text-gray-500 mr-4 select-none">4</span>
          <span className="ml-4 text-blue-300">skills:</span> <span className="text-yellow-300">[</span>
        </div>
        <div className="flex">
          <span className="text-gray-500 mr-4 select-none">5</span>
          <span className="ml-8 text-green-400">'React'</span><span className="text-white">,</span> <span className="text-green-400">'Node.js'</span><span className="text-white">,</span> <span className="text-green-400">'TypeScript'</span>
        </div>
        <div className="flex">
          <span className="text-gray-500 mr-4 select-none">6</span>
          <span className="ml-4 text-yellow-300">]</span><span className="text-white">,</span>
        </div>
        <div className="flex">
          <span className="text-gray-500 mr-4 select-none">7</span>
          <span className="ml-4 text-purple-400">solveProblem:</span> <span className="text-blue-400">async</span> <span className="text-yellow-300">()</span> <span className="text-blue-400">=&gt;</span> <span className="text-yellow-300">{"{"}</span>
        </div>
        <div className="flex">
          <span className="text-gray-500 mr-4 select-none">8</span>
          <span className="ml-8 text-pink-400">return</span> <span className="text-green-400">await</span> <span className="text-blue-400">solution.deploy()</span><span className="text-white">;</span>
        </div>
        <div className="flex">
          <span className="text-gray-500 mr-4 select-none">9</span>
          <span className="ml-4 text-yellow-300">{"}"}</span>
        </div>
        <div className="flex">
          <span className="text-gray-500 mr-4 select-none">10</span>
          <span className="text-yellow-300">{"}"}</span><span className="text-white">;</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-green-500">➜</span>
          <span className="text-blue-400">~</span>
          <span className="animate-pulse bg-gray-400 w-2 h-4 block"></span>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState<Projects[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedProjects = async () => {
      try {
        const { items } = await BaseCrudService.getAll<Projects>('projects');
        const featured = items.filter(project => project.isFeatured).slice(0, 3);
        setFeaturedProjects(featured);
      } catch (error) {
        console.error('Error loading featured projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProjects();
  }, []);

  // Scroll Hooks
  const { scrollYProgress } = useScroll();
  const yBackground = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div className="min-h-screen bg-background text-primary font-paragraph overflow-clip selection:bg-primary selection:text-accentyellow">
      <Header />

      {/* --- HERO SECTION: REENGINEERED --- */}
      {/* 
          GÜNCELLEME BURADA YAPILDI: 
          'pt-24' yerine 'pt-32 md:pt-40 lg:pt-48' kullanıldı.
          Bu sayede yazı Header'ın altına girmez ama arka plan (noise.svg vb.) en yukarıda kalır.
      */}
      <section className="relative w-full min-h-screen flex items-center justify-center pt-32 md:pt-40 lg:pt-48 pb-12 px-6 md:px-12 lg:px-20 max-w-[120rem] mx-auto">

        {/* Abstract Tech Background */}
        <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
          <motion.div
            style={{ y: yBackground }}
            className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-accentcyan/5 rounded-full blur-[100px]"
          />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">

          {/* Left: Text Content */}
          <div className="flex flex-col justify-center text-left">
            <AnimatedElement delay={0}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary/70 text-sm font-medium mb-6 border border-primary/10 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Open to Work
              </div>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] text-primary mb-6">
                Sevde Tetik
              </h1>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <h2 className="font-heading text-3xl md:text-5xl lg:text-5xl font-bold tracking-tight text-primary/60 mb-8">
                Computer Engineer &<br />Full Stack Developer
              </h2>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-primary/80 max-w-xl mb-10">
                Tasarım odaklı düşünceyi mühendislik disipliniyle birleştiriyorum.
                Modern web teknolojileri ile ölçeklenebilir, performanslı ve kullanıcı dostu uygulamalar geliştiriyorum.
              </p>
            </AnimatedElement>

            <AnimatedElement delay={400}>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-heading font-semibold text-lg hover:opacity-90 transition-all flex items-center gap-2"
                >
                  İletişime Geç <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/portfolio"
                  className="bg-white border border-primary/20 text-primary px-8 py-4 rounded-xl font-heading font-semibold text-lg hover:bg-secondary transition-all"
                >
                  Projelerimi Gör
                </Link>
              </div>
            </AnimatedElement>
          </div>

          {/* Right: Code Window Visual */}
          <div className="hidden lg:block relative z-10 perspective-1000">
            <motion.div
              initial={{ opacity: 0, rotateY: -10, x: 20 }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative"
            >
              {/* Decorative Elements behind code block */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-accentyellow/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accentcyan/20 rounded-full blur-3xl"></div>

              <CodeWindow />

              {/* Floating Tech Badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 top-1/4 bg-white p-3 rounded-xl shadow-lg border border-gray-100"
              >
                <Database className="w-6 h-6 text-accentcyan" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-8 bottom-1/4 bg-white p-3 rounded-xl shadow-lg border border-gray-100"
              >
                <Cpu className="w-6 h-6 text-accentyellow" />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* --- SECTION 2: THE TOOLKIT (Sticky & Horizontal) --- */}
      <section className="w-full py-32 bg-secondary/30 relative overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Sticky Title */}
            <div className="lg:col-span-4 relative">
              <div className="sticky top-32">
                <AnimatedElement>
                  <span className="block font-heading text-sm tracking-widest uppercase text-primary/60 mb-4">Teknoloji Yığını</span>
                  <h2 className="font-heading text-5xl md:text-6xl font-bold text-primary mb-8 leading-tight">
                    Mühendislik<br />Araçlarım
                  </h2>
                  <p className="text-lg text-primary/70 mb-8 max-w-sm">
                    Sadece kod yazmıyor, sürdürülebilir sistemler inşa ediyorum.
                  </p>
                  <div className="h-1 w-24 bg-primary rounded-full"></div>
                </AnimatedElement>
              </div>
            </div>

            {/* Grid Content */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Globe, title: "Frontend Architecture", desc: "React, TypeScript ve Tailwind CSS ile performanslı, erişilebilir ve responsive arayüz mimarileri." },
                { icon: Database, title: "Backend Systems", desc: "Node.js, Express ve veritabanı optimizasyonları ile güvenilir REST API geliştirme." },
                { icon: Layers, title: "System Design", desc: "Monolitik veya mikroservis mimarileri, state yönetimi ve veri akış şemaları." },
                { icon: Terminal, title: "DevOps & Tools", desc: "Git versiyon kontrolü, Docker konteynerizasyon ve CI/CD süreçlerine hakimiyet." }
              ].map((item, idx) => (
                <AnimatedElement key={idx} delay={idx * 100}>
                  <div className="group p-8 bg-white/50 backdrop-blur-sm border border-white/60 rounded-3xl hover:bg-white hover:shadow-lg transition-all duration-500 h-full">
                    <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-primary mb-3">{item.title}</h3>
                    <p className="text-primary/70 leading-relaxed">{item.desc}</p>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: FEATURED PROJECTS (Data Driven) --- */}
      <section className="w-full py-32 bg-background relative">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20">

          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <AnimatedElement>
              <h2 className="font-heading text-5xl md:text-7xl font-bold text-primary">
                Seçilmiş<br />Projeler
              </h2>
            </AnimatedElement>
            <AnimatedElement delay={200}>
              <Link to="/portfolio" className="hidden md:flex items-center gap-2 text-lg font-medium border-b border-primary/30 pb-1 hover:border-primary transition-colors">
                Tümünü Gör <ArrowRight className="w-4 h-4" />
              </Link>
            </AnimatedElement>
          </div>

          <div className="space-y-32">
            {loading ? (
              <div className="w-full h-96 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : featuredProjects.length > 0 ? (
              featuredProjects.map((project, index) => (
                <div key={project._id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>

                  {/* Image Side */}
                  <div className="w-full lg:w-3/5 group">
                    <AnimatedElement className="w-full">
                      <Link to={`/portfolio/${project._id}`} className="block overflow-hidden rounded-[2.5rem] relative aspect-[16/10] border border-primary/5 shadow-2xl">
                        <div className="absolute inset-0 bg-primary/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        {project.mainImage ? (
                          <Image
                            src={project.mainImage}
                            alt={project.projectName || 'Project Preview'}
                            width={1200}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-secondary flex items-center justify-center">
                            <Code2 className="w-20 h-20 text-primary/20" />
                          </div>
                        )}

                        {/* Floating Action Button on Image */}
                        <div className="absolute bottom-8 right-8 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="bg-white text-primary p-4 rounded-full shadow-xl">
                            <ArrowUpRight className="w-6 h-6" />
                          </div>
                        </div>
                      </Link>
                    </AnimatedElement>
                  </div>

                  {/* Content Side */}
                  <div className="w-full lg:w-2/5">
                    <AnimatedElement delay={200}>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologiesUsed?.split(',').slice(0, 3).map((tech, i) => (
                          <span key={i} className="px-3 py-1 rounded bg-secondary text-xs font-mono font-medium text-primary/80 border border-primary/5">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
                        {project.projectName}
                      </h3>
                      <p className="text-lg text-primary/70 mb-8 leading-relaxed">
                        {project.shortDescription}
                      </p>
                      <Link
                        to={`/portfolio/${project._id}`}
                        className="inline-flex items-center gap-3 text-primary font-semibold text-lg group"
                      >
                        <span className="border-b-2 border-transparent group-hover:border-primary transition-all">Detayları İncele</span>
                      </Link>
                    </AnimatedElement>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-secondary/20 rounded-3xl">
                <p className="text-xl text-primary/60">Henüz öne çıkan proje eklenmedi.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- SECTION 5: CTA --- */}
      <section className="w-full py-40 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
          <span className="font-heading text-[20vw] font-bold text-primary">DEV</span>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <AnimatedElement>
            <h2 className="font-heading text-5xl md:text-7xl font-bold text-primary mb-8">
              Bir sonraki projenizi<br />birlikte kodlayalım.
            </h2>
            <p className="text-xl text-primary/70 mb-12 max-w-2xl mx-auto">
              Teknik vizyonunuzu gerçeğe dönüştürmek için hazırım.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/contact"
                className="bg-primary text-primary-foreground px-10 py-5 rounded-2xl font-heading font-semibold text-lg hover:scale-105 transition-transform shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-3"
              >
                Hemen İletişime Geç
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}