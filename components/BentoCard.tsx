import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

interface BentoCardProps {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    className?: string;
    children?: React.ReactNode;
    headerContent?: React.ReactNode;
    onClick?: () => void;
    active?: boolean;
}

const BentoCard: React.FC<BentoCardProps> = ({
    title,
    description,
    icon,
    className = "",
    children,
    headerContent,
    onClick,
    active = false
}) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            onClick={onClick}
            onMouseMove={handleMouseMove}
            className={`group relative overflow-hidden rounded-3xl bg-[#0A0A0A] border transition-all duration-300 ${active ? 'border-[#3B82F6] shadow-lg shadow-[#3B82F6]/10' : 'border-white/5 hover:border-[#3B82F6]/50'} ${className}`}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.15),
              transparent 80%
            )
          `,
                }}
            />
            <div className="relative z-10 h-full flex flex-col p-8">
                <div className="flex justify-between items-start mb-6">
                    {icon && (
                        <div className="p-3 w-fit rounded-xl bg-white/5 text-[#3B82F6]">
                            {icon}
                        </div>
                    )}
                    {headerContent}
                </div>

                <h3 className="text-2xl font-bold mb-3">{title}</h3>
                {description && <p className="text-white/40 text-sm leading-relaxed mb-6">{description}</p>}
                {children && <div className="mt-auto">{children}</div>}
            </div>
        </motion.div>
    );
};

export default BentoCard;
