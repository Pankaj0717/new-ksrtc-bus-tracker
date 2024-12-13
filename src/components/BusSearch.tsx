import { Search } from 'lucide-react';
import { useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
}

export default function BusSearch({ onSearch }: Props) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto my-8">
      <div className="flex items-center bg-white rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Enter bus number or route..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-6 py-4 rounded-l-lg focus:outline-none"
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-4 rounded-r-lg hover:bg-red-700 transition-colors"
        >
          <Search className="w-6 h-6" />
        </button>
      </div>
    </form>
  );
}