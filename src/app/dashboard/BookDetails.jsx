import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://reabix-api.com/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do livro:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  useEffect(() => {
    const fetchBookComments = async () => {
      try {
        const response = await axios.get(`https://reabix-api.com/books/${id}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Erro ao buscar comentários do livro:', error);
      }
    };

    fetchBookComments();
  }, [id]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');

    if (storedUserId && storedUsername) {
      setUserId(storedUserId);
      setUsername(storedUsername);
    }
  }, []);

  const fetchBookComments = async () => {
    try {
      const response = await axios.get(`https://reabix-api.com/books/${id}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Erro ao buscar comentários do livro:', error);
    }
  };
  
  useEffect(() => {
    fetchBookComments();
  }, [id]);
  
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Caso não haja token, redirecionar o usuário para a página de login
        window.location.href = '/login'; // ou o caminho da sua página de login
        return;
      }
  
      // Verifica se há um ID de usuário armazenado no localStorage
      const storedUserId = localStorage.getItem('userId');
      if (!storedUserId) {
        console.error('ID do usuário não encontrado no localStorage');
        return;
      }
  
      // Garante que o comentário não esteja vazio
      if (!comment.trim()) {
        console.error('O comentário não pode estar vazio');
        return;
      }
  
      // Envia o comentário e o ID do usuário no corpo da requisição
      await axios.post(
        `https://reabix-api.com/books/${id}/comments`,
        { userId: storedUserId, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setComment('');
      fetchBookComments(); // Atualiza os comentários após adicionar um novo
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
    }
  };
  

  if (!book) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>{book.name}</h1>
      <p>{book.description}</p>
      <h2>Comentários</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.comment}</p>
            <p>Usuário: {comment.username}</p> {/* Exibir o nome de usuário junto ao comentário */}
          </li>
        ))}
      </ul>

      <form onSubmit={handleCommentSubmit}>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        <button type="submit">Comentar</button>
      </form>
    </div>
  );
};

export default BookDetails;
