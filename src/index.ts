import { MikroORM, wrap } from "@mikro-orm/core";
import { Category } from "./entities/Category";
import { Company } from "./entities/Company";
import { log } from "./log";
import { seed } from "./seed";

async function main(action: string) {
  if (action !== "add" && action !== "remove" && action !== "log") {
    return console.log(
      'Error: the only param must be "add" or "remove"\n' +
        "Usage:\tyarn start add\n\tyarn start remove\n\tyarn start log"
    );
  }

  const orm = await MikroORM.init();
  const em = orm.em.fork();

  if ((await em.count(Company)) === 0) {
    await seed(orm);
  }

  if (action === "log") {
    await log(orm);
    return;
  }

  const companyPortugal = await em.findOneOrFail(
    Company,
    { name: "Company (Portugal)" }
    // { populate: ["categories"] }
  );
  const portugal = await em.findOneOrFail(
    Category,
    { type: "PORTUGAL" }
    // { populate: ["companies"] }
  );
  companyPortugal.categories[action](portugal);

  const companySingapore = await em.findOneOrFail(
    Company,
    { name: "Company (Singapore)" }
    // { populate: ["categories"] }
  );
  const singapore = await em.findOneOrFail(
    Category,
    { type: "SINGAPORE" }
    // { populate: ["companies"] }
  );
  /**
   * See the docs:
   * https://mikro-orm.io/docs/collections#propagation-of-collections-add-and-remove-operations
   * Collections on both sides have to be initialized, otherwise propagation won't work.
   * Although this propagation works also for M:N inverse side, you should always use owning
   * side to manipulate the collection.
   */
  singapore.companies[action](companySingapore);

  /**
   * This flush causes:
   * [query] begin
   * [query] insert into `company_categories` (`company_id`, `category_id`) values (1, 1) [took 1 ms]
   * [query] commit
   *
   * This links the "portugal" group, but not the "singapore" group
   */
  await em.flush();

  await log(orm);
  await orm.close();
}

main(process.argv[2]);
