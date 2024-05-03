import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://reabix-api.com/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
        // Exibir mensagem de erro ao usuário
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Livros</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <h2>{book.name}</h2>
            <p>{book.description}</p>
            {/* Exibir o número correto de visualizações */}
            <p>Visualizações: {book.views}</p>
            <Link to={`/book/${book.id}`}>
              <button>Ver Detalhes</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
