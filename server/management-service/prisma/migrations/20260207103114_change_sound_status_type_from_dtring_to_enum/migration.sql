/*
  Warnings:

  - Changed the type of `status` on the `Sound` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SoundStatus" AS ENUM ('DRAFT', 'ACTIVE', 'INACTIVE', 'ARCHIVED');

-- AlterTable
ALTER TABLE "Sound" DROP COLUMN "status",
ADD COLUMN     "status" "SoundStatus" NOT NULL;
