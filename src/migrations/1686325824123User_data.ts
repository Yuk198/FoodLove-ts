import { MigrationInterface, QueryRunner } from 'typeorm'

export class UserData1686325824123 implements MigrationInterface {
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
      `DROP FROM User WHERE username = 'customer0';
      DROP FROM User WHERE username = 'customer1';
      DROP FROM User WHERE username = 'customer2';
      DROP FROM User WHERE username = 'customer3';`
    )
  }
}
