import path from "path";
import fs from "fs/promises";

interface SecurityStore {
  accessToken?: string;
}

function securityStore() {
  const _store: SecurityStore = {};
  const _storePath = path.join(process.cwd(), "store.json");

  async function load() {
    try {
      const data = await fs.readFile(_storePath, "utf8");
      Object.assign(_store, JSON.parse(data));
    } catch (error) {
      console.error(error);
    }
  }

  async function save() {
    try {
      await fs.writeFile(_storePath, JSON.stringify(_store));
    } catch (error) {
      console.error(error);
    }
  }

  load();

  return {
    get accessToken() {
      return _store.accessToken;
    },
    set accessToken(value) {
      _store.accessToken = value;
      save();
    },
  };
}

export default securityStore;
