import React, { useState, useEffect, useRef } from 'react';
import { Coach } from '../mockData';
import { Send, ChevronLeft, Phone, Video, MoreVertical, CheckCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'coach';
  timestamp: Date;
}

interface ChatProps {
  coach: Coach;
  onBack: () => void;
}

const Chat: React.FC<ChatProps> = ({ coach, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi! I'm ${coach.name}. Thanks for reaching out. How can I help you with your training today?`,
      sender: 'coach',
      timestamp: new Date(Date.now() - 1000 * 60 * 5)
    }
  ]);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Mock coach response
    setTimeout(() => {
      const coachResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "That sounds great! I'd love to discuss a personalized plan for you. When are you free for a quick call?",
        sender: 'coach',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, coachResponse]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-100 px-4 h-20 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-900" />
          </button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={coach.photo} 
                alt={coach.name} 
                className="w-10 h-10 rounded-full object-cover border border-gray-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">{coach.name}</h3>
              <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Online</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
            <Phone size={20} />
          </button>
          <button className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
            <Video size={20} />
          </button>
          <button className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-6">
        <div className="text-center py-8">
          <div className="inline-block px-4 py-1.5 bg-gray-200/50 rounded-full text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            Today
          </div>
        </div>
        
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] px-5 py-3 rounded-[1.5rem] shadow-sm relative ${
              msg.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
            }`}>
              <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
              <div className={`flex items-center gap-1 mt-1 justify-end ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                <span className="text-[9px] font-bold">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {msg.sender === 'user' && <CheckCheck size={12} />}
              </div>
            </div>
          </motion.div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100 shadow-2xl">
        <div className="max-w-4xl mx-auto relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="w-full pl-6 pr-16 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-blue-600 transition-all font-medium text-sm"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 shadow-lg shadow-blue-200"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
