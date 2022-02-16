import { MikroORM } from "@mikro-orm/core";
import { Category } from "./entities/Category";
import { Company } from "./entities/Company";

async function main() {
  const orm = await MikroORM.init();
  const em = orm.em.fork();

  const companiesRepository = em.getRepository(Company);
  const count = await companiesRepository.count();
  if (count === 0) {
    // Seed
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
    companyPortugal.categories.add(portugal);
    em.persist(companyPortugal);

    const companySingapore = new Company({
      name: "Company (Singapore)",
    });
    companySingapore.categories.add(singapore);
    em.persist(companySingapore);

    const companyPortugalAndSingapore = new Company({
      name: "Company (Portugal + Singapore)",
    });
    companyPortugalAndSingapore.categories.add(portugal);
    companyPortugalAndSingapore.categories.add(singapore);
    em.persist(companyPortugalAndSingapore);

    await em.flush();
  }

  const companies = await companiesRepository.find({
    $and: [
      {
        categories: {
          type: "PORTUGAL",
        },
      },
      {
        categories: {
          type: "SINGAPORE",
        },
      },
    ],
  });

  await orm.close();
  console.log(companies.length === 1 ? companies[0] : companies);
}

main();
