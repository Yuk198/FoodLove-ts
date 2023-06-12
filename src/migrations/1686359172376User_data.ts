import { MigrationInterface, QueryRunner } from 'typeorm'

export class UserData1686359172376 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO User (username, password)
        VALUES ('customer0', '123456'),
        ('customer1', '123456'),
        ('customer2', '123456'),
        ('customer3', '123456');`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM User WHERE username = 'customer0'
      OR username = 'customer1'
      OR username = 'customer2'
      OR username = 'customer3';`
    )
  }
}
