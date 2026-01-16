import { server } from "../../server.mjs";

export async function login(req, res) {
  const collectionList = this.mongo.client.db("others").collection("userList");

  try {
    const data = await collectionList.findOne({
      username: req.query.username,
      password: req.query.password,
    });

    if (data) {
      const token = server.jwt.sign({ username: req.query.username });

      return {
        code: 200,
        message: "OK",
        data: {
          auth: token,
          id: data.id,
          role: data.role,
          name: data.name,
          toko: data.toko,
        },
      };

      // res.setCookie("loginCookie", "god_mode", {
      //   path: "/",
      //   maxAge: 60,
      //   secure: true,
      //   signed: true,
      //   sameSite: "None",
      // });
      // res.setCookie("auth", token, {
      //   path: "/",
      //   maxAge: 60,
      //   secure: true,
      //   signed: true,
      //   sameSite: "None",
      // });

      // res.send({ code: 200, message: "Berhasil Login!" });
    } else {
      res.send({ code: 404, message: "Username / Password Salah!" });
    }
  } catch (error) {
    console.log(error);
  }
}
