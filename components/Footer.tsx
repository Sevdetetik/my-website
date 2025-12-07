import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Server } from 'lucide-react';
import { BaseCrudService } from '../services/api';

export default function Footer() {
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [latency, setLatency] = useState<number | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      const start = Date.now();
      try {
        await BaseCrudService.getAll('projects'); // Simple ping via getting projects
        const end = Date.now();
        setLatency(end - start);
        setServerStatus('online');
      } catch (error) {
        setServerStatus('offline');
      }
    };

    checkStatus();
    // Check every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-primary text-primary-foreground py-12 border-t border-white/10">
      <div className="max-w-[100rem] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Social Links */}
          <div className="flex gap-6">
            <a
              href="https://github.com/Sevdetetik"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity p-2 bg-white/10 rounded-full hover:bg-white/20"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/sevde-tetik-442b93273/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity p-2 bg-white/10 rounded-full hover:bg-white/20"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:sevdettetik@gmail.com"
              className="hover:opacity-80 transition-opacity p-2 bg-white/10 rounded-full hover:bg-white/20"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* System Status Indicator - The "Engineer" Touch */}
          <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <Server className="w-4 h-4 text-white/60" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-white/60 uppercase tracking-wider">System Status:</span>
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${serverStatus === 'online' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' :
                  serverStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500 animate-pulse'
                  }`} />
                <span className={`text-xs font-mono ${serverStatus === 'online' ? 'text-green-400' :
                  serverStatus === 'offline' ? 'text-red-400' : 'text-yellow-400'
                  }`}>
                  {serverStatus === 'online' ? `Online (${latency}ms)` : serverStatus.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <p className="font-paragraph text-sm text-white/60">
            © {new Date().getFullYear()} Sevde Tetik.
          </p>
        </div>
      </div>
    </footer>
  );
}