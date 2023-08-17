import Api from "./Api";

const getAll = () => {
  return Api().get("/historical/all", {
    params: {
      lastdays: "all",
    },
  });
};

export { getAll };
