import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { supabase } from '../supabaseClient'; // To potentially save profile directly if needed
import { ArrowRight } from 'lucide-react';

const Onboarding = ({ session }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        resumeText: '',
        interests: []
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInterestToggle = (interest) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const userId = session.user.id;

            // 1. Save Profile to Supabase (Database)
            // We can do this directly from frontend OR via backend. 
            // Prompt says "Backend calls AI logic", so we send data to backend.

            // 2. Analyze Resume (Backend)
            const resumeRes = await axios.post('/api/analyze-resume', {
                text: formData.resumeText,
                user_id: userId
            });

            const fullProfile = {
                ...formData,
                extractedSkills: resumeRes.data.skills
            };

            // 3. Get Recommendations (Backend)
            const recommendRes = await axios.post('/api/recommend', {
                ...fullProfile,
                user_id: userId
            });

            // Store locally for quick access in Dashboard
            sessionStorage.setItem('recommendations', JSON.stringify(recommendRes.data));
            sessionStorage.setItem('userProfile', JSON.stringify(fullProfile));

            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert("Error. Ensure backend is running and Supabase keys are set.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-primary">Let's Get Started</h2>

            {step === 1 && (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Full Name</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Paste Resume / Bio</label>
                        <textarea
                            className="w-full p-2 border rounded h-32"
                            placeholder="Paste your resume text or a short bio here..."
                            value={formData.resumeText}
                            onChange={e => setFormData({ ...formData, resumeText: e.target.value })}
                        />
                    </div>
                    <button
                        onClick={() => setStep(2)}
                        className="w-full bg-primary text-white py-2 rounded hover:bg-indigo-700 transition"
                    >
                        Next <ArrowRight className="inline w-4 h-4 ml-1" />
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold">Select Your Course</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {['Artificial Intelligence', 'Web Development', 'Data Science', 'Cybersecurity', 'Product Management', 'UI/UX Design'].map(interest => (
                            <div
                                key={interest}
                                onClick={() => handleInterestToggle(interest)}
                                className={`p-3 rounded border cursor-pointer text-center transition ${formData.interests.includes(interest) ? 'bg-indigo-100 border-primary text-primary' : 'hover:bg-gray-50'
                                    }`}
                            >
                                {interest}
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-secondary text-white py-3 rounded text-lg font-bold hover:bg-emerald-600 transition"
                    >
                        {loading ? 'Analyzing with AI...' : 'Discover My Career'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Onboarding;
