export async function getFinalisasiTransaksi(req, res) {
  const collectionFinalisasiTransaksi = this.mongo.client
    .db("others")
    .collection("finalisasiTransaksi");

  try {
    await req.jwtVerify();

    const data = await collectionFinalisasiTransaksi.findOne({
      id: req.body.id,
      timestamp: { $regex: req.body.filterDate },
    });

    res.send({
      code: 200,
      message: "Data Finalisasi Transaksi Berhasil Ditarik!",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.send({ code: 404, message: "Invalid Token" });
  }
}
