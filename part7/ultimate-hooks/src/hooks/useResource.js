import { useEffect, useState } from "react";

import { getAll, create, update, setToken } from "../requests";

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    getAll(baseUrl).then((response) => {
      setResources(response);
    });
  }, [baseUrl]);

  const createResource = async (content) => {
    const response = await create(baseUrl, content);
    setResources([...resources, response]);
  };

  const service = {
    createResource,
    // getAll,
  };

  return [resources, service];
};

export default useResource;
