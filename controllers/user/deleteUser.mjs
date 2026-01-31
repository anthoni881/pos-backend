export async function deleteUser(req, res) {
  const collectionListUser = this.mongo.client
    .db("others")
    .collection("userList");

  try {
    await req.jwtVerify();

    await collectionListUser.findOneAndDelete({
      id: req.body.id,
    });

    res.send({
      code: 200,
      message: "Data Berhasil Dihapus!",
    });
  } catch (error) {
    console.log(error);
    res.send({ code: 404, message: "Invalid Token" });
  }
}
