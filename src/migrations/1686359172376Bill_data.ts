import { MigrationInterface, QueryRunner } from 'typeorm'

export class BillData1686359172376 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO Bill (id_user)
      VALUES 
      (1),
      (2),
      (3);`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM Bill WHERE id_user = 1 OR id_user = 2 OR id_user = 3;`)
  }
}
