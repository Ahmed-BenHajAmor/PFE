/*
  Warnings:

  - You are about to drop the column `inputedSessionId` on the `ActualSession` table. All the data in the column will be lost.
  - You are about to drop the `InputedSession` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[inputtedSessionId]` on the table `ActualSession` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inputtedSessionId` to the `ActualSession` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ActualSession" DROP CONSTRAINT "ActualSession_inputedSessionId_fkey";

-- DropForeignKey
ALTER TABLE "InputedSession" DROP CONSTRAINT "InputedSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "SessionFeedback" DROP CONSTRAINT "SessionFeedback_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "SessionSound" DROP CONSTRAINT "SessionSound_sessionId_fkey";

-- DropIndex
DROP INDEX "ActualSession_inputedSessionId_key";

-- AlterTable
ALTER TABLE "ActualSession" DROP COLUMN "inputedSessionId",
ADD COLUMN     "inputtedSessionId" TEXT NOT NULL;

-- DropTable
DROP TABLE "InputedSession";

-- CreateTable
CREATE TABLE "InputtedSession" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "prompt" TEXT NOT NULL,
    "chosenDuration" INTEGER NOT NULL,
    "tempature" DOUBLE PRECISION NOT NULL,
    "temperatureUnit" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "InputtedSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ActualSession_inputtedSessionId_key" ON "ActualSession"("inputtedSessionId");

-- AddForeignKey
ALTER TABLE "InputtedSession" ADD CONSTRAINT "InputtedSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionSound" ADD CONSTRAINT "SessionSound_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "InputtedSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActualSession" ADD CONSTRAINT "ActualSession_inputtedSessionId_fkey" FOREIGN KEY ("inputtedSessionId") REFERENCES "InputtedSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionFeedback" ADD CONSTRAINT "SessionFeedback_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "InputtedSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
