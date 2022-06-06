import {Entity, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {Company} from "./Company";

@Entity()
export class Employee {
    @PrimaryKey()
    public id!: number;

    @Property()
    public firstName!: string

    @Property()
    public lastName!: string

    @ManyToOne({
        entity: () => Company,
        fieldName: 'company',
        onDelete: 'set null',
        nullable: true,
    })
    company?: Company
}