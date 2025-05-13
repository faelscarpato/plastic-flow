"use client";

import { useState } from "react";
import { ShoppingBag, Users, FileText, Truck, Search, FilePlus, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const purchaseOrders = [
  { id: "OC-2023-0152", supplier: "Plastiform S.A.", date: "2023-05-10", value: "R$ 18.540,00", status: "aprovado" },
  { id: "OC-2023-0151", supplier: "QuimiPol Ltda", date: "2023-05-09", value: "R$ 5.320,00", status: "pendente" },
  { id: "OC-2023-0150", supplier: "Insumos Técnicos", date: "2023-05-08", value: "R$ 2.150,00", status: "recebido" },
  { id: "OC-2023-0149", supplier: "PackService", date: "2023-05-05", value: "R$ 7.890,00", status: "aprovado" },
];

const pendingQuotes = [
  { id: "REQ-2023-0054", description: "Pigmento Vermelho", quantity: "50kg", department: "Produção", deadline: "2023-05-17", priority: "alta" },
  { id: "REQ-2023-0053", description: "Filme Strech 500mm", quantity: "30 rolos", department: "Expedição", deadline: "2023-05-20", priority: "normal" },
  { id: "REQ-2023-0052", description: "Óleo Hidráulico", quantity: "200L", department: "Manutenção", deadline: "2023-05-16", priority: "alta" },
];

const topSuppliers = [
  { name: "Plastiform S.A.", category: "Matéria-Prima", ordersCount: 28, totalValue: "R$ 256.400,00" },
  { name: "QuimiPol Ltda", category: "Aditivos", ordersCount: 15, totalValue: "R$ 75.320,00" },
  { name: "Insumos Técnicos", category: "Matéria-Prima", ordersCount: 12, totalValue: "R$ 42.180,00" },
  { name: "PackService", category: "Embalagens", ordersCount: 24, totalValue: "R$ 128.600,00" },
];

const PurchasingDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Gestão de Compras</h2>
          <p className="text-gray-600">Requisições, cotações e ordens de compra</p>
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
            href="/compras/nova-requisicao"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FilePlus className="mr-2 h-4 w-4" />
            Nova Requisição
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
            onClick={() => setActiveTab("requisicoes")}
            className={`py-4 px-6 font-medium text-sm focus:outline-none ${
              activeTab === "requisicoes"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Requisições
          </button>
          <button
            onClick={() => setActiveTab("ordens")}
            className={`py-4 px-6 font-medium text-sm focus:outline-none ${
              activeTab === "ordens"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Ordens de Compra
          </button>
          <button
            onClick={() => setActiveTab("fornecedores")}
            className={`py-4 px-6 font-medium text-sm focus:outline-none ${
              activeTab === "fornecedores"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Fornecedores
          </button>
          <button
            onClick={() => setActiveTab("recebimentos")}
            className={`py-4 px-6 font-medium text-sm focus:outline-none ${
              activeTab === "recebimentos"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Recebimentos
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
                  <p className="text-sm text-gray-500">Requisições Pendentes</p>
                  <h3 className="text-2xl font-bold mt-1">23</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="text-yellow-600">8 urgentes</span>
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 text-yellow-700 rounded-full h-12 w-12 flex items-center justify-center">
                  <AlertCircle />
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
                  <p className="text-sm text-gray-500">Ordens em Aberto</p>
                  <h3 className="text-2xl font-bold mt-1">15</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="text-blue-600">R$ 120.480,00</span>
                  </p>
                </div>
                <div className="p-3 bg-blue-100 text-blue-700 rounded-full h-12 w-12 flex items-center justify-center">
                  <ShoppingBag />
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
                  <p className="text-sm text-gray-500">Recebimentos Hoje</p>
                  <h3 className="text-2xl font-bold mt-1">5</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="text-green-600">Em andamento</span>
                  </p>
                </div>
                <div className="p-3 bg-green-100 text-green-700 rounded-full h-12 w-12 flex items-center justify-center">
                  <Truck />
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
                  <p className="text-sm text-gray-500">Fornecedores Ativos</p>
                  <h3 className="text-2xl font-bold mt-1">84</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="text-purple-600">12 novos este mês</span>
                  </p>
                </div>
                <div className="p-3 bg-purple-100 text-purple-700 rounded-full h-12 w-12 flex items-center justify-center">
                  <Users />
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
                <h3 className="font-medium text-gray-800">Ordens de Compra Recentes</h3>
                <Link
                  href="/compras/ordens"
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
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fornecedor</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {purchaseOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{order.supplier}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{order.value}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm">
                          {order.status === "aprovado" ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Aprovado
                            </span>
                          ) : order.status === "pendente" ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Pendente
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Recebido
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-800 mr-2">Ver</button>
                          <button className="text-blue-600 hover:text-blue-800">Editar</button>
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
                <h3 className="font-medium text-gray-800">Requisições Aguardando Cotação</h3>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {pendingQuotes.length} itens
                </span>
              </div>
              <div className="space-y-3">
                {pendingQuotes.map((req) => (
                  <div key={req.id} className={`p-3 border rounded-md ${
                    req.priority === 'alta' ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">{req.id}</span>
                      {req.priority === 'alta' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                          Urgente
                        </span>
                      )}
                    </div>
                    <h4 className="font-medium text-gray-800 mt-1">{req.description}</h4>
                    <div className="mt-2 text-xs text-gray-500">
                      <p>Quantidade: {req.quantity}</p>
                      <p>Departamento: {req.department}</p>
                      <p>Prazo: {req.deadline}</p>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Iniciar cotação
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
              <h3 className="font-medium text-gray-800">Principais Fornecedores</h3>
              <Link
                href="/compras/fornecedores"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Ver todos
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pedidos</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Total</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {topSuppliers.map((supplier) => (
                    <tr key={supplier.name} className="hover:bg-gray-50">
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{supplier.name}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{supplier.category}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{supplier.ordersCount}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{supplier.totalValue}</td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-800 mr-2">Histórico</button>
                        <button className="text-blue-600 hover:text-blue-800">Detalhes</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      )}

      {/* Other tabs content would go here */}
      {(activeTab === "requisicoes" || activeTab === "ordens" || activeTab === "fornecedores" || activeTab === "recebimentos") && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            {activeTab === "requisicoes" ? "Gestão de Requisições de Compra" : 
            activeTab === "ordens" ? "Gestão de Ordens de Compra" :
            activeTab === "fornecedores" ? "Gestão de Fornecedores" :
            "Gestão de Recebimentos"}
          </h3>
          <p className="text-gray-600 mb-6">Conteúdo a ser implementado.</p>
        </div>
      )}
    </div>
  );
};

export default PurchasingDashboard;
