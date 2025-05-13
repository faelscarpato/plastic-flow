"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Package, ShoppingBag, Truck, ClipboardCheck, BarChart3, Calendar, 
  Settings, DollarSign, Users, CircleCheck, Wrench, LogOut
} from "lucide-react";
import { motion } from "framer-motion";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  submenu?: { name: string; href: string }[];
}

export function Sidebar() {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const navItems: NavItem[] = [
    { 
      name: "Dashboard", 
      href: "/", 
      icon: <BarChart3 size={20} /> 
    },
    { 
      name: "Estoque", 
      href: "/estoque", 
      icon: <Package size={20} />,
      submenu: [
        { name: "Matéria-Prima", href: "/estoque/materia-prima" },
        { name: "Embalagens", href: "/estoque/embalagens" },
        { name: "Produto Acabado", href: "/estoque/produtos" },
      ]
    },
    { 
      name: "Compras", 
      href: "/compras", 
      icon: <ShoppingBag size={20} />,
      submenu: [
        { name: "Fornecedores", href: "/compras/fornecedores" },
        { name: "Requisições", href: "/compras/requisicoes" },
        { name: "Ordens de Compra", href: "/compras/ordens" },
      ]
    },
    { 
      name: "PCP", 
      href: "/pcp", 
      icon: <Calendar size={20} />,
      submenu: [
        { name: "Cadastro de Produtos", href: "/pcp/produtos" },
        { name: "Ordens de Produção", href: "/pcp/ordens" },
        { name: "MRP", href: "/pcp/mrp" },
      ]
    },
    { 
      name: "Produção", 
      href: "/producao", 
      icon: <Settings size={20} />,
      submenu: [
        { name: "Apontamentos", href: "/producao/apontamentos" },
        { name: "Monitoramento", href: "/producao/monitoramento" },
      ]
    },
    { 
      name: "Financeiro", 
      href: "/financeiro", 
      icon: <DollarSign size={20} />,
      submenu: [
        { name: "Contas a Pagar", href: "/financeiro/contas-pagar" },
      ]
    },
    { 
      name: "Manutenção", 
      href: "/manutencao", 
      icon: <Wrench size={20} />,
      submenu: [
        { name: "Ativos", href: "/manutencao/ativos" },
        { name: "Ordens de Serviço", href: "/manutencao/ordens" },
        { name: "Histórico", href: "/manutencao/historico" },
      ]
    },
    { 
      name: "Logística", 
      href: "/logistica", 
      icon: <Truck size={20} />,
      submenu: [
        { name: "Expedição", href: "/logistica/expedicao" },
        { name: "Romaneios", href: "/logistica/romaneios" },
      ]
    },
    { 
      name: "Recursos Humanos", 
      href: "/rh", 
      icon: <Users size={20} />,
      submenu: [
        { name: "Funcionários", href: "/rh/funcionarios" },
        { name: "Apontamento de Horas", href: "/rh/horas" },
      ]
    },
    { 
      name: "Qualidade", 
      href: "/qualidade", 
      icon: <CircleCheck size={20} />,
      submenu: [
        { name: "RNCs", href: "/qualidade/rncs" },
        { name: "CAPA", href: "/qualidade/capa" },
        { name: "Documentos", href: "/qualidade/documentos" },
      ]
    },
  ];

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(prevOpen => prevOpen === name ? null : name);
  };

  return (
    <div className="bg-sidebar-background border-r border-sidebar-border w-64 h-full flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-xl font-bold text-sidebar-primary">IndustryPRO</h2>
        <p className="text-sidebar-foreground text-sm">Sistema de Gestão</p>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.name} className="mb-1">
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={`flex items-center w-full px-3 py-2 rounded-md text-sm transition-colors ${
                      pathname.startsWith(item.href) 
                        ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                        : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground"
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3 flex-1">{item.name}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`ml-2 transition-transform ${
                        openSubmenu === item.name ? "transform rotate-180" : ""
                      }`}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  {openSubmenu === item.name && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-10 mt-1 space-y-1"
                    >
                      {item.submenu.map((subitem) => (
                        <li key={subitem.name}>
                          <Link
                            href={subitem.href}
                            className={`flex items-center text-sm px-3 py-2 rounded-md transition-colors ${
                              pathname === subitem.href
                                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground"
                            }`}
                          >
                            {subitem.name}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                    pathname === item.href
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-sidebar-border">
        <button className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
          <LogOut size={20} />
          <span className="ml-3">Sair</span>
        </button>
      </div>
    </div>
  );
}
