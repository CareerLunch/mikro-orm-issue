"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const core_1 = require("@mikro-orm/core");
const Category_1 = require("./entities/Category");
const Company_1 = require("./entities/Company");
async function log(orm) {
    const em = orm.em.fork();
    const companies = await em.find(Company_1.Company, {}, { populate: ["categories"] });
    console.log("\nCompanies:");
    companies.map((c) => console.log((0, core_1.wrap)(c).toJSON()));
    const categories = await em.find(Category_1.Category, {}, { populate: ["companies"] });
    console.log("\nCategories:");
    categories.map((c) => console.log((0, core_1.wrap)(c).toJSON()));
    await orm.close();
}
exports.log = log;
