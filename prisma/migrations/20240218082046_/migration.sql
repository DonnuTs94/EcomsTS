-- AlterTable
ALTER TABLE `orders` MODIFY `status` ENUM('Waiting for Payment', 'Paid', 'Canceled', 'On Progress', 'Success') NOT NULL;
