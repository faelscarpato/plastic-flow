"use client";

import { useState, useRef, useEffect } from 'react';
import { 
  generateText, 
  generateTextStream, 
  getTextProviders, 
  TextGenerationResult 
} from '@/lib/api/util';
import { Send, Loader2 } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const AIIntegration = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedAIProvider') || getTextProviders()[0];
    }
    return getTextProviders()[0];
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedAIProvider', selectedProvider);
    }
  }, [selectedProvider]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    
    try {
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
      
      let assistantContent = '';
      
      await generateTextStream(
        userMessage,
        (chunk) => {
          assistantContent += chunk;
          setMessages(prev => [
            ...prev.slice(0, -1),
            { role: 'assistant', content: assistantContent }
          ]);
        },
        selectedProvider
      );
      
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages(prev => [
        ...prev.slice(0, -1),
        { role: 'assistant', content: 'Desculpe, ocorreu um erro ao processar sua solicitação.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <label htmlFor="provider-select" className="block text-sm font-medium text-gray-700 mb-1">
            Modelo IA:
          </label>
          <select
            id="provider-select"
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            disabled={isLoading}
          >
            {getTextProviders().map(provider => (
              <option key={provider} value={provider}>
                {provider === 'gemini-2.0-flash-exp' ? 'Gemini 2.0 Flash' : 
                 provider === 'gemini-1.5-pro' ? 'Gemini 1.5 Pro' : 
                 provider}
              </option>
            ))}
          </select>
        </div>
        <div className="text-xs text-gray-500">
          Assistente para consulta de informações
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 border border-gray-200 rounded-md bg-gray-50 p-3">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>Como posso ajudar com informações sobre o sistema?</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-blue-100 ml-6' 
                    : 'bg-white border border-gray-200 mr-6'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua pergunta..."
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className={`px-3 py-2 rounded-md ${
            isLoading || !input.trim() 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        </button>
      </form>
    </div>
  );
};

export default AIIntegration;
