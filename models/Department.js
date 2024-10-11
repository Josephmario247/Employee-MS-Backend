import mongoose from 'mongoose'
import Employee from './Employee.js'
import Leave from './Leave.js'
import Salary from './Salary.js'
import User from './User.js'


const departmentSchema = new mongoose.Schema({
    dep_name: {type: String, required: true},
    description: {type: String, },
    createAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

departmentSchema.pre("deleteOne", {document: true, query:false}, async function(next){
    try { 
        const employees = await Employee.find({department: this._id})// find employee through department column by _id
        const empIds = employees.map(emp => emp._id)// retriveing all the employee id by map through all the id of the employee and store
       await User.deleteMany({_id:{$in:employees.map(emp => emp.userId)} })// deleting user associated with department before deleting department
        await Employee.deleteMany({department: this._id}) //deleting all employees which have the department id
        await Leave.deleteMany({employeeId: {$in : empIds}}) //deleting all leaves which have all the employeeId with this employee ids
        await Salary.deleteMany({employeeId: {$in : empIds}}) //deleting all salary which have all the employeeId with this employee ids
        next()
    } catch (error) {
        next(error)
    }
})

const Department = mongoose.model("Department", departmentSchema)
export default Department;