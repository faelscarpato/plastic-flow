"use client";

import { useState } from "react";
import { Wrench, AlertTriangle, CheckCircle, Clock, Search, FilePlus, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const serviceOrders = [
  { id: "OS-2023-0098", equipment: "Injetora XYZ-350", type: "Corretiva", priority: "alta", requestedBy: "João Silva", status: "em_andamento", description: "Vazamento de óleo no cilindro principal" },
  { id: "OS-2023-0097", equipment: "Esteira Transportadora 02", type: "Preventiva", priority: "normal", requestedBy: "Sistema", status: "agendada", description: "Manutenção trimestral - lubrificação e ajustes" },
  { id: "OS-2023-0096", equipment: "Chiller Industrial", type: "Preditiva", priority: "normal", requestedBy: "Sistema", status: "agendada", description: "Análise de vibração e termografia" },
  { id: "OS-2023-0095", equipment: "Moinho Granulador", type: "Corretiva", priority: "alta", requestedBy: "Ana Costa", status: "concluida", description: "Substituição de facas e contra-facas" },
];

const pendingMaintenances = [
  { equipment: "Injetora ABC-250", type: "Preventiva", scheduled: "2023-05-15", estimatedTime: "4h" },
  { equipment: "Misturador Industrial", type: "Preventiva", scheduled: "2023-05-16", estimatedTime: "2h" },
  { equipment: "Robô Manipulador", type: "Preditiva", scheduled: "2023-05-17", estimatedTime: "3h" },
];

const maintenanceByType = [
  { name: "Corretiva", value: 35 },
  { name: "Preventiva", value: 45 },
  { name: "Preditiva", value: 20 },
];

const COLORS = ["#ff7675", "#74b9ff", "#55efc4"];

const equipmentStatus = [
  { name: "Operando Normalmente", value: 82 },
  { name: "Em Manutenção", value: 12 },
  { name: "Inoperante", value: 6 },
];

const STATUS_COLORS = ["#55efc4", "#74b9ff", "#ff7675"];

const MaintenanceDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Gestão de Manutenção</h2>
          <p className="text-gray-600">Ordens de serviço e monitoramento de equipamentos</p>
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <Link
            href="/manutencao/nova-ordem"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FilePlus className="mr-2 h-4 w-4" />
            Nova OS
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <nav className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`py-4 px-6 font-medium text-sm focus:outline-none ${
              activeTab === "dashboard"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("ativos")}
            className={`py-4 px-6 font-medium text-sm focus:outline-none ${
              activeTab === "ativos"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Ativos
          </button>
          <button
            onClick={() => setActiveTab("ordens")}
            className={`py-4 px-6 font-medium text-sm focus:outline-none ${
              activeTab === "ordens"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Ordens de Serviço
          </button>
          <button
            onClick={() => setActiveTab("historico")}
            className={`py-4 px-6 font-medium text-sm focus:outline-none ${
              activeTab === "historico"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Histórico
          </button>
          <button
            onClick={() => setActiveTab("indicadores")}
            className={`py-4 px-6 font-medium text-sm focus:outline-none ${
              activeTab === "indicadores"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Indicadores
          </button>
        </nav>
      </div>

      {activeTab === "dashboard" && (
        <div>
          <div className="grid grid-cols-4 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-5"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">OS em Aberto</p>
                  <h3 className="text-2xl font-bold mt-1">18</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="text-red-600">5 urgentes</span>
                  </p>
                </div>
                <div className="p-3 bg-red-100 text-red-700 rounded-full h-12 w-12 flex items-center justify-center">
                  <AlertTriangle />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-5"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">OS Concluídas (Mês)</p>
                  <h3 className="text-2xl font-bold mt-1">42</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="text-green-600">+8% vs. mês anterior</span>
                  </p>
                </div>
                <div className="p-3 bg-green-100 text-green-700 rounded-full h-12 w-12 flex items-center justify-center">
                  <CheckCircle />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-5"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Manutenções Preventivas</p>
                  <h3 className="text-2xl font-bold mt-1">12</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="text-blue-600">Próximos 7 dias</span>
                  </p>
                </div>
                <div className="p-3 bg-blue-100 text-blue-700 rounded-full h-12 w-12 flex items-center justify-center">
                  <Calendar />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-5"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Tempo Médio de Reparo</p>
                  <h3 className="text-2xl font-bold mt-1">3.2h</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="text-green-600">-0.5h vs. meta</span>
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 text-yellow-700 rounded-full h-12 w-12 flex items-center justify-center">
                  <Clock />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-5"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-800">Ordens de Serviço Recentes</h3>
                <Link
                  href="/manutencao/ordens"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Ver todas
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OS</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipamento</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prioridade</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {serviceOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{order.equipment}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.type === "Corretiva" 
                              ? "bg-red-100 text-red-800"
                              : order.type === "Preventiva" 
                              ? "bg-blue-100 text-blue-800" 
                              : "bg-green-100 text-green-800"
                          }`}>
                            {order.type}
                          </span>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm">
                          {order.priority === "alta" ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Alta
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Normal
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm">
                          {order.status === "em_andamento" ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Em andamento
                            </span>
                          ) : order.status === "agendada" ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Agendada
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Concluída
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-800 mr-2">Ver</button>
                          {order.status !== "concluida" && (
                            <button className="text-blue-600 hover:text-blue-800">Editar</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-5"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-800">Manutenções Agendadas</h3>
                <Link
                  href="/manutencao/calendario"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Calendário
                </Link>
              </div>
              <div className="space-y-3">
                {pendingMaintenances.map((maintenance, index) => (
                  <div key={index} className="p-3 border border-blue-100 bg-blue-50 rounded-md">
                    <h4 className="font-medium text-gray-800">{maintenance.equipment}</h4>
                    <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        maintenance.type === "Corretiva" 
                          ? "bg-red-100 text-red-800"
                          : maintenance.type === "Preventiva" 
                          ? "bg-blue-100 text-blue-800" 
                          : "bg-green-100 text-green-800"
                      }`}>
                        {maintenance.type}
                      </span>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {maintenance.scheduled}
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>Tempo estimado:</span>
                        <span className="font-medium">{maintenance.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-5"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-800">Distribuição por Tipo</h3>
              </div>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={maintenanceByType}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {maintenanceByType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-5"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-800">Status dos Equipamentos</h3>
              </div>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={equipmentStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {equipmentStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Other tabs content would go here */}
      {(activeTab === "ativos" || activeTab === "ordens" || activeTab === "historico" || activeTab === "indicadores") && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            {activeTab === "ativos" ? "Cadastro de Ativos" : 
            activeTab === "ordens" ? "Gestão de Ordens de Serviço" :
            activeTab === "historico" ? "Histórico de Manutenções" :
            "Indicadores de Manutenção"}
          </h3>
          <p className="text-gray-600 mb-6">Conteúdo a ser implementado.</p>
        </div>
      )}
    </div>
  );
};

export default MaintenanceDashboard;
