# EduAdmin — Green Valley International School Administration Dashboard

A modern, responsive, and interactive **School Administration Dashboard** built for **Green Valley International School** (Academic Year 2026–27).

> **SproutSong Trainee Exercise (1–3 October 2026)**

---

## 🎯 Primary Persona & User Intent
* **Primary User:** Mansi Jogani (School Administrator / Principal)
* **Goal:** Institutional oversight and decision-making. The administrator needs high-level school health metrics (attendance, fees, academic averages), actionable operational alerts ("Attention Required"), and the ability to drill down level-by-level.

---

## 🏛️ Core Interaction Hierarchy
The fundamental information architecture of EduAdmin is:

$$\text{Overall School} \longrightarrow \text{Standard / Class} \longrightarrow \text{Section} \longrightarrow \text{Individual Student}$$

* **Global ClassSelector:** A persistent context filter near the header. Selecting a class (e.g. `Class 10-A`) dynamically recalculates all underlying statistics, tables, attention alerts, and analytics.

---

## ✨ Key Features
1. **Actionable "Attention Required" Section:** Prominently highlights critical issues (low attendance <75%, overdue fees, PTM meeting reminders, academically at-risk students).
2. **Dynamic KPI Cards:** Displays Total Enrolled Students, Today's Attendance %, Fee Collections (₹ Rupee context), and Academic Averages.
3. **Student Management & Slide-over Drawer:** Full student roster with search, fee filter, and a slide-over drawer for student profiles.
4. **Academics & Recharts Analytics:** Visual trend analytics for attendance presence and subject score breakdowns.
5. **Fee & Rupee Collection Ledger:** Tracks ₹18.6L collected vs ₹3.4L outstanding.
6. **Faculty & Staff Messages:** Direct messaging roster for all faculty department heads (Maths, Physics, CS) and broadcast announcements.
7. **School Reports:** Mock export functionality for CSV and PDF reports.

---

## 🛠️ Tech Stack
* **Framework:** React + Vite
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **Charts:** Recharts
* **Routing:** React Router DOM
* **Data:** Centralized Relational Mock Dataset (`src/data/mockData.js`)

---

## 🚀 Installation & Run Steps

```bash
# 1. Clone the repository
git clone https://github.com/mansisproutsong/school-admin-dashboard.git

# 2. Navigate into project folder
cd school-admin-dashboard

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

---

## 📂 Project Architecture
```text
src/
 ├── components/
 │    ├── common/        (ClassSelector, StudentDrawer, EmptyState, NotificationPanel)
 │    └── layout/        (Sidebar, Header)
 ├── context/            (FilterContext - Global Class Filter State)
 ├── data/               (mockData.js - Relational Mock Dataset)
 ├── layouts/            (AdminLayout)
 ├── pages/              (Dashboard, Students, Classes, Attendance, Subjects, Exams, Results, Teachers, Fees, Notices, Events, Messages, Reports)
 ├── App.jsx
 └── main.jsx
```
