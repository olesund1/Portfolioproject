import React, { useEffect, useState } from 'react';
import { ChevronUp, ChevronDown, Pencil, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/app/components/ui/alert-dialog';
import {
  getAllCMSOrdered,
  deleteCaseStudy,
  reorderCaseStudies,
} from '@/app/utils/cmsStorage';
import type { CaseStudyData } from '@/data/caseStudyTypes';
import type { CaseStudyMetadata } from '@/data/caseStudies/metadata';

interface Props {
  onEdit: (id: string) => void;
  refreshKey: number;
}

export function CaseStudyList({ onEdit, refreshKey }: Props) {
  const [items, setItems] = useState<{ data: CaseStudyData; meta: CaseStudyMetadata }[]>([]);

  useEffect(() => {
    setItems(getAllCMSOrdered());
  }, [refreshKey]);

  const handleDelete = (id: string) => {
    deleteCaseStudy(id);
    setItems(getAllCMSOrdered());
  };

  const move = (index: number, direction: -1 | 1) => {
    const newItems = [...items];
    const target = index + direction;
    if (target < 0 || target >= newItems.length) return;
    [newItems[index], newItems[target]] = [newItems[target], newItems[index]];
    setItems(newItems);
    reorderCaseStudies(newItems.map((i) => i.data.id));
  };

  if (items.length === 0) {
    return (
      <p className="text-muted-foreground text-sm py-8 text-center">
        No case studies yet. Click "New Case Study" to add one.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {items.map(({ data, meta }, index) => (
        <div
          key={data.id}
          className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card"
        >
          {/* Thumbnail */}
          {(data.heroImage || meta.imageUrl) && (
            <img
              src={data.heroImage || meta.imageUrl}
              alt={data.title}
              className="w-16 h-16 object-cover rounded-md flex-shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}

          {/* Title + meta */}
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{data.title}</p>
            <p className="text-xs text-muted-foreground">{meta.year}</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {data.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => move(index, -1)}
              disabled={index === 0}
              className="p-1.5 rounded hover:bg-muted disabled:opacity-30"
              aria-label="Move up"
            >
              <ChevronUp size={16} />
            </button>
            <button
              onClick={() => move(index, 1)}
              disabled={index === items.length - 1}
              className="p-1.5 rounded hover:bg-muted disabled:opacity-30"
              aria-label="Move down"
            >
              <ChevronDown size={16} />
            </button>
            <button
              onClick={() => onEdit(data.id)}
              className="p-1.5 rounded hover:bg-muted text-foreground"
              aria-label="Edit"
            >
              <Pencil size={16} />
            </button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  className="p-1.5 rounded hover:bg-destructive/10 text-destructive"
                  aria-label="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete case study?</AlertDialogTitle>
                  <AlertDialogDescription>
                    "{data.title}" will be removed from the CMS. This does not delete the source
                    JSON file. You can re-seed from source by clearing the CMS store.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(data.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ))}
    </div>
  );
}
