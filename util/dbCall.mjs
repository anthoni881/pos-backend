import fastifyMongo from "@fastify/mongodb";
import dotenv from "dotenv";

export const dbCall = async (server) => {
  dotenv.config();

  const secret = process.env.secret;

  await server.register(fastifyMongo, {
    url: secret,
    forceClose: true,
  });
};
