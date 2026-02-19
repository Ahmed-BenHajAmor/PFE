/*
  Warnings:

  - You are about to drop the column `Season` on the `InputtedSession` table. All the data in the column will be lost.
  - Added the required column `season` to the `InputtedSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InputtedSession" DROP COLUMN "Season",
ADD COLUMN     "season" "Season" NOT NULL;
