"use client";

import { useState } from 'react';
import { VEHICLE_STATUSES, VehicleStatus } from '@/lib/types/vehicle';

export default function AddVehicleForm() {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<VehicleStatus>('Available');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, status }),
      });
      
      if (response.ok) {
        setName('');
        setStatus('Available');
        // Use window.location.reload() as a last resort
        // In a production app, we should use a proper state management solution
        window.location.reload();
      } else {
        const data = await response.json();
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
          placeholder="Vehicle Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isSubmitting}
        />
        <select 
          className='flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
          value={status} 
          onChange={(e: any) => setStatus(e.target.value as VehicleStatus)}
          disabled={isSubmitting}
        >
            {VEHICLE_STATUSES.map((status) => (
              <option
                key={status} 
                value={status}
              >
                {status}
              </option>
            ))}
        </select>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-fit bg-black text-white text-nowrap rounded-md px-4 py-2 hover:bg-opacity-80 transition-colors"
        >
          {isSubmitting ? 'Adding...' : 'Add Vehicle'}
        </button>
      </div>
    </form>
  );
}