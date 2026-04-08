const User = require("../models/User");
const jwt = require("jsonwebtoken");

/* REGISTER */
exports.register = async (req, res) => {
  const { name, email, password, role, service , phone } = req.body;

  const user = new User({
    name,
    email,
    password,
    role,
    service,
    phone: role === "worker" ? phone : null,
    status: role === "worker" ? "pending" : "approved"
  });

  await user.save();

  res.json({ message: "Registered Successfully" });
};

/* LOGIN */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }

  if (user.role === "worker" && user.status !== "approved") {
    return res.status(403).json({
      message: "Wait for admin approval ❌"
    });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, role: user.role });
};

/* GET WORKERS */
exports.getWorkers = async (req, res) => {
  const workers = await User.find({ role: "worker" });
  res.json(workers);
};

/* APPROVE */
exports.approveWorker = async (req, res) => {
  const worker = await User.findById(req.params.id);

  worker.status = "approved";
  await worker.save();

  res.json({ message: "Approved ✅" });
};

/* workdone */
// PUT /api/booking/work-done/:id

exports.markWorkDone = async (req, res) => {
 try {

  const { price } = req.body;

  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    {
      workDone: true,
      price: price,
      completedAt: new Date(),
      status: "completed"
    },
    { new: true }
  );

  res.json(booking);

 } catch (err) {
  res.status(500).json({ msg: "Error updating work" });
 }
};
// GET /api/admin/completed-work

exports.getCompletedWork = async (req, res) => {
 try {

  const data = await Booking.find({ workDone: true })
    .populate("userId", "name")
    .populate("workerId", "name");

  res.json(data);

 } catch (err) {
  res.status(500).json({ msg: "Error fetching data" });
 }
};