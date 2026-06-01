import React from 'react';
import { motion } from 'motion/react';
import { Tag } from './Tag';

interface CaseStudyCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  year: string;
  onClick: () => void;
  index: number;
  ongoing?: boolean;
  isBrutalist?: boolean; // retained for API compatibility; unused visually
}

export function CaseStudyCard({
  title,
  description,
  tags,
  imageUrl,
  year,
  onClick,
  index,
  ongoing,
}: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={ongoing ? undefined : onClick}
      className={ongoing ? 'cursor-not-allowed' : 'group cursor-pointer'}
    >
      <div className={`overflow-hidden rounded-xl bg-card border border-border transition-colors duration-200${!ongoing ? ' hover:border-foreground' : ''}`}>
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={title}
            className={`w-full h-full object-cover${ongoing ? ' blur-sm' : ''}`}
          />
          {ongoing ? (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white text-sm font-semibold tracking-widest uppercase">
                Ongoing project
              </span>
            </div>
          ) : null}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-muted-foreground font-medium">{year}</p>
          </div>

          <h3 className="text-2xl font-semibold mb-3">
            {title}
          </h3>

          <div className={ongoing ? 'blur-sm select-none pointer-events-none' : ''}>
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {description}
            </p>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
