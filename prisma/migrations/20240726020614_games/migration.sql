-- CreateEnum
CREATE TYPE "GameType" AS ENUM ('FREE', 'VERSUS', 'X1');

-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('USER', 'TEAM');

-- AlterEnum
ALTER TYPE "Sport" ADD VALUE 'BEACHTENNIS';

-- AlterTable
ALTER TABLE "Spot" ALTER COLUMN "logo" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "teamOwner" TEXT NOT NULL,

    CONSTRAINT "Teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Games" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "type" "GameType" NOT NULL,
    "spotId" TEXT NOT NULL,
    "fieldId" TEXT NOT NULL,
    "result" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GamesOnUsers" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GamesOnUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GamesOnTeams" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "GamesOnTeams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameResults" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "entityType" "EntityType" NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "GameResults_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TeamsToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Games_fieldId_startTime_endTime_key" ON "Games"("fieldId", "startTime", "endTime");

-- CreateIndex
CREATE UNIQUE INDEX "GamesOnUsers_gameId_userId_key" ON "GamesOnUsers"("gameId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "GamesOnTeams_gameId_teamId_key" ON "GamesOnTeams"("gameId", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "GameResults_gameId_entityId_entityType_key" ON "GameResults"("gameId", "entityId", "entityType");

-- CreateIndex
CREATE UNIQUE INDEX "_TeamsToUser_AB_unique" ON "_TeamsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamsToUser_B_index" ON "_TeamsToUser"("B");

-- AddForeignKey
ALTER TABLE "Games" ADD CONSTRAINT "Games_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES "Spot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Games" ADD CONSTRAINT "Games_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamesOnUsers" ADD CONSTRAINT "GamesOnUsers_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamesOnUsers" ADD CONSTRAINT "GamesOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamesOnTeams" ADD CONSTRAINT "GamesOnTeams_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GamesOnTeams" ADD CONSTRAINT "GamesOnTeams_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameResults" ADD CONSTRAINT "GameResults_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamsToUser" ADD CONSTRAINT "_TeamsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamsToUser" ADD CONSTRAINT "_TeamsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
