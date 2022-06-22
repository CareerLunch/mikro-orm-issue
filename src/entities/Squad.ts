import {
  Entity,
  PrimaryKey,
  Property,
  ManyToMany,
  Collection,
} from "@mikro-orm/core";
import { Soldier } from "./Soldier";

type SquadType = "GROUND" | "AIR";

@Entity()
export class Squad {
  @PrimaryKey()
  public id!: number;

  @Property()
  public type!: SquadType;

  @Property()
  public formedAt!: Date;

  @Property({ nullable: true })
  public disbandedAt?: Date;

  @ManyToMany({ entity: "Soldier", mappedBy: "squads" })
  public soldiers = new Collection<Soldier>(this);
}
