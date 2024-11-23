let list = [];
let list2 = [];


const generateID = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 100);
    const id = (timestamp % 10000) + random;
    return id.toString().padStart(4, '0');
};


const submit = () => {
    const text = document.getElementById("details").value.trim();
    const value = document.getElementById("dropdown").value;
    const errorLabel = document.getElementById("error-label");

    const duplicateItem = list.find(item => item.task.toLowerCase() === text.toLowerCase());

    if (duplicateItem && text !== "") {
        errorLabel.innerText = "Duplicate task. Not adding to the list.";
    } else if (text !== "") {
        const uniqueid = generateID();
        const item = { id: uniqueid, priority: value, task: text };
        list.push(item);
        appendfn(item);
        errorLabel.innerText = "";
    }
};


const appendfn = (item) => {
    const taskList = document.getElementById("taskList");
    const listItem = document.createElement("li");

    listItem.textContent = `Task: ${item.task}, Priority: ${item.priority}`;
    listItem.id = `task-${item.id}`;

    const updateIcon = document.createElement("i");
    updateIcon.setAttribute("class", "bi bi-pen");
    updateIcon.style.cursor = "pointer";
    updateIcon.onclick = () => textUpdate(item.id);

   
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onclick = () => textmove(item.id); 


    listItem.appendChild(updateIcon);
    listItem.appendChild(checkbox);
    taskList.appendChild(listItem);


    document.getElementById("details").value = "";
};



const textUpdate = (id) => {
    const taskItem = list.find(item => item.id === id);
    if (taskItem) {
        const newText = prompt("Enter the updated task:", taskItem.task);
        if (newText && newText.trim() !== "") {
            taskItem.task = newText;

 
            const listItem = document.getElementById(`task-${id}`);
            listItem.firstChild.nodeValue = `Task: ${taskItem.task}, Priority: ${taskItem.priority}`;
        }
    }
};


const textmove = (id) => {
    const taskItem = list.find(item => item.id === id);
    if (taskItem) {
 
        list = list.filter(item => item.id !== id);

 
        list2.push(taskItem);
        appendfn2(taskItem);


        const listItem = document.getElementById(`task-${id}`);
        if (listItem) listItem.remove();
    }
};


const appendfn2 = (item) => {
    const taskList2 = document.getElementById("taskList2");
    const listItem = document.createElement("li");

    listItem.textContent = `Task: ${item.task}, Priority: ${item.priority}`;
    listItem.id = `task-${item.id}`;

    taskList2.appendChild(listItem);
};
