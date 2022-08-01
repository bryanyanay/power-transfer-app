/*
  Warnings:

  - A unique constraint covering the columns `[rId,dId]` on the table `TxIP` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TxIP_rId_dId_key" ON "TxIP"("rId", "dId");
