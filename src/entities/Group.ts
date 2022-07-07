import { Entity, PrimaryKey, ManyToMany, Collection } from "@mikro-orm/core";
import type { Participant } from "./Participant";

@Entity()
export class Group {
  @PrimaryKey()
  public id!: number;

  @ManyToMany({
    entity: "Participant",
    mappedBy: "groups",
  })
  public participants = new Collection<Participant>(this);
}
