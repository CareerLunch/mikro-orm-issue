const { LoadStrategy } = require("@mikro-orm/core");

module.exports = {
  entities: ["./build/entities"],
  dbName: ":memory:",
  type: "sqlite",
  debug: true,
  loadStrategy: LoadStrategy.JOINED,
};
