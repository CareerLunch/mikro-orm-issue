import {
  Collection,
  Entity,
  ManyToMany, OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Category } from "./Category";
import {Employee} from "./Employee";

@Entity()
export class Company {
  @PrimaryKey()
  public id!: number;

  @Property()
  public name: string;

  @ManyToMany(() => Category)
  public categories = new Collection<Category>(this);

  @OneToMany({ entity: 'Employee', mappedBy: 'company' })
  employees = new Collection<Employee>(this)

  public constructor({ name }: { name: string }) {
    this.name = name;
  }
}
