import Department from "../models/Department.js";


const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        return res.status(200).json({success: true, departments})
    } catch (error) {
        return res.status(500).json({success: false, error: "get departments server error"})
    }
}
const addDepartment= async (req, res) => {
    try {
        const {dep_name, description} = req.body;
        const newDept = new Department({dep_name, description}); //dep_name and description to the collection in the database 
        await newDept.save();
        return res.status(200).json({success: true, department: newDept})

    } catch (error) {
        return res.status(500).json({success: false, error: "add department server error"})
    }   
}
const getDepartment = async(req, res) => {
    //logic for updating department
    try {
        const {id} = req.params;
        const department = await Department.findById({_id:id})
        return res.status(200).json({success: true, department})
    } catch (error) {
        return res.status(500).json({success: false, error: "get department server error"})
        
    }
}
const updateDepartment = async (req, res) => {
    try {
        const {id} = req.params;
        const {dep_name, description} = req.body;
        const updatedDepartment = await Department.findByIdAndUpdate({_id:id}, {dep_name, description})
        return res.status(200).json({success: true, updatedDepartment})
    } catch (error) {
        return res.status(500).json({success: false, error: "Updating department server error"})
        
    }
}
const deleteDepartment = async (req, res) => {
    try {
        const {id} = req.params;
        const deletDep = await Department.findById({_id:id})// find department to delete by id 
        await deletDep.deleteOne() // delete the department by calling the deleteOne middleware specify in department model along with employees, leaves, salary with the same id for the department 
        return res.status(200).json({success: true, message: "Department deleted successfully",deletDep})
    } catch (error) {
        return res.status(500).json({success: false, error: "Deleting department server error"})
        
    }
 }

export {addDepartment,getDepartments, getDepartment, updateDepartment, deleteDepartment}