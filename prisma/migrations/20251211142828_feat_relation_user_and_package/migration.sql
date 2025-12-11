/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `packages` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `packages_ownerId_key` ON `packages`(`ownerId`);

-- AddForeignKey
ALTER TABLE `packages` ADD CONSTRAINT `packages_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
