/*
  Warnings:

  - You are about to drop the column `action` on the `permissions` table. All the data in the column will be lost.
  - You are about to drop the column `resource` on the `permissions` table. All the data in the column will be lost.
  - Added the required column `type` to the `permissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `permissions_name_key` ON `permissions`;

-- DropIndex
DROP INDEX `permissions_resource_action_idx` ON `permissions`;

-- AlterTable
ALTER TABLE `permissions` DROP COLUMN `action`,
    DROP COLUMN `resource`,
    ADD COLUMN `api_method` VARCHAR(10) NULL,
    ADD COLUMN `api_path` VARCHAR(200) NULL,
    ADD COLUMN `component` VARCHAR(200) NULL,
    ADD COLUMN `icon` VARCHAR(50) NULL,
    ADD COLUMN `keepAlive` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `metadata` JSON NULL,
    ADD COLUMN `parent_id` INTEGER NULL,
    ADD COLUMN `path` VARCHAR(200) NULL,
    ADD COLUMN `redirect` VARCHAR(200) NULL,
    ADD COLUMN `sort` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `title` VARCHAR(50) NULL,
    ADD COLUMN `type` TINYINT NOT NULL,
    ADD COLUMN `visible` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `code` VARCHAR(100) NULL,
    MODIFY `description` VARCHAR(500) NULL;

-- CreateIndex
CREATE INDEX `permissions_parent_id_idx` ON `permissions`(`parent_id`);

-- CreateIndex
CREATE INDEX `permissions_type_status_idx` ON `permissions`(`type`, `status`);

-- CreateIndex
CREATE INDEX `permissions_code_idx` ON `permissions`(`code`);
