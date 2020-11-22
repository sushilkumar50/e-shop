import Axios from "./axios-instance";

export const getAllProducts = async () => {
  const response = Axios.get();
  return (await response).data;
};
