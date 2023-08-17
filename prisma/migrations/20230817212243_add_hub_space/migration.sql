/*
  Warnings:

  - Added the required column `hubSpaceId` to the `Hub` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hub" ADD COLUMN     "hubSpaceId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "HubSpace" (
    "id" SERIAL NOT NULL,
    "domain" TEXT NOT NULL,

    CONSTRAINT "HubSpace_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Hub" ADD CONSTRAINT "Hub_hubSpaceId_fkey" FOREIGN KEY ("hubSpaceId") REFERENCES "HubSpace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
