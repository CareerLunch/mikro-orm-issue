import { Collection, Entity, ManyToMany, PrimaryKey } from "@mikro-orm/core";
import type { Group } from "./Group";

@Entity()
export class Participant {
  @PrimaryKey()
  id!: number;

  @ManyToMany({
    entity: "Group",
    pivotTable: "_ParticipantToGroup",
    joinColumn: "A",
    inverseJoinColumn: "B",
    inversedBy: "participants",
  })
  public groups = new Collection<Group>(this);
}
