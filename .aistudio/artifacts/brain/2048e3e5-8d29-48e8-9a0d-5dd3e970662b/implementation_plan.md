# Comité Central UEP CDP 2026–2027 (App de Padres y Gestión Deportiva)

An institutional, athletic-modernist mobile web application and PWA for the **Comité Central de Padres de Familia de la Unidad Educativa Particular Concentración Deportiva de Pichincha (UEP CDP)**, enabling families to track the 8-axis strategic plan, sports and academic agenda, transparent treasury accountability, and interactive proposal/sponsorship participation.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following decisions were clarified in Phase 1 and are incorporated into this implementation plan:
>
> - **Data Persistence & Export**: Confirmed local storage persistence for submitted proposals, supported plan axes ("likes"), custom event reminders, and sponsorship applications, complete with ticket receipt preview and export.
> - **Interactive Role Switcher**: Confirmed toggle between **Parent/Family (Padre / Tutor)** view and **Committee Representative (Directiva / Administrador)** view, allowing direct moderation and proposal review.
> - **Real Document Downloads**: Confirmed generating real downloadable files (formatted executive summaries and official receipts as text/HTML-PDF print formats) rather than only simulated alerts.

---

### 1. Overview & Core Concept

- **What It Does**: Replicates with pixel-level fidelity the 5 core views of the UEP CDP application:
  1. **Inicio (Home)**: Hero banner, quick access shortcuts, horizontal news carousel (*Alas que Inspiran*), team directory, legal framework accordion (*Acuerdo MINEDUC-2023-00075-A*), and commission recruitment CTA.
  2. **Plan (8 Ejes de Trabajo)**: Search and category filters (Gestión, Bienestar, Comunidad), interactive voting/support counters, meta/indicator breakdowns, and official executive summary download/share.
  3. **Agenda (Cronograma Deportivo y Escolar)**: Interactive month selector (Oct 2026 – Jun 2027), category filtering (Deporte, Aprendizaje, Comunidad, Bienestar), event reminder bookmarking with local storage and toast feedback.
  4. **Cuentas (Cuentas Claras & Transparencia)**: Current period (2026–2027) initial cashbox breakdown ($136.60), $10 voluntary contribution transparency rationale, historic period (2025–2026) audit report with $5.49 reconciliation note, animated expenditure distribution bar chart, and official downloadable signed PDF archive.
  5. **Participa (Propuestas y Patrocinio)**: 3-category family proposal generator (Ideas, Voluntariado, Escuela para Familias) with live character counter, ticket generation (`#UEP-2026-P42`), "Patrocina un Atleta CDP" Taekwondo highlight and equipment tracking, and full modal application form.
- **Target Audience / Persona**: Parents, tutors, student-athletes, and committee representatives of UEP CDP seeking transparent governance, athletic pride, and clear institutional communication.
- **Key Value**: Athletic-grade transparency, ease of participation, and complete mobile-first ergonomics.

---

### 2. User Experience & Visual Design

- **Visual Identity & Theme**:
  - *Aesthetic*: Athletic Modernism. High-density editorial clarity with sports-tech performance cues.
  - *Color Palette*:
    - Primary Sporting Red: `#93000F` / `#BD101B`
    - Deep Crimson: `#410003` / `#69000B`
    - Institutional Gold / Tertiary: `#FDBB12` / `#FFDEA4` / `#5D4300`
    - Canvas Warm Neutral: `#FCF9F8` / Surface High `#EAE7E7`
    - Text Primary: `#1C1B1B`, Text Muted: `#5C403D`
  - *Typography*:
    - Display / Headings: `Space Grotesk` (technological energy, structural strength, competition-grade momentum).
    - Body / Numerical Data: `Manrope` with tabular figures (`tabular-nums`) for currency and dates.
    - Icons: Google `Material Symbols Outlined`.
  - *Touch Targets & Ergonomics*:
    - Fixed bottom tab bar (h-16 with safe-area insets).
    - Minimum 44px touch hitbox for all interactive elements.
    - Responsive shell: mobile-first (375px–430px) centering elegantly up to responsive desktop/tablet presentation with maximum readability.

---

### 3. Key Product Decisions & Trade-Offs

- **Role Switcher Integration**:
  - *Approach*: Accessible from the top header user icon (`person`), allowing switching between "Padre de Familia" and "Miembro de Directiva (Admin)". In Admin mode, committee members can view submitted proposals and sponsorships in a dedicated review drawer.
  - *Why*: Allows showcasing both end-user submission and administrative moderation in a cohesive single-page application.
- **Document Generation**:
  - *Approach*: Use browser Blob API and formatted HTML/text download triggers to provide actual files (e.g. `Plan_Maestro_UEP_CDP_2026_2027.txt` / print-ready executive summary, and official proposal tickets).
  - *Why*: Fulfills user preference for tangible document downloads without requiring heavy server-side PDF rasterization libraries.
- **Hotlinked Media & Fallbacks**:
  - *Approach*: Hotlink the provided high-resolution athlete and leadership photography directly from the user's provided URLs, with resilient CSS fallback banners and `referrerPolicy="no-referrer"`.

---

### 4. Technical Architecture & Data Strategy

```
┌──────────────────────────────────────────────────────────────┐
│                    UEP CDP 2026–2027                         │
│                  Application Architecture                    │
└──────────────────────────────┬───────────────────────────────┘
                               │
       ┌───────────────────────┴───────────────────────┐
       ▼                                               ▼
┌─────────────────────────────┐         ┌──────────────────────────────┐
│       Top Header Bar        │         │      Bottom Nav Tab Bar      │
│  Logo + Title + Badge +     │         │  5 Tabs: Inicio, Plan,       │
│  Role Switcher Trigger      │         │  Agenda, Cuentas, Participa  │
└──────────────┬──────────────┘         └──────────────┬───────────────┘
               │                                       │
               └───────────────────┬───────────────────┘
                                   │
                                   ▼
        ┌──────────────────────────────────────────────────────┐
        │                 Active View Router                   │
        │   [Inicio]  [Plan]  [Agenda]  [Cuentas]  [Participa] │
        └──────────────────────────┬───────────────────────────┘
                                   │
          ┌────────────────────────┼────────────────────────┐
          ▼                        ▼                        ▼
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  Proposal State  │     │  Plan Likes &    │     │  Agenda Reminders│
│  & Sponsor Store │     │  Filter Store    │     │  & Period Store  │
│  (LocalStorage)  │     │  (LocalStorage)  │     │  (LocalStorage)  │
└──────────────────┘     └──────────────────┘     └──────────────────┘
```

- **Data Models**:
  - `Proposal`: ID, timestamp, author, grade, discipline, category, text, status (`Enviado`, `En Revisión`, `Aprobado`).
  - `SponsorApplication`: ID, orgName, modality, phone, notes, timestamp.
  - `PlanAxis`: ID, category, title, description, targetGoal, indicator, likeCount, phase.
  - `AgendaEvent`: ID, month, dateRange, category, time/place, title, description, responsible, isBookmarked.
  - `DocumentItem`: ID, title, subtitle, filename, content.

---

### Verification Plan

1. Verify build and compilation with `compile_applet`.
2. Test tab navigation across all 5 views (Inicio, Plan, Agenda, Cuentas, Participa).
3. Test interactive filters on Plan and Agenda.
4. Test like counters and reminders persistence in `localStorage`.
5. Test proposal submission and sponsor modal validation.
6. Test executive summary document download.
7. Test role switcher between Parent and Committee Admin.
