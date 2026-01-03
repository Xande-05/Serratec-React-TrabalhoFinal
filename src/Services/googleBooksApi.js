import axios from 'axios';

const apiGoogleBooks = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1',
  timeout: 10000,
});

export const buscarLivros = async (termoBusca, maxResultados = 20) => {
  try {
    const resposta = await apiGoogleBooks.get('/volumes', {
      params: {
        q: termoBusca,
        maxResults: maxResultados,
        printType: 'books'
      }
    });
    return resposta.data.items || [];
  } catch (erro) {
    console.error('Erro ao buscar livros:', erro);
    throw erro;
  }
};

export const buscarLivroPorId = async (idLivro) => {
  try {
    const resposta = await apiGoogleBooks.get(`/volumes/${idLivro}`);
    return resposta.data;
  } catch (erro) {
    console.error('Erro ao buscar livro:', erro);
    throw erro;
  }
};

export const buscarLivrosPopulares = async (maxResultados = 20) => {
  try {
    const resposta = await apiGoogleBooks.get('/volumes', {
      params: {
        q: 'subject:bestseller OR subject:"best seller" OR subject:fiction',
        maxResults: maxResultados,
        printType: 'books',
        orderBy: 'relevance',
        filter: 'partial'
      }
    });
    
    if (!resposta.data.items || resposta.data.items.length < 5) {
      const respostaAlternativa = await apiGoogleBooks.get('/volumes', {
        params: {
          q: 'fiction OR romance OR thriller',
          maxResults: maxResultados,
          printType: 'books',
          orderBy: 'newest'
        }
      });
      return respostaAlternativa.data.items || [];
    }
    
    return resposta.data.items || [];
  } catch (erro) {
    console.error('Erro ao buscar livros populares:', erro);
    try {
      const respostaFallback = await apiGoogleBooks.get('/volumes', {
        params: {
          q: 'books',
          maxResults: maxResultados,
          printType: 'books'
        }
      });
      return respostaFallback.data.items || [];
    } catch (erroFallback) {
      console.error('Erro no fallback:', erroFallback);
      return [];
    }
  }
};

export const formatarDadosLivro = (livro) => {
  const informacoesVolume = livro.volumeInfo || {};
  return {
    id: livro.id,
    title: informacoesVolume.title || 'Sem título',
    authors: informacoesVolume.authors || ['Autor desconhecido'],
    publishedDate: informacoesVolume.publishedDate || '',
    description: informacoesVolume.description || '',
    image: informacoesVolume.imageLinks?.thumbnail || informacoesVolume.imageLinks?.smallThumbnail || '',
    categories: informacoesVolume.categories || [],
    pageCount: informacoesVolume.pageCount || 0,
    language: informacoesVolume.language || '',
    previewLink: informacoesVolume.previewLink || '',
    infoLink: informacoesVolume.infoLink || '',
    publisher: informacoesVolume.publisher || '',
    averageRating: informacoesVolume.averageRating || 0,
    ratingsCount: informacoesVolume.ratingsCount || 0
  };
};

export default apiGoogleBooks;

