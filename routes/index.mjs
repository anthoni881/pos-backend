import { addNewTransaction } from "../controllers/kasir/addNewTransaction.mjs";
import { finalisasiLaporan } from "../controllers/kasir/finalisasiLaporan.mjs";
import { getHistoryKasir } from "../controllers/kasir/getHistoryKasir.mjs";
import { login } from "../controllers/login/login.mjs";
import { addNewStok } from "../controllers/stok/addNewStok.mjs";
import { belanja } from "../controllers/stok/belanja.mjs";
import { deleteStock } from "../controllers/stok/deleteStock.mjs";
import { editStok } from "../controllers/stok/editStok.mjs";
import { getListBelanja } from "../controllers/stok/getListBelanja.mjs";
import { getStok } from "../controllers/stok/getStok.mjs";
import { printReceipt } from "../controllers/print/print.mjs";

export const routes = async (fastify, options) => {
  fastify.get("/login", login);
  fastify.post("/addNewStok", addNewStok);
  fastify.post("/getStok", getStok);
  fastify.post("/editStok", editStok);
  fastify.post("/addNewTransaction", addNewTransaction);
  fastify.post("/getHistoryKasir", getHistoryKasir);
  fastify.post("/finalisasiLaporan", finalisasiLaporan);
  fastify.post("/deleteStock", deleteStock);
  fastify.post("/belanja", belanja);
  fastify.post("/getListBelanja", getListBelanja);
};
