import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { basAPI } from '@/configs/variable';

function useSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

 // const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = `${basAPI}/shops/get-all-products/?search=${encodeURIComponent(searchTerm)}`;
      const response = await fetch(url);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return { searchTerm, searchResults, handleSubmit, handleChange };
}

export default useSearch;