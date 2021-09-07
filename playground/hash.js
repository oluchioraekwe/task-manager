const bycrpt = require("bcryptjs");
const myFunction = async () => {
  const password = "red23767?";
  const hashedPassword = await bycrpt.hash(password, 8);
  console.log("Password: ", password);
  console.log("Hashed Password: ", hashedPassword);

  const isMatch = await bycrpt.compare("red23767?", hashedPassword);
  console.log(isMatch);
};
myFunction();
