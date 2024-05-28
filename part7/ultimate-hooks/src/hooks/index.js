import axios from "axios";
import { useEffect, useState } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    input: {
      type,
      value,
      onChange,
    },
    reset,
  };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const initialiseResources = async () => {
      const fetchedResources = await getAll();
      setResources(fetchedResources);
      console.log(fetchedResources);
    };

    try {
      initialiseResources();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
  };

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource);
    return response.data;
  };

  const service = {
    getAll,
    create,
    setResources,
  };

  return [resources, service];
};
