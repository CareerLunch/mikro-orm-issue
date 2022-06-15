"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const Company_1 = require("./entities/Company");
const Employee_1 = require("./entities/Employee");
function getRandomCompanyName() {
    return `Company_${Math.random().toString()}`;
}
async function main() {
    let { em } = await core_1.MikroORM.init();
    const luke = em.create(Employee_1.Employee, {
        firstName: "Luke",
        lastName: "Skywalker",
    });
    const leia = em.create(Employee_1.Employee, {
        firstName: "Leia",
        lastName: "Organa",
    });
    em.persistAndFlush([luke, leia]);
    // To be sure that we are working with clean identity map
    em = em.fork();
    const employees = await em.find(Employee_1.Employee, {});
    const company = em.create(Company_1.Company, {
        name: "Rebels",
        employees,
    });
    em.persistAndFlush(company);
    // To be sure that we are working with clean identity map
    em = em.fork();
    const fetchedCompanies = await em.find(Company_1.Company, {}, { populate: ["employees"] });
    console.log("[START] Companies");
    for (const fetchedCompany of fetchedCompanies) {
        console.log(fetchedCompany);
    }
    console.log("[END] Companies");
    console.log("[START] Employees");
    const fetchedEmployees = await em.find(Employee_1.Employee, {});
    for (const fetchedEmployee of fetchedEmployees) {
        console.log(fetchedEmployee);
    }
    console.log("[END] Employees");
    // const employee = new Employee();
    // employee.firstName = "Luk";
    // employee.lastName = "Skywalker";
    // em.persist(employee);
    // await em.flush();
    // const companies = await em.find(Company, {});
    // const employees = await em.find(Employee, {});
    // for (const comp of companies) {
    //   console.log(`Comp name: ${comp.name}`);
    // }
    // for (const emp of employees) {
    //   em.populate(emp, ["company"]);
    //   console.log(
    //     `Employee name: ${emp.firstName}, Compnay Id: ${
    //       emp.company?.id ?? "null"
    //     }`
    //   );
    // }
    // const company = em.create(Company, {
    //   name: getRandomCompanyName(),
    //   employees: employees,
    // });
    // em.persist(company);
    // await em.flush();
    // const companyFromDb = await em.findOne(
    //   Company,
    //   { name: company.name },
    //   { populate: ["employees"] }
    // );
    // if (companyFromDb) {
    //   console.log(`Company name: ${companyFromDb.name}`);
    //   console.log(`Company employees count: ${companyFromDb.employees.count()}`);
    //   for (const employee of companyFromDb.employees) {
    //     console.log(`Employee name: ${employee.firstName} ${employee.lastName}`);
    //   }
    // }
}
main();
