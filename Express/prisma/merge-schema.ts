const fs = require("fs");
const path = require("path");
const modulesDir = path.resolve("./prisma/modules");
const mainSchema = path.resolve("./prisma/schema.prisma");

// Prisma 的生成器和数据源配置
let schemaContent = `
generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
  binaryTargets = ["native", "windows"]
}

datasource db {
  provider = "mysql" // 或 postgresql
  url      = env("DATABASE_URL")
}
`;

const files = fs
  .readdirSync(modulesDir)
  .filter((file) => file.endsWith(".prisma"));

files.forEach((file) => {
  const content = fs.readFileSync(path.join(modulesDir, file), "utf-8");
  schemaContent += content.trim() + "\n\n";
});

fs.writeFileSync(mainSchema, schemaContent);
console.log("✅ schema.prisma 已合并完成");
