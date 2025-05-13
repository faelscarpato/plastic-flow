"use client";

import { useState } from "react";
import { Calendar, Box, ListChecks, Search, FilePlus, BarChart2, Clock } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const productionOrders = [
  { id: "OP-2023-0587", product: "Frasco 500ml Tampa Azul", quantity: 5000, start: "2023-05-12", end: "2023-05-12", status: "em_producao" },
  { id: "OP-2023-0586", product: "Caixa Organizadora 15L", quantity: 1200, start: "2023-05-12", end: "2023-05-13", status: "agendada" },
  { id: "OP-2023-0585", product: "Tampa Flip-top 38mm", quantity: 10000, start: "2023-05-11", end: "2023-05-11", status: "concluida" },
  { id: "OP-2023-0584", product: "Bandeja 4 Compartimentos", quantity: 3000, start: "2023-05-10", end: "2023-05-10", status: "concluida" },
];

const materialShortages = [
  { material: "Polietileno de Alta Densidade", required: 850, available: 620, unit: "kg", critical: true },
  { material: "Pigmento Azul", required: 35, available: 15, unit: "kg", critical: true },
  { material: "Aditivo UV", required: 25, available: 20, unit: "kg", critical: false },
];

const productionCapacity = [
  { name: 'Inj-01', planned: 80, actual: 75, capacity: 85 },
  { name: 'Inj-02', planned: 60, actual: 58, capacity: 85 },
  { name: 'Inj-03', planned: 90, actual: 85, capacity: 85 },
  { name: 'Inj-04', planned: 40, actual: 42, capacity: 85 },
  { name: 'Inj-05', planned: 70, actual: 68, capacity: 85 },
  { name: 'Inj-06', planned: 85, actual: 80, capacity: 85 },
];

const PCPDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Planejamento e Controle da Produção</h2>
          <p className="text-gray-600">Planejamento, programação e controle de recursos</p>
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
            href="/pcp/nova-ordem"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FilePlus className="mr-2 h-4 w-4" />
            Nova Ordem
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
            onClick={() => setActiveTab("produtos")}
            className={`py-4 px-6 font-medium text-sm focus:outline-none ${
              activeTab === "produtos"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Cadastro de Produtos
          </button>
          <button
            onClick={() => setActiveTab("ordens")}
            className={`py-4 px-6 font-medium text-sm focus:outline-none ${
              activeTab === "ordens"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Ordens de Produção
          </button>
          <button
            onClick={() => setActiveTab("mrp")}
            className={`py-4 px-6 font-medium text-sm focus:outline-none ${
              activeTab === "mrp"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            MRP
          </button>
          <button
            onClick={() => setActiveTab("crp")}
            className={`py-4 px-6 font-medium text-sm focus:outline-none ${
              activeTab === "crp"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Capacidade (CRP)
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
                  <p className="text-sm text-gray-500">Ordens Planejadas</p>
                  <h3 className="text-2xl font-bold mt-1">42</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="text-blue-600">Para próximos 7 dias</span>
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
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-5"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Produção em Andamento</p>
                  <h3 className="text-2xl font-bold mt-1">8</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="text-green-600">Progresso normal</span>
                  </p>
                </div>
                <div className="p-3 bg-green-100 text-green-700 rounded-full h-12 w-12 flex items-center justify-center">
                  <Box />
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
                  <p className="text-sm text-gray-500">Materiais em Falta</p>
                  <h3 className="text-2xl font-bold mt-1">5</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="text-red-600">2 críticos</span>
                  </p>
                </div>
                <div className="p-3 bg-red-100 text-red-700 rounded-full h-12 w-12 flex items-center justify-center">
                  <ListChecks />
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
                  <p className="text-sm text-gray-500">Índice de Produtividade</p>
                  <h3 className="text-2xl font-bold mt-1">94%</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="text-green-600">+2% vs. meta</span>
                  </p>
                </div>
                <div className="p-3 bg-purple-100 text-purple-700 rounded-full h-12 w-12 flex items-center justify-center">
                  <BarChart2 />
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
                <h3 className="font-medium text-gray-800">Ordens de Produção Recentes</h3>
                <Link
                  href="/pcp/ordens"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Ver todas
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OP</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qtde</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Início</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fim</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {productionOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{order.product}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{order.quantity}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{order.start}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{order.end}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm">
                          {order.status === "em_producao" ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Em produção
                            </span>
                          ) : order.status === "agendada" ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Agendada
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
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
                <h3 className="font-medium text-gray-800">Itens com Falta de Material</h3>
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {materialShortages.length} itens
                </span>
              </div>
              <div className="space-y-3">
                {materialShortages.map((material, index) => (
                  <div key={index} className={`p-3 border rounded-md ${
                    material.critical ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'
                  }`}>
                    <h4 className="font-medium text-gray-800">{material.material}</h4>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                      <div className="text-gray-500">Necessário: <span className="font-medium">{material.required} {material.unit}</span></div>
                      <div className="text-gray-500">Disponível: <span className="font-medium">{material.available} {material.unit}</span></div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`rounded-full h-2 ${material.critical ? 'bg-red-500' : 'bg-yellow-500'}`}
                          style={{ width: `${(material.available / material.required) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Solicitar compra
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-5"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-800">Utilização de Capacidade por Máquina</h3>
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  <div className="h-3 w-3 bg-blue-500 mr-1"></div>
                  <span className="text-xs text-gray-500">Planejado</span>
                </div>
                <div className="flex items-center mr-4">
                  <div className="h-3 w-3 bg-green-500 mr-1"></div>
                  <span className="text-xs text-gray-500">Realizado</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-gray-300 mr-1"></div>
                  <span className="text-xs text-gray-500">Capacidade</span>
                </div>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={productionCapacity}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="planned" fill="#3b82f6" />
                  <Bar dataKey="actual" fill="#22c55e" />
                  <Bar dataKey="capacity" fill="#d1d5db" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      )}

      {/* Other tabs content would go here */}
      {(activeTab === "produtos" || activeTab === "ordens" || activeTab === "mrp" || activeTab === "crp") && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            {activeTab === "produtos" ? "Cadastro de Produtos" : 
            activeTab === "ordens" ? "Gestão de Ordens de Produção" :
            activeTab === "mrp" ? "MRP - Planejamento de Necessidades de Materiais" :
            "CRP - Planejamento de Capacidade"}
          </h3>
          <p className="text-gray-600 mb-6">Conteúdo a ser implementado.</p>
        </div>
      )}
    </div>
  );
};

export default PCPDashboard;
