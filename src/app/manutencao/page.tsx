import Header from "@/components/header";
import MaintenanceDashboard from "@/components/manutencao/maintenance-dashboard";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen">
      <Header title="Módulo de Manutenção" />
      <div className="px-6 py-8">
        <MaintenanceDashboard />
      </div>
    </div>
  );
}
