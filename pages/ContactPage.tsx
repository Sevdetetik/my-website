import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { useToast } from '../lib/utils';
import { BaseCrudService } from '../services/api';

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Use the API service to send data to the backend
      await BaseCrudService.post('contact', formData);

      toast({
        title: "Mesajınız Gönderildi!",
        description: "En kısa sürede size geri dönüş yapacağım.",
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Mesaj gönderilirken bir sorun oluştu.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        {/* Page Header */}
        <section className="w-full bg-gradient-to-br from-secondary to-background py-20">
          <div className="max-w-[100rem] mx-auto px-6 text-center">
            <motion.h1
              className="font-heading text-5xl md:text-6xl text-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              İletişime Geçin
            </motion.h1>
            <motion.p
              className="font-paragraph text-xl text-primary/80 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Projeleriniz veya sorularınız için benimle iletişime geçmekten çekinmeyin
            </motion.p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="w-full bg-background py-16">
          <div className="max-w-[100rem] mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-secondary rounded-3xl p-8 shadow-sm">
                  <h2 className="font-heading text-3xl text-primary mb-6">Mesaj Gönderin</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block font-paragraph font-semibold text-primary mb-2">
                        Adınız
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-background border-primary/20 text-primary rounded-lg"
                        placeholder="Adınızı girin"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block font-paragraph font-semibold text-primary mb-2">
                        E-posta
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-background border-primary/20 text-primary rounded-lg"
                        placeholder="example@gmail.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block font-paragraph font-semibold text-primary mb-2">
                        Konu
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full bg-background border-primary/20 text-primary rounded-lg"
                        placeholder="Mesajınızın konusu"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block font-paragraph font-semibold text-primary mb-2">
                        Mesajınız
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full bg-background border-primary/20 text-primary rounded-lg resize-none"
                        placeholder="Mesajınızı buraya yazın..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground hover:opacity-90 rounded-lg py-6 font-paragraph font-semibold text-lg"
                    >
                      {isSubmitting ? (
                        'Gönderiliyor...'
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Mesajı Gönder
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="font-heading text-3xl text-primary mb-6">İletişim Bilgileri</h2>
                  <p className="font-paragraph text-lg text-primary/80 mb-8">
                    Aşağıdaki kanallardan da benimle iletişime geçebilirsiniz.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="bg-secondary rounded-3xl p-6 flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-paragraph font-semibold text-primary mb-1">E-posta</h3>
                      <a
                        href="mailto:sevdettetik@gmail.com"
                        className="font-paragraph text-primary/80 hover:text-primary transition-colors"
                      >
                        sevdettetik@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="bg-secondary rounded-3xl p-6 flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-paragraph font-semibold text-primary mb-1">Telefon</h3>
                      <a
                        href="tel:+905370262016"
                        className="font-paragraph text-primary/80 hover:text-primary transition-colors"
                      >
                        +90 555 123 45 67
                      </a>
                    </div>
                  </div>

                  <div className="bg-secondary rounded-3xl p-6 flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-paragraph font-semibold text-primary mb-1">Konum</h3>
                      <p className="font-paragraph text-primary/80">
                        Sakarya, Türkiye
                      </p>
                    </div>
                  </div>
                </div>


              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}