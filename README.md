# 🎯 AI-Powered Career Guidance Platform

## 📋 Overview

This is a **full-stack web application** that provides AI-driven career guidance to students and professionals. It analyzes user skills, generates personalized career recommendations, and provides detailed learning roadmaps with courses and resources.

### Built with:
- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **UI Framework**: Lucide React Icons

---

## ✨ What This Project Produces

When you run this application, you get:

### 1. **Beautiful Career Selection Dashboard**
- 6 interactive career cards with:
  - Career title and description
  - Match score badge (showing compatibility with user skills)
  - Top missing skills (color-coded by type)
  - Hover animations and scale effects
  - "View Roadmap" call-to-action

**Available Career Paths:**
- **Software Engineer** (85% match)
- **Data Scientist** (75% match)
- **AI Engineer** (70% match)
- **Cloud Engineer** (78% match)
- **UI/UX Designer** (80% match)
- **Product Manager** (72% match)

### 2. **Personalized Learning Roadmaps**
For each career, users can view:
- **Month-by-month learning plan** (6+ months curriculum)
- **Skills breakdown**: Current, Required, and Missing skills
- **Recommended courses** with:
  - Course name
  - Platform (Udemy, Coursera, etc.)
  - Duration
  - Learning outcomes
- **Color-coded skill categories**:
  - ✅ Green for mastered skills
  - 🔵 Blue for required skills
  - ⚠️ Red for high-priority missing skills

### 3. **Interactive Timeline Interface**
- **Expandable monthly phases** with chevron icons
- Each month shows:
  - Key skills to learn
  - Specific courses and resources
  - Platform and duration information
- **Smooth transitions** and hover effects

### 4. **Responsive Design**
- **Desktop optimized** with 3-column grid layout
- **Tablet responsive** with 2-column layout
- **Mobile friendly** with single-column layout

---

## 🚀 How to Run

### Prerequisites
- Node.js v16 or higher
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
npm start
```
**Expected Output:**
```
Server running on http://localhost:5000
Falling back to In-Memory Database
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
**Expected Output:**
```
Local:   http://localhost:5173
```

### Access the Application
Open your browser and navigate to: `http://localhost:5173`

---

## 📸 User Experience Flow

### Step 1: Authentication
- User signs up / logs in with email
- Data stored in Supabase

### Step 2: Dashboard - Career Selection
- Browse 6 interactive career cards
- Each card shows match score and key missing skills
- Click any card to view detailed roadmap

### Step 3: Career Roadmap Detail
- View career description and match score
- See 3-column skill analysis:
  - **Current Skills** (what they have)
  - **Required Skills** (what they need)
  - **Missing Skills** (high priority)
- Expand monthly phases to see courses

### Step 4: Learning Path
- Follow month-by-month curriculum
- Access recommended courses
- Track progress through phases

---

## 📊 Data Structure

### Roadmap Data (6 Career Paths)
Each career contains:
- Career metadata (title, description, match score)
- Skill analysis (current, required, missing)
- 5-6 month learning roadmap with:
  - Monthly milestones
  - Skills to learn
  - Recommended courses
  - Resource links

**Example: Software Engineer Path**
```
Month 1-2: JavaScript Advanced Concepts
Month 3-4: Node.js & Express Backend
Month 5-6: Databases & Data Design
Month 7-8: System Design & Architecture
Month 9-10: DevOps & Deployment
Month 11-12: Capstone Project & Interview Prep
```

---

## 🎨 UI Components

### Key Components:
1. **Roadmap Page** - Main dashboard with career cards
2. **RoadmapDetail Component** - Detailed roadmap view
3. **Career Cards** - Interactive selection interface
4. **Skill Badges** - Color-coded skill tags
5. **Timeline** - Expandable monthly phases

### Styling:
- **Tailwind CSS** for utility-first styling
- **Gradient backgrounds** (indigo to blue)
- **Icon system** with Lucide React
- **Smooth animations** and transitions
- **Responsive grid layouts**

---

## 💾 Files Created/Modified

### New Files:
- `frontend/src/data/roadmapData.js` - Career data
- `frontend/src/components/RoadmapDetail.jsx` - Roadmap component

### Modified Files:
- `frontend/src/pages/Roadmap.jsx` - Career selection dashboard

---

## 🔮 What Happens When You Run It

### On Page Load:
1. User lands on `/roadmap` page
2. Frontend fetches career data from roadmapData.js
3. Displays 6 career cards in a responsive grid
4. Each card shows:
   - Gradient header with career icon and match %
   - Career description
   - Top 3 missing skills
   - "View Roadmap" button

### On Career Selection:
1. Click any career card
2. Page smoothly transitions to RoadmapDetail component
3. Shows:
   - Career title and description
   - Match score badge
   - 3-column skill analysis
   - Expandable 6-month learning roadmap
   - Each month shows courses with platform & duration

### Navigation:
- "Back to Career Selection" button returns to dashboard
- All transitions are smooth and animated

---

## 🎯 Key Features Demonstrated

✅ **State Management** - React hooks (useState, useEffect)
✅ **Component Architecture** - Reusable, decoupled components
✅ **Responsive Design** - Mobile-first approach
✅ **Data Handling** - Centralized career data
✅ **Session Persistence** - Career selection saved to sessionStorage
✅ **UI/UX** - Beautiful gradients, animations, icons
✅ **User Flow** - Intuitive navigation and interactions

---

## 📈 Career Paths Included

| Career | Match | Duration | Monthly Topics |
|--------|-------|----------|----------------|
| Software Engineer | 85% | 12 months | JS → Backend → DB → Design → DevOps |
| Data Scientist | 75% | 12 months | Python → Stats → ML → Deep Learning |
| AI Engineer | 70% | 6-12 months | LLMs → RAG → Fine-tuning → Production |
| Cloud Engineer | 78% | 12 months | AWS → K8s → IaC → CI/CD |
| UI/UX Designer | 80% | 6 months | Design Fundamentals → Figma → Research |
| Product Manager | 72% | 6 months | Product Strategy → Analytics → Roadmapping |

---

## 🔗 API Endpoints (Ready for Backend Integration)

- `POST /api/career/recommend` - Get career recommendations
- `GET /api/roadmap/:careerId` - Get specific roadmap
- `POST /api/user/progress` - Save user progress
- `GET /api/skills/gaps` - Analyze skill gaps

---

## 🎓 Learning Outcomes

Users will understand:
- Their current skill level
- Gap between current and required skills
- Specific courses to take (with platforms)
- Timeline for career transition
- Real resources and materials

---

## 📝 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 📦 Technologies Used

| Layer | Tech |
|-------|------|
| UI | React 18, Tailwind CSS, Lucide Icons |
| Build | Vite, ESBuild |
| Backend | Node.js, Express.js |
| Auth | Supabase Authentication |
| DB | Supabase PostgreSQL |
| State | React Hooks |

---

## 🚀 Future Enhancements

- [ ] Backend API integration for persistent storage
- [ ] AI-powered career recommendations
- [ ] Progress tracking dashboard
- [ ] Certificate tracking
- [ ] Interactive chatbot
- [ ] Resume builder
- [ ] Job marketplace integration
- [ ] Mobile app version

---

## 📞 Support

For issues or questions, please refer to the SETUP_INSTRUCTIONS.md file or create an issue in the repository.

---

## 📄 License

This project is open source and available under the MIT License.

---

**Made with ❤️ for Career Guidance | v1.0 | 2026**
