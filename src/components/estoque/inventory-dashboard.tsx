"use client";

import { useState } from "react";
import { Package, ArrowUpCircle, ArrowDownCircle, RefreshCw, Search, FilePlus } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const stockCategories = [
  { name: "Matéria-Prima", count: 152, value: "R$ 285.240,00" },
  { name: "Embalagens", count: 53, value: "R$ 48.320,00" },
  { name: "Produto Acabado", count: 87, value: "R$ 520.650,00" }
];

const recentMovements = [
  { id: "MOV-001", type: "entrada", date: "2023-05-12 08:30", item: "Resina Polietileno", quantity: "500 kg", user: "Carlos Silva" },
  { id: "MOV-002", type: "saida", date: "2023-05-12 09:15", item: "Filme Stretch", quantity: "20 rolos", user: "Ana Oliveira" },
  { id: "MOV-003", type: "entrada", date: "2023-05-11 14:22", item: "Caixas de Papelão", quantity: "150 un", user: "João Santos" },
  { id: "MOV-004", type: "saida", date: "2023-05-11 10:45", item: "Pigmento Azul", quantity: "25 kg", user: "Maria Costa" },
  { id: "MOV-005", type: "ajuste", date: "2023-05-10 16:30", item: "Resina ABS", quantity: "+15 kg", user: "Roberto Pereira" }
];

const alertItems = [
  { id: "MP-001", name: "Polietileno de Alta Densidade", current: 250, min: 300, type: "Matéria-Prima" },
  { id: "MP-002", name: "Pigmento Verde", current: 5, min: 10, type: "Matéria-Prima" },
  { id: "EMB-001", name: "Caixas 30x20x15", current: 120, min: 200, type: "Embalagens" }
];

const InventoryDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Gestão de Estoque</h2>
          <p className="text-gray-600">Controle e movimentação de materiais</p>
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Buscar item..." 
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <Link
            href="/estoque/novo-item"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FilePlus className="mr-2 h-4 w-4" />
            Novo Item
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
            onClick={() => setActiveTab("materiaprima")}
            className={`py-4 px-6 font-medium text-sm focus:outline-none ${
              activeTab === "materiaprima"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Matéria-Prima
          </button>
          <button
            onClick={() => setActiveTab("embalagens")}
            className={`py-4 px-6 font-medium text-sm focus:outline-none ${
              activeTab === "embalagens"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Embalagens
          </button>
          <button
            onClick={() => setActiveTab("produtos")}
            className={`py-4 px-6 font-medium text-sm focus:outline-none ${
              activeTab === "produtos"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Produtos Acabados
          </button>
          <button
            onClick={() => setActiveTab("movimentacoes")}
            className={`py-4 px-6 font-medium text-sm focus:outline-none ${
              activeTab === "movimentacoes"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Movimentações
          </button>
        </nav>
      </div>

      {activeTab === "dashboard" && (
        <div>
          <div className="grid grid-cols-3 gap-6 mb-6">
            {stockCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-5"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{category.name}</p>
                    <h3 className="text-2xl font-bold mt-1">{category.count} itens</h3>
                    <p className="text-sm text-gray-600 mt-1">Valor total: {category.value}</p>
                  </div>
                  <div className="p-3 bg-blue-100 text-blue-700 rounded-full h-12 w-12 flex items-center justify-center">
                    <Package />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link
                    href={category.name === "Matéria-Prima" 
                      ? "/estoque/materia-prima" 
                      : `/estoque/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Ver detalhes →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-5"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-800">Movimentações Recentes</h3>
                <Link
                  href="/estoque/movimentacoes"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Ver todas
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data/Hora</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuário</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentMovements.map((movement) => (
                      <tr key={movement.id} className="hover:bg-gray-50">
                        <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{movement.id}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm">
                          {movement.type === "entrada" ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <ArrowUpCircle className="h-3 w-3 mr-1" />
                              Entrada
                            </span>
                          ) : movement.type === "saida" ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <ArrowDownCircle className="h-3 w-3 mr-1" />
                              Saída
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <RefreshCw className="h-3 w-3 mr-1" />
                              Ajuste
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{movement.date}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{movement.item}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{movement.quantity}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{movement.user}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-5"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-800">Itens com Estoque Crítico</h3>
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {alertItems.length} itens
                </span>
              </div>
              <div className="space-y-4">
                {alertItems.map((item) => (
                  <div key={item.id} className="p-3 border border-red-100 bg-red-50 rounded-md">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">{item.type}</span>
                      <span className="text-xs text-gray-500">{item.id}</span>
                    </div>
                    <h4 className="font-medium text-gray-800 mt-1">{item.name}</h4>
                    <div className="mt-2 flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-600">Atual: </span>
                        <span className="text-sm font-medium text-red-700">{item.current}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Mínimo: </span>
                        <span className="text-sm font-medium text-gray-700">{item.min}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Criar requisição
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-5"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-800">Ações Rápidas</h3>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors flex flex-col items-center">
                  <div className="p-3 bg-green-100 text-green-700 rounded-full mb-3">
                    <ArrowUpCircle className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">Nova Entrada</span>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors flex flex-col items-center">
                  <div className="p-3 bg-red-100 text-red-700 rounded-full mb-3">
                    <ArrowDownCircle className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">Nova Saída</span>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors flex flex-col items-center">
                  <div className="p-3 bg-yellow-100 text-yellow-700 rounded-full mb-3">
                    <RefreshCw className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">Ajuste de Estoque</span>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors flex flex-col items-center">
                  <div className="p-3 bg-blue-100 text-blue-700 rounded-full mb-3">
                    <Search className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">Inventário</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Other tabs content would go here */}
      {(activeTab === "materiaprima" || activeTab === "embalagens" || activeTab === "produtos" || activeTab === "movimentacoes") && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            {activeTab === "materiaprima" ? "Gestão de Matéria-Prima" : 
            activeTab === "embalagens" ? "Gestão de Embalagens" :
            activeTab === "produtos" ? "Gestão de Produtos Acabados" :
            "Registro de Movimentações"}
          </h3>
          <p className="text-gray-600 mb-6">Conteúdo a ser implementado.</p>
        </div>
      )}
    </div>
  );
};

export default InventoryDashboard;
