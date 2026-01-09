import React, { useState } from 'react';
import { ChevronDown, BookOpen, Award, Clock } from 'lucide-react';

const RoadmapDetail = ({ career, onBack }) => {
  const [expandedMonth, setExpandedMonth] = useState(0);

  if (!career) return null;

  return (
    <div className="space-y-8 p-8 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg">
      <div className="space-y-4">
        <button
          onClick={onBack}
          className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-2"
        >
          ← Back to Career Selection
        </button>
        <h1 className="text-4xl font-bold text-gray-900">{career.title}</h1>
        <p className="text-lg text-gray-600">{career.description}</p>
        <div className="flex gap-4 items-center">
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold">
            Match Score: {career.matchScore}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-lg font-bold text-green-700 mb-3">Current Skills</h3>
          <div className="space-y-2">
            {career.skills.current.map((skill, idx) => (
              <span key={idx} className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-lg font-bold text-blue-700 mb-3">Required Skills</h3>
          <div className="space-y-2">
            {career.skills.required.map((skill, idx) => (
              <span key={idx} className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <h3 className="text-lg font-bold text-red-700 mb-3">Missing Skills (Priority)</h3>
          <div className="space-y-2">
            {career.skills.missing.map((skill, idx) => (
              <span key={idx} className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                ⚠ {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Roadmap</h2>
        <div className="space-y-4">
          {career.roadmap.map((phase, idx) => (
            <div key={idx} className="border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedMonth(expandedMonth === idx ? -1 : idx)}
                className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-4 flex items-center justify-between hover:from-indigo-600 hover:to-blue-600 transition"
              >
                <div className="text-left">
                  <p className="font-bold text-lg">{phase.month}</p>
                  <p className="text-indigo-100">{phase.title}</p>
                </div>
                <ChevronDown
                  size={24}
                  className={`transform transition-transform ${expandedMonth === idx ? 'rotate-180' : ''}`}
                />
              </button>

              {expandedMonth === idx && (
                <div className="bg-white p-6 space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <Award size={18} className="text-indigo-600" /> Skills to Learn
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {phase.skills.map((skill, sidx) => (
                        <span
                          key={sidx}
                          className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <BookOpen size={18} className="text-blue-600" /> Recommended Courses
                    </h4>
                    <div className="space-y-2">
                      {phase.courses.map((course, cidx) => (
                        <div key={cidx} className="bg-blue-50 p-3 rounded border border-blue-200">
                          <p className="font-semibold text-gray-900">{course.name}</p>
                          <div className="flex gap-4 text-sm text-gray-600 mt-1">
                            <span className="font-medium text-blue-600">{course.platform}</span>
                            <span className="flex items-center gap-1">
                              <Clock size={14} /> {course.duration}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoadmapDetail;
