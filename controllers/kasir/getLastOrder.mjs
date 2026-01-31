export async function getLastOrder(req, res) {
  const collectionListTransaction = this.mongo.client
    .db("others")
    .collection("transaction");
  const collectionUserList = this.mongo.client
    .db("others")
    .collection("userList");

  try {
    await req.jwtVerify();

    const findLastTransactionId = await collectionUserList.findOne({
      id: req.body.id,
    });

    const data = await collectionListTransaction
      .find({ transactionId: findLastTransactionId.transactionId })
      .toArray();

    let reStructure = {
      data: [],
      kasir: findLastTransactionId.name,
      pecahanUang: 0,
      timestamp: "",
      total: 0,
    };

    data &&
      data.forEach((element) => {
        let sum = element.qty * element.price;

        let sumTotal = reStructure.total + sum;

        reStructure.total = sumTotal;
        reStructure.timestamp = element.timestamp;
        reStructure.pecahanUang = element.pecahanUang;

        reStructure.data.push({
          id: element.transactionId,
          userId: element.id,
          name: element.name,
          kode: element.kode,
          qty: element.qty,
          price: element.price,
          toko: element.toko,
        });
      });

    res.send({
      code: 200,
      message: "Data Riwayat Transaksi Berhasil Ditarik!",
      data: reStructure,
    });
  } catch (error) {
    console.log(error);
    res.send({ code: 404, message: "Invalid Token" });
  }
}
