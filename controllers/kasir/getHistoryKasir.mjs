export async function getHistoryKasir(req, res) {
  const collectionListTransaction = this.mongo.client
    .db("others")
    .collection("transaction");

  try {
    await req.jwtVerify();

    if (req.body.role === "god_mode") {
      const data = await collectionListTransaction
        .find({
          timestamp: { $regex: req.body.filterDate },
        })
        .toArray();

      res.send({
        code: 200,
        message: "Data Riwayat Transaksi Berhasil Ditarik!",
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ code: 404, message: "Invalid Token" });
  }
}
