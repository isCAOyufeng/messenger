import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // send token back to user in a cookie
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true, // prevent XSS attacks: cross-site scripting
    sameSite: "strict", // prevent the CSRF attacks
    secure: process.env.NODE_ENV === "production" ? false : true,
  });

  return token;
};
