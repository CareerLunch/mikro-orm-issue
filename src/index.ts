import { MikroORM } from "@mikro-orm/core";
import { Category } from "./entities/Category";
import { Company } from "./entities/Company";

async function main() {
  const { em } = await MikroORM.init();

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
  console.log(companies.map((company) => company.name));
}

main();
