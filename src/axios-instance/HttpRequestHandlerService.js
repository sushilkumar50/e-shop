import Axios from "./axios-instance";

/**
 *
 * it calls axios instance get method to fetch all products
 *
 */
export const getAllProducts = async () => {
  const response = Axios.get();
  return (await response).data;
};
