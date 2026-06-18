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
  const [filtroGenero, setFiltroGenero] = useState('todos');
  const [generos, setGeneros] = useState([]);
  const [livrosMaisVendidos, setLivrosMaisVendidos] = useState([]);
  const [carregandoMaisVendidos, setCarregandoMaisVendidos] = useState(false);

  useEffect(() => {
    const carregarLivrosMaisVendidos = async () => {
      setCarregandoMaisVendidos(true);
      try {
        setLivrosMaisVendidos(livrosMockados);
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
        setGeneros([]);
        return;
      }

      setCarregando(true);
      try {
        const livrosEncontrados = livrosMockados.filter((livro) =>
        livro.title.toLowerCase().includes(termoBusca.toLowerCase()) ||
        livro.authors.join(' ').toLowerCase().includes(termoBusca.toLowerCase())
      );

      setLivros(livrosEncontrados);


        const generosUnicos = [...new Set(
          livrosEncontrados.flatMap(livro => livro.categories || [])
        )];
        setGeneros(generosUnicos);
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


    if (filtroGenero !== 'todos') {
      filtrados = filtrados.filter(livro =>
        livro.categories && livro.categories.includes(filtroGenero)
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
  }, [livros, filtroPreco, filtroGenero]);


  const [gruposLivros, setGruposLivros] = useState([]);

  useEffect(() => {
    const agruparLivros = (livrosArray) => {
      if (!livrosArray || livrosArray.length === 0) return [];
      
      const grupos = [];
      const larguraTela = window.innerWidth;
      const tamanho = larguraTela < 480 ? 2 : larguraTela < 768 ? 3 : 5;
      
      for (let i = 0; i < livrosArray.length; i += tamanho) {
        grupos.push(livrosArray.slice(i, i + tamanho));
      }
      return grupos;
    };

    const atualizarGrupos = () => {
      const grupos = agruparLivros(livrosMaisVendidos);
      setGruposLivros(grupos);
    };

    atualizarGrupos();
    
    const handleResize = () => {
      atualizarGrupos();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [livrosMaisVendidos]);

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
      
      {!carregandoMaisVendidos && livrosMaisVendidos.length > 0 && gruposLivros.length > 0 && (
        <section className="carousel-section">
          <h2>📚 Livros Mais Vendidos</h2>
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

      {carregandoMaisVendidos && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Carregando livros mais vendidos...</p>
        </div>
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

      <div className="home-content">
        <aside>
          <h2>Filtrar</h2>

          <div>
            <h3>Gênero</h3>
            <label>
              <input
                type="radio"
                name="genero"
                value="todos"
                checked={filtroGenero === 'todos'}
                onChange={(evento) => setFiltroGenero(evento.target.value)}
              />
              Todos
            </label>
            {generos.slice(0, 10).map((genero) => (
              <label key={genero}>
                <input
                  type="radio"
                  name="genero"
                  value={genero}
                  checked={filtroGenero === genero}
                  onChange={(evento) => setFiltroGenero(evento.target.value)}
                />
                {genero}
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

          {!carregando && termoBusca.trim() === '' && (
            <div>
              <p>Digite algo na busca para encontrar livros</p>
            </div>
          )}

          {!carregando && termoBusca.trim() !== '' && livrosFiltrados.length === 0 && (
            <div>
              <p>Nenhum livro encontrado. Tente outra busca.</p>
            </div>
          )}

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