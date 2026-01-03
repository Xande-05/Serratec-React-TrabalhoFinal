import mockApi from "./MockApi.jsx";

export const getCart = async (userId) => {
  try {
    console.log("Buscando carrinho na API para userId:", userId);
    const response = await mockApi.get(`/cart`, {
      params: {
        userId: userId,
      },
    });
    console.log("Resposta da API:", response.data);

    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Erro ao buscar carrinho:", error);

    if (error.response?.status === 404) {
      console.log("Endpoint /cart não encontrado ou carrinho vazio");
      return [];
    }

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      console.error("URL:", error.config?.url);
    }

    throw error;
  }
};

export const addItemToCart = async (itemData) => {
  try {
    console.log("Adicionando item ao carrinho:", itemData);
    const response = await mockApi.post(`/cart`, itemData);
    console.log("Item adicionado com sucesso:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar item ao carrinho:", error);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      console.error("URL:", error.config?.url);
      console.error("Payload enviado:", error.config?.data);
    } else if (error.request) {
      console.error("Request:", error.request);
    }

    throw error;
  }
};

export const updateCartItem = async (itemId, itemData) => {
  try {
    console.log("Atualizando item do carrinho:", itemId, itemData);
    const response = await mockApi.put(`/cart/${itemId}`, itemData);
    console.log("Item atualizado com sucesso:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar item do carrinho:", error);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      console.error("URL:", error.config?.url);
    }

    throw error;
  }
};

export const deleteCartItem = async (itemId) => {
  try {
    console.log("Removendo item do carrinho:", itemId);
    const response = await mockApi.delete(`/cart/${itemId}`);
    console.log("Item removido com sucesso:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao remover item do carrinho:", error);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      console.error("URL:", error.config?.url);
    }

    throw error;
  }
};
