import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "customers" })
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar", { nullable: false, length: 30 })
  firstName!: string;

  @Column("varchar", { nullable: false, length: 30 })
  lastName!: string;

  @Column("varchar", { nullable: false, length: 30 })
  email!: string;

  @Column("varchar", { nullable: false, length: 30 })
  phone!: string;

  @Column("varchar", { nullable: false, length: 30 })
  address!: string;

  @Column("varchar", { nullable: false, length: 30 })
  city!: string;

  @Column("varchar", { nullable: false, length: 30 })
  state!: string;

  @Column("varchar", { nullable: false, length: 30 })
  zip!: string;

  @Column("varchar", { nullable: false, length: 30 })
  country!: string;

  @Column("timestamp", { nullable: false, default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column("timestamp", {
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;

//   @OneToMany(() => Invoice, (invoice) => invoice.customer)
//   invoices!: Invoice[];
}
