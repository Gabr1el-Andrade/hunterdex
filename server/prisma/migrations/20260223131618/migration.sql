/*
  Warnings:

  - You are about to drop the column `weakeness` on the `Monster` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Monster` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Monster` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weakness` to the `Monster` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `element` on the `Monster` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Element" AS ENUM ('FIRE', 'WATER', 'ICE', 'DRAGON', 'THUNDER', 'NONE');

-- AlterTable
ALTER TABLE "Favorite" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Monster" DROP COLUMN "weakeness",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "weakness" TEXT NOT NULL,
DROP COLUMN "element",
ADD COLUMN     "element" "Element" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Monster_name_key" ON "Monster"("name");
