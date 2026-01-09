import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Roadmap from './pages/Roadmap';
import Profile from './pages/Profile';
import Chatbot from './components/Chatbot';
import Auth from './pages/Auth';
import { supabase } from './supabaseClient';

function App() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {session && <Navbar />}
            <div className={session ? "container mx-auto p-4" : ""}>
                <Routes>
                    {!session ? (
                        <>
                            <Route path="/auth" element={<Auth />} />
                            <Route path="*" element={<Navigate to="/auth" />} />
                        </>
                    ) : (
                        <>
                            <Route path="/" element={<Onboarding session={session} />} />
                            <Route path="/dashboard" element={<Dashboard session={session} />} />
                            <Route path="/roadmap" element={<Roadmap session={session} />} />
                            <Route path="/profile" element={<Profile session={session} />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </>
                    )}
                </Routes>
            </div>
            {session && <Chatbot />}
        </div>
    );
}

export default App;
