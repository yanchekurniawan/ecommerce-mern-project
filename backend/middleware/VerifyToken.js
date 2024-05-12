import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["x-access-token"];
  console.log("AUTH: ", authHeader);

  const token = authHeader && authHeader.split(" ")[1];

  console.log("Token", token);

  if (token === null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.email = decoded.userEmail;
    next();
  });
};
