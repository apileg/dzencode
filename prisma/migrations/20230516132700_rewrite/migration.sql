/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Price` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Price` DROP FOREIGN KEY `Price_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_orderId_fkey`;

-- DropTable
DROP TABLE `Order`;

-- DropTable
DROP TABLE `Price`;

-- DropTable
DROP TABLE `Product`;

-- CreateTable
CREATE TABLE `OrderEntity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `guaranteeStart` INTEGER NOT NULL,
    `guaranteeEnd` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductEntity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `serialNumber` VARCHAR(191) NOT NULL,
    `availability` ENUM('Available', 'InMaintenance') NOT NULL,
    `usedOrNew` ENUM('Used', 'New') NOT NULL,
    `guaranteeStart` INTEGER NOT NULL,
    `guaranteeEnd` INTEGER NOT NULL,
    `priceUsd` INTEGER UNSIGNED NOT NULL,
    `priceUah` INTEGER UNSIGNED NOT NULL,
    `groupName` VARCHAR(191) NOT NULL,
    `customerFullName` VARCHAR(191) NOT NULL,
    `orderId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductEntity` ADD CONSTRAINT `ProductEntity_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `OrderEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
