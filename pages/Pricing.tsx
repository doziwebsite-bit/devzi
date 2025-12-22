
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, ShieldCheck } from 'lucide-react';

const PriceCard: React.FC<{
  tier: string;
  price: string;
  features: string[];
  icon: React.ReactNode;
  highlight?: boolean;
}> = ({ tier, price, features, icon, highlight }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className={`p-10 rounded-3xl border ${highlight ? 'border-[#3B82F6] bg-white/[0.03]' : 'border-white/5 bg-[#0A0A0A]'} relative overflow-hidden`}
  >
    {highlight && (
      <div className="absolute top-0 right-0 bg-[#3B82F6] px-4 py-1 text-[10px] font-bold uppercase rounded-bl-xl">Popular</div>
    )}
    <div className="p-3 bg-white/5 w-fit rounded-xl mb-6 text-[#3B82F6]">{icon}</div>
    <h3 className="text-2xl font-bold mb-2">{tier}</h3>
    <div className="flex items-baseline gap-1 mb-8">
      <span className="text-4xl font-black">{price}</span>
      <span className="text-white/40 text-sm">/project</span>
    </div>
    <ul className="space-y-4 mb-10">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-3 text-sm text-white/60">
          <Check size={14} className="text-[#3B82F6]" /> {f}
        </li>
      ))}
    </ul>
    <button className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${highlight ? 'bg-[#3B82F6] text-white hover:bg-[#2563EB]' : 'bg-white/5 hover:bg-white/10'}`}>
      Select Tier
    </button>
  </motion.div>
);

const Pricing: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-20 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-6xl font-black uppercase tracking-tighter mb-6">Investment</h2>
        <p className="text-white/40 max-w-xl mx-auto">Transparent pricing for premium digital transmutations. Choose your level of engagement.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PriceCard 
          tier="Genesis" 
          price="€5k+" 
          icon={<Zap size={24} />}
          features={['Single Page Experience', 'Core Brand Identity', 'Standard Animations', '2 Weeks Delivery']}
        />
        <PriceCard 
          tier="Synthesis" 
          price="€15k+" 
          highlight
          icon={<Crown size={24} />}
          features={['Multi-page Platform', 'Advanced UI/UX Kit', 'Custom WebGL Assets', 'AI Integration', '4-6 Weeks Delivery']}
        />
        <PriceCard 
          tier="Eternal" 
          price="€40k+" 
          icon={<ShieldCheck size={24} />}
          features={['Enterprise Ecosystem', 'Full AI Automation', 'Ongoing Optimization', '24/7 Priority Lab Access', 'Custom Timeline']}
        />
      </div>
    </div>
  );
};

export default Pricing;
