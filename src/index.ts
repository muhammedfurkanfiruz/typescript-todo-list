import { v4 as uuidV4 } from 'uuid'; // universially unique identifier library

type Task = {
  // we created a Task type which is specific
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const list = document.querySelector<HTMLUListElement>('#list'); // id of ul
const form = document.getElementById('new-task-form') as HTMLFormElement | null; // id of form
const input = document.querySelector<HTMLInputElement>('#new-task-title'); // id of input
const tasks: Task[] = loadTasks() //loadtask
//tasks.forEach(addListItem)

form?.addEventListener('submit', (e) => {
  //blocking prevent submitting
  e.preventDefault();
  if (input?.value == ' ' || input?.value == null) return;

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false, //turn to the true
    createdAt: new Date(),
  };
  tasks.push(newTask);
  saveTasks(); //function we will create later

  addListItem(newTask);
  input.value = '';
});

function addListItem(task: Task) {
  const item = document.createElement('li'); // createing list element
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.addEventListener('change', () => {
    //for changing checkbox
    task.completed = checkbox.checked;
    saveTasks(); //for saving tasks coming from local storage
  });
  checkbox.type = "checkbox"
  checkbox.checked = task.completed   // if checked turn it to true if not stay or turn false 
  label.append(checkbox,task.title) 
  item.append(label)
  list?.append(item)
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks))

}

function loadTasks() : Task[] {
  const taskJSON = localStorage.getItem("TASKS")
  if (taskJSON == null) return []
  return JSON.parse(taskJSON)
}
