import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";
const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;

    const employee = await Employee.findOne({ userId });

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });
    await newLeave.save();
    return res.status(201).json({
      success: true,
      message: "Leave added successfully",
      leave: newLeave,
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Server error in adding Leave" });
  }
};
const getLeave = async (req, res) => {
  try {
    const { id, role } = req.params;
    let leaves;
    if (role === "admin") {
       leaves = await Leave.find({ employeeId: id })
      
    }else {
      //find employee through userId with user id pass through url
      const employee = await Employee.findOne({ userId: id });
      //then find leave through employeeId field in the leave with employee._id collection
      leaves = await Leave.find({ employeeId: employee._id });
    }
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Server error in getting leave" });
  }
};
const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        { path: "userId", select: "name" },
        { path: "department", select: "dep_name" },
      ],
    });
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Server error in getting all leaves" });
  }
};
const getLeaveDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const leave = await Leave.findById({ _id: id }).populate({
      path: "employeeId",
      populate: [
        { path: "userId", select: "name profileImage" },
        { path: "department", select: "dep_name" },
      ],
    });
    return res.status(200).json({ success: true, leave });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Server error in getting leaves detail" });
  }
};
const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findByIdAndUpdate({ _id: id }, { status: req.body.status })
    if (!leave) {
      return res.status(404).json({ success: false, message: "leave not found" });
    }
    return res.status(200).json({ success: true, leave });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server error in updating all leave" });
  }
}

export { addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave };
