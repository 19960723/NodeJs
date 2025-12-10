-- CreateTable
CREATE TABLE `dicts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `code` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) NULL,
    `status` TINYINT NOT NULL DEFAULT 1,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `dicts_name_key`(`name`),
    UNIQUE INDEX `dicts_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dict_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dict_id` INTEGER NOT NULL,
    `label` VARCHAR(50) NOT NULL,
    `value` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) NULL,
    `sort` INTEGER NOT NULL DEFAULT 0,
    `status` TINYINT NOT NULL DEFAULT 1,
    `extension` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `dict_items_dict_id_sort_idx`(`dict_id`, `sort`),
    UNIQUE INDEX `dict_items_dict_id_value_key`(`dict_id`, `value`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `dict_items` ADD CONSTRAINT `dict_items_dict_id_fkey` FOREIGN KEY (`dict_id`) REFERENCES `dicts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
