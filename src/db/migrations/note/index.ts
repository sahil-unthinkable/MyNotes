import { MigrationInterface, QueryRunner } from "typeorm";

export class InitalNoteMigration1710321969208 implements MigrationInterface {
  name = "InitalNoteMigration1710321969208";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "note" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "content" varchar NOT NULL)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
