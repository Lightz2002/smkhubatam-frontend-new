import axios from "axios";

function getToken() {
  return localStorage.getItem("token")
    ? "Bearer " + localStorage.getItem("token")
    : null;
}

const baseApi = axios.create({
  baseURL: "http://localhost:3030",
});

export const profile = async () => {
  let response = await baseApi.get("profile", {
    headers: {
      Authorization: getToken(),
    },
  });

  return response;
};

export const login = async credentials => {
  let response = await baseApi.post("auth/login", { ...credentials });

  return response;
};

export const getRoleMenu = async roleId => {
  let response = await baseApi.get(`/roles/rolemenu?role=${roleId}`, {
    headers: {
      Authorization: getToken(),
    },
  });
  return response;
};

export const getUsers = async () => {
  let response = await baseApi.get(`/users`, {
    headers: {
      Authorization: getToken(),
    },
  });
  return response;
};
