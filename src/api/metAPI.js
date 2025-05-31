const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

export const metAPI = {
  // Recherche rapide
  search: async (query) => {
    const response = await fetch(
      `${BASE_URL}/search?q=${encodeURIComponent(query)}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  // Recherche avancée avec paramètres
  async advancedSearch(params) {
    try {
      // Validation des paramètres
      if (
        params.dateBegin &&
        params.dateEnd &&
        parseInt(params.dateBegin) > parseInt(params.dateEnd)
      ) {
        throw new Error("Start date must be before end date");
      }

      // Construction de la requête
      const searchParams = new URLSearchParams();

      // Ajout des paramètres de recherche
      if (params.q) {
        searchParams.append("q", params.q);
      }
      if (params.departmentId) {
        searchParams.append("departmentIds", params.departmentId);
      }
      if (params.isHighlight) {
        searchParams.append("isHighlight", "true");
      }
      if (params.isOnView) {
        searchParams.append("isOnView", "true");
      }
      if (params.medium) {
        searchParams.append("medium", params.medium);
      }
      if (params.dateBegin) {
        searchParams.append("dateBegin", params.dateBegin);
      }
      if (params.dateEnd) {
        searchParams.append("dateEnd", params.dateEnd);
      }
      if (params.artistOrCulture) {
        searchParams.append("artistOrCulture", "true");
      }

      // Si aucun paramètre n'est spécifié, ajouter une recherche générale
      if (searchParams.toString() === "") {
        searchParams.append("q", "*");
      }

      const response = await fetch(`${BASE_URL}/search?${searchParams}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  async getObject(objectId) {
    if (!objectId || isNaN(objectId)) {
      throw new Error("Invalid object ID");
    }

    try {
      const response = await fetch(`${BASE_URL}/objects/${objectId}`);
      if (response.status === 404) {
        return null;
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  // Récupérer les objets mis en avant
  getHighlights: async () => {
    const response = await fetch(`${BASE_URL}/search?isHighlight=true&q="e"`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },

  // Récupérer les départements
  getDepartments: async () => {
    const response = await fetch(`${BASE_URL}/departments`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
};
