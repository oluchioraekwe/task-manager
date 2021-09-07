const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/user");
const auth = require("../middleware/authentication");
const router = new express.Router();

router.get("/test", (req, res) => {
  res.send("from a new file");
});
// getting all users with middle ware
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

//creating a user
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

//logout users
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

//update user information
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperations = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperations) {
    return res.status(400).send({ error: "Invalid Updates" });
  }
  try {
    //const user = await User.findById(req.params.id);
    updates.forEach((update) => (req.user[update] = req.body[update]));
    console.log();
    await req.user.save();

    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});
//delete a user
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();

    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});
//check the profile image
const upload = multer({
  //dest: "avater",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a jpg or jpeg or png file"));
    }
    cb(undefined, true);
  },
});
//upload profile image
router.post(
  "/users/me/avater",
  auth,
  upload.single("avater"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.user.avater = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
//delete profile image
router.delete("/users/me/avater", auth, async (req, res) => {
  req.user.avater = undefined;
  await req.user.save();
  res.send();
});

router.get("/users/:id/avater", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avater) {
      throw new Error();
    }
    res.set("Content-Type", "image/png");
    res.send(user.avater);
  } catch (error) {
    res.status(404).send();
  }
});
module.exports = router;
