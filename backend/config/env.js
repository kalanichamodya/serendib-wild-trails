function validateEnv(env = process.env) {
  if (!env.MONGODB_URI || !/^mongodb(?:\+srv)?:\/\//.test(env.MONGODB_URI)) throw new Error("MONGODB_URI must be a MongoDB connection URI");
  for (const name of ["JWT_ACCESS_SECRET", "JWT_REFRESH_SECRET"]) {
    if (!env[name] || env[name].length < 32) throw new Error(`${name} must contain at least 32 characters`);
  }
  if (env.JWT_ACCESS_SECRET === env.JWT_REFRESH_SECRET) throw new Error("JWT secrets must be different");
}
module.exports = validateEnv;
