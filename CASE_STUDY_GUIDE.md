# Case Study Guide

How to add a new case study to the portfolio.

---

## How to Add a New Case Study (3 steps)

### 1. Create the JSON file

Create `src/data/caseStudies/my-project.json` following the structure below.

### 2. Add a metadata entry

Open `src/data/caseStudies/metadata.ts` and add a `CaseStudyMetadata` object to the array:

```ts
{
  id: "my-project",          // must match the JSON filename (without .json)
  title: "Project Title",
  description: "One-sentence description shown on listing cards.",
  tags: ["Tag1", "Tag2"],
  year: "2024",
  imageUrl: "",              // leave empty — auto-derived from heroImage in JSON
}
```

### 3. Verify

Run `npm run dev` and navigate to the work page. The card will appear automatically via `getAllCaseStudies()` in `index.ts` — no changes needed there.

---

## JSON Data Structure

The full interface lives in `src/data/caseStudyTypes.ts`. Every field below is required unless marked optional.

```json
{
  "id": "my-project",
  "title": "Full Project Title",
  "subtitle": "One-line description of what you did and why it mattered",
  "tags": ["Category", "Method", "Tool"],
  "heroImage": "https://... or /images/project/hero.png",

  "challenge": "2–4 sentence description of the problem. Include the business context, the user pain, and what made this hard.",

  "designProcess": {
    "intro": "1–2 sentences framing your overall approach and role.",
    "steps": [
      {
        "title": "Phase name (e.g. Research & Discovery)",
        "description": "What you did in this phase and what you learned."
      },
      {
        "title": "Strategy & Planning",
        "description": "How you used insights to set direction."
      },
      {
        "title": "Design & Testing",
        "description": "How you iterated and validated."
      }
    ],
    "insights": [
      "Key finding or decision — one sentence, outcome-focused",
      "Another insight that shaped the design"
    ],
    "images": [
      { "src": "/images/project/research.png", "alt": "Describe what is shown" }
    ]
  },

  "deliverables": {
    "intro": "1–2 sentences describing the final output and its key qualities.",
    "images": [
      { "src": "/images/project/mockup.png", "alt": "Describe what is shown" },
      { "src": "/images/project/design-system.png", "alt": "Describe what is shown" }
    ]
  },

  "results": {
    "intro": "1–2 sentences summarising the impact.",
    "kpis": [
      { "label": "Metric name", "value": "Measured result" },
      { "label": "Another metric", "value": "Another result" }
    ]
  }
}
```

> **`designProcess.images`** is optional. All other fields are required.

---

## Field-by-Field Reference

| Field | Tips |
|---|---|
| `id` | Kebab-case, matches filename. Must also match the `id` in `metadata.ts`. |
| `subtitle` | Use active voice: *"Redesigning X to achieve Y"*, not *"A project about X"*. |
| `tags` | 3–5 tags. Mix domain (Enterprise, B2C), method (User Research, Design System), and deliverable (Prototype). |
| `heroImage` | Use a 1200px+ wide image. Unsplash URLs work; local images go in `public/images/`. |
| `challenge` | Lead with the user or business problem, not your solution. Mention scale (e.g. *"3+ hours daily"*) if you have it. |
| `designProcess.intro` | Name your role explicitly (*"I led…"*, *"I collaborated with…"*). |
| `designProcess.steps` | Aim for 3 steps. Titles should be phase names, not deliverable names. |
| `designProcess.insights` | Write outcomes, not activities. *"Phased approach enabled momentum"* > *"We used a phased approach"*. |
| `deliverables.intro` | Name the artefacts (dashboard, design system, prototype) and their defining quality. |
| `deliverables.images` | 1–3 images. Alt text should describe the design shown, not the file name. |
| `results.kpis` | Use real numbers where possible. If you can't share exact data, use relative improvement (e.g. *"3.5× improvement"*). |

---

## Checklist

- [ ] JSON filename matches `id` field and `metadata.ts` entry
- [ ] All required fields present (no missing keys)
- [ ] `heroImage` URL is accessible
- [ ] `deliverables.images` has at least one entry
- [ ] `results.kpis` has at least one entry
- [ ] `npm run build` passes with no TypeScript errors
