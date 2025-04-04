-- CreateTable
CREATE TABLE "ProjectManagers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectManagers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL,
    "projectManagerId" INTEGER NOT NULL,
    "developerId" INTEGER NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Developers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Developers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectManagers_name_key" ON "ProjectManagers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectManagers_email_key" ON "ProjectManagers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Projects_projectManagerId_key" ON "Projects"("projectManagerId");

-- CreateIndex
CREATE UNIQUE INDEX "Projects_developerId_key" ON "Projects"("developerId");

-- CreateIndex
CREATE UNIQUE INDEX "Developers_name_key" ON "Developers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Developers_email_key" ON "Developers"("email");

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_projectManagerId_fkey" FOREIGN KEY ("projectManagerId") REFERENCES "ProjectManagers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
