"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const Company_1 = require("./entities/Company");
const Employee_1 = require("./entities/Employee");
// async function main() {
//   const { em } = await MikroORM.init();
//
//   const companiesRepository = em.getRepository(Company);
//   const count = await companiesRepository.count();
//   if (count === 0) {
//     // Seed
//     const portugal = new Category({
//       type: "PORTUGAL",
//     });
//     em.persist(portugal);
//
//     const singapore = new Category({
//       type: "SINGAPORE",
//     });
//     em.persist(singapore);
//
//     const companyPortugal = new Company({
//       name: "Company (Portugal)",
//     });
//     companyPortugal.categories.add(portugal);
//     em.persist(companyPortugal);
//
//     const companySingapore = new Company({
//       name: "Company (Singapore)",
//     });
//     companySingapore.categories.add(singapore);
//     em.persist(companySingapore);
//
//     const companyPortugalAndSingapore = new Company({
//       name: "Company (Portugal + Singapore)",
//     });
//     companyPortugalAndSingapore.categories.add(portugal);
//     companyPortugalAndSingapore.categories.add(singapore);
//     em.persist(companyPortugalAndSingapore);
//
//     await em.flush();
//   }
//
//   const companies = await companiesRepository.find({
//     $and: [
//       {
//         categories: {
//           type: "PORTUGAL",
//         },
//       },
//       {
//         categories: {
//           type: "SINGAPORE",
//         },
//       },
//     ],
//   });
//   console.log(companies.map((company) => company.name));
// }
function getRandomCompanyName() {
    return `Company_${Math.random().toString()}`;
}
async function main() {
    const { em } = await core_1.MikroORM.init();
    const employee = new Employee_1.Employee();
    employee.firstName = "Luk";
    employee.lastName = "Skywalker";
    em.persist(employee);
    await em.flush();
    const companies = await em.find(Company_1.Company, {});
    const employees = await em.find(Employee_1.Employee, {});
    for (const comp of companies) {
        console.log(`Comp name: ${comp.name}`);
    }
    for (const emp of employees) {
        em.populate(emp, ['company']);
        console.log(`Employee name: ${emp.firstName}, Compnay Id: ${emp.company?.id ?? 'null'}`);
    }
    const company = em.create(Company_1.Company, {
        name: getRandomCompanyName(),
        employees: employees
    });
    em.persist(company);
    await em.flush();
    const companyFromDb = await em.findOne(Company_1.Company, { name: company.name }, { populate: ['employees'] });
    if (companyFromDb) {
        console.log(`Company name: ${companyFromDb.name}`);
        console.log(`Company employees count: ${companyFromDb.employees.count()}`);
        for (const employee of companyFromDb.employees) {
            console.log(`Employee name: ${employee.firstName} ${employee.lastName}`);
        }
    }
}
main();
