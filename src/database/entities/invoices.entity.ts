import { InvoiceStatus, InvoicePaymentStatus } from "@/types/invoice.type";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  Index,
  AfterInsert,
} from "typeorm";

@Entity({ name: "invoices" })
export class Invoice extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index("customer_idx")
  @Column("varchar", { nullable: false })
  customerId!: string;

  @Index(["customerId", "referenceIndex"], { unique: true })
  @Column("int", { nullable: false, generated: "increment" })
  referenceIndex!: number;

  @Column("varchar", { nullable: true, unique: true })
  reference!: string;

  @Column("decimal", { nullable: false, precision: 10, scale: 2 })
  amount!: number;

  @Column("jsonb", { nullable: false })
  items!: {
    sku: string; // stock keeping unit unique identifier
    qty: number;
    price: number;
  }[];

  @Column("enum", {
    enum: InvoiceStatus,
    nullable: false,
    default: InvoiceStatus.PENDING,
  })
  invoiceStatus!: InvoiceStatus;

  @Column("enum", {
    enum: InvoicePaymentStatus,
    nullable: false,
    default: InvoicePaymentStatus.UNPAID,
  })
  paymentStatus!: InvoicePaymentStatus;

  @Column("timestamp", { nullable: false, default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column("timestamp", {
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;

  @BeforeInsert()
  calculateTotalAmount() {
    this.amount = parseFloat(
      this.items
        .reduce((total, item) => total + item.price * item.qty, 0)
        .toFixed(2)
    );
  }

  @BeforeInsert()
  filterDuplicateSkus() {
    const seenSkus = new Set<string>();
    this.items = this.items.filter(item => {
      if (seenSkus.has(item.sku)) {
        return false;
      }
      seenSkus.add(item.sku);
      return true;
    });
  }

  @AfterInsert()
  generateReference() {
    const year = new Date().getFullYear();
    this.reference = `INV-${year}-${this.referenceIndex
      .toString()
      .padStart(4, "0")}-${this.customerId.slice(-4)}`;
  }
}
