let parentBox = document.querySelector(".box");
let add = document.getElementById("Add");
let task = document.getElementById("task");
const AddTask = document.getElementById("openBox");
const Cancel = document.getElementById("Cancel");
const editButtons = document.getElementsByClassName("edit");
const deleteButtons = document.getElementsByClassName("delete");
let currentEditingTask = null;

window.window.addEventListener("load", ()=>{
    loadTasksFromLocalStorage();
})

function saveTasksToLocalStorage() {
    const tasks = [];
    console.log("Success")
    document.querySelectorAll(".tasks").forEach(taskDiv => {
        const text = taskDiv.querySelector(".text-data").innerText;
        tasks.push(text);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(taskText => {
        createTask(taskText);
    });
}


function createTask(taskText) {
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const div3 = document.createElement("div");

    div3.classList.add("tasks");

    div1.innerHTML = taskText;
    div1.classList.add("text-data");

    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");

    btn1.innerText = "Edit";
    btn2.innerText = "Delete";
    btn1.classList.add("button");
    btn2.classList.add("button");
    btn1.classList.add("edit");
    btn2.classList.add("delete");

    div2.appendChild(btn1);
    div2.appendChild(btn2);
    div2.classList.add("Addbtn")

    div3.appendChild(div1);
    div3.appendChild(div2);

    task.appendChild(div3);

    document.getElementById("text").value = "";
}

AddTask.addEventListener("click", () => {
    document.getElementById("text").value = "";
    document.getElementById("Add").innerText = "Add Task";
    document.getElementById("writeTask").style.display = "flex";
    document.getElementById("overlay").style.display = "block";
})

Cancel.addEventListener("click", () => {
    document.getElementById("writeTask").style.display = "none";
    document.getElementById("overlay").style.display = "none";
})

add.addEventListener("click", function () {

    let content = document.getElementById("text").value.trim();;

    if (!content) return;

    if (this.innerText === "Update Task" && currentEditingTask) {
        const textDiv = currentEditingTask.querySelector(".text-data");
        textDiv.innerText = content;

        currentEditingTask = null;
        this.innerText = "Add Task";
    } else {
        createTask(content);
    }

    document.getElementById("text").value = "";
    document.getElementById("writeTask").style.display = "none";
    document.getElementById("overlay").style.display = "none";

    saveTasksToLocalStorage();
})

task.addEventListener("click", function (e) {
    if (e.target.classList.contains("edit")) {
        const taskDiv = e.target.closest(".tasks");
        const textDiv = taskDiv.querySelector(".text-data");
        const text = textDiv.innerText;

        document.getElementById("text").value = text;
        document.getElementById("Add").innerText = "Update Task";
        document.getElementById("writeTask").style.display = "flex";
        document.getElementById("overlay").style.display = "block";

        currentEditingTask = taskDiv;
    }

    if (e.target.classList.contains("delete")) {
        const taskDiv = e.target.closest(".tasks");
        taskDiv.remove();
        saveTasksToLocalStorage();
    }
});