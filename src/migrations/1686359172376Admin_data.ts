import { MigrationInterface, QueryRunner } from 'typeorm'

export class AdminData1686359172376 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO Admin (username, password)
        VALUES ('manager0', '123456'),
        ('manager1', '123456'),
        ('manager2', '123456');`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM Admin WHERE username = 'manager0' OR username = 'manager1' OR username = 'manager2';`
    )
  }
}
