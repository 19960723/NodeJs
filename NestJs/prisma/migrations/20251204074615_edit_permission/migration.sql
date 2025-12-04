/*
  Warnings:

  - You are about to drop the column `code` on the `permissions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[perms]` on the table `permissions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `permissions_code_idx` ON `permissions`;

-- DropIndex
DROP INDEX `permissions_code_key` ON `permissions`;

-- AlterTable
ALTER TABLE `permissions` DROP COLUMN `code`,
    ADD COLUMN `perms` VARCHAR(100) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `permissions_perms_key` ON `permissions`(`perms`);

-- CreateIndex
CREATE INDEX `permissions_perms_idx` ON `permissions`(`perms`);
