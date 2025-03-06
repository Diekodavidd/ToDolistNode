const express = require ("express")
const app = express()

app.get("/",(request, response)=>{
    response.json(
        [
           {"name":"Anjola", "Activity" : "Research market trends", "Status": "To Do","date":"16/02/2025","Time" :"1:30pm", "Priority":"High", "Task Type" : "Marketing"},
           {"name":"Vanessa", "Activity" : "Schedule doctor's appointment", "Status": "Cancelled","date":"14/03/2025","Time" :"7:50apm", "Priority":"High", "Task Type" : "Pet Chore"},
           {"name":"Alexander", "Activity" : "Complete project proposal draft", "Status": "In Progress","date":"25/03/2025","Time" :"10:30am", "Priority":"Mid", "Task Type" : "Work"},
           {"name":"Anjola", "Activity" : "Review data analysis from bank man.", "Status": "Completed","date":"17/03/2025","Time" :"12:40pm", "Priority":"Low", "Task Type" : "Finance "},
           {"name":"Calvin", "Activity" : "Grocery shopping", "Status": "In Progress","date":"112/03/2025","Time" :"5:40pm", "Priority":"High", "Task Type" : "Groceries"},
           {"name":"Aaron", "Activity" : "Cook dinner,", "Status": "ToDo","date":"01/04/2025","Time" :"6:40pm", "Priority":"Low", "Task Type" : "Chores"},
           {"name":"Beauty", "Activity" : " Check emails", "Status": "In Progress","date":"12/03/2025","Time" :"1:40pm", "Priority":"Mid", "Task Type" : "Work"},
           {"name":"Alexander", "Activity" : "Book weekend travel plans", "Status": "ToDo","date":"19/04/2025","Time" :"10:20am", "Priority":"Mid", "Task Type" : "Finance"},
           {"name":"Shawn", "Activity" : "Follow up on outstanding tasks.", "Status": "In Progress","date":"5/03/2025","Time" :"12:45pm", "Priority":"Mid", "Task Type" : "Work"},
           {"name":"Camilla", "Activity" : "Grocery shopping", "Status": "ToDo","date":"6/05/2025","Time" :"2:41pm", "Priority":"High", "Task Type" : "Groceries"},
        ]
    )
})




// echo "# ToDoList" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/Diekodavidd/ToDoList.git or git remote set-url origin https://github.com/Diekodavidd/ToDoListt.git
// git push -u origin main



// …or push an existing repository from the command line
// git remote add origin https://github.com/Diekodavidd/ToDoList.git
// git branch -M main
// git push -u origin main





const port = 9000

app.listen(port,()=>{
    console.log(`app started at port ${port}`)
})