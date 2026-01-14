
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Send, Cpu, Download, ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY || '');

interface Message {
    role: 'system' | 'ai' | 'user';
    content: string | React.ReactNode;
}

const Architect: React.FC = () => {
    const [input, setInput] = useState('');
    const [step, setStep] = useState(0); // 0: Init, 1: Discovery, 2: Proposal, 3: Generation, 4: Blueprint
    const [messages, setMessages] = useState<Message[]>([]);
    const [blueprint, setBlueprint] = useState<any>(null); // Store parsed blueprint
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Initial Sequence
    useEffect(() => {
        if (step === 0) {
            const sequence = async () => {
                await new Promise(r => setTimeout(r, 800));
                addMessage('system', 'INITIALIZING ARCHITECT PROTOCOL v2.4 (GEMINI-POWERED)...');
                await new Promise(r => setTimeout(r, 1000));
                addMessage('system', 'ESTABLISHING SECURE CONNECTION...');
                await new Promise(r => setTimeout(r, 1000));
                addMessage('ai', "Bonjour. Je suis l'Architecte Devzi, propulsé par Gemini. Je suis ici pour transformer votre vision en structure technique.");
                await new Promise(r => setTimeout(r, 800));
                addMessage('ai', "Décrivez-moi votre projet en quelques phrases. (Ex: Une marketplace pour mettre en relation fleuristes et clients)");
                setStep(1);
            };
            sequence();
        }
    }, []);

    const addMessage = (role: 'system' | 'ai' | 'user', content: string | React.ReactNode) => {
        setMessages(prev => [...prev, { role, content }]);
    };

    const generateAIResponse = async (userPrompt: string) => {
        if (!GEMINI_API_KEY) {
            addMessage('system', 'ERROR: VITE_GEMINI_API_KEY is missing. Falling back to simulation logic.');
            return fallbackLogic(userPrompt);
        }

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });

            // Context injection
            const systemPrompt = `
                You are the "Devzi Architect", an expert software consultant. 
                Your goal is to briefly analyze the user's project idea and suggest a technical stack.
                Keep your response concise (max 3 sentences) and professional.
                Also, output a "suggestions" list in your response text if possible.
            `;

            const result = await model.generateContent(`${systemPrompt}\nUser says: ${userPrompt}`);
            const response = result.response;
            const text = response.text();

            addMessage('ai', text);

        } catch (error) {
            console.error(error);
            addMessage('system', 'CONNECTION ERROR. Falling back to local systems.');
            fallbackLogic(userPrompt);
        }
    };

    const generateBlueprint = async (userPrompt: string) => {
        if (!GEMINI_API_KEY) {
            setBlueprint({
                stack: "React, Vite, Tailwind",
                complexity: "Low",
                timeline: "2 Weeks",
                price: "€1,500 - €2,000"
            })
            setStep(4);
            return;
        }

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const prompt = `
                Analyze this project description: "${userPrompt}".
                Output ONLY a JSON object with the following fields: 
                stack (string), complexity (string), timeline (string), price (string range in EUR).
                Do not include markdown formatting like \`\`\`json.
            `;
            const result = await model.generateContent(prompt);
            const text = result.response.text().replace(/`/g, '').replace('json', '').trim();
            const data = JSON.parse(text);
            setBlueprint(data);
            setStep(4);
        } catch (e) {
            console.error("Failed to parse blueprint", e);
            setBlueprint({
                stack: "Custom Stack",
                complexity: "High",
                timeline: "Custom",
                price: "Contact for Quote"
            });
            setStep(4);
        }
    }


    const handleSend = async () => {
        if (!input.trim()) return;
        const userMsg = input;
        setInput('');
        addMessage('user', userMsg);

        if (step === 1) {
            setStep(2);
            addMessage('system', 'ANALYZING SEMANTIC VECTORS...');
            await generateAIResponse(userMsg);

            // Prompt for next step
            await new Promise(r => setTimeout(r, 1000));
            //  addMessage('ai', "Voulez-vous que je génère le Blueprint technique final pour ce projet ?");

        } else if (step === 2) {
            setStep(3);
            addMessage('system', 'COMPILING BLUEPRINT...');
            await generateBlueprint(userMsg); // Using previous context would be better but simple passing userMsg here for V1
        }
    };

    // Fallback if no API key
    const fallbackLogic = (userMsg: string) => {
        let response = "Compris. Projet ambitieux.";
        let suggestions = (
            <div className="flex flex-col gap-2 mt-2">
                <p>Pour ce type de projet, je recommande l'architecture suivante :</p>
                <ul className="list-none space-y-1 text-sm font-mono text-green-400">
                    <li>[+] Authentification OAuth2 (Google/Apple)</li>
                    <li>[+] Base de données relationnelle temps réel (Supabase)</li>
                </ul>
            </div>
        );
        addMessage('ai', <div>{response}{suggestions}</div>);
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="min-h-screen bg-black pt-24 pb-10 px-4 md:px-0 font-mono text-sm md:text-base flex flex-col items-center">

            {/* Container */}
            <div className="w-full max-w-3xl bg-[#050505] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[80vh]">

                {/* Terminal Header */}
                <div className="bg-[#111] px-4 py-2 border-b border-white/10 flex items-center justify-between">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="text-xs text-white/30 tracking-widest uppercase">Devzi Architect Protocol (Gemini Core)</div>
                    <Cpu size={14} className="text-blue-500" />
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                    {messages.map((msg, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={i}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[85%] p-4 rounded-xl border ${msg.role === 'user' ? 'bg-white/10 border-white/5 text-white' :
                                msg.role === 'system' ? 'bg-transparent border-none text-green-500/60 font-bold text-xs p-0 w-full' :
                                    'bg-blue-900/10 border-blue-500/20 text-blue-100'
                                }`}>
                                {msg.role === 'ai' && <div className="text-[10px] uppercase text-blue-400 mb-1 font-bold">Architect_AI</div>}
                                <div>{msg.content}</div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Blueprint Result */}
                    {step === 4 && blueprint && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="border border-[#F97316]/30 bg-[#F97316]/5 rounded-xl p-6 mt-4 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-2 opacity-50"><Cpu className="text-[#F97316]" size={40} /></div>
                            <h3 className="text-xl font-bold text-[#F97316] mb-6 uppercase tracking-widest border-b border-[#F97316]/20 pb-4">Project Blueprint Generated</h3>

                            <div className="grid grid-cols-2 gap-8 mb-8">
                                <div>
                                    <p className="text-xs text-white/40 uppercase mb-1">Tech Stack</p>
                                    <p className="text-white font-bold">{blueprint.stack}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-white/40 uppercase mb-1">Complexity</p>
                                    <p className="text-white font-bold">{blueprint.complexity}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-white/40 uppercase mb-1">Timeline Estimate</p>
                                    <p className="text-white font-bold">{blueprint.timeline}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-white/40 uppercase mb-1">Investment Range</p>
                                    <p className="text-white font-bold">{blueprint.price}</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button className="flex-1 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all">
                                    Valider le Blueprint <Check size={18} />
                                </button>
                                <button className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all border border-white/10">
                                    Download PDF <Download size={18} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-[#111] border-t border-white/10">
                    <div className={`flex items-center gap-4 bg-[#050505] border ${step === 4 ? 'border-gray-800 opacity-50 pointer-events-none' : 'border-white/20 focus-within:border-blue-500'} rounded-lg px-4 py-3 transition-colors`}>
                        <Terminal size={18} className="text-white/40" />
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={step === 4 ? "Session Complete" : "Entrez votre commande ou réponse..."}
                            className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder-white/20"
                            disabled={step === 4}
                            autoFocus
                        />
                        <button onClick={handleSend} disabled={step === 4} className="text-blue-500 hover:text-blue-400 disabled:opacity-50 transition-colors">
                            <Send size={18} />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Architect;
