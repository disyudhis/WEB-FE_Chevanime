function http(endpoint, config) {
  const url = import.meta.env.VITE_JIKAN_BASE_URL + endpoint;

  return fetch(url, config)
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => err);
}

export default http;
