/*
  Warnings:

  - The `season` column on the `Sound` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `Season` on the `InputtedSession` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Season" AS ENUM ('SPRING', 'SUMMER', 'AUTUMN', 'WINTER');

-- AlterTable
ALTER TABLE "InputtedSession" DROP COLUMN "Season",
ADD COLUMN     "Season" "Season" NOT NULL;

-- AlterTable
ALTER TABLE "Sound" DROP COLUMN "season",
ADD COLUMN     "season" "Season"[];
