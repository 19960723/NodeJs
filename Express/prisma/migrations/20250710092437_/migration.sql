/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_username_key` ON `User`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `avatar` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `count` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `favs` INTEGER NOT NULL DEFAULT 100,
    ADD COLUMN `gender` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `isVip` VARCHAR(191) NOT NULL DEFAULT '0',
    ADD COLUMN `location` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `phone` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `regmark` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `roles` VARCHAR(191) NOT NULL DEFAULT 'user',
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT '0',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
