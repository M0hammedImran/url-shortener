/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `site` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "site.link_unique" ON "site"("link");
