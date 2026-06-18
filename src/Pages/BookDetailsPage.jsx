import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { buscarLivroPorId, formatarDadosLivro } from '../Services/googleBooksApi';
import { useCart } from '../contexts/cartContexts';
import './BookDetailsPage.css';
      
const BookDetailsPage = () => {

  const { bookId: idLivro } = useParams();
  const navigate = useNavigate();
  const [livro, setLivro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const { adicionarAoCarrinho } = useCart();

  useEffect(() => {
    const buscarDetalhesLivro = async () => {
      if (!idLivro) {
        setErro('ID do livro não fornecido');
        setCarregando(false);
        return;
      }

      setCarregando(true);
      setErro(null);

      try {
        const dadosLivro = await buscarLivroPorId(idLivro);
        const livroFormatado = formatarDadosLivro(dadosLivro);
        setLivro(livroFormatado);
      } catch (erro) {
        console.error('Erro ao buscar detalhes do livro:', erro);
        setErro('Erro ao carregar os detalhes do livro');
      } finally {
        setCarregando(false);
      }
    };

    buscarDetalhesLivro();
  }, [idLivro]);

  const handleAdicionarAoCarrinho = async (livro) => {
    console.log('handleAdicionarAoCarrinho chamado com livro:', livro);
    if (!livro) {
      alert('Erro: Dados do livro não disponíveis');
      return;
    }
    
    try {
      const success = await adicionarAoCarrinho(livro);
      console.log('Resultado de adicionarAoCarrinho:', success);
      if (success) {
        alert('Item adicionado ao carrinho com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      alert('Erro ao adicionar item ao carrinho. Por favor, tente novamente.');
    }
  };

  if (carregando) {
    return (
      <div className="book-details-page">
        <div className="book-details-loading">
          <p>Carregando detalhes do livro...</p>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="book-details-page">
        <div className="book-details-error">
          <p>{erro}</p>
        </div>
      </div>
    );
  }

  if (!livro) {
    return (
      <div className="book-details-page">
        <div className="book-details-not-found">
          <p>Livro não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="book-details-page">
      <div className="book-details-container">
        {livro.image && (
          <img 
            src={livro.image} 
            alt={livro.title} 
            className="book-details-image"
          />
        )}
        
        <div className="book-details-content">
          <h1 className="book-details-title">{livro.title}</h1>

          <div className="book-details-section">
            <h2>Autor(es)</h2>
            <p>{livro.authors.join(', ')}</p>
          </div>

          <div className="book-details-actions">
            <button onClick={() => handleAdicionarAoCarrinho(livro)}>
              Adicionar ao Carrinho
            </button>
            {livro.previewLink && (
              <a href={livro.previewLink} target="_blank" rel="noopener noreferrer">
                Pré-visualizar no Google Books
              </a>
            )}
            {livro.infoLink && (
              <a href={livro.infoLink} target="_blank" rel="noopener noreferrer">
                Mais informações
              </a>
            )}
          </div>

          {livro.averageRating > 0 && (
            <div className="book-details-section">
              <h2>Avaliação</h2>
              <div className="book-details-rating">
                <span>⭐ {livro.averageRating.toFixed(1)}</span>
                <span>/ 5.0</span>
                <span>({livro.ratingsCount} avaliações)</span>
              </div>
            </div>
          )}

          {livro.publishedDate && (
            <div className="book-details-section">
              <h2>Data de Publicação</h2>
              <p>{livro.publishedDate}</p>
            </div>
          )}

          {livro.publisher && (
            <div className="book-details-section">
              <h2>Editora</h2>
              <p>{livro.publisher}</p>
            </div>
          )}

          {livro.pageCount > 0 && (
            <div className="book-details-section">
              <h2>Páginas</h2>
              <p>{livro.pageCount}</p>
            </div>
          )}

          {livro.categories && livro.categories.length > 0 && (
            <div className="book-details-section">
              <h2>Categorias</h2>
              <div className="book-details-categories">
                {livro.categories.map((category, index) => (
                  <span key={index} className="book-details-category">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}

          {livro.description && (
            <div className="book-details-section">
              <h2>Descrição</h2>
              <p>{livro.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;

