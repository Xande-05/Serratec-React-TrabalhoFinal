import React, { useState, useEffect } from 'react';

import livrosMockados from '../Services/livrosMockados';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/cartContexts';

import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const [termoBusca, setTermoBusca] = useState('');
  const [livros, setLivros] = useState([]);
  const [livrosFiltrados, setLivrosFiltrados] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [filtroPreco, setFiltroPreco] = useState('todos');
  const [filtroAutor, setFiltroAutor] = useState('todos');
  const [autores, setAutores] = useState([]);
  const [livrosMaisVendidos, setLivrosMaisVendidos] = useState([]);
  const [carregandoMaisVendidos, setCarregandoMaisVendidos] = useState(false);

  useEffect(() => {
    const carregarLivrosMaisVendidos = async () => {
      setCarregandoMaisVendidos(true);
      try {
        setLivrosMaisVendidos(livrosMockados);
              const autoresUnicos = [
          ...new Set(
            livrosMockados.flatMap(livro => livro.authors)
          )
        ];
        setAutores(autoresUnicos);
      } catch (erro) {
        console.error('Erro ao carregar livros mais vendidos:', erro);
        setLivrosMaisVendidos([]);
      } finally {
        setCarregandoMaisVendidos(false);
      }
    };

    carregarLivrosMaisVendidos();
  }, []);

  const { adicionarAoCarrinho } = useCart();


  useEffect(() => {
    const executarBuscaLivros = async () => {
      if (termoBusca.trim() === '') {
        setLivros([]);
        setLivrosFiltrados([]);
        return;
      }
      setCarregando(true);
      try {
        const livrosEncontrados = livrosMockados.filter((livro) =>
        livro.title.toLowerCase().includes(termoBusca.toLowerCase()) ||
        livro.authors.join(' ').toLowerCase().includes(termoBusca.toLowerCase())
      );

      setLivros(livrosEncontrados);
      } catch (erro) {
        console.error('Erro ao buscar livros:', erro);
        setLivros([]);
        setLivrosFiltrados([]);
      } finally {
        setCarregando(false);
      }
    };


    const idTimeout = setTimeout(() => {
      executarBuscaLivros();
    }, 500);

    return () => clearTimeout(idTimeout);
  }, [termoBusca]);


  useEffect(() => {
    let filtrados = [...livros];


    if (filtroAutor !== 'todos') {
      filtrados = filtrados.filter(livro =>
        livro.authors &&
        livro.authors.includes(filtroAutor)
      );
    }


    if (filtroPreco === 'baixo') {
      filtrados = filtrados.filter(livro => livro.pageCount < 200);
    } else if (filtroPreco === 'medio') {
      filtrados = filtrados.filter(livro => livro.pageCount >= 200 && livro.pageCount < 500);
    } else if (filtroPreco === 'alto') {
      filtrados = filtrados.filter(livro => livro.pageCount >= 500);
    }

    setLivrosFiltrados(filtrados);
  }, [livros, filtroPreco, filtroAutor]);


  const [gruposLivros, setGruposLivros] = useState([]);

  const livrosCatalogo = livrosMockados;

  useEffect(() => {
    const agruparLivros = (livrosArray) => {
      if (!livrosArray || livrosArray.length === 0) return [];
      
      const grupos = [];
      const larguraTela = window.innerWidth;
      const tamanho = larguraTela < 480 ? 1 : larguraTela < 768 ? 2 : 3;
      
      for (let i = 0; i < livrosArray.length; i += tamanho) {
        grupos.push(livrosArray.slice(i, i + tamanho));
      }
      return grupos;
    };

    const atualizarGrupos = () => {
      const grupos = agruparLivros(livrosCatalogo);
      setGruposLivros(grupos);
    };

    atualizarGrupos();
    
    const handleResize = () => {
      atualizarGrupos();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [livrosCatalogo]);

  const handleAdicionarAoCarrinho = async (livro) => {
    console.log('handleAdicionarAoCarrinho chamado com livro:', livro);
    try {
      const success = await adicionarAoCarrinho(livro);
      console.log('Resultado de adicionarAoCarrinho:', success);
      if (success) {
        navigate('/cart');
      }
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      alert('Erro ao adicionar item ao carrinho. Por favor, tente novamente.');
    }
  };

  return (
    <div className="home-page">

      {carregandoMaisVendidos && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Carregando livros mais vendidos...</p>
        </div>
      )}

      <div className="home-content">
        <aside>
          <h2>Filtrar</h2>

          <div>
            <h3>Autor</h3>

            <label>
              <input
                type="radio"
                name="autor"
                value="todos"
                checked={filtroAutor === 'todos'}
                onChange={(evento) => setFiltroAutor(evento.target.value)}
              />
              Todos
            </label>

            {autores.map((autor) => (
              <label key={autor}>
                <input
                  type="radio"
                  name="autor"
                  value={autor}
                  checked={filtroAutor === autor}
                  onChange={(evento) => setFiltroAutor(evento.target.value)}
                />
                {autor}
              </label>
            ))}
          </div>

          <div>
            <h3>Páginas</h3>
            <label>
              <input
                type="radio"
                name="preco"
                value="todos"
                checked={filtroPreco === 'todos'}
                onChange={(evento) => setFiltroPreco(evento.target.value)}
              />
              Todos
            </label>
            <label>
              <input
                type="radio"
                name="preco"
                value="baixo"
                checked={filtroPreco === 'baixo'}
                onChange={(evento) => setFiltroPreco(evento.target.value)}
              />
              Menos de 200 páginas
            </label>
            <label>
              <input
                type="radio"
                name="preco"
                value="medio"
                checked={filtroPreco === 'medio'}
                onChange={(evento) => setFiltroPreco(evento.target.value)}
              />
              200-500 páginas
            </label>
            <label>
              <input
                type="radio"
                name="preco"
                value="alto"
                checked={filtroPreco === 'alto'}
                onChange={(evento) => setFiltroPreco(evento.target.value)}
              />
              Mais de 500 páginas
            </label>
          </div>
        </aside>

        <main>
          {carregando && (
            <div>
              <p>Buscando livros...</p>
            </div>
          )}

          {!carregando && termoBusca.trim() !== '' && livrosFiltrados.length === 0 && (
            <div>
              <p>Nenhum livro encontrado. Tente outra busca.</p>
            </div>
          )}

          {!carregandoMaisVendidos && livrosMaisVendidos.length > 0 && gruposLivros.length > 0 && (
        <section className="carousel-section">
            <h2>📚 Nosso Catálogo</h2>
            <Carousel
              interval={5000}
              indicators={gruposLivros.length > 1}
              controls={gruposLivros.length > 1}
              fade
            >
              {gruposLivros.map((grupo, indexGrupo) => (
                <Carousel.Item key={indexGrupo}>
                  <div className="carousel-item-container">
                    {grupo.map((livro) => (
                      <div
                        key={livro.id}
                        className="book-card-reveal"
                        onClick={() => navigate(`/book/${livro.id}`)}
                      >
                        {livro.image && (
                          <img
                            src={livro.image}
                            alt={livro.title}
                          />
                        )}
                        <h5>
                          {livro.title.length > 30
                            ? `${livro.title.substring(0, 30)}...`
                            : livro.title}
                        </h5>
                        <p>
                          {livro.authors.join(', ').length > 25
                            ? `${livro.authors.join(', ').substring(0, 25)}...`
                            : livro.authors.join(', ')}
                        </p>
                        {livro.averageRating > 0 && (
                          <p style={{ fontSize: '0.75rem', color: '#ffa500' }}>
                            ⭐ {livro.averageRating.toFixed(1)} ({livro.ratingsCount} avaliações)
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </section>
        )}

        <header>
        <h1>QUAL LIVRO DESEJA?</h1>
        <input
          type="text"
          placeholder="Pesquisar livro, autor, ano ou gênero"
          value={termoBusca}
          onChange={(evento) => setTermoBusca(evento.target.value)}
        />
      </header>

          {!carregando && livrosFiltrados.length > 0 && (
            <>
              <p>{livrosFiltrados.length} livro(s) encontrado(s)</p>
              <div className="books-grid">
                {livrosFiltrados.map((livro) => (
                  <div key={livro.id} className="book-card">
                    {livro.image && <img src={livro.image} alt={livro.title} />}
                    <h3>{livro.title}</h3>
                    <p>{livro.authors.join(', ')}</p>
                    {livro.publishedDate && <p>{livro.publishedDate.split('-')[0]}</p>}
                    <button onClick={() => handleAdicionarAoCarrinho(livro)}>
                      Adicionar ao Carrinho
                    </button>
                    <button onClick={() => navigate(`/book/${livro.id}`)} className="secondary">
                      Ver detalhes
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;