/*
  Warnings:

  - You are about to drop the column `projectManagerId` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the `ProjectManagers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Projects" DROP CONSTRAINT "Projects_projectManagerId_fkey";

-- DropIndex
DROP INDEX "Projects_projectManagerId_key";

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "projectManagerId";

-- DropTable
DROP TABLE "ProjectManagers";
