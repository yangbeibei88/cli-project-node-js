import fs from "node:fs/promises";
import path from "node:path";

// const DB_PATH = "db.json";
let DB_PATH = new URL("../db.json", import.meta.url).pathname;
// const DB_PATH = path.resolve(new URL("../db.json", import.meta.url).pathname);

if (process.platform === "win32") {
  DB_PATH = DB_PATH.substring(1);
}

// console.log(DB_PATH);

// getDB: reads the db.json file and parses it into a JavaScript object
// it's like php stateless?
export const getDB = async () => {
  const db = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(db);
};

export const saveDB = async (db) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  return db;
};

export const insertDB = async (data) => {
  const db = await getDB();
  db.notes.push(data);
  await saveDB(db);
  return data;
};
