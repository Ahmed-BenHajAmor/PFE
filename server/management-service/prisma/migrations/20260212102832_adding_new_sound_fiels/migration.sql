/*
  Warnings:

  - The values [PREMIUM_SiLVER] on the enum `SubscriptionPlan` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `tempature` on the `InputtedSession` table. All the data in the column will be lost.
  - Added the required column `Season` to the `InputtedSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activity` to the `InputtedSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mood` to the `InputtedSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `temperature` to the `InputtedSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeOfDay` to the `InputtedSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Season` to the `Sound` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activity` to the `Sound` table without a default value. This is not possible if the table is not empty.
  - Added the required column `environment` to the `Sound` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mood` to the `Sound` table without a default value. This is not possible if the table is not empty.
  - Added the required column `temperature` to the `Sound` table without a default value. This is not possible if the table is not empty.
  - Added the required column `temperatureUnit` to the `Sound` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeOfDay` to the `Sound` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SubscriptionPlan_new" AS ENUM ('FREE', 'PREMIUM_SILVER', 'PREMIUM_GOLD');
ALTER TABLE "Subscription" ALTER COLUMN "plan" TYPE "SubscriptionPlan_new" USING ("plan"::text::"SubscriptionPlan_new");
ALTER TYPE "SubscriptionPlan" RENAME TO "SubscriptionPlan_old";
ALTER TYPE "SubscriptionPlan_new" RENAME TO "SubscriptionPlan";
DROP TYPE "public"."SubscriptionPlan_old";
COMMIT;

-- AlterTable
ALTER TABLE "InputtedSession" DROP COLUMN "tempature",
ADD COLUMN     "Season" TEXT NOT NULL,
ADD COLUMN     "activity" TEXT NOT NULL,
ADD COLUMN     "environment" TEXT,
ADD COLUMN     "mood" TEXT NOT NULL,
ADD COLUMN     "temperature" INTEGER NOT NULL,
ADD COLUMN     "timeOfDay" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sound" ADD COLUMN     "Season" TEXT NOT NULL,
ADD COLUMN     "activity" TEXT NOT NULL,
ADD COLUMN     "environment" TEXT NOT NULL,
ADD COLUMN     "mood" TEXT NOT NULL,
ADD COLUMN     "temperature" INTEGER NOT NULL,
ADD COLUMN     "temperatureUnit" TEXT NOT NULL,
ADD COLUMN     "timeOfDay" TEXT NOT NULL;
