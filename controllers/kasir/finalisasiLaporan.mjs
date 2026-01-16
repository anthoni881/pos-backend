import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export async function finalisasiLaporan(req, res) {
  const collectionListTransaction = this.mongo.client
    .db("others")
    .collection("transaction");
  const collectionListFinalisasiTransaksi = this.mongo.client
    .db("others")
    .collection("finalisasiTransaksi");

  try {
    await req.jwtVerify();

    const finalisasiTransactionId = uuidv4();

    await collectionListTransaction.updateMany(
      {
        id: req.body.id,
        timestamp: { $regex: req.body.filterDate },
        isFinal: false,
      },
      { $set: { isFinal: true, finalisasiId: finalisasiTransactionId } }
    );

    await collectionListFinalisasiTransaksi.insertOne({
      id: req.body.id,
      finalisasiId: finalisasiTransactionId,
      total: req.body.total,
      timestamp: moment().utcOffset("+0700").format(),
    });

    res.send({
      code: 200,
      message: "Data Finalisasi Berhasil Dikirim!",
    });
  } catch (error) {
    console.log(error);
    res.send({ code: 404, message: "Invalid Token" });
  }
}
