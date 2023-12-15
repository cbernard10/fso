import axios from "axios";
const baseUrl = "http://localhost:3005/";

let token = null;

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async (baseUrl) => {
  const response = await axios.get(`${baseUrl}`);
  return response.data;
};

const create = async (baseUrl, newResource) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(
    baseUrl,
    { ...newResource, id: generateId() },
    config
  );
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

export { getAll, create, update, setToken };
