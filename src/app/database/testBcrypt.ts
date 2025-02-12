import bcrypt from "bcryptjs";

async function testHash() {
  const plainPassword = "mySecret123";
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);
  console.log("Plain:", plainPassword);
  console.log("Hashed:", hashedPassword);
}

testHash();
