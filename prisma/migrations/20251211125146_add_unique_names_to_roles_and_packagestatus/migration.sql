/*
  Warnings:

  - You are about to alter the column `name` on the `package_statuses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(150)`.
  - You are about to alter the column `name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(150)`.
  - A unique constraint covering the columns `[name]` on the table `package_statuses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `package_statuses` MODIFY `name` VARCHAR(150) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `name` VARCHAR(150) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `name` ON `package_statuses`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `name` ON `users`(`name`);
