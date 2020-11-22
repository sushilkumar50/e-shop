import Axios from "axios";

const BASE_USRL =
  "https://run.mocky.io/v3/aea5d98a-654d-4423-bd99-6fbb90843730";

export default Axios.create({
  baseURL: BASE_USRL,
  headers: { "Access-Control-Allow-Origin": "*" },
});
