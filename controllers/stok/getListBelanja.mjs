export async function getListBelanja(req, res) {
  const collectionListBelanja = this.mongo.client
    .db("others")
    .collection("listBelanja");

  try {
    await req.jwtVerify();

    const data = await collectionListBelanja.find().toArray();

    res.send({
      code: 200,
      message: "Data Belanja Berhasil Ditarik!",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.send({ code: 404, message: "Invalid Token" });
  }
}
