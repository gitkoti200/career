import React, { useState, useEffect } from 'react';
import { Briefcase, ArrowRight } from 'lucide-react';
import RoadmapDetail from '../components/RoadmapDetail';
import { roadmapData } from '../data/roadmapData';
import supabase from '../supabaseClient';

const Roadmap = ({ session }) => {
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize careers from roadmapData
    const careerList = Object.values(roadmapData);
    setCareers(careerList);
  }, []);

  const handleSelectCareer = (careerId) => {
    const career = roadmapData[careerId];
    if (career) {
      setSelectedCareer(career);
      // Save to session storage
      sessionStorage.setItem('selectedCareer', career.title);
    }
  };

  const handleBack = () => {
    setSelectedCareer(null);
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Please sign in</h1>
          <p className="text-gray-600">You need to be signed in to view your career roadmap</p>
        </div>
      </div>
    );
  }

  if (selectedCareer) {
    return <RoadmapDetail career={selectedCareer} onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">Career Roadmaps</h1>
            <p className="text-lg text-gray-600">Select a career path to view your personalized learning roadmap</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careers.map((career) => (
              <div
                key={career.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 overflow-hidden cursor-pointer"
                onClick={() => handleSelectCareer(career.id)}
              >
                <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <Briefcase size={32} />
                    <span className="bg-white bg-opacity-30 px-3 py-1 rounded-full text-sm font-semibold">
                      {career.matchScore}% Match
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold">{career.title}</h2>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-gray-600 text-sm line-clamp-2">{career.description}</p>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 text-sm">Key Skills to Learn:</h3>
                    <div className="flex flex-wrap gap-2">
                      {career.skills.missing.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {career.skills.missing.length > 3 && (
                        <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                          +{career.skills.missing.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition">
                    View Roadmap
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
