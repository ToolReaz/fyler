import Axios from "axios";

const config =
  process.env.NODE_ENV === "development"
    ? {
        baseURL: "http://localhost:4000",
      }
    : {};

console.log(process.env.NODE_ENV);

export const API = Axios.create(config);
