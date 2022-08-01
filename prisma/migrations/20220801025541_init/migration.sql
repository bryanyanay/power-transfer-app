-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "license" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TxIP" (
    "id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rId" TEXT NOT NULL,
    "dId" TEXT NOT NULL,

    CONSTRAINT "TxIP_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tx" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "stop" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rId" TEXT NOT NULL,
    "dId" TEXT NOT NULL,
    "kWhTransferred" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Tx_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TxIP" ADD CONSTRAINT "TxIP_rId_fkey" FOREIGN KEY ("rId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TxIP" ADD CONSTRAINT "TxIP_dId_fkey" FOREIGN KEY ("dId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tx" ADD CONSTRAINT "Tx_rId_fkey" FOREIGN KEY ("rId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tx" ADD CONSTRAINT "Tx_dId_fkey" FOREIGN KEY ("dId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
