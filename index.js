require('dotenv').config(); // Load environment variables at the TOP
console.log("MONGO_URI:", process.env.MONGO_URI); // Debugging line

const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

//  MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(" Connected to MongoDB"))
.catch(err => console.error(" MongoDB connection error:", err));

//  Schema Definition
const todoschema = new mongoose.Schema({
    Name: { type: String, required: true },
    Activity: { type: String, required: true },
    Status: { type: String, required: true },
    Date: { type: String, required: true },
    Time: { type: String, required: true },
    Priority: { type: String, required: true },
    TaskType: { type: String, required: true },
});

const tododata = mongoose.model("todolist_data", todoschema);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Home Page
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
    response.render("index");
});

// Get All Todos
app.get("/secod", async (req, res) => {
    try {
        const todos = await tododata.find();
        res.render("secod", { todos });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving To-Do data.");
    }
});

// Add a To-Do Item
app.post("/tododata/info", async (req, res) => {
    try {
        const newTodo = await tododata.create(req.body);
        console.log("To-Do Created:", newTodo);
        res.redirect("/secod");
    } catch (error) {
        console.error(" Error creating To-Do:", error);
        res.status(500).send("Error creating To-Do.");
    }
});

// Delete a To-Do Item
app.post("/user/delete/:id", async (req, res) => {
    try {
        let { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("Invalid To-Do ID");
        }
        await tododata.findByIdAndDelete(id);
        console.log(` Deleted To-Do with ID: ${id}`);
        res.redirect("/secod");
    } catch (error) {
        console.error(" Error deleting To-Do:", error);
        res.status(500).send("Error deleting task.");
    }
});

//  Edit Page
app.get("/user/edit/:id", async (req, res) => {
    try {
        let { id } = req.params;
        console.log("Raw ID:", id); // Debugging
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.error("Invalid ObjectId:", id);
            return res.status(400).send("Invalid To-Do ID");
        }

        console.log("Received ID:", id);
        
        const datq = await tododata.findById(id);

        if (!datq) {
            return res.status(404).send("To-Do not found");
        }

        console.log(datq);
        res.render("edit", { datq, id });

    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching To-Do for editing");
    }
});


// Update a To-Do Item
app.post("/user/update/:id", async (req, res) => {
    try {
        const updatedTodo = await tododata.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!updatedTodo) {
            return res.status(404).json({ message: "To-Do not found" });
        }
        res.redirect("/secod");
    } catch (error) {
        console.error(" Error updating To-Do:", error);
        res.status(500).json({ message: "Error updating To-Do" });
    }
});

// ✅ Server Listening
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`);
});

