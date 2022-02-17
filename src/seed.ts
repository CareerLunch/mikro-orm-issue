import { Connection, IDatabaseDriver, MikroORM, wrap } from "@mikro-orm/core";
import { Category } from "./entities/Category";
import { Company } from "./entities/Company";

export async function seed(orm: MikroORM<IDatabaseDriver<Connection>>) {
  const em = orm.em.fork();

  const portugal = new Category({
    type: "PORTUGAL",
  });
  em.persist(portugal);

  const singapore = new Category({
    type: "SINGAPORE",
  });
  em.persist(singapore);

  const companyPortugal = new Company({
    name: "Company (Portugal)",
  });
  em.persist(companyPortugal);

  const companySingapore = new Company({
    name: "Company (Singapore)",
  });
  em.persist(companySingapore);

  await em.flush();
}
