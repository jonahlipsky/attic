-- CreateTable
CREATE TABLE "AccessKeyPair" (
    "id" TEXT NOT NULL,
    "accessKeyUuid" TEXT NOT NULL,
    "secretKeyUuid" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AccessKeyPair_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccessKeyPair_userId_key" ON "AccessKeyPair"("userId");

-- AddForeignKey
ALTER TABLE "AccessKeyPair" ADD CONSTRAINT "AccessKeyPair_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
