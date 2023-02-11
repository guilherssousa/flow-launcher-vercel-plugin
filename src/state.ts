import path from "path";
import fs from "fs";

interface SecurityStore {
  accessToken?: string;
}

function securityStore() {
  const _store: SecurityStore = {};
  const storeFilename = "store.json";

  const dirpath = new URL(import.meta.url).pathname.slice(1);
  const _storePath = path.join(dirpath, "..", "..", storeFilename);

  function load() {
    if (!fs.existsSync(_storePath)) {
      return;
    }

    const store = fs.readFileSync(_storePath, "utf8");

    try {
      Object.assign(_store, JSON.parse(store));
    } catch (error) {
      console.error(error);
    }
  }

  function save() {
    try {
      // write a new file with the contents of the store
      fs.writeFileSync(_storePath, JSON.stringify(_store, null, 2), "utf8");
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
