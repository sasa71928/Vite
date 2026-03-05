module.exports = function tokenGuard(req, res, next) {
  if (req.method === "GET") return next();

  const token = req.header("token");
  if (token !== "Oscar70") {
    return res.status(403).json({ error: "Forbidden: invalid token" });
  }
  next();
};
