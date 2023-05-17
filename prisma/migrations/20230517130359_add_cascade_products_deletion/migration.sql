-- DropForeignKey
ALTER TABLE `ProductEntity` DROP FOREIGN KEY `ProductEntity_orderId_fkey`;

-- AddForeignKey
ALTER TABLE `ProductEntity` ADD CONSTRAINT `ProductEntity_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `OrderEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
