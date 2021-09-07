const Task = require("./models/task");
const User = require("./models/user");
const main = async () => {
  // const task = await Task.findById("611c627b722a561ff047e645");
  // await task.populate("owner").execPopulate();
  // console.log(task.owner);
  const user = await User.findById("611c6271722a561ff047e640");
  await user.populate("tasks").execPopulate();
  console.log(user.tasks);
};
main();
