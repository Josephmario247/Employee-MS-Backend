import express from 'express';
import cors from 'cors'
import authRouter from './routes/auth.js';
import departmentRouter from './routes/department.js';
import employeeRouter from './routes/employee.js';
import salaryRouter from './routes/salary.js';
import leaveRouter from './routes/leave.js';
import settingRouter from './routes/setting.js'
import dashboardRouter from './routes/dashboard.js'


import connectToDatabase from './db/db.js';

connectToDatabase()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public/uploads')) // to access the static images in the serverside from the frontend

app.use('/api/auth', authRouter)  // Mounting the auth routes at '/api/auth'

app.use('/api/department', departmentRouter)  // Mounting the department routes at '/api/department'

app.use('/api/employee', employeeRouter) // mounting the employee routes at '/api/employee
app.use('/api/salary/', salaryRouter) // mounting the salary routes at '/api/salary

app.use('/api/leave', leaveRouter) // mounting the leave routes at '/api/leave
app.use('/api/setting', settingRouter) // mounting the setting password routes at '/api/setting
app.use('/api/dashboard', dashboardRouter) // mounting the dashboard routes at '/api/dashboard 

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})