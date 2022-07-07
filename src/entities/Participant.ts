import { Collection, Entity, ManyToMany, PrimaryKey } from "@mikro-orm/core";
import type { Group } from "./Group";

@Entity()
export class Participant {
  @PrimaryKey()
  id!: number;

  @ManyToMany({
    entity: "Group",
    inversedBy: "participants",
  })
  public groups = new Collection<Group>(this);
}
