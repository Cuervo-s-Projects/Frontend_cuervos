import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form className="d-flex" onSubmit={handleSearch} role="search">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Buscar videos..."
        aria-label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn btn-outline-success" type="submit">Buscar</button>
    </form>
  );
}
