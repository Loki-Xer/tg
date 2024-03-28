const toBool = (x) => x === "true";
const token = "7058438916:AAEP1vgzibhoohx2Jal8qDLn8XU-iUUrz0M";
const port = "3000";
module.exports = {
  TOKEN: process.env.TOKEN || token,
  PORT: toBool(process.env.PORT || port)
}
