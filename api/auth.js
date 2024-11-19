import axios from "axios";

const API_URL = "http://localhost:5000"

//rejestracja
export const registerUser = async (email, password) => {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    return response.data; // zwraca token jwt i dane użytkownika
};

//logowanie
export const loginUser = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // zwraca token i dane
};

// Pobierz dane użytkownika (chroniony zasób)
export const getUsers = async (token) => {
  const response = await axios.get(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`, // Podaj token JWT
    },
  });
  return response.data;
};
