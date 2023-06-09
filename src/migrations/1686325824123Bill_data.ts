import { MigrationInterface, QueryRunner } from 'typeorm'

export class BillData1686325824123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO Bill (price)
        VALUES (100000);`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP FROM Bill WHERE price = '100000';`)
  }
}
