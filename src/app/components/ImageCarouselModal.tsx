import React, { useEffect, useCallback, useRef } from 'react';
import { X } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
} from './ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from './ui/utils';

interface ImageCarouselModalProps {
  images: string[];
  initialIndex?: number;
  caption?: string;
  alt?: string;
  imageLabels?: string[];
  open: boolean;
  onClose: () => void;
}

// Tween constants derived from the Figma design values
const TWEEN_MAX_BLUR    = 3;    // px at ±2 positions
const TWEEN_MAX_OVERLAY = 0.5;  // alpha at ±2 positions
const TWEEN_MIN_SCALE   = 0.60; // scale at ±2 positions

export function ImageCarouselModal({
  images,
  initialIndex = 0,
  caption,
  alt = 'Image',
  imageLabels,
  open,
  onClose,
}: ImageCarouselModalProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(initialIndex);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: initialIndex,
    align: 'center',
    containScroll: false, // allows side slides to peek in
  });

  // Refs to slide wrappers and their overlay divs — mutations bypass React reconciler
  const slideRefs   = useRef<HTMLElement[]>([]);
  const overlayRefs = useRef<HTMLElement[]>([]);

  // Compute and apply tween values for all slides based on current scroll position
  const applyTweens = useCallback(() => {
    if (!emblaApi) return;

    const scrollProgress = emblaApi.scrollProgress();
    const snapList       = emblaApi.scrollSnapList();
    const count          = snapList.length;

    snapList.forEach((snapPos, i) => {
      const slideEl   = slideRefs.current[i];
      const overlayEl = overlayRefs.current[i];
      if (!slideEl || !overlayEl) return;

      // Continuous distance from center: 0 = active, 1 = ±1, 2 = ±2
      const diff    = Math.abs(snapPos - scrollProgress) * (count - 1);
      const clamped = Math.min(diff, 2);

      const scale   = 1 - (clamped / 2) * (1 - TWEEN_MIN_SCALE);
      const blur    = (clamped / 2) * TWEEN_MAX_BLUR;
      const overlay = (clamped / 2) * TWEEN_MAX_OVERLAY;

      slideEl.style.transform = `scale(${scale})`;
      slideEl.style.filter    = blur > 0.01 ? `blur(${blur}px)` : '';
      overlayEl.style.opacity = String(overlay);
    });
  }, [emblaApi]);

  // Wire up Embla event listeners
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    emblaApi.on('select', onSelect);
    emblaApi.on('scroll', applyTweens);
    emblaApi.on('reInit', applyTweens);

    // Run once on mount to set initial state
    applyTweens();

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('scroll', applyTweens);
      emblaApi.off('reInit', applyTweens);
    };
  }, [emblaApi, applyTweens]);

  // Re-init carousel when modal opens to the correct starting index
  useEffect(() => {
    if (!open || !emblaApi) return;
    setSelectedIndex(initialIndex);
    emblaApi.reInit({ startIndex: initialIndex });
    // Apply tweens after reInit settles on the next tick
    requestAnimationFrame(applyTweens);
  }, [open, initialIndex, emblaApi, applyTweens]);

  // Keyboard navigation
  useEffect(() => {
    if (!open || !emblaApi) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  emblaApi.scrollPrev();
      if (e.key === 'ArrowRight') emblaApi.scrollNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, emblaApi]);

  // Horizontal trackpad scroll → next/prev slide
  useEffect(() => {
    if (!open || !emblaApi) return;
    const viewport = emblaApi.rootNode();
    if (!viewport) return;

    let accX = 0;
    let scrollLocked = false;
    const THRESHOLD = 50;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; // not horizontal
      e.preventDefault();
      if (scrollLocked) { accX = 0; return; }
      accX += e.deltaX;
      if (accX > THRESHOLD) {
        emblaApi.scrollNext();
        accX = 0;
        scrollLocked = true;
        setTimeout(() => { scrollLocked = false; }, 600);
      }
      if (accX < -THRESHOLD) {
        emblaApi.scrollPrev();
        accX = 0;
        scrollLocked = true;
        setTimeout(() => { scrollLocked = false; }, 600);
      }
    };

    viewport.addEventListener('wheel', onWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', onWheel);
  }, [open, emblaApi]);

  if (images.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogPortal>
        {/* Dark backdrop */}
        <DialogOverlay className="bg-black/85" />

        {/* Full-screen content panel */}
        <DialogPrimitive.Content
          onClick={onClose}
          className={cn(
            'fixed inset-0 z-50 flex flex-col items-center justify-center',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'duration-200 outline-none'
          )}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Caption */}
          {caption && (
            <p onClick={e => e.stopPropagation()} className="mb-4 text-sm text-white/60 tracking-wide">{caption}</p>
          )}

          {/* Embla carousel viewport */}
          <div
            ref={emblaRef}
            onClick={e => e.stopPropagation()}
            className="w-full overflow-hidden"
          >
            {/* Embla inner scroll container */}
            <div className="flex items-center gap-4">
              {images.map((src, i) => (
                <div
                  key={i}
                  className="relative flex-shrink-0"
                  ref={el => { if (el) slideRefs.current[i] = el; }}
                  style={{ willChange: 'transform, filter' }}
                >
                  <img
                    src={src}
                    alt={`${alt} ${i + 1}`}
                    className="block rounded-[2rem]"
                    style={{ maxHeight: '88vh', maxWidth: '88vw', width: 'auto', height: 'auto' }}
                  />
                  {/* Image text overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                    <span className="bg-black text-white text-sm px-3 py-1 rounded-full">
                      {imageLabels?.[i] ?? 'Image description'}
                    </span>
                    <span className="bg-black text-white text-sm px-3 py-1 rounded-full">
                      {i + 1} / {images.length}
                    </span>
                  </div>
                  {/* Overlay div — opacity driven by tween, not React state */}
                  <div
                    ref={el => { if (el) overlayRefs.current[i] = el; }}
                    className="absolute inset-0 rounded-[2rem] bg-black pointer-events-none"
                    style={{ opacity: 0 }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div onClick={e => e.stopPropagation()} className="mt-6 flex gap-2 items-center">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Go to image ${i + 1}`}
                className={cn(
                  'rounded-full transition-all duration-300',
                  i === selectedIndex
                    ? 'bg-white w-5 h-2'
                    : 'bg-white/40 w-2 h-2 hover:bg-white/60'
                )}
              />
            ))}
          </div>

          {/* Visually hidden title for accessibility */}
          <DialogPrimitive.Title className="sr-only">
            Image viewer
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Browse images with left and right arrow keys or swipe.
          </DialogPrimitive.Description>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
