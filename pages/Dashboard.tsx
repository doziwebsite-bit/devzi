
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  Settings,
  Figma,
  Github,
  Database,
  Key,
  CheckCircle2,
  Clock,
  Circle,
  MessageSquare,
  Send,
  ExternalLink
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

// --- Components ---

const SidebarItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-[#3B82F6]/10 text-[#3B82F6]' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const AssetItem: React.FC<{ icon: React.ReactNode; label: string; subLabel: string; href?: string }> = ({ icon, label, subLabel, href }) => (
  <a href={href} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-[#0A0A0A] hover:border-[#3B82F6]/30 transition-all group cursor-pointer">
    <div className="p-2 bg-white/5 rounded-lg text-white/70 group-hover:text-[#3B82F6] transition-colors">
      {icon}
    </div>
    <div className="flex-grow">
      <h4 className="text-sm font-bold text-white/90">{label}</h4>
      <p className="text-[10px] text-white/40 uppercase tracking-wider">{subLabel}</p>
    </div>
    <ExternalLink size={14} className="text-white/20 group-hover:text-[#3B82F6] opacity-0 group-hover:opacity-100 transition-all" />
  </a>
);

const TimelineStep: React.FC<{
  status: 'done' | 'active' | 'pending';
  title: string;
  date?: string;
  isLast?: boolean;
  children?: React.ReactNode
}> = ({ status, title, date, isLast, children }) => {
  return (
    <div className="relative pl-8 pb-8">
      {!isLast && (
        <div className={`absolute left-[11px] top-8 bottom-0 w-[2px] ${status === 'done' ? 'bg-[#3B82F6]/50' : 'bg-white/10'}`} />
      )}
      <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center border-2 ${status === 'done' ? 'bg-[#3B82F6] border-[#3B82F6] text-white' :
        status === 'active' ? 'bg-[#3B82F6]/20 border-[#3B82F6] text-[#3B82F6] animate-pulse' :
          'bg-[#0A0A0A] border-white/20 text-white/20'
        }`}>
        {status === 'done' ? <CheckCircle2 size={14} /> : status === 'active' ? <Clock size={14} /> : <Circle size={14} />}
      </div>

      <div className="flex justify-between items-start mb-1">
        <h4 className={`font-bold ${status === 'active' ? 'text-[#3B82F6]' : status === 'done' ? 'text-white' : 'text-white/40'}`}>{title}</h4>
        {date && <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-white/40 font-mono">{date}</span>}
      </div>

      <div className="text-sm text-white/60 space-y-2">
        {children}
      </div>
    </div>
  );
};

// Types for Real Data
interface Project {
  id: string;
  name: string;
  progress: number;
}
interface Step {
  id: string;
  title: string;
  status: 'done' | 'active' | 'pending';
  date_label: string;
  description: string;
}

const Dashboard: React.FC = () => {
  const [msgInput, setMsgInput] = useState('');
  const { user } = useAuth();

  // Real Data States
  const [project, setProject] = useState<Project | null>(null);
  const [timeline, setTimeline] = useState<Step[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If no user, mock data will be shown or redirect handled by Route protection (if added)
    // For now we fetch if user exists
    if (user) {
      fetchDashboardData();
    } else {
      setLoading(false); // Show demo mode
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch User's first active project
      const { data: projects, error: projError } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user!.id)
        .limit(1);

      if (projError) throw projError;

      if (projects && projects.length > 0) {
        setProject(projects[0]);

        // Fetch timeline
        const { data: steps, error: stepsError } = await supabase
          .from('timeline_steps')
          .select('*')
          .eq('project_id', projects[0].id)
          .order('order_index', { ascending: true });

        if (stepsError) throw stepsError;
        if (steps) setTimeline(steps);

      } else {
        // No project found, maybe create a default one?
        createDefaultProject();
      }

    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const createDefaultProject = async () => {
    // Create a default demo project for the new user
    const { data, error } = await supabase.from('projects').insert([
      { user_id: user!.id, name: 'Project Alpha (Demo)', progress: 15, status: 'active' }
    ]).select().single();

    if (data) {
      setProject(data);
      // Insert default steps
      await supabase.from('timeline_steps').insert([
        { project_id: data.id, title: 'Phase 1: Onboarding', status: 'done', date_label: 'COMPLETED', description: 'Initial setup and requirements.', order_index: 0 },
        { project_id: data.id, title: 'Phase 2: UI/UX Design', status: 'active', date_label: 'IN PROGRESS', description: 'Designing the interfaces.', order_index: 1 },
        { project_id: data.id, title: 'Phase 3: Backend', status: 'pending', date_label: 'UPCOMING', description: 'Server and Database Setup.', order_index: 2 },
      ]);
      fetchDashboardData(); // Refresh
    }
  }


  return (
    <div className="pt-24 pb-12 px-6 h-screen overflow-hidden flex flex-col">

      <div className="flex-grow grid grid-cols-12 gap-6 h-[calc(100vh-140px)]">

        {/* LEFT COLUMN: Nav & Assets */}
        <div className="col-span-3 flex flex-col gap-6 overflow-y-auto pr-2">
          {/* Project Info */}
          <div className="p-6 rounded-3xl bg-[#0A0A0A] border border-white/5">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-4" />
            <h2 className="text-xl font-bold mb-1">{project ? project.name : 'Demo Project'}</h2>
            <div className="flex items-center gap-2 text-xs text-white/40">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Online Status
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            <SidebarItem icon={<LayoutDashboard size={18} />} label="Overview" active />
            <SidebarItem icon={<FileText size={18} />} label="Documents" />
            <SidebarItem icon={<CreditCard size={18} />} label="Facturation" />
            <SidebarItem icon={<Settings size={18} />} label="Settings" />
          </nav>

          <div className="h-px w-full bg-white/5 my-2" />

          {/* Assets */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white/30 uppercase tracking-widest px-2">Assets</p>
            <AssetItem icon={<Figma size={18} />} label="Design System" subLabel="Figma File" />
            <AssetItem icon={<Github size={18} />} label="Source Code" subLabel="Repository" />
            <AssetItem icon={<Database size={18} />} label="Database" subLabel="Supabase Dashboard" />
            <AssetItem icon={<Key size={18} />} label="API Keys" subLabel="Stripe / Keys" />
          </div>
        </div>

        {/* CENTER COLUMN: The Timeline */}
        <div className="col-span-5 bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold flex items-center gap-3">
              Development Timeline
              <span className="bg-[#3B82F6]/20 text-[#3B82F6] text-[10px] px-2 py-1 rounded-full border border-[#3B82F6]/30">Active</span>
            </h3>
            <div className="text-right">
              <div className="text-2xl font-black">{project ? project.progress : 'Demo'}%</div>
              <div className="w-20 h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-[#3B82F6]" style={{ width: `${project ? project.progress : 65}%` }} />
              </div>
            </div>
          </div>

          <div className="mt-8">
            {loading ? (
              <div className="text-white/40 text-center py-10">Loading timeline...</div>
            ) : timeline.length > 0 ? (
              timeline.map((step, idx) => (
                <TimelineStep
                  key={step.id}
                  status={step.status}
                  title={step.title}
                  date={step.date_label}
                  isLast={idx === timeline.length - 1}
                >
                  <p>{step.description}</p>
                </TimelineStep>
              ))
            ) : (
              /* Fallback Demo Content */
              <>
                <TimelineStep status="done" title="Phase 1: Onboarding" date="COMPLETED">
                  <p>Setup project repository, initial calls, and requirement gathering.</p>
                </TimelineStep>

                <TimelineStep status="done" title="Phase 2: UI/UX Design" date="VALIDATED 12/01">
                  <p>Wireframes, High-fidelity mockups, and interaction design.</p>
                </TimelineStep>

                <TimelineStep status="active" title="Phase 3: Backend Development" date="IN PROGRESS">
                  <div className="space-y-3 mt-2">
                    <p>Building the core API and Database architecture.</p>
                  </div>
                </TimelineStep>
              </>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Communication & Staging */}
        <div className="col-span-4 flex flex-col gap-6 h-full">

          {/* Live Preview */}
          <div className="flex-1 bg-[#0A0A0A] border border-white/5 rounded-3xl p-1 overflow-hidden relative group">
            <div className="absolute top-4 right-4 z-10 bg-black/80 backdrop-blur text-xs font-bold px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Staging Live
            </div>
            <div className="w-full h-full bg-white/5 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
              <p className="text-center text-white/30 text-sm">
                <span className="block text-2xl mb-2 font-bold text-white/50">Preview Build</span>
                v.0.4.2-alpha
              </p>
              {/* Mockup Iframe overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="px-6 py-2 bg-white text-black font-bold rounded-full transform scale-95 group-hover:scale-100 transition-all shadow-xl">Open Preview</button>
              </div>
            </div>
          </div>

          {/* Chat */}
          <div className="h-[45%] bg-[#0A0A0A] border border-white/5 rounded-3xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs font-bold uppercase tracking-wide">Dev Team</span>
              </div>
            </div>

            <div className="flex-grow p-4 space-y-4 overflow-y-auto">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px] font-bold text-blue-400">AI</div>
                <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none text-xs text-white/80 max-w-[80%]">
                  Hello {user?.email}! How can I assist you with your project today?
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-white/5">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Message the team..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-[#3B82F6] transition-colors"
                  value={msgInput}
                  onChange={(e) => setMsgInput(e.target.value)}
                />
                <button className="absolute right-2 top-2 p-1 bg-[#3B82F6] rounded-lg text-white hover:bg-blue-600 transition-colors">
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
