import messages = require("../utils/messages");
function validateEnv(env: NodeJS.ProcessEnv = process.env): void {
  if (!env.MONGODB_URI || !/^mongodb(?:\+srv)?:\/\//.test(env.MONGODB_URI)) throw new Error(messages.config.invalidMongoUri);
  for (const name of ["JWT_ACCESS_SECRET", "JWT_REFRESH_SECRET"]) {
    if (!env[name] || env[name].length < 32) throw new Error(messages.config.secretTooShort(name));
  }
  if (env.JWT_ACCESS_SECRET === env.JWT_REFRESH_SECRET) throw new Error(messages.config.distinctSecrets);
}
export = validateEnv;
