import express from "express";
import cors from "cors";
import logger from "morgan";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { sequelize } from "../models/index";
import userRouter from "./Routers/userRouter";
import routes from "./routes";

config();

const server = express();

const { PORT, cookieSecret } = process.env;

server.use(cors());
server.use(logger("dev"));
server.use(express.json());
server.use(cookieParser(cookieSecret));

server.use(routes.user, userRouter);

server.listen(PORT, () => {
  console.log("hi");
});

// sequelize.sync();
