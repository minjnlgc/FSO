import axios from "axios";

const baseUrl = "http://localhost:3001/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.get(`${baseUrl}/${id}/comment`, config);
  return response.data;
};

const create = async (id, newComment) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.post(
    `${baseUrl}/${id}/comment`,
    newComment,
    config
  );
  return response.data;
};

export default { getAll, create, setToken };
