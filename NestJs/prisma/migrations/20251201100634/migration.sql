/*
  Warnings:

  - You are about to drop the column `api_method` on the `permissions` table. All the data in the column will be lost.
  - You are about to drop the column `api_path` on the `permissions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `permissions` DROP COLUMN `api_method`,
    DROP COLUMN `api_path`;
