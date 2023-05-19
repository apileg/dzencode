/*
  Warnings:

  - Added the required column `userId` to the `OrderEntity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OrderEntity` ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `UserEntity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OrderEntity` ADD CONSTRAINT `OrderEntity_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
