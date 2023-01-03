-- CreateTable
CREATE TABLE "national_leave_day" (
    "Id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "markSalary" BOOLEAN NOT NULL,

    CONSTRAINT "national_leave_day_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "leavedays" (
    "Id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "approved_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leavedays_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "contract" (
    "Id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "typecontractID" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "basicSalary" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "contract_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "typecontract" (
    "Id" SERIAL NOT NULL,
    "contractName" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "typecontract_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "national_leave_day_Id_key" ON "national_leave_day"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "leavedays_Id_key" ON "leavedays"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "contract_Id_key" ON "contract"("Id");

-- CreateIndex
CREATE UNIQUE INDEX "typecontract_Id_key" ON "typecontract"("Id");

-- AddForeignKey
ALTER TABLE "leavedays" ADD CONSTRAINT "leavedays_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract" ADD CONSTRAINT "contract_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract" ADD CONSTRAINT "contract_typecontractID_fkey" FOREIGN KEY ("typecontractID") REFERENCES "typecontract"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
