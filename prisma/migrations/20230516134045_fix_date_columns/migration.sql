/*
  Warnings:

  - You are about to drop the column `guaranteeEnd` on the `OrderEntity` table. All the data in the column will be lost.
  - You are about to drop the column `guaranteeStart` on the `OrderEntity` table. All the data in the column will be lost.
  - You are about to drop the column `guaranteeStart` on the `ProductEntity` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `OrderEntity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `ProductEntity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OrderEntity` DROP COLUMN `guaranteeEnd`,
    DROP COLUMN `guaranteeStart`,
    ADD COLUMN `createdAt` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ProductEntity` DROP COLUMN `guaranteeStart`,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
