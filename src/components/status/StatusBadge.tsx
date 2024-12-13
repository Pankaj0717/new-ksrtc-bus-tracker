interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'On Time':
        return 'bg-green-100 text-green-800';
      case 'Delayed':
        return 'bg-red-100 text-red-800';
      case 'Cancelled':
        return 'bg-gray-800 text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span
      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles()}`}
    >
      {status}
    </span>
  );
}