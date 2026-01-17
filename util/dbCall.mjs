import fastifyMongo from "@fastify/mongodb";
import dotenv from "dotenv";
import { env } from "process";

export const dbCall = async (server) => {
  dotenv.config();

  const secret = process.env.secret;

  server.register(fastifyMongo, {
    url: secret,
    forceClose: true,
  });
};
