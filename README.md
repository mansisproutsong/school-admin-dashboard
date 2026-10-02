# EduAdmin — Green Valley International School Administration Dashboard

A modern, executive-grade, responsive, and interactive **School Administration Dashboard** designed and built for **Green Valley International School** (Academic Year 2026–27).

> **SproutSong Trainee Exercise (1 October – 3 October 2026)**  
> **Trainee:** Mansi Jogani (`mansi.sproutsong@gmail.com`)  
> **Repository:** [https://github.com/mansisproutsong/school-admin-dashboard](https://github.com/mansisproutsong/school-admin-dashboard)

---

## 🎯 Executive Summary & Product Thinking

### Primary Persona & User Intent
* **Target User:** Principal / School Administrator (Mansi Jogani).
* **Core Need:** A single, intuitive control center that provides an instant macro-level view of school health (Attendance, Fees, Academic Averages) while offering one-click micro-level drill-downs into specific classes, teachers, or students.
* **Core Philosophy:** *Information Hierarchy over Data Overload.* Critical issues requiring immediate administrative intervention ("Attention Required") are surfaced first, followed by key performance indicators, visual trends, and detailed operational tools.

---

## 🏛️ Information Architecture

$$\text{Overall Institution} \longrightarrow \text{Standard / Class Scope} \longrightarrow \text{Section / Department} \longrightarrow \text{Individual Record}$$

### Persistent Global Context Filter (`FilterContext`)
* At the top of every key view, a persistent **Class Selector** allows switching between **All Classes** or specific standards (e.g., `Class 8-A`, `Class 10-B`, `Class 12-Science`).
* Selecting a class context dynamically recalculates:
  - Attendance percentages & present/absent counts
  - Fee collection ledgers (Paid, Pending, Overdue)
  - Academic distinction & intervention lists
  - Class-specific notices, events, and reports

---

## 🎨 UI/UX & Design System

Strict adherence to a clean, professional, non-distracting executive light theme:
* **Primary Palette:** Deep Royal Blue (`#2563EB`), Slate Neutrals (`#0F172A`, `#64748B`, `#F8FAFC`).
* **Status Badges:** Emerald (`#059669` / Paid/Active), Amber (`#D97706` / Pending/Medium), Rose (`#E11D48` / Overdue/High).
* **Zero Purple:** Strictly excluded rainbow gradients or distracting purple tones to preserve focus and executive clarity.
* **Typography & Density:** `text-sm` body copy, tight `py-2.5` row padding for tables, solid slate initial avatars.
* **Pill-shaped Action Controls:** Distinct background and border pills for `Receipt`, `Collect`, and `Remind` actions rather than plain text links.

---

## ✨ Comprehensive Feature Matrix

| Module | Core Functionality | Key Interactivity |
|---|---|---|
| **Dashboard** | Institutional health summary, KPI cards, Attendance & Fee charts | Actionable "Attention Required" alerts, quick navigation links |
| **Students** | Full student directory with roll numbers, parent contact info | Slide-over Student Profile Drawer, search filter |
| **Classes** | Class performance matrix, room assignments, teacher leads | Class comparison indicators, student count metrics |
| **Attendance** | Daily roll call & attendance tracking | Class comparison graphs, bulk status toggles |
| **Subjects** | Weekly timetable grid & department distribution | Pastel subject cards, assigned teacher info |
| **Exams** | Upcoming examination schedule & weightage | Add Exam modal, status badges |
| **Results** | Top Performers & Distinction list vs Intervention list | Split 2-panel performance layout |
| **Teachers** | Faculty grid with solid avatar initials, department tags | Search staff, direct phone & email actions |
| **Fees** | Student Fee Ledger with ₹ Indian Rupee currency | Filter by Paid/Pending/Overdue, pill action buttons, Record Payment modal |
| **Notices** | School-wide and class-specific announcements | Category badges (Academic, Sports, Transport), Create Notice modal |
| **Events** | School event calendar | Category color strip, Add Event modal |
| **Messages** | 1-on-1 Faculty Chat roster | Teacher search filter, auto-scrolling chat history, simulated messaging |
| **Reports** | Institutional CSV exports | One-click CSV downloads for Students, Fees, Attendance, Teachers |
| **Settings** | School profile, academic grading scale, fee rules, roles | Tabbed interface, role permissions matrix |
| **Help & Support**| Operations guide & FAQ accordion | FAQ search bar, IT support ticket submission form |
| **EduBot AI** | Floating AI Assistant UI | Voice/Text segmented toggle, 3D glowing AI orb, quick action pills, typing indicator |

---

## 📅 3-Day Execution Plan & Progress Summary

### Day 1 (Thursday, 1 October 2026) — Research, Structure & Architecture
- Persona identification & information hierarchy design.
- Project setup with React, Vite, Tailwind CSS, and Lucide Icons.
- Built core `AdminLayout`, `Sidebar`, `Header`, and persistent `FilterContext`.
- Established initial Git repository structure with modular components.

### Day 2 (Friday, 2 October 2026) — Data Presentation, Interactivity & Core Modules
- Built relational mock dataset (`src/data/mockData.js`, `src/data/teachers.js`).
- Implemented `Students`, `Classes`, `Attendance`, `Subjects`, `Exams`, `Results`, `Teachers`, and `Fees` modules.
- Integrated Recharts visual trends for attendance and fee collections.
- Added slide-over `StudentDrawer` and custom dropdown components.

### Day 3 (Saturday, 3 October 2026) — Complete Overhaul, Polish & AI Assistant
- Redesigned `Notices`, `Events`, `Messages`, `Reports`, `Settings`, and `Help` pages to executive design standards.
- Designed and integrated **EduBot AI Assistant** featuring Voice & Text modes, glowing 3D AI Orb, quick action pills, and smart administrative responses.
- Fixed layout responsiveness and flex container constraints.
- Updated documentation and prepared final submission materials.

---

## 🛠️ Tech Stack & Dependencies

* **Frontend Framework:** React 18 + Vite
* **Styling & Icons:** Tailwind CSS + Lucide React
* **Data Visualization:** Recharts
* **Routing:** React Router DOM (v6)
* **Portals & Modals:** React DOM `createPortal`

---

## 🚀 Installation & Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/mansisproutsong/school-admin-dashboard.git

# 2. Navigate to the project directory
cd school-admin-dashboard

# 3. Install required node packages
npm install

# 4. Launch local development server
npm run dev

# 5. Open local browser link
# http://localhost:5173
```

---

## 📄 License & Credits

Built by **Mansi Jogani** for the **SproutSong Trainee Exercise (1–3 October 2026)**.
