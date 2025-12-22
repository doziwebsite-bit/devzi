
import React from 'react';
import { Code2, Palette, Globe, Cpu } from 'lucide-react';
import { ProjectItem, TimelineStep } from './types';

export const COLORS = {
  blue: '#3B82F6',
  orange: '#F97316',
  bg: '#030303',
  card: '#0A0A0A',
};

export const PROJECTS: ProjectItem[] = [
  { id: '1', title: 'Lumina Dashboard', category: 'Fintech / Web', image: 'https://picsum.photos/1200/800?random=10' },
  { id: '2', title: 'Nexus VR', category: 'Experience / XR', image: 'https://picsum.photos/1200/800?random=11' },
  { id: '3', title: 'Aura Health', category: 'Mobile / AI', image: 'https://picsum.photos/1200/800?random=12' },
  { id: '4', title: 'Vertex Studio', category: 'Architecture / 3D', image: 'https://picsum.photos/1200/800?random=13' },
];

export const STEPS: TimelineStep[] = [
  { id: 1, title: 'Discovery', description: 'Deep dive into your brand DNA, goals, and user behavior.' },
  { id: 2, title: 'Strategy', description: 'Architecting the roadmap for technical and creative excellence.' },
  { id: 3, title: 'Build', description: 'Transforming blueprints into high-performance digital reality.' },
  { id: 4, title: 'Scale', description: 'Optimizing and evolving with real-time user feedback.' },
];
