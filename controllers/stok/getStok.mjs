export async function getStok(req, res) {
  const collectionListStok = this.mongo.client.db("others").collection("stok");

  try {
    await req.jwtVerify();

    const data = await collectionListStok.find().toArray();

    res.send({
      code: 200,
      message: "Data Stok Berhasil Ditarik!",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.send({ code: 404, message: "Invalid Token" });
  }
}
