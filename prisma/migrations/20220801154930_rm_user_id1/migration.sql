/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Vehicle` table. All the data in the column will be lost.
  - Added the required column `ownerEmail` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_ownerId_fkey";

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "ownerId",
ADD COLUMN     "ownerEmail" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User2" (
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User2_pkey" PRIMARY KEY ("email")
);

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_ownerEmail_fkey" FOREIGN KEY ("ownerEmail") REFERENCES "User2"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
