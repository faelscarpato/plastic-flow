import Dashboard from "@/components/dashboard/main-dashboard";
import Header from "@/components/header";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header title="Dashboard Principal" />
      <div className="px-6 py-8">
        <Dashboard />
      </div>
    </div>
  );
}
