/*
  Warnings:

  - You are about to alter the column `type` on the `permissions` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE `permissions` MODIFY `type` VARCHAR(20) NOT NULL;
