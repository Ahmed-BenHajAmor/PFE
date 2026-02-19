/*
  Warnings:

  - The `mood` column on the `InputtedSession` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `activity` column on the `Sound` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `environment` column on the `Sound` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `mood` column on the `Sound` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `activity` on the `InputtedSession` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `environment` to the `InputtedSession` table without a default value. This is not possible if the table is not empty.
  - Made the column `volume` on table `SessionSound` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duration` on table `SessionSound` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startingTime` on table `SessionSound` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endingTime` on table `SessionSound` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "SoundMood" AS ENUM ('CALM', 'ENERGETIC', 'SLEEPY', 'HAPPY', 'MOTIVATED', 'PEACEFUL', 'FOCUSED', 'RELAXING');

-- CreateEnum
CREATE TYPE "SoundActivity" AS ENUM ('FOCUS', 'RELAX', 'EXERCISE', 'READ', 'MEDITATE', 'WORK', 'SLEEP', 'STUDY');

-- CreateEnum
CREATE TYPE "SoundEnvironment" AS ENUM ('FOREST', 'DESERT', 'CAFE', 'MOUNTAIN', 'OCEAN', 'RAIN', 'BEACH');

-- AlterTable
ALTER TABLE "InputtedSession" DROP COLUMN "activity",
ADD COLUMN     "activity" "SoundActivity" NOT NULL,
DROP COLUMN "environment",
ADD COLUMN     "environment" "SoundEnvironment" NOT NULL,
DROP COLUMN "mood",
ADD COLUMN     "mood" "SoundMood"[];

-- AlterTable
ALTER TABLE "SessionSound" ALTER COLUMN "volume" SET NOT NULL,
ALTER COLUMN "duration" SET NOT NULL,
ALTER COLUMN "startingTime" SET NOT NULL,
ALTER COLUMN "endingTime" SET NOT NULL;

-- AlterTable
ALTER TABLE "Sound" DROP COLUMN "activity",
ADD COLUMN     "activity" "SoundActivity"[],
DROP COLUMN "environment",
ADD COLUMN     "environment" "SoundEnvironment"[],
DROP COLUMN "mood",
ADD COLUMN     "mood" "SoundMood"[];
