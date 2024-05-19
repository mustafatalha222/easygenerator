export default () => ({
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
  jwtRefreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
});
