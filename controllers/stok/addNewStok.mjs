import { v4 as uuidv4 } from "uuid";

export async function addNewStok(req, res) {
  const collectionListStok = this.mongo.client.db("others").collection("stok");

  try {
    await req.jwtVerify();

    const checkKode = await collectionListStok.findOne({
      kode: { $regex: req.body.kode, $options: "i" },
    });

    if (!checkKode) {
      await collectionListStok.insertOne({
        id: uuidv4(),
        name: req.body.name,
        kode: req.body.kode,
        stock: req.body.stock,
        price: req.body.price,
        toko: req.body.toko,
      });
    }

    res.send({
      code: 200,
      message: "Data Stok Berhasil Ditambah!",
    });
  } catch (error) {
    console.log(error);
    res.send({ code: 404, message: "Invalid Token" });
  }
}
