import AddVehicleForm from '@/components/vehicles/AddVehicleForm';
import VehicleTable from '@/components/vehicles/VehicleTable';
import { FaCar } from "react-icons/fa6";

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <FaCar className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Vehicle Management Dashboard</h1>
        </div>
        <p className="text-muted-foreground">
          Manage and track your vehicle fleet efficiently
        </p>
      </div>

      <div className="space-y-8">
        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Add New Vehicle</h2>
          <AddVehicleForm />
        </div>

        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Vehicle Fleet</h2>
          <VehicleTable />
        </div>
      </div>
    </div>
  );
}