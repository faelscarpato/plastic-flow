import Header from "@/components/header";
import PurchasingDashboard from "@/components/compras/purchasing-dashboard";

export default function ComprasPage() {
  return (
    <div className="min-h-screen">
      <Header title="Módulo de Compras" />
      <div className="px-6 py-8">
        <PurchasingDashboard />
      </div>
    </div>
  );
}
