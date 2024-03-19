-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "verifyCode" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userForgotPasswordCode" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "userForgotPasswordCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userAuthTokenExpired" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT[],
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userAuthTokenExpired_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userAuthToken" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publicKey" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,

    CONSTRAINT "userAuthToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adminAuthTokenExpired" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "accessToken" TEXT[],
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "adminAuthTokenExpired_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adminAuthToken" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publicKey" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,

    CONSTRAINT "adminAuthToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "userForgotPasswordCode_code_key" ON "userForgotPasswordCode"("code");

-- CreateIndex
CREATE INDEX "userForgotPasswordCode_createdAt_idx" ON "userForgotPasswordCode"("createdAt");

-- CreateIndex
CREATE INDEX "userForgotPasswordCode_code_idx" ON "userForgotPasswordCode"("code");

-- CreateIndex
CREATE INDEX "userForgotPasswordCode_userId_idx" ON "userForgotPasswordCode"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "userAuthTokenExpired_refreshToken_key" ON "userAuthTokenExpired"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "userAuthToken_publicKey_key" ON "userAuthToken"("publicKey");

-- CreateIndex
CREATE UNIQUE INDEX "userAuthToken_refreshToken_key" ON "userAuthToken"("refreshToken");

-- CreateIndex
CREATE INDEX "userAuthToken_refreshToken_idx" ON "userAuthToken"("refreshToken");

-- CreateIndex
CREATE INDEX "userAuthToken_userId_idx" ON "userAuthToken"("userId");

-- CreateIndex
CREATE INDEX "userAuthToken_userId_createdAt_idx" ON "userAuthToken"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "admin_username_key" ON "admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "adminAuthTokenExpired_refreshToken_key" ON "adminAuthTokenExpired"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "adminAuthToken_publicKey_key" ON "adminAuthToken"("publicKey");

-- CreateIndex
CREATE UNIQUE INDEX "adminAuthToken_refreshToken_key" ON "adminAuthToken"("refreshToken");

-- CreateIndex
CREATE INDEX "adminAuthToken_id_idx" ON "adminAuthToken"("id");

-- CreateIndex
CREATE INDEX "adminAuthToken_refreshToken_idx" ON "adminAuthToken"("refreshToken");

-- CreateIndex
CREATE INDEX "adminAuthToken_adminId_idx" ON "adminAuthToken"("adminId");

-- AddForeignKey
ALTER TABLE "userForgotPasswordCode" ADD CONSTRAINT "userForgotPasswordCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userAuthTokenExpired" ADD CONSTRAINT "userAuthTokenExpired_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userAuthToken" ADD CONSTRAINT "userAuthToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adminAuthTokenExpired" ADD CONSTRAINT "adminAuthTokenExpired_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adminAuthToken" ADD CONSTRAINT "adminAuthToken_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
