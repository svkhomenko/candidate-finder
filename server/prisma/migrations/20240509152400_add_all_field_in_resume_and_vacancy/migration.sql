/*
  Warnings:

  - Added the required column `contract` to the `resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `education` to the `resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience` to the `resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary_max` to the `resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary_min` to the `resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contract` to the `vacancy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `education` to the `vacancy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience` to the `vacancy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `vacancy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `vacancy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary_max` to the `vacancy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary_min` to the `vacancy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `vacancy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `vacancy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `resume` ADD COLUMN `contract` ENUM('full_time', 'part_time', 'any') NOT NULL,
    ADD COLUMN `education` ENUM('basic_general', 'complete_general', 'junior_bachelor', 'bachelor', 'master', 'doctor_philosophy_arts', 'doctor_sciences') NOT NULL,
    ADD COLUMN `experience` INTEGER NOT NULL,
    ADD COLUMN `latitude` DECIMAL(7, 5) NOT NULL,
    ADD COLUMN `longitude` DECIMAL(8, 5) NOT NULL,
    ADD COLUMN `salary_max` INTEGER NOT NULL,
    ADD COLUMN `salary_min` INTEGER NOT NULL,
    ADD COLUMN `title` VARCHAR(255) NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `vacancy` ADD COLUMN `contract` ENUM('full_time', 'part_time', 'any') NOT NULL,
    ADD COLUMN `education` ENUM('basic_general', 'complete_general', 'junior_bachelor', 'bachelor', 'master', 'doctor_philosophy_arts', 'doctor_sciences') NOT NULL,
    ADD COLUMN `experience` INTEGER NOT NULL,
    ADD COLUMN `latitude` DECIMAL(7, 5) NOT NULL,
    ADD COLUMN `longitude` DECIMAL(8, 5) NOT NULL,
    ADD COLUMN `salary_max` INTEGER NOT NULL,
    ADD COLUMN `salary_min` INTEGER NOT NULL,
    ADD COLUMN `title` VARCHAR(255) NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `resume_language_level` (
    `language` ENUM('aa', 'ab', 'ae', 'af', 'ak', 'am', 'an', 'ar', 'as', 'av', 'ay', 'az', 'ba', 'be', 'bg', 'bh', 'bi', 'bm', 'bn', 'bo', 'br', 'bs', 'ca', 'ce', 'ch', 'co', 'cr', 'cs', 'cu', 'cv', 'cy', 'da', 'de', 'div', 'dv', 'dz', 'ee', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'ff', 'fi', 'fj', 'fo', 'fr', 'fy', 'ga', 'gd', 'gl', 'gn', 'gu', 'gv', 'ha', 'he', 'hi', 'ho', 'hr', 'ht', 'hu', 'hy', 'hz', 'ia', 'id', 'ie', 'ig', 'ii', 'ik', 'in', 'io', 'is', 'it', 'iu', 'iw', 'ja', 'ji', 'jv', 'jw', 'ka', 'kg', 'ki', 'kj', 'kk', 'kl', 'km', 'kn', 'ko', 'kok', 'kr', 'ks', 'ku', 'kv', 'kw', 'ky', 'kz', 'la', 'lb', 'lg', 'li', 'ln', 'lo', 'ls', 'lt', 'lu', 'lv', 'mg', 'mh', 'mi', 'mk', 'ml', 'mn', 'mo', 'mr', 'ms', 'mt', 'my', 'na', 'nb', 'nd', 'ne', 'ng', 'nl', 'nn', 'no', 'nr', 'ns', 'nv', 'ny', 'oc', 'oj', 'om', 'or', 'os', 'pa', 'pi', 'pl', 'ps', 'pt', 'qu', 'rm', 'rn', 'ro', 'ru', 'rw', 'sa', 'sb', 'sc', 'sd', 'se', 'sg', 'sh', 'si', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr', 'ss', 'st', 'su', 'sv', 'sw', 'sx', 'syr', 'ta', 'te', 'tg', 'th', 'ti', 'tk', 'tl', 'tn', 'to', 'tr', 'ts', 'tt', 'tw', 'ty', 'ug', 'uk', 'ur', 'us', 'uz', 've', 'vi', 'vo', 'wa', 'wo', 'xh', 'yi', 'yo', 'za', 'zh', 'zu') NOT NULL,
    `resume_id` INTEGER NOT NULL,
    `level` ENUM('A1', 'A2', 'B1', 'B2', 'C1', 'C2') NOT NULL,

    PRIMARY KEY (`language`, `resume_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vacancy_language_level` (
    `language` ENUM('aa', 'ab', 'ae', 'af', 'ak', 'am', 'an', 'ar', 'as', 'av', 'ay', 'az', 'ba', 'be', 'bg', 'bh', 'bi', 'bm', 'bn', 'bo', 'br', 'bs', 'ca', 'ce', 'ch', 'co', 'cr', 'cs', 'cu', 'cv', 'cy', 'da', 'de', 'div', 'dv', 'dz', 'ee', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'ff', 'fi', 'fj', 'fo', 'fr', 'fy', 'ga', 'gd', 'gl', 'gn', 'gu', 'gv', 'ha', 'he', 'hi', 'ho', 'hr', 'ht', 'hu', 'hy', 'hz', 'ia', 'id', 'ie', 'ig', 'ii', 'ik', 'in', 'io', 'is', 'it', 'iu', 'iw', 'ja', 'ji', 'jv', 'jw', 'ka', 'kg', 'ki', 'kj', 'kk', 'kl', 'km', 'kn', 'ko', 'kok', 'kr', 'ks', 'ku', 'kv', 'kw', 'ky', 'kz', 'la', 'lb', 'lg', 'li', 'ln', 'lo', 'ls', 'lt', 'lu', 'lv', 'mg', 'mh', 'mi', 'mk', 'ml', 'mn', 'mo', 'mr', 'ms', 'mt', 'my', 'na', 'nb', 'nd', 'ne', 'ng', 'nl', 'nn', 'no', 'nr', 'ns', 'nv', 'ny', 'oc', 'oj', 'om', 'or', 'os', 'pa', 'pi', 'pl', 'ps', 'pt', 'qu', 'rm', 'rn', 'ro', 'ru', 'rw', 'sa', 'sb', 'sc', 'sd', 'se', 'sg', 'sh', 'si', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr', 'ss', 'st', 'su', 'sv', 'sw', 'sx', 'syr', 'ta', 'te', 'tg', 'th', 'ti', 'tk', 'tl', 'tn', 'to', 'tr', 'ts', 'tt', 'tw', 'ty', 'ug', 'uk', 'ur', 'us', 'uz', 've', 'vi', 'vo', 'wa', 'wo', 'xh', 'yi', 'yo', 'za', 'zh', 'zu') NOT NULL,
    `vacancy_id` INTEGER NOT NULL,
    `level` ENUM('A1', 'A2', 'B1', 'B2', 'C1', 'C2') NOT NULL,

    PRIMARY KEY (`language`, `vacancy_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `resume` ADD CONSTRAINT `resume_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resume_language_level` ADD CONSTRAINT `resume_language_level_resume_id_fkey` FOREIGN KEY (`resume_id`) REFERENCES `resume`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vacancy` ADD CONSTRAINT `vacancy_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vacancy_language_level` ADD CONSTRAINT `vacancy_language_level_vacancy_id_fkey` FOREIGN KEY (`vacancy_id`) REFERENCES `vacancy`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
