import Header from "@/components/header";
import InventoryDashboard from "@/components/estoque/inventory-dashboard";

export default function EstoquePage() {
  return (
    <div className="min-h-screen">
      <Header title="Módulo de Estoque" />
      <div className="px-6 py-8">
        <InventoryDashboard />
      </div>
    </div>
  );
}
