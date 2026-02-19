/*
  Warnings:

  - You are about to drop the column `Season` on the `Sound` table. All the data in the column will be lost.
  - Added the required column `season` to the `Sound` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SessionSound" ALTER COLUMN "volume" DROP NOT NULL,
ALTER COLUMN "duration" DROP NOT NULL,
ALTER COLUMN "startingTime" DROP NOT NULL,
ALTER COLUMN "endingTime" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Sound" DROP COLUMN "Season",
ADD COLUMN     "season" TEXT NOT NULL;
