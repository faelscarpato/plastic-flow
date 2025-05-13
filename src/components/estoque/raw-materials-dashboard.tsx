"use client";

import { useState } from "react";
import { Package, ArrowUpCircle, ArrowDownCircle, RefreshCw, Search, FilePlus, Filter, Download, Upload } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface RawMaterial {
  id: string;
  name: string;
  type: string;
  quantity: number;
  unit: string;
  minStock: number;
  storageLocation: string;
  supplier: string;
  lastPurchase: string;
  price: string;
  status: "normal" | "low" | "critical";
}

const rawMaterials: RawMaterial[] = [
  { 
    id: "MP-001", 
    name: "Polietileno de Alta Densidade", 
    type: "Resina",
    quantity: 250, 
    unit: "kg", 
    minStock: 300, 
    storageLocation: "A-12-03",
    supplier: "Plastiform S.A.",
    lastPurchase: "2023-04-28",
    price: "R$ 12,50/kg",
    status: "critical"
  },
  { 
    id: "MP-002", 
    name: "Polipropileno", 
    type: "Resina",
    quantity: 450, 
    unit: "kg", 
    minStock: 200, 
    storageLocation: "A-12-04",
    supplier: "QuimiPol Ltda",
    lastPurchase: "2023-05-02",
    price: "R$ 14,80/kg",
    status: "normal"
  },
  { 
    id: "MP-003", 
    name: "Pigmento Verde", 
    type: "Aditivo",
    quantity: 5, 
    unit: "kg", 
    minStock: 10, 
    storageLocation: "B-03-01",
    supplier: "ColorTech",
    lastPurchase: "2023-04-15",
    price: "R$ 85,00/kg",
    status: "critical"
  },
  { 
    id: "MP-004", 
    name: "Pigmento Azul", 
    type: "Aditivo",
    quantity: 12, 
    unit: "kg", 
    minStock: 10, 
    storageLocation: "B-03-02",
    supplier: "ColorTech",
    lastPurchase: "2023-05-05",
    price: "R$ 92,30/kg",
    status: "normal"
  },
  { 
    id: "MP-005", 
    name: "Aditivo UV", 
    type: "Aditivo",
    quantity: 18, 
    unit: "kg", 
    minStock: 15, 
    storageLocation: "B-04-01",
    supplier: "QuimiPol Ltda",
    lastPurchase: "2023-04-22",
    price: "R$ 145,00/kg",
    status: "normal"
  },
  { 
    id: "MP-006", 
    name: "Polietileno de Baixa Densidade", 
    type: "Resina",
    quantity: 180, 
    unit: "kg", 
    minStock: 200, 
    storageLocation: "A-12-05",
    supplier: "Plastiform S.A.",
    lastPurchase: "2023-04-30",
    price: "R$ 11,20/kg",
    status: "low"
  },
  { 
    id: "MP-007", 
    name: "Masterbatch Preto", 
    type: "Aditivo",
    quantity: 25, 
    unit: "kg", 
    minStock: 20, 
    storageLocation: "B-03-03",
    supplier: "ColorTech",
    lastPurchase: "2023-05-08",
    price: "R$ 38,50/kg",
    status: "normal"
  },
  { 
    id: "MP-008", 
    name: "Polietileno Tereftalato (PET)", 
    type: "Resina",
    quantity: 320, 
    unit: "kg", 
    minStock: 300, 
    storageLocation: "A-13-01",
    supplier: "Plastiform S.A.",
    lastPurchase: "2023-05-01",
    price: "R$ 18,90/kg",
    status: "normal"
  },
];

const recentMovements = [
  { id: "MOV-001", type: "entrada", date: "2023-05-12 08:30", item: "Polietileno de Alta Densidade", quantity: "500 kg", user: "Carlos Silva" },
  { id: "MOV-002", type: "saida", date: "2023-05-12 09:15", item: "Pigmento Verde", quantity: "3 kg", user: "Ana Oliveira" },
  { id: "MOV-003", type: "entrada", date: "2023-05-11 14:22", item: "Aditivo UV", quantity: "10 kg", user: "João Santos" },
  { id: "MOV-004", type: "saida", date: "2023-05-11 10:45", item: "Pigmento Azul", quantity: "2 kg", user: "Maria Costa" },
  { id: "MOV-005", type: "ajuste", date: "2023-05-10 16:30", item: "Polipropileno", quantity: "+15 kg", user: "Roberto Pereira" }
];

const RawMaterialsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  
  // Filter materials based on search term and filters
  const filteredMaterials = rawMaterials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         material.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType ? material.type === filterType : true;
    const matchesStatus = filterStatus ? material.status === filterStatus : true;
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  // Get unique material types for filter
  const materialTypes = Array.from(new Set(rawMaterials.map(m => m.type)));
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Matéria-Prima</h2>
          <p className="text-gray-600">Gestão de estoque de matérias-primas</p>
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Buscar matéria-prima..." 
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <Link
            href="/estoque/materia-prima/novo"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FilePlus className="mr-2 h-4 w-4" />
            Nova Matéria-Prima
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-800">Filtros</h3>
          <button 
            onClick={() => {
              setFilterType(null);
              setFilterStatus(null);
              setSearchTerm("");
            }}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Limpar filtros
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <Filter className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-600 mr-2">Tipo:</span>
            <select 
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterType || ""}
              onChange={(e) => setFilterType(e.target.value || null)}
            >
              <option value="">Todos</option>
              {materialTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <Filter className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-600 mr-2">Status:</span>
            <select 
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus || ""}
              onChange={(e) => setFilterStatus(e.target.value || null)}
            >
              <option value="">Todos</option>
              <option value="normal">Normal</option>
              <option value="low">Baixo</option>
              <option value="critical">Crítico</option>
            </select>
          </div>
          <div className="ml-auto flex gap-2">
            <button className="flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              <Download className="h-4 w-4 mr-1" />
              Exportar
            </button>
            <button className="flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              <Upload className="h-4 w-4 mr-1" />
              Importar
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estoque Mín.</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Localização</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fornecedor</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMaterials.map((material) => (
                <motion.tr 
                  key={material.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{material.id}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{material.name}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{material.type}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{material.quantity} {material.unit}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{material.minStock} {material.unit}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{material.storageLocation}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{material.supplier}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    {material.status === "normal" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Normal
                      </span>
                    ) : material.status === "low" ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Baixo
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Crítico
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">Ver</button>
                      <button className="text-blue-600 hover:text-blue-800">Editar</button>
                      <button className="text-blue-600 hover:text-blue-800">Movimentar</button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredMaterials.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhuma matéria-prima encontrada com os filtros selecionados.
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-5"
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-5"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-800">Ações Rápidas</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
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
  );
};

export default RawMaterialsDashboard;
