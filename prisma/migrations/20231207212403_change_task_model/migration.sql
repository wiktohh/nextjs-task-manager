/*
  Warnings:

  - The values [COMPLETED] on the enum `TaskStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `deadline` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priority` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterEnum
BEGIN;
CREATE TYPE "TaskStatus_new" AS ENUM ('IN_PROGRESS', 'TO_DO', 'DONE');
ALTER TABLE "Task" ALTER COLUMN "status" TYPE "TaskStatus_new" USING ("status"::text::"TaskStatus_new");
ALTER TYPE "TaskStatus" RENAME TO "TaskStatus_old";
ALTER TYPE "TaskStatus_new" RENAME TO "TaskStatus";
DROP TYPE "TaskStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "priority" "TaskPriority" NOT NULL;
