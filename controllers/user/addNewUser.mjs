import { v4 as uuidv4 } from "uuid";

export async function addNewUser(req, res) {
  const collectionListUser = this.mongo.client
    .db("others")
    .collection("userList");

  try {
    await req.jwtVerify();

    await collectionListUser.insertOne({
      id: uuidv4(),
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
      toko: req.body.toko,
      transactionId: "",
    });

    res.send({
      code: 200,
      message: "Data Berhasil Ditambah!",
    });
  } catch (error) {
    console.log(error);
    res.send({ code: 404, message: "Invalid Token" });
  }
}
