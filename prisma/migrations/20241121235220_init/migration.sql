-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shape" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "position" JSONB NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Shape_pkey" PRIMARY KEY ("id")
);

-- Create the List table
CREATE TABLE "List" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    CONSTRAINT "List_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "List_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);


-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Shape" ADD CONSTRAINT "Shape_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- -- Step 1: Add the column with a default value temporarily (e.g., 1 for an existing user ID).
-- ALTER TABLE "List" ADD COLUMN "userId" INTEGER DEFAULT 1;

-- -- Step 2: Update all rows to have a valid `userId`.
-- UPDATE "List" SET "userId" = 1 WHERE "userId" IS NULL;

-- -- Step 3: Alter the column to remove the default and make it NOT NULL.
-- ALTER TABLE "List" ALTER COLUMN "userId" DROP DEFAULT;
-- ALTER TABLE "List" ALTER COLUMN "userId" SET NOT NULL;


