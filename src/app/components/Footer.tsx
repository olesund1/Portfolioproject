import React from 'react';
import { Linkedin, Mail, Github } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto px-6 md:px-8 lg:px-12 max-w-7xl py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Left side */}
          <div>
            <h3 className="text-2xl font-semibold mb-2">Let's work together</h3>
            <p className="text-muted-foreground max-w-md">
              I'm always open to discussing product design work or partnership opportunities.
            </p>
          </div>

          {/* Right side - Social links */}
          <div className="flex gap-4">
            <a
              href="mailto:hello@example.com"
              className="p-3 rounded-lg border border-border hover:border-accent hover:text-accent transition-all"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg border border-border hover:border-accent hover:text-accent transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg border border-border hover:border-accent hover:text-accent transition-all"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Your Name. All rights reserved.</p>
          <p>Designed & developed with care</p>
        </div>
      </div>
    </footer>
  );
}
