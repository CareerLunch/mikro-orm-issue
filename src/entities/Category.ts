import {
  Entity,
  PrimaryKey,
  Property,
  ManyToMany,
  Collection,
} from "@mikro-orm/core";
import { Company } from "./Company";

type CategoryType = "PORTUGAL" | "SINGAPORE";

@Entity()
export class Category {
  @PrimaryKey()
  public id!: number;

  @Property()
  public type: CategoryType;

  @ManyToMany({ entity: () => Company, mappedBy: "categories" })
  public companies = new Collection<Company>(this);

  public constructor({ type }: { type: CategoryType }) {
    this.type = type;
  }
}
