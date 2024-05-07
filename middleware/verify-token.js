const jwt = require("jsonwebtoken");

const verifyToken = () => {
  return function (req, res, next) {
    // console.log("verify token:-", req);
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    // console.log("token to be verified:-", token);
    if (!token) {
      return res.status(401).json({ message: "Not Authorized" });
    }
    let checkBearer = "Bearer ";
    if (token.startsWith(checkBearer)) {
      token = token.slice(checkBearer.length, token.length);
    }
    // console.log("after removing bearer:-", token);

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ message: "TOKEN EXPIRED"});
    }
  };
};

module.exports = { verifyToken };
