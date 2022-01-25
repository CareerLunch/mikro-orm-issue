"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const Category_1 = require("./entities/Category");
const Company_1 = require("./entities/Company");
async function main() {
    const { em } = await core_1.MikroORM.init();
    const companiesRepository = em.getRepository(Company_1.Company);
    const count = await companiesRepository.count();
    if (count === 0) {
        // Seed
        const portugal = new Category_1.Category({
            type: "PORTUGAL",
        });
        em.persist(portugal);
        const singapore = new Category_1.Category({
            type: "SINGAPORE",
        });
        em.persist(singapore);
        const companyPortugal = new Company_1.Company({
            name: "Company (Portugal)",
        });
        companyPortugal.categories.add(portugal);
        em.persist(companyPortugal);
        const companySingapore = new Company_1.Company({
            name: "Company (Singapore)",
        });
        companySingapore.categories.add(singapore);
        em.persist(companySingapore);
        const companyPortugalAndSingapore = new Company_1.Company({
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
