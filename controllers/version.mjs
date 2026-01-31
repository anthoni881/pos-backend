export async function version(req, res) {
  try {
    return { version: "0.70", status: "SUCESS", desc: "API ACTIVE" };
  } catch (error) {
    res.code(401).send({ code: 401, success: false });
  }
}
