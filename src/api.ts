import axios from "axios";
import securityStore from "./state.js";

import type { GetProjectsResponse } from "./types.js";

const api = axios.create({
  baseURL: "https://api.vercel.com/",
  headers: {
    Authorization: `Bearer ${securityStore().accessToken}`,
  },
});

async function getProjects(search: string) {
  const { data } = await api.get<GetProjectsResponse>("v9/projects", {
    params: {
      limit: 20,
      search,
    },
  });

  return data;
}

export { api, getProjects };
