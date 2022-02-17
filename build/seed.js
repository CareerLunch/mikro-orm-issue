"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const Category_1 = require("./entities/Category");
const Company_1 = require("./entities/Company");
async function seed(orm) {
    const em = orm.em.fork();
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
    em.persist(companyPortugal);
    const companySingapore = new Company_1.Company({
        name: "Company (Singapore)",
    });
    em.persist(companySingapore);
    await em.flush();
}
exports.seed = seed;
