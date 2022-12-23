/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "user_userId_key";

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "userId",
ADD COLUMN     "Id" SERIAL NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("Id");

-- CreateIndex
CREATE UNIQUE INDEX "user_Id_key" ON "user"("Id");
