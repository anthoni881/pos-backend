import Fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes/index.mjs";
import { dbCall } from "./util/dbCall.mjs";
import Jwt from "@fastify/jwt";
import cookie from "@fastify/cookie";

export const server = Fastify({
  logger: false,
});

// Initialize database connection
await dbCall(server);

//register cookies
server.register(cookie, {
  secret: "my-secret-key", // Optional: for signed cookies
  parseOptions: {},
});

// Register plugins
server.register(Jwt, {
  secret: "supersecret",
  verify: {
    extractToken: (req) => {
      const auth = req.headers.authorization;
      const token = auth && auth.split(" ")[1];
      return token;
    },
  },
});

server.register(cors, {
  origin: "*",
  methods: ["POST", "GET"],
});

server.register(routes);

const authRoutes = {
  "/addNewStok": true,
  "/getStok": true,
  "/editStok": true,
  "/addNewTransaction": true,
  "/getHistoryKasir": true,
  "/finalisasiLaporan": true,
  "/deleteStock": true,
  "/belanja": true,
  "/getListBelanja": true,
  "/getLastOrder": true,
  "/getFinalisasiTransaksi": true,
  "/bulkUploadStock": true,
  "/getListUser": true,
  "/addNewUser": true,
  "/deleteUser": true,
};

server.addHook("onRequest", async (req, res) => {
  try {
    const path = req.routeOptions.url;
    if (authRoutes[path]) {
      await req.jwtVerify();
    }
  } catch (error) {
    if (error.statusCode === 400) {
      res.send({
        code: 400,
        message: "Format is Authorization: Bearer [token]",
      });
    } else if (error.statusCode === 401) {
      res.send({
        code: 401,
        message: "Token Invalid",
      });
    }
  }
});

server.listen({ port: 60, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    console.log(err);
    server.log.error(err);
    process.exit(1);
  }
});
