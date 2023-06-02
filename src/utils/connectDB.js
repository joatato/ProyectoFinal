import {mongoose} from 'mongoose'
import { config } from '../config/config.js';

export class DB {
    constructor() {
      mongoose
        .connect(config.mongoUrl)
        .then(() => console.log("DB connection success"))
        .catch((error) => console.log(`DB connection fail. Error: ${error}`));
    }
    static #instance;
    static connectDB() {
      if (DB.#instance) {
        console.log("DB already conected");
        return DB.#instance;
      } else {
        DB.#instance = new DB();
        return DB.#instance;
      }
    }
  }