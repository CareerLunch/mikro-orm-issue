"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const Group_1 = require("./entities/Group");
const Participant_1 = require("./entities/Participant");
async function main() {
    const orm = await core_1.MikroORM.init();
    const em = orm.em.fork();
    const generator = orm.getSchemaGenerator();
    async function seedData() {
        await generator.dropSchema();
        await generator.createSchema();
        await generator.updateSchema();
        const participant = new Participant_1.Participant();
        const group = new Group_1.Group();
        group.participants.add(participant);
        await em.persistAndFlush([group, participant]);
        em.clear();
    }
    await seedData();
    const group = await em.findOneOrFail(Group_1.Group, { id: { $ne: null } }, {
        // This does not work
        populate: ["participants"],
        // This works
        // populate: ["participants.groups"],
    });
    em.remove(group);
    // Throws an error when flushing
    await em.flush();
    await orm.close();
}
main();
