import Axios from "axios";

const config = process.env.production
  ? null
  : {
      baseURL: "http://localhost:4000",
    };

export const API = Axios.create(config);
