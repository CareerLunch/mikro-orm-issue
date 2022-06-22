import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Squad } from "./Squad";

@Entity()
export class Soldier {
  @PrimaryKey()
  public id!: number;

  @Property()
  public firstName!: string;

  @Property()
  public lastName!: string;

  @ManyToMany({ entity: "Squad" })
  squads = new Collection<Squad>(this);
}
