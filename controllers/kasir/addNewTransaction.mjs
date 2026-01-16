import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export async function addNewTransaction(req, res) {
  const collectionListStok = this.mongo.client.db("others").collection("stok");
  const collectionListTransaction = this.mongo.client
    .db("others")
    .collection("transaction");

  try {
    await req.jwtVerify();

    const data = req.body.data;
    const transactionId = uuidv4();

    data &&
      data.forEach(async (element) => {
        const findStock = await collectionListStok.findOne({ id: element.id });
        let calculate = findStock.stock - element.qty;

        await collectionListStok.findOneAndUpdate(
          { id: element.id },
          {
            $set: {
              stock: calculate,
            },
          }
        );

        await collectionListTransaction.insertOne({
          id: element.userId,
          isFinal: element.isFinal,
          transactionId: transactionId,
          name: element.name,
          kode: element.kode,
          stockBefore: findStock.stock,
          qty: element.qty,
          price: element.price,
          toko: element.toko,
          kasir: req.body.kasir,
          pecahanUang: req.body.pecahanUang,
          timestamp: moment().utcOffset("+0700").format(),
        });
      });

    res.send({
      code: 200,
      message: "Data Transaksi Berhasil Dikirim!",
    });
  } catch (error) {
    console.log(error);
    res.send({ code: 404, message: "Invalid Token" });
  }
}
