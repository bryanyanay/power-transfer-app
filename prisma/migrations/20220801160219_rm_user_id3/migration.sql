/*
  Warnings:

  - You are about to drop the `User2` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_ownerEmail_fkey";

-- DropTable
DROP TABLE "User2";

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_ownerEmail_fkey" FOREIGN KEY ("ownerEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
