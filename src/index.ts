import { Flow, JSONRPCResponse } from "flow-launcher-helper";
import open from "open";

import securityStore from "./state.js";
import { api, getProjects } from "./api.js";

const store = securityStore();

type Methods = "get_access_token" | "open_url" | "deployments";

const { showResult, on, run } = new Flow<Methods>("icon.png");

on("query", async (params) => {
  if (!store.accessToken) {
    return showResult({
      title: "Integrate with Vercel",
      subtitle:
        params.toString().length > 0
          ? `Use ${params} as access token`
          : `Paste your access token here or click to get one.`,
      method: "get_access_token",
      params: [...params],
    });
  }

  try {
    const projectsRequest = await getProjects(params.toString());

    const projects: JSONRPCResponse<Methods>[] = [];

    projectsRequest.projects.map((project) => {
      const latestDeployment = project.latestDeployments[0];

      const dashboardLink = `https://vercel.com/${latestDeployment.creator.username}/${project.name}`;

      projects.push({
        title: project.name,
        subtitle: project.framework,
        method: "open_url",
        params: [dashboardLink],
      });
    });

    return showResult(...projects);
  } catch (e) {
    return showResult({
      title: "An error occurred.",
      subtitle: "Click to copy the error message.",
      method: "Flow.Launcher.CopyToClipboard",
      params: [JSON.stringify(e, null, 2)],
    });
  }
});

on("open_url", (params) => {
  const url = params.toString();
  open(url);
});

on("get_access_token", async (params) => {
  const accessToken = params.toString();

  if (accessToken.length <= 8) {
    open(`https://vercel.com/account/tokens`);
    return;
  }

  store.accessToken = accessToken;
  api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
});

run();
