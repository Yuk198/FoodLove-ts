import { MigrationInterface, QueryRunner } from 'typeorm'

export class ItemsData1686325824123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO Items (name, image, description, price)
        VALUES ('Pizza Lạp Xưởng', 'f1.jpg', 'Sự kết hợp đột phá với Lạp xưởng và phô mai Mozzarella mang lại trải nghiệm mới mẻ và thú vị.', 59000 ),
        ('Buger Bò Phô Mai', 'f2.jpg', 'Burger truyền thống luôn luôn được lòng thực khách.', 39000),
        ('Pizza Rau Củ', 'f3.jpg', 'Thanh Nhẹ Với Ô Liu Đen Tuyệt Hảo, Cà Chua Bi Tươi Ngon, Nấm, Thơm, Bắp, Hành Tây.', 59000),
        ('Nui Xào', 'f4.jpg', 'Dai dai, mềm mềm của nui và thịt bò.', 29000),
        ('Khoai Tây Chiên', 'f5.jpg', 'Khai vị đơn giản và kích thích vị giác.', 13000),
        ('Pizza Thập Cẩm', 'f6.jpg', 'Sự kết hợp đa dạng của nhiều hương vị đem đến trải nghiệm thăng hoa cho thực khách.', 59000),
        ('Buger Gà Cay', 'f7.jpg', 'Burger đặc biệt cùng với hương vị gà cay đến từ Hàn Quốc luôn được lòng các bạn trẻ.', 39000),
        ('Buger Đặc Biệt', 'f8.jpg', 'Sự kết hợp đa dạng của nhiều hương vị đem đến trải nghiệm thăng hoa cho thực khách.', 49000),
        ('Nui Trộn Phô Mai', 'f9.jpg', 'Sự kết hợp độc đáo của nui và phô mai Mozzarella đem lại hương vị mới mẻ.', 39000);`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP FROM Items WHERE name = 'Pizza Lạp Xưởng';
      DROP FROM Items WHERE name = 'Buger Bò Phô Mai';
      DROP FROM Items WHERE name = 'Pizza Rau Củ';
      DROP FROM Items WHERE name = 'Nui Xào';
      DROP FROM Items WHERE name = 'Khoai Tây Chiên';
      DROP FROM Items WHERE name = 'Pizza Thập Cẩm';
      DROP FROM Items WHERE name = 'Buger Gà Cay';
      DROP FROM Items WHERE name = 'Buger Đặc Biệt';
      DROP FROM Items WHERE name = 'Nui Trộn Phô Mai';`
    )
  }
}
