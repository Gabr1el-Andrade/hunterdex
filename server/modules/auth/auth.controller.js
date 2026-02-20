const { register } = require("./auth.service");
const { registerSchema } = require("./auth.validation");

async function registerUser(req, res) {
  try {
    const parsed = registerSchema.parse(req.body);

    const user = await register(parsed);

    delete user.password;
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { registerUser };