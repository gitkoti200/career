import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { User, Mail, GraduationCap, Heart, Edit2, Save, X, Plus, Trash2 } from 'lucide-react';

const Profile = ({ session }) => {
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: '',
        education: '',
        interests: []
    });
    const [newInterest, setNewInterest] = useState('');
    const [message, setMessage] = useState(null);

    useEffect(() => {
        getProfile();
    }, [session]);

    const getProfile = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('user_profiles')
                .select('name, education, interests')
                .eq('id', session.user.id)
                .single();

            if (error) throw error;
            if (data) {
                setProfile({
                    name: data.name || '',
                    education: data.education || '',
                    interests: data.interests || []
                });
            }
        } catch (error) {
            console.error('Error loading user data!', error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async () => {
        try {
            setLoading(true);
            const updates = {
                id: session.user.id,
                ...profile,
                updated_at: new Date(),
            };

            const { error } = await supabase.from('user_profiles').upsert(updates);
            if (error) throw error;
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setEditing(false);
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const addInterest = () => {
        if (newInterest.trim() && !profile.interests.includes(newInterest.trim())) {
            setProfile(prev => ({
                ...prev,
                interests: [...prev.interests, newInterest.trim()]
            }));
            setNewInterest('');
        }
    };

    const removeInterest = (interest) => {
        setProfile(prev => ({
            ...prev,
            interests: prev.interests.filter(i => i !== interest)
        }));
    };

    if (loading && !profile.name) return <div className="p-10 text-center text-primary animate-pulse">Loading Profile...</div>;

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                {/* Header/Cover Area */}
                <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600 relative">
                    <div className="absolute -bottom-12 left-8">
                        <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center p-1">
                            <div className="w-full h-full bg-indigo-50 rounded-xl flex items-center justify-center">
                                <User className="w-12 h-12 text-indigo-600" />
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-4 right-8">
                        {!editing ? (
                            <button
                                onClick={() => setEditing(true)}
                                className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-white/30 transition-all border border-white/30"
                            >
                                <Edit2 className="w-4 h-4" /> Edit Profile
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setEditing(false)}
                                    className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-red-500/50 transition-all border border-white/30"
                                >
                                    <X className="w-4 h-4" /> Cancel
                                </button>
                                <button
                                    onClick={updateProfile}
                                    className="bg-white text-indigo-600 px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-50 transition-all shadow-lg"
                                >
                                    <Save className="w-4 h-4" /> Save Changes
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="pt-16 pb-12 px-8">
                    {message && (
                        <div className={`mb-6 p-4 rounded-xl text-sm font-bold flex items-center gap-2 border ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'
                            }`}>
                            {message.text}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Basic Info */}
                        <div className="space-y-8">
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <User className="w-5 h-5 text-indigo-600" /> Personal Identity
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Display Name</label>
                                    {editing ? (
                                        <input
                                            type="text"
                                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium"
                                            value={profile.name}
                                            onChange={e => setProfile({ ...profile, name: e.target.value })}
                                        />
                                    ) : (
                                        <p className="text-lg font-bold text-gray-800">{profile.name || 'Set your name'}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Email Address</label>
                                    <div className="flex items-center gap-2 text-gray-600 bg-gray-50 p-3 rounded-xl border border-dashed border-gray-300">
                                        <Mail className="w-4 h-4" />
                                        <span className="font-medium">{session.user.email}</span>
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-1 italic">* Email cannot be changed</p>
                                </div>
                            </div>
                        </div>

                        {/* Education & Interests */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
                                    <GraduationCap className="w-5 h-5 text-indigo-600" /> Education
                                </h3>
                                {editing ? (
                                    <input
                                        type="text"
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium"
                                        placeholder="University, Degree"
                                        value={profile.education}
                                        onChange={e => setProfile({ ...profile, education: e.target.value })}
                                    />
                                ) : (
                                    <p className="text-gray-700 font-medium bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                                        {profile.education || 'No education info added yet.'}
                                    </p>
                                )}
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
                                    <Heart className="w-5 h-5 text-indigo-600" /> Career Interests
                                </h3>

                                {editing && (
                                    <div className="flex gap-2 mb-4">
                                        <input
                                            type="text"
                                            className="flex-1 p-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm font-medium"
                                            placeholder="Add skill (e.g. React)"
                                            value={newInterest}
                                            onChange={e => setNewInterest(e.target.value)}
                                            onKeyPress={e => e.key === 'Enter' && addInterest()}
                                        />
                                        <button
                                            onClick={addInterest}
                                            className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition"
                                        >
                                            <Plus className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-2">
                                    {profile.interests.length > 0 ? profile.interests.map((interest, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-white border border-gray-200 text-indigo-700 text-sm font-bold rounded-full flex items-center gap-2 shadow-sm hover:border-indigo-300 transition-all"
                                        >
                                            {interest}
                                            {editing && (
                                                <X
                                                    className="w-3 h-3 cursor-pointer hover:text-red-500"
                                                    onClick={() => removeInterest(interest)}
                                                />
                                            )}
                                        </span>
                                    )) : (
                                        <p className="text-sm text-gray-500 italic">No interests selected yet.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
