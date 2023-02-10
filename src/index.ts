import open from "open";
import { Flow, JSONRPCResponse } from "flow-launcher-helper";
import store from "./store.js";

type Methods = "deployments";

const { showResult, on, run } = new Flow<Methods>("icon.png");

const { accessToken } = store();

on("query", async (params) => {
  if (!accessToken) {
    return showResult({
      title: "Authentication required to search the Vercel API.",
      subtitle: "Click to authenticate.",
      iconPath: "icon.png",
    });
  }

  if (params.length <= 1) {
    return showResult({
      title: "Waiting for query...",
    });
  }
});

run();
