const mockBooks = [
  {
    id: 1,
    title: "1984",
    authors: ["George Orwell"],
    publishedDate: "1949",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo9AsqtmBeIHQmWa_b99yRSZ3LDv0HpGS1uGIHAFpw4w&s=10",
    categories: ["Ficção Científica"],
    pageCount: 328,
    publisher: "Grupo Companhia das Letras",
    averageRating: 4.2,
    ratingsCount: 5000000,
    description: "Distopia clássica."
  },

  {
    id: 2,
    title: "A Revolução dos Bichos",
    authors: ["George Orwell"],
    publishedDate: "1945",
    image: "https://m.media-amazon.com/images/I/91BsZhxCRjL._AC_UF1000,1000_QL80_.jpg",
    categories: ["Ficção"],
    pageCount: 152,
    publisher: "Companhia das Letras",
    averageRating: 4.1,
    ratingsCount: 144000,
    description: "Uma sátira política clássica."
  },

  {
    id: 3,
    title: "Coraline",
    authors: ["Neil Gaiman"],
    publishedDate: "2002",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR45z78G-FZOzwyzs04M0YVx1kJ9DB8thLALyh-momt8Q&s=10",
    categories: ["Fantasia"],
    pageCount: 192,
    publisher: "Rocco",
    averageRating: 4.1,
    ratingsCount: 787000,
    description: "Fantasia sombria para jovens leitores."
  },

  {
    id: 4,
    title: "Dom Casmurro",
    authors: ["Machado de Assis"],
    publishedDate: "1899",
    image: "https://m.media-amazon.com/images/I/81XpG2iKTlL._AC_UF1000,1000_QL80_.jpg",
    categories: ["Romance"],
    pageCount: 256,
    publisher: "Livraria Garnier",
    averageRating: 4.3,
    ratingsCount: 39000,
    description: "Clássico da literatura brasileira."
  },

  {
    id: 5,
    title: "Harry Potter e a Pedra Filosofal",
    authors: ["J. K. Rowling"],
    publishedDate: "1997",
    image: "https://img.travessa.com.br/livro/GR/d9/d9332107-5307-4582-8da9-66b3d05ff203.jpg",
    categories: ["Fantasia"],
    pageCount: 223,
    publisher: "Rocco",
    averageRating: 4.8,
    ratingsCount: 11600000,
    description: "O primeiro livro da saga Harry Potter."
  },

  {
    id: 6,
    title: "Harry Potter e as Relíquias da Morte",
    authors: ["J. K. Rowling"],
    publishedDate: "2007",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPwQ1RWPa0SuSSdlVAdOoB04oQqwir2As87vq9coBD_A&s=10",
    categories: ["Fantasia"],
    pageCount: 592,
    publisher: "Rocco",
    averageRating: 4.6,
    ratingsCount: 4100000,
    description: "A jornada para destruir o Um Anel."
  },

  {
    id: 7,
    title: "Jogos Vorazes",
    authors: ["Suzanne Collins"],
    publishedDate: "2008",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkdk3fV8V_VsxcJ6puklUVPK4Wg8ZI95yFuikzN2eu3Q&s=10",
    categories: ["Distopia"],
    pageCount: 374,
    publisher: "Rocco",
    averageRating: 4.5,
    ratingsCount: 10000000,
    description: "A luta pela sobrevivência em um futuro distópico."
  },

  {
    id: 8,
    title: "O Código Da Vinci",
    authors: ["Dan Brown"],
    publishDate: "2003",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN1vU1iOQAN7_o2DFU_xasn8PbVWZjoz5pDbX1XKUfpA&s=10",
    categories: ["Suspense"],
    pageCount: 480,
    publisher: "Rocco",
    averageRating: 4.0,
    ratingsCount: 2500000,
    description: "Um thriller que combina arte, história e mistério." 
  },

  {
    id: 9,
    title: "O Hobbit",
    authors: ["J. R. R. Tolkien"],
    publishedDate: "1937",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkguJCDNbINg2LnYLtfKqQkqal26SDzeWg7O31LdApPA&s=10",
    categories: ["Fantasia"],
    pageCount: 310,
    publisher: "HarperCollins Brasil",
    averageRating: 4.3,
    ratingsCount:  45000000,
    description: "A aventura de Bilbo Bolseiro."
  },

  {
    id: 10,
    title: "O Pequeno Príncipe",
    authors: ["Antoine de Saint-Exupéry"],
    publishedDate: "1943",
    image: "https://m.media-amazon.com/images/I/81SVIwe5L9L._UF1000,1000_QL80_.jpg",
    categories: ["Infantil"],
    pageCount: 96,
    publisher: "Agir",
    averageRating: 4.3,
    ratingsCount: 22000,
    description: "Uma das obras mais famosas do mundo."
  },

  {
    id: 11,
    title: "O Senhor dos Anéis",
    authors: ["J. R. R. Tolkien"],
    publishedDate: "1954",
    image: "https://m.media-amazon.com/images/I/71ZLavBjpRL._AC_UF1000,1000_QL80_.jpg",
    categories: ["Fantasia"],
    pageCount: 1178,
    publisher: "HarperCollins Brasil",
    averageRating: 4.5,
    ratingsCount: 742000,
    description: "A jornada para destruir o Um Anel."
  },

  {
    id: 12,
    title: "Percy Jackson e o Ladrão de Raios",
    authors: ["Rick Riordan"],
    publishedDate: "2005",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRG_FnHBgQBf6N8BRDx7F7UzoRX6qXcsc3ekPv6gqoqg&s=10",
    categories: ["Fantasia"],
    pageCount: 400,
    publisher: "Intrínseca",
    averageRating: 4.3,
    ratingsCount: 3512768,
    description: "A aventura de Percy Jackson em um mundo de deuses e heróis."
  }

];

export default mockBooks;