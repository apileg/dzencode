/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `UserEntity` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `avatarUrl` to the `UserEntity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `UserEntity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordHash` to the `UserEntity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UserEntity` ADD COLUMN `avatarUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `passwordHash` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `UserEntity_email_key` ON `UserEntity`(`email`);
