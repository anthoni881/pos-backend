export async function getListUser(req, res) {
  const collectionListUser = this.mongo.client
    .db("others")
    .collection("userList");

  try {
    await req.jwtVerify();

    const data = await collectionListUser.find().toArray();

    res.send({
      code: 200,
      message: "Data Berhasil Ditarik!",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.send({ code: 404, message: "Invalid Token" });
  }
}
