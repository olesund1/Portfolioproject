import React, { useEffect, useState } from 'react';
import { LogOut, Plus } from 'lucide-react';
import { isAdminAuthenticated, clearAdminSession } from '@/app/utils/adminAuth';
import {
  initCMSStore,
  getCMSStore,
  getAllCMSOrdered,
} from '@/app/utils/cmsStorage';
import { CaseStudyList } from '@/app/components/admin/CaseStudyList';
import { CaseStudyForm } from '@/app/components/admin/CaseStudyForm';
import type { CaseStudyData } from '@/data/caseStudyTypes';
import type { CaseStudyMetadata } from '@/data/caseStudies/metadata';

interface Props {
  onNavigate: (page: string, id?: string) => void;
}

export function AdminPage({ onNavigate }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Auth guard
  useEffect(() => {
    if (!isAdminAuthenticated()) {
      onNavigate('home');
    }
  }, [onNavigate]);

  // Seed CMS store from static files on first open
  useEffect(() => {
    initCMSStore();
    setRefreshKey((k) => k + 1);
  }, []);

  const handleLogOut = () => {
    clearAdminSession();
    onNavigate('home');
  };

  const handleSave = () => {
    setEditingId(null);
    setIsCreating(false);
    setRefreshKey((k) => k + 1);
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
  };

  // Load data for the currently edited case study
  const getEditData = (): { data: CaseStudyData; meta: CaseStudyMetadata } | null => {
    if (!editingId) return null;
    const store = getCMSStore();
    if (!store?.data[editingId] || !store?.metadata[editingId]) return null;
    return { data: store.data[editingId], meta: store.metadata[editingId] };
  };

  const existingIds = getAllCMSOrdered().map((item) => item.data.id);
  const editEntry = getEditData();
  const showForm = isCreating || editingId !== null;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 pt-24 md:pt-28 pb-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">CMS Admin</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage case studies — changes live-update via localStorage
            </p>
          </div>
          <div className="flex items-center gap-3">
            {!showForm && (
              <button
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity font-medium"
              >
                <Plus size={15} />
                New Case Study
              </button>
            )}
            <button
              onClick={handleLogOut}
              className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-muted-foreground"
            >
              <LogOut size={15} />
              Log Out
            </button>
          </div>
        </div>

        {/* Content: list or form */}
        {showForm ? (
          <div>
            <h2 className="text-lg font-medium mb-4">
              {isCreating ? 'New Case Study' : `Editing: ${editEntry?.data.title ?? editingId}`}
            </h2>
            <CaseStudyForm
              editingId={editingId}
              initialData={editEntry?.data}
              initialMeta={editEntry?.meta}
              existingIds={existingIds}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
        ) : (
          <CaseStudyList
            onEdit={(id) => setEditingId(id)}
            refreshKey={refreshKey}
          />
        )}
      </div>
    </div>
  );
}
