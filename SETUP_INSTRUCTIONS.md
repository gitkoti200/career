# AI Career Guidance Platform - Setup Instructions

Because Node.js was not detected in the current environment, the application code has been generated but not started. Follow these steps to run the full-stack prototype.

## Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher) installed.

## 1. Backend Setup

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd D:\AI-Career-Platform\backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server (runs on port 5000):
   ```bash
   npm start
   ```
   > You should see: `Server running on http://localhost:5000` and `Falling back to In-Memory Database`.

## 2. Frontend Setup

1. Open a **new** terminal window and navigate to the frontend folder:
   ```bash
   cd D:\AI-Career-Platform\frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm run dev
   ```
4. Open the link provided (usually `http://localhost:5173`) in your browser.

## Features to Try (Demo Mode)
- **Onboarding**: Enter your name and paste any text (e.g., "I know Python and Java") into the resume field.
- **Recommendations**: See how the "AI" (Simulated) matches you to roles like Data Scientist or Frontend Dev.
- **Roadmap**: Click "View Learning Roadmap" on a career card to see a week-by-week plan.
- **Chatbot**: Click the floating chat icon and ask "How is the salary?" to see an automated response.

## Optional: Real AI & Database
To use real OpenAI and MongoDB:
1. Create a `.env` file in `backend/`
2. Add:
   ```
   MONGO_URI=your_mongodb_connection_string
   OPENAI_API_KEY=your_openai_api_key
   ```
3. Restart the backend.
