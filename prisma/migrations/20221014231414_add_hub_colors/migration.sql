/*
  Warnings:

  - A unique constraint covering the columns `[hubPath]` on the table `Hub` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Hub" ADD COLUMN     "primaryColor" TEXT NOT NULL DEFAULT '#ff008c',
ADD COLUMN     "secondaryColor" TEXT NOT NULL DEFAULT '#0cd4f7';

-- CreateIndex
CREATE UNIQUE INDEX "Hub_hubPath_key" ON "Hub"("hubPath");
