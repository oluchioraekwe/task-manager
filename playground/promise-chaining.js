require("../src/db/mongoose");
const User = require("../src/models/user");

// //6116c8c5931db35724ddf6c2
// User.findByIdAndUpdate("6116cde56eb3f25832d35f21", { age: 1 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("6116cde56eb3f25832d35f21", 5)
  .then((count) => {
    console.log(count);
  })
  .catch((error) => {
    console.log(error);
  });
