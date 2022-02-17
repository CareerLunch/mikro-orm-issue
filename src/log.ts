import { Connection, IDatabaseDriver, MikroORM, wrap } from "@mikro-orm/core";
import { Category } from "./entities/Category";
import { Company } from "./entities/Company";

export async function log(orm: MikroORM<IDatabaseDriver<Connection>>) {
  const em = orm.em.fork();

  const companies = await em.find(Company, {}, { populate: ["categories"] });
  console.log("\nCompanies:");
  companies.map((c) => console.log(wrap(c).toJSON()));

  const categories = await em.find(Category, {}, { populate: ["companies"] });
  console.log("\nCategories:");
  categories.map((c) => console.log(wrap(c).toJSON()));

  await orm.close();
}
