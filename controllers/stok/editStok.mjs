export async function editStok(req, res) {
  const collectionListStok = this.mongo.client.db("others").collection("stok");

  try {
    await req.jwtVerify();

    await collectionListStok.findOneAndUpdate(
      { id: req.body.id },
      {
        $set: {
          name: req.body.editName,
          kode: req.body.editKode,
          stock: req.body.editStock,
          price: req.body.editHarga,
          toko: req.body.editToko,
        },
      }
    );

    res.send({
      code: 200,
      message: "Data Stok Berhasil Diedit!",
    });
  } catch (error) {
    console.log(error);
    res.send({ code: 404, message: "Invalid Token" });
  }
}
