const jwt = require("jsonwebtoken");

const myFunction = async () => {
  const token = jwt.sign({ _id: "abc123" }, "thisismynewhouse");
  console.log("Web-Token: ", token);
  const data = jwt.verify(token, "thisismynewhouse", {
    expiresIn: "1 seconds",
  });
  console.log("data: ", data);
};
myFunction();
