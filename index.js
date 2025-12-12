const fs = require("node:fs");
const path = require("node:path");

var ptmfs = (function () {
  var _ = {
    clear: async function (folderPath) {
      folderPath = path.resolve(process.cwd(), folderPath);
      try {
        const entries = await fs.promises.readdir(folderPath, {
          withFileTypes: true,
        });
        await Promise.all(
          entries.map((entry) =>
            fs.promises.rm(path.join(folderPath, entry.name), {
              recursive: true,
            })
          )
        );
      } catch (error) {
        if (error.code !== "ENOENT") {
          throw error;
        }
      }
    },
    ensureDir: async function (folderPath) {
      folderPath = path.resolve(process.cwd(), folderPath);
      if (!fs.existsSync(folderPath)) {
        await fs.promises.mkdir(folderPath, { recursive: true });
      }
    },
    ensureDirSync: function (folderPath) {
      folderPath = path.resolve(process.cwd(), folderPath);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }
    },
    existsFilePath: function (filePath) {
      filePath = path.resolve(process.cwd(), filePath);
      return fs.existsSync(filePath);
    },
    writeFile: async function (filePath, content) {
      const dir_name = path.dirname(filePath);
      await ptmfs.ensureDir(dir_name);
      await fs.promises.writeFile(filePath, content);
    },
    writeFileSync: function (filePath, content) {
      const dir_name = path.dirname(filePath);
      ptmfs.ensureDirSync(dir_name);
      fs.writeFileSync(filePath, content);
    },
    isFile: function (filePath) {
      const base_name = path.basename(filePath);
      return base_name.split(".").length === 2;
    },
    getFilesFromDir: async function (folderPath) {
      folderPath = path.resolve(process.cwd(), folderPath);
      if (!fs.existsSync(folderPath)) {
        throw new Error(`${folderPath} dose not exist`);
      }
      const _files = await fs.promises.readdir(folderPath, { recursive: true });
      return _files
        .filter((file) => ptmfs.isFile(file))
        .map((f) => {
          return path.join(folderPath, f);
        });
    },
    getFilesFromDirSync: function (folderPath) {
      folderPath = path.resolve(process.cwd(), folderPath);
      if (!fs.existsSync(folderPath)) {
        throw new Error(`${folderPath} dose not exist`);
      }
      const _files = fs.readdirSync(folderPath, { recursive: true });
      return _files
        .filter((file) => ptmfs.isFile(file))
        .map((f) => {
          return path.join(folderPath, f);
        });
    },
    getFilesFromDirSyncWithExt: function (folderPath, exts) {
      folderPath = path.resolve(process.cwd(), folderPath);
      if (!fs.existsSync(folderPath)) {
        throw new Error(`${folderPath} does not exist`);
      }
      const _files = fs.readdirSync(folderPath, { recursive: true });
      const extSet = new Set(
        typeof exts === "string" ? [exts.trim()] : exts.map((ext) => ext.trim())
      );
      return _files
        .filter(
          (file) =>
            ptmfs.isFile(file) && extSet.has(path.extname(file).slice(1).trim())
        )
        .map((f) => path.join(folderPath, f));
    },
    getStringFromFile: async function (filePath) {
      filePath = path.resolve(process.cwd(), filePath);
      if (_.existsFilePath(filePath)) {
        throw new Error(`${filePath} does not exist`);
      }
      const content = await fs.promises.readFile(filePath, "utf8");
      return content;
    },
    getStringFromFileSync: function (filePath) {
      filePath = path.resolve(process.cwd(), filePath);
      if (_.existsFilePath(filePath)) {
        throw new Error(`${filePath} does not exist`);
      }
      const content = fs.readFileSync(filePath, "utf8");
      return content;
    },
    remove: async function (filePath) {
      filePath = path.resolve(process.cwd(), filePath);
      if (_.existsFilePath(filePath)) {
        throw new Error(`${filePath} does not exist`);
      }
      await fs.promises.rm(filePath);
    },
    removeSync: function (filePath) {
      filePath = path.resolve(process.cwd(), filePath);
      if (_.existsFilePath(filePath)) {
        throw new Error(`${filePath} does not exist`);
      }
      fs.rmSync(filePath);
    },
  };
  return _;
})();

if (
  "undefined" !== typeof module &&
  module.exports &&
  (module.exports = ptmfs)
) {
  Object.defineProperty(exports, "__esModule", { value: true });
}
