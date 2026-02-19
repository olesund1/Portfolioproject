import React from 'react';
import { Linkedin, Mail, Github } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#e5e5e5] bg-[#fafafa]">
      <div className="mx-auto px-6 md:px-8 lg:px-12 max-w-7xl pt-16 md:pt-16 pb-12 md:pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Left side */}
          <div>
            <h3 className="text-2xl font-semibold mb-2 text-foreground">Let's work together</h3>
            <p className="text-muted-foreground max-w-md text-base">
              I'm always open to discussing product design work or partnership opportunities.
            </p>
          </div>

          {/* Right side - Social links */}
          <div className="flex gap-4">
            <a
              href="mailto:johan.olesund@netlight.com"
              className="p-3 rounded-lg border border-border hover:border-accent hover:text-accent transition-all"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/johanolesund/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg border border-border hover:border-accent hover:text-accent transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/olesund1"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg border border-border hover:border-accent hover:text-accent transition-all"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#e5e5e5] my-8 md:my-12"></div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Johan Olesund. All rights reserved.</p>
          <p>Designed & developed with AI</p>
        </div>
      </div>
    </footer>
  );
}
