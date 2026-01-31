export async function bulkUploadStock(req, res) {
  const collectionStok = this.mongo.client.db("others").collection("stok");

  try {
    await req.jwtVerify();
    const data = req.body.data;

    data &&
      data.forEach(async (element) => {
        await collectionStok.insertOne({
          name: element.item,
          kode: element.kode.toString(),
          stock: 100,
          price: element.harga,
          toko: element.toko,
        });
      });
    res.send({ code: 200, message: "Data berhasil di Import" });
  } catch (error) {
    res.send({ code: 404, message: "Invalid Token" });
  }
}
