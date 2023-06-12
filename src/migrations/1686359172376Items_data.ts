import { MigrationInterface, QueryRunner } from 'typeorm'

export class ItemsData1686359172376 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO Items (name, image, description, price)
        VALUES ('Pizza Lạp Xưởng', '/img/f1.png', 'Sự kết hợp đột phá với Lạp xưởng và phô mai Mozzarella mang lại trải nghiệm mới mẻ và thú vị.', 59000 ),
        ('Buger Bò Phô Mai', '/img/f2.png', 'Burger truyền thống luôn luôn được lòng thực khách.', 39000),
        ('Pizza Rau Củ', '/img/f3.png', 'Thanh Nhẹ Với Ô Liu Đen Tuyệt Hảo, Cà Chua Bi Tươi Ngon, Nấm, Thơm, Bắp, Hành Tây.', 59000),
        ('Nui Xào', '/img/f4.png', 'Dai dai, mềm mềm của nui và thịt bò.', 29000),
        ('Khoai Tây Chiên', '/img/f5.png', 'Khai vị đơn giản và kích thích vị giác.', 13000),
        ('Pizza Thập Cẩm', '/img/f6.png', 'Sự kết hợp đa dạng của nhiều hương vị đem đến trải nghiệm thăng hoa cho thực khách.', 59000),
        ('Buger Gà Cay', '/img/f7.png', 'Burger đặc biệt cùng với hương vị gà cay đến từ Hàn Quốc luôn được lòng các bạn trẻ.', 39000),
        ('Buger Đặc Biệt', '/img/f8.png', 'Sự kết hợp đa dạng của nhiều hương vị đem đến trải nghiệm thăng hoa cho thực khách.', 49000),
        ('Nui Trộn Phô Mai', '/img/f9.png', 'Sự kết hợp độc đáo của nui và phô mai Mozzarella đem lại hương vị mới mẻ.', 39000);`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM Items WHERE name = 'Pizza Lạp Xưởng'
      OR name = 'Buger Bò Phô Mai'
      OR name = 'Pizza Rau Củ'
      OR name = 'Nui Xào'
      OR name = 'Khoai Tây Chiên'
      OR name = 'Pizza Thập Cẩm'
      OR name = 'Buger Gà Cay'
      OR name = 'Buger Đặc Biệt'
      OR name = 'Nui Trộn Phô Mai';`
    )
  }
}
