import Salary from "../models/Salary.js";
import Employee from '../models/Employee.js'

const addSalary = async (req, res) => {
    try {
        const {        
            employeeId,
            basicSalary,
            allowances,
            deductions,
            payDate
    } = req.body
    const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions)

    const newSalary = new Salary({
        employeeId,
        basicSalary,
        allowances,
        deductions,
        netSalary:totalSalary,
        payDate,
    })
    await newSalary.save()
   return res.status(201).json({ success: true, message: "Salary added successfully", salary: newSalary})
    } catch (error) {
        console.error(error.message)
      return res.status(500).json({ success: false ,message: "Server error in adding salary"})
    }

}
const getSalary = async (req, res) => {
    try {
        const {id,role} = req.params

        let salary
        // find the salary through the employeeId route with the pass employee id and role through url 
        if (role == 'admin') {
            salary = await Salary.find({employeeId:id}).populate('employeeId', 'employeeId')
        }else{
           const employee = await Employee.findOne({userId:id}) //find employee through userId with user id pass through url
            if(!employee) return res.status(404).json({ success: false, message: "Employee not found"})            
            salary = await Salary.find({employeeId: employee._id}).populate('employeeId', 'employeeId') //them find the salary through the employee._id route 
        }
       return res.status(200).json({ success: true, salary})
    } catch (error) {
        console.error(error.message)
      return res.status(500).json({ success: false, message: "Server error in getting salary"})
    }
}
export {addSalary,getSalary}  