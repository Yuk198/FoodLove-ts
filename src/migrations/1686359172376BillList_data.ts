import { MigrationInterface, QueryRunner } from 'typeorm'

export class BillListData1686359172376 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO BillList (id_item, id_bill, quantity)
        VALUES 
        (1, 1, 4),
        (2, 2, 5);`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM BillList WHERE id_bill = 1 OR id_bill = 2;`)
  }
}
