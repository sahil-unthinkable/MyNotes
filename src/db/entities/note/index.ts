import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "note" })
export class Note {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  content!: string;
}
