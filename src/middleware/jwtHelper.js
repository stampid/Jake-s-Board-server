import jwt from "jsonwebtoken";
// import { config } from "dotenv";

// config();

const { tokenSecret } = process.env;

export const createJWT = userInfo => {
  const token = jwt.sign(userInfo, tokenSecret, {
    expiresIn: "1h",
    subject: "userInfo"
  });

  return token;
};

export const verifyJWT = (req, res, next) => {
  const { token } = req.signedCookies;

  jwt.verify(token, tokenSecret, (err, decoded) => {
    if (err) {
      res.clearCookie("token");
      res.status(401);
      res.send("token expire");
    } else {
      req.userInfo = decoded;
      next();
    }
  });
};
