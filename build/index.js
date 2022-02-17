"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const Category_1 = require("./entities/Category");
const Company_1 = require("./entities/Company");
const log_1 = require("./log");
const seed_1 = require("./seed");
async function main(action) {
    if (action !== "add" && action !== "remove" && action !== "log") {
        return console.log('Error: the only param must be "add" or "remove"\n' +
            "Usage:\tyarn start add\n\tyarn start remove\n\tyarn start log");
    }
    const orm = await core_1.MikroORM.init();
    const em = orm.em.fork();
    if ((await em.count(Company_1.Company)) === 0) {
        await (0, seed_1.seed)(orm);
    }
    if (action === "log") {
        await (0, log_1.log)(orm);
        return;
    }
    const companyPortugal = await em.findOneOrFail(Company_1.Company, { name: "Company (Portugal)" }
    // { populate: ["categories"] }
    );
    const portugal = await em.findOneOrFail(Category_1.Category, { type: "PORTUGAL" }
    // { populate: ["companies"] }
    );
    companyPortugal.categories[action](portugal);
    const companySingapore = await em.findOneOrFail(Company_1.Company, { name: "Company (Singapore)" }
    // { populate: ["categories"] }
    );
    const singapore = await em.findOneOrFail(Category_1.Category, { type: "SINGAPORE" }
    // { populate: ["companies"] }
    );
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
    await (0, log_1.log)(orm);
    await orm.close();
}
main(process.argv[2]);
