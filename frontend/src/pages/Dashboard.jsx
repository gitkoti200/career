import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

const Dashboard = ({ user }) => {
    const [recommendations, setRecommendations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const data = sessionStorage.getItem('recommendations');
        if (data) {
            setRecommendations(JSON.parse(data));
        }
    }, []);

    const handleSelectCareer = (career) => {
        sessionStorage.setItem('selectedCareer', career.role);
        navigate('/roadmap');
    };

    if (!recommendations.length) {
        return <div className="text-center mt-20">Loading Recommendations...</div>;
    }

    return (
        <div className="space-y-8">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 rounded-xl text-white">
                <h1 className="text-3xl font-bold">Recommended Careers for You, {user?.name}</h1>
                <p className="opacity-90 mt-2">Based on your skills: {user?.extractedSkills?.join(', ')}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Match Chart */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-lg font-semibold mb-4">Skill Match Score</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={recommendations} layout="vertical">
                                <XAxis type="number" domain={[0, 100]} />
                                <YAxis dataKey="role" type="category" width={120} />
                                <Tooltip />
                                <Bar dataKey="match" fill="#4F46E5" radius={[0, 4, 4, 0]}>
                                    {recommendations.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.match > 80 ? '#10B981' : '#4F46E5'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Detailed Cards */}
                <div className="space-y-4">
                    {recommendations.map((career) => (
                        <div key={career.role} className="bg-white p-6 rounded-xl shadow border border-gray-100 hover:shadow-md transition">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{career.role}</h3>
                                    <p className="text-sm text-gray-500">{career.description}</p>
                                </div>
                                <div className={`text-lg font-bold ${career.match > 80 ? 'text-green-600' : 'text-blue-600'}`}>
                                    {career.match}% Match
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="text-sm font-semibold text-gray-700 mb-2">Gap Analysis:</p>
                                <div className="flex flex-wrap gap-2">
                                    {career.missingSkills.map(skill => (
                                        <span key={skill} className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded-full flex items-center">
                                            <AlertTriangle className="w-3 h-3 mr-1" /> {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => handleSelectCareer(career)}
                                className="mt-4 w-full py-2 border border-primary text-primary rounded hover:bg-indigo-50 transition font-medium"
                            >
                                View Learning Roadmap
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {/* Recommended Courses Section */}
            <div className="bg-white p-8 rounded-xl shadow">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Recommended Courses</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {recommendations.flatMap(rec => rec.suggestedCourses || []).slice(0, 6).map((course, idx) => (
                        <a
                            key={idx}
                            href={course.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-5 border border-gray-200 rounded-lg hover:shadow-lg transition hover:border-indigo-300 group"
                        >
                            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded mb-2 ${course.type === 'Video' ? 'bg-red-100 text-red-600' :
                                    course.type === 'Course' ? 'bg-blue-100 text-blue-600' :
                                        'bg-green-100 text-green-600'
                                }`}>
                                {course.type}
                            </span>
                            <h4 className="font-bold text-gray-800 group-hover:text-primary transition">{course.title}</h4>
                            <p className="text-sm text-gray-500 mt-2 flex items-center">
                                Start Learning <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
