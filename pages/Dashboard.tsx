
import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, CheckCircle2, Clock, AlertCircle, BarChart3, Users } from 'lucide-react';

const TaskItem: React.FC<{ title: string; status: 'done' | 'pending' | 'alert'; date: string }> = ({ title, status, date }) => {
  const icons = {
    done: <CheckCircle2 className="text-green-500" size={18} />,
    pending: <Clock className="text-yellow-500" size={18} />,
    alert: <AlertCircle className="text-red-500" size={18} />
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/10 transition-all cursor-pointer">
      <div className="flex items-center gap-4">
        {icons[status]}
        <div>
          <h4 className="text-sm font-medium">{title}</h4>
          <p className="text-[10px] text-white/20 font-mono uppercase">{date}</p>
        </div>
      </div>
      <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${status === 'done' ? 'bg-green-500/10 text-green-500' : status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'}`}>
        {status}
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <div className="flex items-center gap-3 text-[#3B82F6] mb-2">
            <LayoutDashboard size={20} />
            <span className="text-xs font-mono uppercase tracking-[0.3em]">Command Center</span>
          </div>
          <h2 className="text-5xl font-black uppercase tracking-tighter">Project Alpha</h2>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-[10px] text-white/20 uppercase font-mono">Completion</p>
            <p className="text-2xl font-bold">74%</p>
          </div>
          <div className="w-40 h-10 bg-white/5 rounded-full overflow-hidden self-center border border-white/10">
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: '74%' }} 
              transition={{ duration: 1.5, ease: "circOut" }}
              className="h-full bg-gradient-to-r from-[#3B82F6] to-[#F97316]"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Task List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#0A0A0A] p-8 rounded-3xl border border-white/5 h-full">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
              Active Sprints <span className="text-xs font-mono font-normal text-white/20 bg-white/5 px-2 py-1 rounded">V2.4.0</span>
            </h3>
            <div className="space-y-3">
              <TaskItem title="WebGL Shader Optimization" status="done" date="OCT 12" />
              <TaskItem title="Gemini AI Integration" status="pending" date="OCT 15" />
              <TaskItem title="Mobile Responsive Polish" status="pending" date="OCT 18" />
              <TaskItem title="User Authentication Bug" status="alert" date="OCT 14" />
              <TaskItem title="Database Migration" status="done" date="OCT 08" />
              <TaskItem title="Global Search Tooling" status="pending" date="OCT 22" />
            </div>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-8">
          <div className="bg-[#0A0A0A] p-8 rounded-3xl border border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="text-[#F97316]" size={20} />
              <h3 className="text-lg font-bold">Velocity</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Design</span>
                <span className="font-mono">92%</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="w-[92%] h-full bg-[#3B82F6]" />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Engineering</span>
                <span className="font-mono">65%</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="w-[65%] h-full bg-[#F97316]" />
              </div>
            </div>
          </div>

          <div className="bg-[#0A0A0A] p-8 rounded-3xl border border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <Users className="text-[#3B82F6]" size={20} />
              <h3 className="text-lg font-bold">Team</h3>
            </div>
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-10 h-10 rounded-full border-2 border-black" alt="avatar" />
              ))}
              <div className="w-10 h-10 rounded-full bg-white/5 border-2 border-black flex items-center justify-center text-[10px] font-bold">+2</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
