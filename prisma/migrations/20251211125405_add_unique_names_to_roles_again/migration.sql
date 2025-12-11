/*
  Warnings:

  - You are about to alter the column `name` on the `user_roles` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(150)`.
  - A unique constraint covering the columns `[name]` on the table `user_roles` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `name` ON `users`;

-- AlterTable
ALTER TABLE `user_roles` MODIFY `name` VARCHAR(150) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `name` ON `user_roles`(`name`);
