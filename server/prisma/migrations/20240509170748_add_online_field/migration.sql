/*
  Warnings:

  - Added the required column `online` to the `resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `online` to the `vacancy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `resume` ADD COLUMN `online` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `vacancy` ADD COLUMN `online` BOOLEAN NOT NULL;
