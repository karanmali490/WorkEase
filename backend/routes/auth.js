const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Booking = require("../models/Booking");
const verifyToken = require("../middleware/verifyToken");

const {
  register,
  login,
  getWorkers,
  approveWorker
} = require("../controllers/authController");

/* ================= AUTH ================= */

router.post("/register", register);
router.post("/login", login);

/* ================= WORKERS ================= */

// all workers
router.get("/workers", verifyToken, getWorkers);

// approve worker (ADMIN ONLY)
router.put("/approve/:id", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied" });
    }

    await User.findByIdAndUpdate(req.params.id, {
      status: "approved"
    });

    res.json({ message: "Worker Approved ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// approved workers (dropdown)
router.get("/approved-workers", verifyToken, async (req, res) => {
  try {
    const workers = await User.find({
      role: "worker",
      status: "approved"
    });

    res.json(workers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= BOOKINGS ================= */

// create booking (USER)
router.post("/book", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({ message: "Only users can book" });
    }

    const { service, problem, date, address, phone } = req.body;

    const booking = new Booking({
      userId: req.user.id,
      service,
      problem,
      workDate: date,
      address,
      phone, // ✅ FIXED
      status: "pending"
    });

    await booking.save();

    res.json({ message: "Request Sent to Admin ✅" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get all pending bookings (ADMIN)
router.get("/bookings", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied" });
    }

    const bookings = await Booking.find({ status: "pending" })
      .populate("userId", "name email phone");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// assign worker (ADMIN)
router.put("/assign/:id", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied" });
    }

    const { workerId } = req.body;

    await Booking.findByIdAndUpdate(req.params.id, {
      workerId,
      status: "assigned"
    });

    res.json({ message: "Worker Assigned ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// worker jobs
router.get("/my-jobs", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "worker") {
      return res.status(403).json({ message: "Access Denied" });
    }

    const jobs = await Booking.find({
      workerId: req.user.id
    }).populate("userId", "name phone email");

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= STATS ================= */

router.get("/stats", verifyToken, async (req, res) => {
  try {
    const users = await User.countDocuments({ role: "user" });
    const workers = await User.countDocuments({ role: "worker" });
    const bookings = await Booking.countDocuments();

    res.json({ users, workers, bookings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// reject worker (ADMIN ONLY)
router.put("/reject/:id", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied" });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "Worker Rejected ❌" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// COMPLETE JOB
router.put("/complete/:id", verifyToken, async (req, res) => {

    if (req.user.role !== "worker") {
        return res.status(403).json({ message: "Access Denied" });
    }

    const { workDescription, workDate, cost } = req.body;

    const updated = await Booking.findByIdAndUpdate(
        req.params.id,
        {
            status: "completed",
            workDescription,
            workDate,
            cost: Number(cost),
            completedAt: new Date()
        },
        { new: true }
    );

    res.json(updated);
});
// user profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// USER SUBMIT FEEDBACK
router.put("/feedback/:id", verifyToken, async (req, res) => {

 if(req.user.role !== "user"){
  return res.status(403).json({message:"Access Denied"});
 }

 const {
  workQuality,
  behaviour,
  timing,
  communication,
  message
 } = req.body;

 const booking = await Booking.findByIdAndUpdate(
  req.params.id,
  {
   feedback:{
    workQuality,
    behaviour,
    timing,
    communication,
    message
   }
  },
  { new:true }
 );

 res.json(booking);
});
// admin see all feedback
router.get("/feedbacks", verifyToken, async (req,res)=>{

 if(req.user.role !== "admin"){
  return res.status(403).json({message:"Access Denied"});
 }

 try{

  const bookings = await Booking.find({
   feedback: { $ne: null }
  })
  .populate("workerId","name")
  .populate("userId","name");

  res.json(bookings);

 }catch(err){
  res.status(500).json({error: err.message});
 }

});

// USER BOOKINGS
router.get("/my-bookings", verifyToken, async (req, res) => {
  try {

    if (req.user.role !== "user") {
      return res.status(403).json({ message: "Access Denied" });
    }

    const bookings = await Booking.find({
      userId: req.user.id
    })
    .populate("workerId", "name");

    res.json(bookings);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET LOGGED IN USER
router.get("/me", verifyToken, async (req, res) => {
  try {

    const user = await User.findById(req.user.id).select("-password");

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// workdone 
router.get("/admin/completed-work", verifyToken, async (req, res) => {

  if(req.user.role !== "admin"){
    return res.status(403).json({message:"Access Denied"});
  }

  try{

    const data = await Booking.find({
      status: "completed"
    })
    .populate("userId", "name")
    .populate("workerId", "name");

    res.json(data);

  }catch(err){
    res.status(500).json({error: err.message});
  }

});

//admin see all workers
router.get("/admin/workers", verifyToken, async (req, res) => {

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Denied" });
  }

  try {
    const workers = await User.find({
      role: "worker",
      status: "approved"
    }).select("name email phone service");

    res.json(workers);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;