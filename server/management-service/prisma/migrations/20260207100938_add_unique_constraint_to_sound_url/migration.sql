/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Sound` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Sound_url_key" ON "Sound"("url");
