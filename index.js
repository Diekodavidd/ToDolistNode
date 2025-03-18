const express = require("express")
const app = express()
const ejs = require("ejs")
const mongoose = require("mongoose")

let maimarray = []

const todoschema = new mongoose.Schema({
    Name: { type: String, required: true }, 
    Activity: { type: String, required: true },
    Status: { type: String, required: true },
    Date: { type: String, required: true },
    Time: { type: String, required: true },
    Priority: { type: String, required: true },
    TaskType: { type: String, required: true },
})

  const tododata = mongoose.model("todolist_data", todoschema)


app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))

app.get("/", (request, response) => {
    // response.json(
    //     [
    //        {"name":"Anjola", "Activity" : "Research market trends", "Status": "To Do","date":"16/02/2025","Time" :"1:30pm", "Priority":"High", "Task Type" : "Marketing"},
    //        {"name":"Vanessa", "Activity" : "Schedule doctor's appointment", "Status": "Cancelled","date":"14/03/2025","Time" :"7:50apm", "Priority":"High", "Task Type" : "Pet Chore"},
    //        {"name":"Alexander", "Activity" : "Complete project proposal draft", "Status": "In Progress","date":"25/03/2025","Time" :"10:30am", "Priority":"Mid", "Task Type" : "Work"},
    //        {"name":"Anjola", "Activity" : "Review data analysis from bank man.", "Status": "Completed","date":"17/03/2025","Time" :"12:40pm", "Priority":"Low", "Task Type" : "Finance "},
    //        {"name":"Calvin", "Activity" : "Grocery shopping", "Status": "In Progress","date":"112/03/2025","Time" :"5:40pm", "Priority":"High", "Task Type" : "Groceries"},
    //        {"name":"Aaron", "Activity" : "Cook dinner,", "Status": "ToDo","date":"01/04/2025","Time" :"6:40pm", "Priority":"Low", "Task Type" : "Chores"},
    //        {"name":"Beauty", "Activity" : " Check emails", "Status": "In Progress","date":"12/03/2025","Time" :"1:40pm", "Priority":"Mid", "Task Type" : "Work"},
    //        {"name":"Alexander", "Activity" : "Book weekend travel plans", "Status": "ToDo","date":"19/04/2025","Time" :"10:20am", "Priority":"Mid", "Task Type" : "Finance"},
    //        {"name":"Shawn", "Activity" : "Follow up on outstanding tasks.", "Status": "In Progress","date":"5/03/2025","Time" :"12:45pm", "Priority":"Mid", "Task Type" : "Work"},
    //        {"name":"Camilla", "Activity" : "Grocery shopping", "Status": "ToDo","date":"6/05/2025","Time" :"2:41pm", "Priority":"High", "Task Type" : "Groceries"},
    //     ]
    // )

    response.render("index", {})
})


app.get("/secod", async (req, res) => {
    try {
        const todos = await tododata.find(); // Fetch all To-Do entries
        res.render("secod", { todos }); // Pass the data to the second page
    } catch (error) {
        console.error(error);
        res.send("Error retrieving To-Do data.");
    }
});

app.get("/todo/wew", (req, res) => {
    // res.redirect("/index");
    res.render("index")
})

app.post("/tododata/info",async (req, res) => {
    console.log(req.body);
    const { Name, Activity, Status, Date, Time, Priority, TaskType } = req.body

    // if (!Name || !Activity || !Status || !Date || !Time || !Priority || !TaskType) {
    //     console.log("Please fill your information in")

    //     res.redirect("/")
    // } else {
        // maimarray.push(req.body);
        // console.log(maimarray)
       try {
        const createToDo = await tododata.create(req.body)
        console.log(createToDo);
        
        res.redirect("/secod")
       } catch (error) {
         console.log(error);
         
       }
    }
// }
)

app.post("/user/delete/:id", async (req, res) => {
    try {
        let { id } = req.params; // Extract ID
        console.log("Raw ID:", id); // Debugging

        // 🔹 Ensure `id` is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.error("Invalid ObjectId:", id);
            return res.status(400).send("Invalid To-Do ID");
        }

        console.log("Received ID:", req.params.id);
        // 🔹 Delete from MongoDB
        await tododata.findByIdAndDelete(id);
        console.log(`Deleted To-Do with ID: ${id}`);
        res.redirect("/secod");
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).send("Error deleting task");
    }
});

app.get("/user/edit/:id",async (req, res) => {
    try {
        let {id} = req.params;
    console.log("Raw ID:", id); // Debugging

    // 🔹 Ensure `id` is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
            console.error("Invalid ObjectId:", id);
            return res.status(400).send("Invalid To-Do ID");
    }
    console.log("Received ID:", req.params.id);
    const datq = await tododata.findById(req.params.id);
    console.log(datq);
    res.render("edit", {datq, id})

    } catch (error) {
        console.log(error);
        
    }
})


// 🛠 **POST route to update a to-do item by ID*
  app.post('/user/update/:id', async (req, res) => {
    try {
        const { Name, Activity, Status, Date, Time, Priority, TaskType } = req.body;

        // Check if all required fields are provided (optional)
        if (!Name || !Activity || !Status || !Date || !Time || !Priority || !TaskType) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Update the to-do item in the database
        const updatedTodo = await tododata.findByIdAndUpdate(
            req.params.id,
            { $set: { Name, Activity, Status, Date, Time, Priority, TaskType } }, // Updating fields
            { new: true, runValidators: true } // Return the updated document and validate fields
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'To-Do not found' });
        }

         // Fetch all todos after update
         const todos = await tododata.find();

         // Render the EJS file with all todos
        //  res.render("secod", { todos });
        res.redirect("/secod")

    } catch (error) {
        console.error('Error updating To-Do:', error);
        res.status(500).json({ message: 'Error updating To-Do', error: error.message });
    }
});



const uri = "mongodb+srv://Diekodavid:Rejoice39@cluster0.ugfny.mongodb.net/Todolistbase?retryWrites=true&w=majority&appName=Cluster0"
 const codar = async() =>{
   try {
    const codared = await mongoose.connect(uri)
    if (codared) {
        console.log("connection to dataase is successful");
    }
   } catch (error) {
    console.log(error);
    
   }

 }
 codar()

const port = 9000

app.listen(port, () => {
    console.log(`app started at port ${port}`)
})