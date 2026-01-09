import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckCircle, Clock, ChevronDown, ChevronUp, BookOpen, Video } from 'lucide-react';
import { supabase } from '../supabaseClient';

const Roadmap = ({ session }) => {
    const [roadmap, setRoadmap] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedWeek, setExpandedWeek] = useState(null);

    // Default to the first career if none selected in session
    const careerName = sessionStorage.getItem('selectedCareer') || "Full Stack Developer";

    useEffect(() => {
        const fetchRoadmap = async () => {
            // 1. Check if we already have it in DB? 
            // For this prototype, we'll hit the 'AI' api every time to get the fresh structure
            // or check Supabase if implemented fully.
            try {
                const userId = session.user.id;
                const res = await axios.post('/api/roadmap', {
                    career: careerName,
                    user_id: userId
                });
                setRoadmap(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchRoadmap();
    }, [careerName, session.user.id]);

    const toggleWeek = (index) => {
        setExpandedWeek(expandedWeek === index ? null : index);
    };

    if (loading) return <div className="p-10 text-center text-xl text-primary animate-pulse">Generating your AI Personalized Roadmap...</div>;

    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900">Your Path to becoming a <span className="text-primary">{careerName}</span></h1>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">This curated timeline is designed based on your current skills and gaps. Follow the weeks to master the craft.</p>
            </div>

            <div className="relative border-l-4 border-indigo-100 ml-4 md:ml-10 space-y-8">
                {roadmap.map((step, idx) => (
                    <div key={idx} className="relative pl-8 md:pl-12">
                        {/* Circle Indicator */}
                        <div className={`absolute -left-[22px] md:-left-[26px] top-0 rounded-full h-10 w-10 md:h-12 md:w-12 flex items-center justify-center text-white font-bold text-lg shadow-lg border-4 border-white
                            ${expandedWeek === idx ? 'bg-primary scale-110' : 'bg-gray-400'} transition-all duration-300`}>
                            {step.week}
                        </div>

                        {/* Card Content */}
                        <div
                            onClick={() => toggleWeek(idx)}
                            className={`bg-white rounded-xl shadow-md border cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden
                            ${expandedWeek === idx ? 'ring-2 ring-primary border-transparent' : 'border-gray-100'}`}
                        >
                            <div className="p-6 flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{step.topic}</h3>
                                    <p className="text-gray-500 mt-1">{step.action}</p>
                                </div>
                                <div>
                                    {expandedWeek === idx ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-gray-400" />}
                                </div>
                            </div>

                            {/* Expanded Details */}
                            {expandedWeek === idx && (
                                <div className="bg-indigo-50 px-6 py-6 border-t border-indigo-100">
                                    <p className="text-gray-700 mb-4">{step.details}</p>

                                    {step.resources && step.resources.length > 0 && (
                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide">Recommended Resources</h4>
                                            {step.resources.map((res, rIdx) => (
                                                <div key={rIdx} className="flex items-center bg-white p-3 rounded shadow-sm border border-gray-100 hover:bg-gray-50">
                                                    {res.type === 'Video' ? <Video className="w-5 h-5 text-red-500 mr-3" /> : <BookOpen className="w-5 h-5 text-blue-500 mr-3" />}
                                                    {res.link ? (
                                                        <a href={res.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-medium hover:underline">
                                                            {res.title}
                                                        </a>
                                                    ) : (
                                                        <span className="text-gray-800 font-medium">{res.title}</span>
                                                    )}
                                                    <span className="ml-auto text-xs bg-gray-200 px-2 py-1 rounded text-gray-600">{res.type}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="mt-6 flex items-center text-sm text-indigo-700 font-medium">
                                        <Clock className="w-4 h-4 mr-1" /> Estimated time: 10-15 hours
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Roadmap;
