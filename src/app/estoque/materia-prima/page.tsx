import Header from "@/components/header";
import RawMaterialsDashboard from "@/components/estoque/raw-materials-dashboard";

export default function RawMaterialsPage() {
  return (
    <div className="min-h-screen">
      <Header title="Matéria-Prima" />
      <div className="px-6 py-8">
        <RawMaterialsDashboard />
      </div>
    </div>
  );
}
