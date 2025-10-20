/*
  Warnings:

  - Added the required column `eventType` to the `EventMessageMap` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EventMessageMap" ADD COLUMN     "eventType" TEXT NOT NULL;
