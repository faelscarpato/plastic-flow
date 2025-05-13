"use client";

import { useEffect, useState } from "react";
import { BarChart3, Users, Package, AlertCircle, DollarSign, Settings, LineChart } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";
import AIIntegration from "@/components/ai-integration/ai-chat";

interface DashboardCard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  color: string;
}

interface QuickAccessOption {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const Dashboard = () => {
  const [selectedModule, setSelectedModule] = useState("todos");
  const [showAIHelper, setShowAIHelper] = useState(false);
  
  const cards: DashboardCard[] = [
    {
      title: "Produção Diária",
      value: "2,580",
      change: "+15%",
      isPositive: true,
      icon: <Settings />,
      color: "bg-blue-100 text-blue-800"
    },
    {
      title: "Atendimento de Pedidos",
      value: "98%",
      change: "+2%",
      isPositive: true,
      icon: <Package />,
      color: "bg-green-100 text-green-800"
    },
    {
      title: "Produtos em Estoque",
      value: "14,520",
      change: "+5%",
      isPositive: true,
      icon: <BarChart3 />,
      color: "bg-purple-100 text-purple-800"
    },
    {
      title: "Manutenções Pendentes",
      value: "7",
      change: "-3",
      isPositive: true,
      icon: <AlertCircle />,
      color: "bg-orange-100 text-orange-800"
    },
    {
      title: "Faturamento Mensal",
      value: "R$ 845K",
      change: "+12%",
      isPositive: true,
      icon: <DollarSign />,
      color: "bg-indigo-100 text-indigo-800"
    },
    {
      title: "Colaboradores Ativos",
      value: "128",
      change: "+3",
      isPositive: true,
      icon: <Users />,
      color: "bg-pink-100 text-pink-800"
    }
  ];

  const productionData = [
    { name: 'Seg', Planejado: 1200, Realizado: 1100 },
    { name: 'Ter', Planejado: 1300, Realizado: 1250 },
    { name: 'Qua', Planejado: 1400, Realizado: 1450 },
    { name: 'Qui', Planejado: 1200, Realizado: 1300 },
    { name: 'Sex', Planejado: 1100, Realizado: 1050 },
  ];

  const stockDistribution = [
    { name: 'Matéria-Prima', value: 35 },
    { name: 'Embalagens', value: 15 },
    { name: 'Produtos Acabados', value: 50 },
  ];

  const colors = ['#0088FE', '#00C49F', '#FFBB28'];

  const quickAccess: QuickAccessOption[] = [
    {
      title: "Estoque",
      description: "Consultar saldo de matéria-prima",
      icon: <Package className="h-6 w-6" />,
      href: "/estoque/materia-prima"
    },
    {
      title: "Produção",
      description: "Registrar apontamento de produção",
      icon: <Settings className="h-6 w-6" />,
      href: "/producao/apontamentos"
    },
    {
      title: "Qualidade",
      description: "Registrar não conformidade",
      icon: <AlertCircle className="h-6 w-6" />,
      href: "/qualidade/rncs"
    },
    {
      title: "Manutenção",
      description: "Abrir ordem de serviço",
      icon: <LineChart className="h-6 w-6" />,
      href: "/manutencao/ordens"
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-gray-600">Acompanhamento em tempo real das métricas principais</p>
        </div>
        <div className="flex space-x-2">
          <select 
            className="border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
          >
            <option value="todos">Todos os módulos</option>
            <option value="producao">Produção</option>
            <option value="estoque">Estoque</option>
            <option value="financeiro">Financeiro</option>
            <option value="qualidade">Qualidade</option>
            <option value="manutencao">Manutenção</option>
          </select>
          <button 
            onClick={() => setShowAIHelper(!showAIHelper)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center"
          >
            {showAIHelper ? "Fechar IA" : "Assistente IA"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-5"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">{card.title}</h3>
                <div className="mt-1 flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
                  <span className={`ml-2 text-xs font-medium ${card.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {card.change}
                  </span>
                </div>
              </div>
              <div className={`p-2 rounded-full ${card.color}`}>
                {card.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-5"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-800">Produção Semanal</h3>
            <div className="text-xs text-gray-500">Última atualização: hoje às 09:30</div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={productionData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Planejado" fill="#8884d8" />
                <Bar dataKey="Realizado" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-5"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-800">Distribuição de Estoque</h3>
            <div className="text-xs text-gray-500">Última atualização: hoje às 09:30</div>
          </div>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stockDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {stockDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-5"
      >
        <h3 className="font-medium text-gray-800 mb-4">Acesso Rápido</h3>
        <div className="grid grid-cols-4 gap-4">
          {quickAccess.map((option, index) => (
            <a 
              href={option.href}
              key={option.title}
              className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors flex flex-col items-center text-center"
            >
              <div className="p-3 bg-blue-100 rounded-full text-blue-700 mb-3">
                {option.icon}
              </div>
              <h4 className="font-medium text-gray-800">{option.title}</h4>
              <p className="text-xs text-gray-500 mt-1">{option.description}</p>
            </a>
          ))}
        </div>
      </motion.div>

      {showAIHelper && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
        >
          <div className="border-b border-gray-200 px-4 py-3 flex justify-between items-center bg-blue-50">
            <h3 className="font-medium text-gray-800">Assistente IA</h3>
            <button 
              onClick={() => setShowAIHelper(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>
          <div className="p-4 h-96">
            <AIIntegration />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
