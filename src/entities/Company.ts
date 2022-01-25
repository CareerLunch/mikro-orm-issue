import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Category } from "./Category";

@Entity()
export class Company {
  @PrimaryKey()
  public id!: number;

  @Property()
  public name: string;

  @ManyToMany(() => Category)
  public categories = new Collection<Category>(this);

  public constructor({ name }: { name: string }) {
    this.name = name;
  }
}
