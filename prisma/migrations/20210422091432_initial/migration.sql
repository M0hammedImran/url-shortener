-- CreateTable
CREATE TABLE "site" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "link" TEXT NOT NULL,
    "alias" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
