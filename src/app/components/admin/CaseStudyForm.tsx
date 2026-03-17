import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2, Download, Upload } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/components/ui/tabs';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { saveCaseStudy, exportCaseStudyJSON, importFromStaticJSON, getStaticIds } from '@/app/utils/cmsStorage';
import type { CaseStudyData } from '@/data/caseStudyTypes';
import type { CaseStudyMetadata } from '@/data/caseStudies/metadata';

// ─── Form value types ────────────────────────────────────────────────────────

interface ImageField { src: string; alt: string }
interface StepField { title: string; description: string }
interface InsightField { value: string }
interface KpiField { label: string; value: string }

interface CaseStudyFormValues {
  // Basic Info
  id: string;
  title: string;
  subtitle: string;
  year: string;
  heroImage: string;
  challenge: string;
  tags: string; // comma-separated

  // Design Process
  processIntro: string;
  steps: StepField[];
  insights: InsightField[];
  processImages: ImageField[];

  // Deliverables
  deliverablesIntro: string;
  deliverablesImages: ImageField[];

  // Results
  resultsIntro: string;
  kpis: KpiField[];

  // Metadata (for homepage card)
  description: string;
  keywords: string; // comma-separated
  shortDescription: string;
}

// ─── Data mappers ─────────────────────────────────────────────────────────────

function mapToFormValues(data: CaseStudyData, meta: CaseStudyMetadata): CaseStudyFormValues {
  return {
    id: data.id,
    title: data.title,
    subtitle: data.subtitle,
    year: meta.year,
    heroImage: data.heroImage,
    challenge: data.challenge,
    tags: data.tags.join(', '),

    processIntro: data.designProcess.intro,
    steps: data.designProcess.steps,
    insights: data.designProcess.insights.map((v) => ({ value: v })),
    processImages: data.designProcess.images ?? [],

    deliverablesIntro: data.deliverables.intro,
    deliverablesImages: data.deliverables.images,

    resultsIntro: data.results.intro,
    kpis: data.results.kpis,

    description: meta.description,
    keywords: meta.keywords.join(', '),
    shortDescription: meta.shortDescription,
  };
}

function mapFromFormValues(values: CaseStudyFormValues): {
  data: CaseStudyData;
  meta: CaseStudyMetadata;
} {
  const tags = values.tags
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const keywords = values.keywords
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean);

  const processImages = values.processImages.filter((img) => img.src.trim());

  const data: CaseStudyData = {
    id: values.id.trim(),
    title: values.title,
    subtitle: values.subtitle,
    tags,
    heroImage: values.heroImage,
    challenge: values.challenge,
    designProcess: {
      intro: values.processIntro,
      steps: values.steps.filter((s) => s.title.trim()),
      insights: values.insights.map((i) => i.value).filter(Boolean),
      images: processImages.length > 0 ? processImages : undefined,
    },
    deliverables: {
      intro: values.deliverablesIntro,
      images: values.deliverablesImages.filter((img) => img.src.trim()),
    },
    results: {
      intro: values.resultsIntro,
      kpis: values.kpis.filter((k) => k.label.trim()),
    },
  };

  const meta: CaseStudyMetadata = {
    id: values.id.trim(),
    title: values.title,
    description: values.description,
    tags,
    imageUrl: values.heroImage,
    year: values.year,
    keywords,
    shortDescription: values.shortDescription,
  };

  return { data, meta };
}

// ─── Default empty form ───────────────────────────────────────────────────────

const emptyDefaults: CaseStudyFormValues = {
  id: '',
  title: '',
  subtitle: '',
  year: new Date().getFullYear().toString(),
  heroImage: '',
  challenge: '',
  tags: '',
  processIntro: '',
  steps: [{ title: '', description: '' }],
  insights: [{ value: '' }],
  processImages: [],
  deliverablesIntro: '',
  deliverablesImages: [{ src: '', alt: '' }],
  resultsIntro: '',
  kpis: [{ label: '', value: '' }],
  description: '',
  keywords: '',
  shortDescription: '',
};

// ─── Sub-components for repeated patterns ────────────────────────────────────

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-destructive text-xs mt-1">{message}</p>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{children}</Label>;
}

function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mt-2"
    >
      <Plus size={14} /> {label}
    </button>
  );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-1 text-muted-foreground hover:text-destructive transition-colors"
      aria-label="Remove"
    >
      <Trash2 size={14} />
    </button>
  );
}

// ─── Main Form Component ──────────────────────────────────────────────────────

interface Props {
  editingId: string | null;
  initialData?: CaseStudyData;
  initialMeta?: CaseStudyMetadata;
  existingIds: string[];
  onSave: () => void;
  onCancel: () => void;
}

export function CaseStudyForm({
  editingId,
  initialData,
  initialMeta,
  existingIds,
  onSave,
  onCancel,
}: Props) {
  const isEditing = editingId !== null;

  const defaultValues =
    initialData && initialMeta
      ? mapToFormValues(initialData, initialMeta)
      : emptyDefaults;

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CaseStudyFormValues>({ defaultValues });

  const steps = useFieldArray({ control, name: 'steps' });
  const insights = useFieldArray({ control, name: 'insights' });
  const processImages = useFieldArray({ control, name: 'processImages' });
  const deliverablesImages = useFieldArray({ control, name: 'deliverablesImages' });
  const kpis = useFieldArray({ control, name: 'kpis' });

  const onSubmit = (values: CaseStudyFormValues) => {
    const { data, meta } = mapFromFormValues(values);
    saveCaseStudy(data, meta);
    exportCaseStudyJSON(data.id);
    onSave();
  };

  const handleExport = () => {
    if (editingId) exportCaseStudyJSON(editingId);
  };

  const staticIds = getStaticIds();
  const canImportJSON = editingId !== null && staticIds.includes(editingId);

  const handleImportJSON = () => {
    if (!editingId) return;
    const imported = importFromStaticJSON(editingId);
    if (imported) reset(mapToFormValues(imported.data, imported.meta));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-0">
      <Tabs defaultValue="basic" className="flex-1">
        <TabsList className="w-full mb-6 flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="process">Design Process</TabsTrigger>
          <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
        </TabsList>

        {/* ── Basic Info ── */}
        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <SectionLabel>ID (slug)</SectionLabel>
              <Input
                {...register('id', {
                  required: 'ID is required',
                  validate: (v) =>
                    isEditing ||
                    !existingIds.includes(v.trim()) ||
                    'ID already exists',
                })}
                placeholder="e.g. my-project"
                disabled={isEditing}
                className="mt-1"
              />
              <FieldError message={errors.id?.message} />
            </div>
            <div>
              <SectionLabel>Year</SectionLabel>
              <Input {...register('year', { required: true })} placeholder="2024" className="mt-1" />
            </div>
          </div>

          <div>
            <SectionLabel>Title</SectionLabel>
            <Input {...register('title', { required: true })} placeholder="Case Study Title" className="mt-1" />
          </div>

          <div>
            <SectionLabel>Subtitle</SectionLabel>
            <Input {...register('subtitle')} placeholder="Short descriptive subtitle" className="mt-1" />
          </div>

          <div>
            <SectionLabel>Hero Image URL</SectionLabel>
            <Input {...register('heroImage')} placeholder="https://..." className="mt-1" />
          </div>

          <div>
            <SectionLabel>Tags (comma-separated)</SectionLabel>
            <Input {...register('tags')} placeholder="Strategy, UX Research, Service Design" className="mt-1" />
          </div>

          <div>
            <SectionLabel>Challenge</SectionLabel>
            <Textarea
              {...register('challenge')}
              rows={5}
              placeholder="Describe the core challenge..."
              className="mt-1"
            />
          </div>
        </TabsContent>

        {/* ── Design Process ── */}
        <TabsContent value="process" className="space-y-6">
          <div>
            <SectionLabel>Introduction</SectionLabel>
            <Textarea {...register('processIntro')} rows={3} className="mt-1" />
          </div>

          {/* Steps */}
          <div>
            <SectionLabel>Process Steps</SectionLabel>
            <div className="space-y-3 mt-2">
              {steps.fields.map((field, i) => (
                <div key={field.id} className="p-3 border border-border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Step {i + 1}</span>
                    {steps.fields.length > 1 && (
                      <RemoveButton onClick={() => steps.remove(i)} />
                    )}
                  </div>
                  <Input
                    {...register(`steps.${i}.title`)}
                    placeholder="Step title"
                  />
                  <Textarea
                    {...register(`steps.${i}.description`)}
                    rows={2}
                    placeholder="Step description"
                  />
                </div>
              ))}
            </div>
            <AddButton onClick={() => steps.append({ title: '', description: '' })} label="Add Step" />
          </div>

          {/* Insights */}
          <div>
            <SectionLabel>Key Insights</SectionLabel>
            <div className="space-y-2 mt-2">
              {insights.fields.map((field, i) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <Input
                    {...register(`insights.${i}.value`)}
                    placeholder="Insight text"
                    className="flex-1"
                  />
                  {insights.fields.length > 1 && (
                    <RemoveButton onClick={() => insights.remove(i)} />
                  )}
                </div>
              ))}
            </div>
            <AddButton onClick={() => insights.append({ value: '' })} label="Add Insight" />
          </div>

          {/* Process Images */}
          <div>
            <SectionLabel>Process Images (optional)</SectionLabel>
            <div className="space-y-2 mt-2">
              {processImages.fields.map((field, i) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <Input
                    {...register(`processImages.${i}.src`)}
                    placeholder="Image URL"
                    className="flex-1"
                  />
                  <Input
                    {...register(`processImages.${i}.alt`)}
                    placeholder="Alt text"
                    className="w-40"
                  />
                  <RemoveButton onClick={() => processImages.remove(i)} />
                </div>
              ))}
            </div>
            <AddButton
              onClick={() => processImages.append({ src: '', alt: '' })}
              label="Add Process Image"
            />
          </div>
        </TabsContent>

        {/* ── Deliverables ── */}
        <TabsContent value="deliverables" className="space-y-4">
          <div>
            <SectionLabel>Introduction</SectionLabel>
            <Textarea {...register('deliverablesIntro')} rows={4} className="mt-1" />
          </div>

          <div>
            <SectionLabel>Deliverable Images</SectionLabel>
            <div className="space-y-2 mt-2">
              {deliverablesImages.fields.map((field, i) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <Input
                    {...register(`deliverablesImages.${i}.src`)}
                    placeholder="Image URL"
                    className="flex-1"
                  />
                  <Input
                    {...register(`deliverablesImages.${i}.alt`)}
                    placeholder="Alt text"
                    className="w-40"
                  />
                  {deliverablesImages.fields.length > 1 && (
                    <RemoveButton onClick={() => deliverablesImages.remove(i)} />
                  )}
                </div>
              ))}
            </div>
            <AddButton
              onClick={() => deliverablesImages.append({ src: '', alt: '' })}
              label="Add Image"
            />
          </div>
        </TabsContent>

        {/* ── Results ── */}
        <TabsContent value="results" className="space-y-4">
          <div>
            <SectionLabel>Introduction</SectionLabel>
            <Textarea {...register('resultsIntro')} rows={4} className="mt-1" />
          </div>

          <div>
            <SectionLabel>KPIs</SectionLabel>
            <div className="space-y-2 mt-2">
              {kpis.fields.map((field, i) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <Input
                    {...register(`kpis.${i}.label`)}
                    placeholder="Label (e.g. Efficiency gain)"
                    className="flex-1"
                  />
                  <Input
                    {...register(`kpis.${i}.value`)}
                    placeholder="Value (e.g. 60%)"
                    className="w-32"
                  />
                  {kpis.fields.length > 1 && (
                    <RemoveButton onClick={() => kpis.remove(i)} />
                  )}
                </div>
              ))}
            </div>
            <AddButton onClick={() => kpis.append({ label: '', value: '' })} label="Add KPI" />
          </div>
        </TabsContent>

        {/* ── Metadata ── */}
        <TabsContent value="metadata" className="space-y-4">
          <p className="text-xs text-muted-foreground">
            This data is used for the homepage card and chatbot knowledge.
          </p>
          <div>
            <SectionLabel>Card Description</SectionLabel>
            <Textarea
              {...register('description')}
              rows={3}
              placeholder="1–2 sentence description shown on the homepage card"
              className="mt-1"
            />
          </div>
          <div>
            <SectionLabel>Short Description</SectionLabel>
            <Input
              {...register('shortDescription')}
              placeholder="One-line summary for chatbot"
              className="mt-1"
            />
          </div>
          <div>
            <SectionLabel>Keywords (comma-separated)</SectionLabel>
            <Textarea
              {...register('keywords')}
              rows={3}
              placeholder="service design, customer journey, ux research..."
              className="mt-1"
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* ── Footer actions (always visible) ── */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
        >
          Cancel
        </button>
        <div className="flex gap-2">
          {canImportJSON && (
            <button
              type="button"
              onClick={handleImportJSON}
              className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <Upload size={14} />
              Import from JSON
            </button>
          )}
          {isEditing && (
            <button
              type="button"
              onClick={handleExport}
              className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <Download size={14} />
              Export JSON
            </button>
          )}
          <button
            type="submit"
            className="text-sm px-4 py-2 rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
