/*
  Warnings:

  - You are about to drop the column `latitude` on the `resume` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `resume` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `vacancy` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `vacancy` table. All the data in the column will be lost.
  - Added the required column `address` to the `resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `place_id` to the `resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `vacancy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `place_id` to the `vacancy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `resume` DROP COLUMN `latitude`,
    DROP COLUMN `longitude`,
    ADD COLUMN `address` TEXT NOT NULL,
    ADD COLUMN `place_id` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `vacancy` DROP COLUMN `latitude`,
    DROP COLUMN `longitude`,
    ADD COLUMN `address` TEXT NOT NULL,
    ADD COLUMN `place_id` TEXT NOT NULL;
