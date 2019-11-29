import express from "express";
import cors from "cors";
import logger from "morgan";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { sequelize } from "../models/index";

config();

const server = express();

const { PORT } = process.env;

server.use(cors());
server.use(logger("dev"));

server.listen(PORT, () => {
  console.log("hi");
});

// sequelize.sync();
