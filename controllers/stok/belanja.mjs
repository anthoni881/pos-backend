import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export async function belanja(req, res) {
  const collectionListStok = this.mongo.client.db("others").collection("stok");
  const collectionListBelanja = this.mongo.client
    .db("others")
    .collection("listBelanja");

  try {
    await req.jwtVerify();

    if (req.body.statusBarang === "ada") {
      const checkKode = await collectionListStok.findOne({
        kode: { $regex: req.body.name.value, $options: "i" },
      });
      let calculate = checkKode.stock + req.body.jumlah;

      await collectionListStok.findOneAndUpdate(
        { id: checkKode.id },
        {
          $set: {
            stock: calculate,
          },
        }
      );

      await collectionListBelanja.insertOne({
        id: uuidv4(),
        name: checkKode.name,
        kode: checkKode.kode,
        qty: req.body.jumlah,
        price: checkKode.price,
        toko: checkKode.toko,
        timeStamp: moment().utcOffset("+0700").format(),
      });
      res.send({
        code: 200,
        message: "Data Belanja Berhasil Ditambah!",
      });
    } else {
      const checkKode = await collectionListStok.findOne({
        kode: { $regex: req.body.kode.toString(), $options: "i" },
      });
      if (!checkKode) {
        await collectionListStok.insertOne({
          id: uuidv4(),
          name: req.body.name,
          kode: req.body.kode,
          stock: req.body.jumlah,
          price: req.body.harga,
          toko: req.body.toko,
        });
        await collectionListBelanja.insertOne({
          id: uuidv4(),
          name: req.body.name,
          kode: req.body.kode,
          qty: req.body.jumlah,
          price: req.body.harga,
          toko: req.body.toko,
          timeStamp: moment().utcOffset("+0700").format(),
        });
        res.send({
          code: 200,
          message: "Data Belanja Berhasil Ditambah!",
        });
      } else {
        res.send({
          code: 409,
          message: "Data Barcode Sudah ada!",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.send({ code: 404, message: "Invalid Token" });
  }
}
