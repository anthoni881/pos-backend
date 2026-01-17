import fastifyMongo from "@fastify/mongodb";
import dotenv from "dotenv";

export const dbCall = async (server) => {
  dotenv.config();

  // const secret = process.env.secret;
  const secret =
    "mongodb://admin:jgtZ1mM3UY72dGzR2xOsIB33MP0nIkMc@mongo-4ntn.fccv.lyr.id:21298/?authMechanism=DEFAULT";
  server.register(fastifyMongo, {
    url: secret,
    forceClose: true,
  });
};
