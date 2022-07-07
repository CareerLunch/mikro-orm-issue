import { MikroORM } from "@mikro-orm/core";
import { Group } from "./entities/Group";
import { Participant } from "./entities/Participant";

async function main() {
  const orm = await MikroORM.init();
  const em = orm.em.fork();

  const generator = orm.getSchemaGenerator();

  async function seedData() {
    await generator.dropSchema();
    await generator.createSchema();
    await generator.updateSchema();

    const participant = new Participant();
    const group = new Group();

    group.participants.add(participant);
    await em.persistAndFlush([group, participant]);
    em.clear();
  }

  await seedData();

  const group = await em.findOneOrFail(
    Group,
    { id: { $ne: null } },
    {
      // This does not work
      populate: ["participants"],
      // This works
      // populate: ["participants.groups"],
    }
  );

  em.remove(group);

  // Throws an error when flushing
  await em.flush();

  await orm.close();
}

main();
