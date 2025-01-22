import { hashPassword } from "../../utils/passwordHash.util";
import { UserRole } from "../../types/users.type";
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";

// User Table
@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar", { nullable: true, length: 30 })
  firstName!: string;

  @Column("varchar", { nullable: true, length: 30 })
  lastName!: string;

  @Column("varchar", { nullable: true, length: 100 })
  password!: string;

  @Column("enum", {
    enum: UserRole,
    nullable: false,
    default: UserRole.USER,
  })
  role!: UserRole;

  @Column("varchar", { nullable: true, unique: true, length: 30 })
  userName!: string;


  @Column("timestamp", { nullable: false, default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column("timestamp", {
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await hashPassword(this.password);
    }
  }
}
