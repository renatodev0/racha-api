-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('COURT', 'GRASSFIELD');

-- CreateEnum
CREATE TYPE "Sport" AS ENUM ('BASKETBALL', 'FOOTBALL');

-- CreateEnum
CREATE TYPE "Day" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateTable
CREATE TABLE "Spot" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "addressId" INTEGER,

    CONSTRAINT "Spot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Field" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "spotId" INTEGER NOT NULL,
    "type" "FieldType" NOT NULL,
    "sport" "Sport" NOT NULL,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workingHour" (
    "id" SERIAL NOT NULL,
    "day" "Day" NOT NULL,
    "openHour" TEXT NOT NULL,
    "closeHour" TEXT NOT NULL,
    "spotId" INTEGER NOT NULL,

    CONSTRAINT "workingHour_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "workingHour_spotId_day_key" ON "workingHour"("spotId", "day");

-- AddForeignKey
ALTER TABLE "Spot" ADD CONSTRAINT "Spot_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES "Spot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workingHour" ADD CONSTRAINT "workingHour_spotId_fkey" FOREIGN KEY ("spotId") REFERENCES "Spot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
