export async function deleteStock(req, res) {
  const collectionListStok = this.mongo.client.db("others").collection("stok");

  try {
    await req.jwtVerify();

    await collectionListStok.findOneAndDelete({ id: req.body.id });

    res.send({
      code: 200,
      message: "Data Stok Berhasil Dihapus!",
    });
  } catch (error) {
    console.log(error);
    res.send({ code: 404, message: "Invalid Token" });
  }
}
