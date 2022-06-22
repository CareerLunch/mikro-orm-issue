"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const Squad_1 = require("./entities/Squad");
const Soldier_1 = require("./entities/Soldier");
async function main() {
    const orm = await core_1.MikroORM.init();
    let { em } = orm;
    await em.nativeDelete(Squad_1.Squad, {});
    await em.nativeDelete(Soldier_1.Soldier, {});
    const luke = em.create(Soldier_1.Soldier, {
        firstName: "Luke",
        lastName: "Skywalker",
    });
    const leia = em.create(Soldier_1.Soldier, {
        firstName: "Leia",
        lastName: "Organa",
    });
    await em.persistAndFlush([luke, leia]);
    // To be sure that we are working with clean identity map
    em = em.fork();
    const soldiers = await em.find(Soldier_1.Soldier, {});
    const squad = em.create(Squad_1.Squad, {
        type: "AIR",
        formedAt: new Date(),
        // soldiers are specified, we expect them to be linked automatically
        soldiers,
    });
    // Why we need to do this to have squad<->soldier links working?
    // soldiers.forEach((soldier) => soldier.squads.add(squad));
    console.log("\n ***\nCreating squad with %d soldiers", soldiers.length);
    await em.persistAndFlush(squad);
    // To be sure that we are working with clean identity map
    em = em.fork();
    const fetchedSquad = await em.findOneOrFail(Squad_1.Squad, { type: "AIR" }, { populate: ["soldiers"] });
    console.log("\n ***\nFetched Squad:\n%O", fetchedSquad);
    console.log("\n ***\nThe Squad has %d soldiers:\n%O", fetchedSquad.soldiers.count(), fetchedSquad.soldiers.getItems());
    orm.close();
}
main();
