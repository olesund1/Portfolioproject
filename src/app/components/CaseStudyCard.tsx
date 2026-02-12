import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Tag } from './Tag';

interface CaseStudyCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  year: string;
  onClick: () => void;
  index: number;
}

export function CaseStudyCard({
  title,
  description,
  tags,
  imageUrl,
  year,
  onClick,
  index,
}: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="overflow-hidden rounded-2xl bg-card border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-xl">
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <motion.img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-muted-foreground font-medium">{year}</p>
            <ArrowRight 
              size={20} 
              className="text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" 
            />
          </div>

          <h3 className="text-2xl font-semibold mb-3 group-hover:text-accent transition-colors">
            {title}
          </h3>

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
    </motion.div>
  );
}
