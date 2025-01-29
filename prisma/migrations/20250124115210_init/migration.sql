/*
  Warnings:

  - Added the required column `imgUrl` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "imgUrl" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL;
