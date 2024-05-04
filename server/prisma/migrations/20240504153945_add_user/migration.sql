-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` CHAR(60) NOT NULL,
    `full_name` VARCHAR(255) NOT NULL,
    `role` ENUM('hr', 'candidate') NOT NULL,
    `phone_number` VARCHAR(255) NOT NULL,
    `is_confirmed` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
