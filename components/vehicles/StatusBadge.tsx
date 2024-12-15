import { getStatusColor } from '@/lib/utils/status';

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(status)}`}>
      {status}
    </span>
  );
}