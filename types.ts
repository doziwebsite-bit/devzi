
import React from 'react';

/**
 * Interface for Service Card component props.
 * React must be imported to use React.ReactNode in .ts files.
 */
export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface TimelineStep {
  id: number;
  title: string;
  description: string;
}
