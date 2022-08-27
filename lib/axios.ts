import axios from "axios";

const instance = axios.create({
  baseURL: `${
    process.env.NEXT_PUBLIC_SERVER_BASE_URL || process.env.VERCEL_URL
  }/api/v1`,
});

export default instance;
