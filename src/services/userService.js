import axios from "axios";
import { endpoints } from "./apiConfig";

export const getUsersByStateBucaramanga = async (data) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      endpoints.usersBucaramangaByState,
      data,
      config
    );

    return response;
  } catch (error) {
    console.error("Error fetching users by state bucaramanga", error);
    throw error;
  }
};

export const getUsersByStateBogota = async (data) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      endpoints.usersBogotaByState,
      data,
      config
    );

    return response;
  } catch (error) {
    console.error("Error fetching users by state Bogota", error);
    throw error;
  }
};

export const getUsersByStateCajasan = async (data) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      endpoints.usersCajasanByState,
      data,
      config
    );

    return response;
  } catch (error) {
    console.error("Error fetching users by state Cajasan", error);
    throw error;
  }
};

export const getUsersByStateTibu = async (data) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      endpoints.usersTibuByState,
      data,
      config
    );

    return response;
  } catch (error) {
    console.error("Error fetching users by state Tibu", error);
    throw error;
  }
};

export const getAllusers = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.get(endpoints.allUsers, config);

    // Filter out user with ID 60 from the response data
    const filteredData = {
      ...response,
      data: response.data.filter(user => user.id !== 60)
    };

    return filteredData;
  } catch (error) {
    console.error("Error fetching users", error);
    throw error;
  }
};
