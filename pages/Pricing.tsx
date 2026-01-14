
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Rocket, Zap, Database, Cpu, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BentoCard from '../components/BentoCard';

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'once' | 'monthly'>('once');
  const navigate = useNavigate();

  const packs = [
    {
      id: 'landing',
      title: 'The Landing',
      subtitle: 'Conversion Focus',
      price: { once: '€1,200', monthly: '€250' },
      description: 'Lancement de produit, capture d\'emails, pré-vente. En ligne sous 48h.',
      icon: <Rocket className="w-6 h-6" />,
      features: [
        'Design unique (Custom)',
        'Copywriting orienté conversion',
        'Intégration CRM (Leads)',
        'Animations Framer Motion',
        'Speed Score 95+'
      ],
      colSpan: 'md:col-span-1',
      action: 'Commander'
    },
    {
      id: 'saas',
      title: 'The SaaS Starter',
      subtitle: 'MVP Focus',
      price: { once: '€4,500', monthly: '€850' },
      description: 'Pour fondateurs. Un produit fonctionnel en 3 semaines.',
      icon: <Database className="w-6 h-6" />,
      features: [
        'Auth complète (Login/Magic Link)',
        'Base de données Supabase',
        'Paiements Stripe intégrés',
        'Dashboard utilisateur (CRUD)',
        'Admin Panel fondateur'
      ],
      colSpan: 'md:col-span-1',
      highlight: true,
      action: 'Démarrer le Build'
    },
    {
      id: 'scaler',
      title: 'The Scaler',
      subtitle: 'Growth Focus',
      price: { once: 'Sur Devis', monthly: 'Sur Devis' },
      description: 'Optimisation des opérations pour business existant.',
      icon: <Cpu className="w-6 h-6" />,
      features: [
        'Intégration d\'API complexes',
        'Système de gestion interne (ERP)',
        'Liaison écosystème Flowzi',
        'Architecture haute dispo'
      ],
      colSpan: 'md:col-span-1',
      action: 'Nous Contacter'
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 md:px-20 max-w-7xl mx-auto">
      {/* Header & Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div>
          <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">Service Store</h2>
          <p className="text-white/40 max-w-md">
            Des résultats packagés. Pas d'heures vendues.
            <br />Choisissez votre arme digitale.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/5 p-1 rounded-full border border-white/10">
          <button
            onClick={() => setBillingCycle('once')}
            className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${billingCycle === 'once' ? 'bg-[#3B82F6] text-white shadow-lg shadow-blue-500/20' : 'text-white/40 hover:text-white'
              }`}
          >
            Paiement Unique
          </button>
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${billingCycle === 'monthly' ? 'bg-[#3B82F6] text-white shadow-lg shadow-blue-500/20' : 'text-white/40 hover:text-white'
              }`}
          >
            Mensuel <span className="text-[9px] opacity-70 ml-1">(Maintenance)</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <AnimatePresence mode="wait">
          {packs.map((pack) => (
            <BentoCard
              key={pack.id}
              title={pack.title}
              icon={pack.icon}
              className={`${pack.colSpan} h-full flex flex-col`}
              active={pack.highlight}
              headerContent={
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">{pack.subtitle}</p>
                </div>
              }
            >
              <div className="mb-6">
                <motion.div
                  key={billingCycle}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-4xl font-black"
                >
                  {pack.price[billingCycle]}
                </motion.div>
                <p className="text-sm text-white/40 mt-1">{billingCycle === 'once' ? 'Facturé une fois' : 'Par mois, sans engagement'}</p>
              </div>

              <p className="text-sm text-white/60 mb-6 min-h-[40px]">{pack.description}</p>

              <ul className="space-y-3 mb-8 flex-grow">
                {pack.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-white/70">
                    <Check size={14} className="text-[#3B82F6] mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 ${pack.highlight ? 'bg-[#3B82F6] text-white hover:bg-blue-600' : 'bg-white/5 hover:bg-white/10'}`}>
                {pack.action} <ArrowRight size={14} />
              </button>
            </BentoCard>
          ))}
        </AnimatePresence>

        {/* Custom Build (Full Width or Special Card) */}
        <BentoCard
          title="Custom Build"
          icon={<Zap className="w-6 h-6" />}
          className="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-blue-900/20 to-purple-900/20"
          headerContent={
            <div className="px-3 py-1 bg-[#3B82F6]/20 text-[#3B82F6] rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#3B82F6]/30">
              AI Architect
            </div>
          }
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 h-full">
            <div className="md:max-w-xl">
              <p className="text-lg text-white/80 mb-4">
                Vous avez une vision spécifique ? Discutez avec notre Architecte IA pour concevoir votre cahier des charges en temps réel.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Analyse des besoins', 'Stack technique sur mesure', 'Estimation immédiate'].map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-black/40 rounded-full text-[10px] text-white/50 border border-white/5">{tag}</span>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate('/architect')}
              className="w-full md:w-auto px-8 py-4 bg-white text-black hover:bg-gray-200 transition-colors rounded-xl font-bold uppercase tracking-wide flex items-center justify-center gap-2"
            >
              Discuter avec l'Architecte
              <ArrowRight size={16} />
            </button>
          </div>
        </BentoCard>

      </div>
    </div>
  );
};

export default Pricing;
