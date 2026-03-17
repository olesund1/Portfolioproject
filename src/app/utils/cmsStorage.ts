/**
 * CMS Storage utility — reads/writes case study data to localStorage.
 * Imports raw JSON directly (never from index.ts) to avoid circular deps.
 */

import type { CaseStudyData } from '@/data/caseStudyTypes';
import type { CaseStudyMetadata } from '@/data/caseStudies/metadata';
import { caseStudyMetadata } from '@/data/caseStudies/metadata';

// Raw JSON imports (direct, not via index.ts)
import b2pRedesign from '@/data/caseStudies/b2p-redesign.json';
import customerCentricity from '@/data/caseStudies/customer-centricity.json';
import nordicChoiceHotels from '@/data/caseStudies/nordic-choice-hotels.json';

const STORAGE_KEY = 'cms_case_studies';

export interface CMSStore {
  data: Record<string, CaseStudyData>;
  metadata: Record<string, CaseStudyMetadata>;
  order: string[];
}

const staticDataMap: Record<string, CaseStudyData> = {
  'b2p-redesign': b2pRedesign as CaseStudyData,
  'customer-centricity': customerCentricity as CaseStudyData,
  'nordic-choice-hotels': nordicChoiceHotels as CaseStudyData,
};

export function getCMSStore(): CMSStore | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CMSStore;
  } catch {
    return null;
  }
}

export function setCMSStore(store: CMSStore): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

/** Seeds localStorage from static JSON files. On first run builds the full store;
 *  on subsequent runs backfills any `data` entries that are missing (stale-store fix). */
export function initCMSStore(): void {
  const existing = getCMSStore();

  if (existing === null) {
    // First-ever seed: build from scratch
    const data: Record<string, CaseStudyData> = {};
    const metadata: Record<string, CaseStudyMetadata> = {};
    for (const meta of caseStudyMetadata) {
      metadata[meta.id] = meta;
      if (staticDataMap[meta.id]) data[meta.id] = staticDataMap[meta.id];
    }
    setCMSStore({ data, metadata, order: caseStudyMetadata.map((m) => m.id) });
  } else {
    // Backfill missing data entries (e.g. stale localStorage from earlier session)
    let changed = false;
    for (const id of Object.keys(staticDataMap)) {
      if (!existing.data[id] && staticDataMap[id]) {
        existing.data[id] = staticDataMap[id];
        changed = true;
      }
    }
    if (changed) setCMSStore(existing);
  }
}

/** Returns the static JSON + metadata for a given ID, or null if not bundled. */
export function importFromStaticJSON(
  id: string
): { data: CaseStudyData; meta: CaseStudyMetadata } | null {
  const data = staticDataMap[id];
  const meta = caseStudyMetadata.find((m) => m.id === id);
  if (!data || !meta) return null;
  return { data, meta };
}

/** Returns IDs that have a bundled static JSON file. */
export function getStaticIds(): string[] {
  return Object.keys(staticDataMap);
}

/** Upserts a case study. Adds id to order[] if it's a new entry. */
export function saveCaseStudy(data: CaseStudyData, meta: CaseStudyMetadata): void {
  const store = getCMSStore() ?? { data: {}, metadata: {}, order: [] };
  const isNew = !store.order.includes(data.id);

  store.data[data.id] = data;
  store.metadata[data.id] = meta;

  if (isNew) {
    store.order.push(data.id);
  }

  setCMSStore(store);
}

export function deleteCaseStudy(id: string): void {
  const store = getCMSStore();
  if (!store) return;

  delete store.data[id];
  delete store.metadata[id];
  store.order = store.order.filter((oid) => oid !== id);

  setCMSStore(store);
}

export function reorderCaseStudies(newOrder: string[]): void {
  const store = getCMSStore();
  if (!store) return;
  store.order = newOrder;
  setCMSStore(store);
}

/** Returns all case studies in display order, combining data + metadata. */
export function getAllCMSOrdered(): { data: CaseStudyData; meta: CaseStudyMetadata }[] {
  const store = getCMSStore();
  if (!store) return [];

  return store.order
    .filter((id) => store.data[id] && store.metadata[id])
    .map((id) => ({ data: store.data[id], meta: store.metadata[id] }));
}

/** Downloads the full CaseStudyData as a .json file for syncing back to source. */
export function exportCaseStudyJSON(id: string): void {
  const store = getCMSStore();
  if (!store?.data[id]) return;

  const blob = new Blob([JSON.stringify(store.data[id], null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${id}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
