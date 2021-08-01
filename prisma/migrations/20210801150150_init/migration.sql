-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "gender" BOOLEAN NOT NULL,
    "year" INTEGER NOT NULL,
    "class" INTEGER NOT NULL,
    "qq" TEXT NOT NULL,
    "wechat" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);
