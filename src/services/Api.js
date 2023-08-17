import axios from "axios";

const Api = () => {
  return axios.create({
    baseURL: "https://disease.sh/v3/covid-19",
  });
};

export default Api;
