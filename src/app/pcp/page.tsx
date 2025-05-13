import Header from "@/components/header";
import PCPDashboard from "@/components/pcp/pcp-dashboard";

export default function PCPPage() {
  return (
    <div className="min-h-screen">
      <Header title="Módulo de PCP" />
      <div className="px-6 py-8">
        <PCPDashboard />
      </div>
    </div>
  );
}
