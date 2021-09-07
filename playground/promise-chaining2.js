require("../src/db/mongoose");
const { count } = require("../src/models/task");
const Task = require("../src/models/task");

Task.findByIdAndDelete("6116fd1beca56960ec296707")
  .then((value) => {
    console.log(value);
    return Task.countDocuments({ completed: true });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
//6116d0e63397cd588a21ad9f

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: true });
  return count;
};
deleteTaskAndCount("6116d11bc91d4358a65eda10")
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  });
