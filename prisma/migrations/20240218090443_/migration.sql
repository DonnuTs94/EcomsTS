/*
  Warnings:

  - The values [On Progress] on the enum `orders_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `orders` MODIFY `status` ENUM('Waiting for Payment', 'Paid', 'Canceled', 'Success') NOT NULL;