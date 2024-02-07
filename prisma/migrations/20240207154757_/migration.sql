/*
  Warnings:

  - You are about to drop the column `roleIdId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_roleIdId_fkey`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `roleIdId`,
    ADD COLUMN `roleId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
