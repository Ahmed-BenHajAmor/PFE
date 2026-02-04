-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "paymentProvider" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subscriptionId" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sound" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "totalDuration" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "nombreOfDownloads" INTEGER NOT NULL,

    CONSTRAINT "Sound_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InputedSession" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "prompt" TEXT NOT NULL,
    "chosenDuration" INTEGER NOT NULL,
    "tempature" DOUBLE PRECISION NOT NULL,
    "temperatureUnit" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "InputedSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionSound" (
    "id" TEXT NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER NOT NULL,
    "startingTime" INTEGER NOT NULL,
    "endingTime" INTEGER NOT NULL,
    "sessionId" TEXT NOT NULL,
    "soundId" TEXT NOT NULL,

    CONSTRAINT "SessionSound_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActualSession" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "actualEndTime" TIMESTAMP(3) NOT NULL,
    "actualDuration" INTEGER NOT NULL,
    "inputedSessionId" TEXT NOT NULL,

    CONSTRAINT "ActualSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActualSessionSound" (
    "id" TEXT NOT NULL,
    "playedDuration" INTEGER NOT NULL,
    "played" BOOLEAN NOT NULL,
    "soundId" TEXT NOT NULL,
    "actualSessionId" TEXT NOT NULL,

    CONSTRAINT "ActualSessionSound_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionFeedback" (
    "id" TEXT NOT NULL,
    "feeling" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "SessionFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_subscriptionId_key" ON "Payment"("subscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "ActualSession_inputedSessionId_key" ON "ActualSession"("inputedSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "SessionFeedback_sessionId_key" ON "SessionFeedback"("sessionId");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InputedSession" ADD CONSTRAINT "InputedSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionSound" ADD CONSTRAINT "SessionSound_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "InputedSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionSound" ADD CONSTRAINT "SessionSound_soundId_fkey" FOREIGN KEY ("soundId") REFERENCES "Sound"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActualSession" ADD CONSTRAINT "ActualSession_inputedSessionId_fkey" FOREIGN KEY ("inputedSessionId") REFERENCES "InputedSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActualSessionSound" ADD CONSTRAINT "ActualSessionSound_soundId_fkey" FOREIGN KEY ("soundId") REFERENCES "Sound"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActualSessionSound" ADD CONSTRAINT "ActualSessionSound_actualSessionId_fkey" FOREIGN KEY ("actualSessionId") REFERENCES "ActualSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionFeedback" ADD CONSTRAINT "SessionFeedback_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "InputedSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
