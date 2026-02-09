/*
  Warnings:

  - You are about to drop the column `nombreOfDownloads` on the `Sound` table. All the data in the column will be lost.
  - Added the required column `numberOfDownloads` to the `Sound` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sound" DROP COLUMN "nombreOfDownloads",
ADD COLUMN     "numberOfDownloads" INTEGER NOT NULL;
