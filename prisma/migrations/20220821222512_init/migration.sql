-- CreateTable
CREATE TABLE "GeneralSettings" (
    "id" SERIAL NOT NULL,
    "hubName" TEXT NOT NULL,
    "hubLogo" TEXT NOT NULL,

    CONSTRAINT "GeneralSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkGroup" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "LinkGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT E'',
    "link" TEXT NOT NULL,
    "isInternal" BOOLEAN NOT NULL DEFAULT false,
    "linkGroupId" INTEGER,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_linkGroupId_fkey" FOREIGN KEY ("linkGroupId") REFERENCES "LinkGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
