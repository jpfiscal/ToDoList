const form = document.querySelector('form');
const listItemInput = document.querySelector('input[type="text"]');
const ul = document.querySelector('ul');
let toDo = new Array();
//for users who are using this to do list for the first time, it will create an empty array 
//otherwise, the array is retrieved from localStorage
if(typeof(localStorage.getItem("toDo")) !== null){
    toDo = JSON.parse(localStorage.getItem("toDo"));
}

//Load list of Li's based on what's in localStorage for(let item of toDo)...
for (const item of toDo){
    const li = document.createElement('li');
    const completeInput = document.createElement('input');
    const deleteBtn = document.createElement('button');

    li.innerText = item.desc;
    completeInput.type = 'checkbox';
    deleteBtn.innerText = 'X';
    
    if (item.done){
        li.style.textDecoration = 'line-through';
        completeInput.checked = true;
    }

    ul.appendChild(li);
    li.prepend(completeInput);
    li.appendChild(deleteBtn);
}

form.addEventListener("submit", function(e){
    e.preventDefault();
    console.log(listItemInput.value);
    const newItem = makeListItem(listItemInput.value);
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = 'X';
    const completeInput = document.createElement("input");
    completeInput.type = "checkbox";
    ul.appendChild(newItem);
    newItem.prepend(completeInput);
    newItem.appendChild(deleteBtn);
    listItemInput.value = "";
})

ul.addEventListener("click", function(e){
    if(e.target.tagName === "BUTTON"){
        removeListItem(e.target.parentElement);
    }else if(e.target.tagName === "INPUT"){
        const searchItem = toDo.find(item => item.desc === e.target.parentElement.innerText.slice(0,-1));
        const index = toDo.indexOf(searchItem);
        console.log(`Index = ${index}`);
        if(e.target.checked === false){
            const updateItemFalse = {
                "desc": e.target.parentElement.innerText.slice(0,-1),
                "done": false
            }
            toDo[index] = updateItemFalse;
            localStorage.setItem("toDo", JSON.stringify(toDo));
            e.target.parentElement.style.textDecoration = "none";
        }else if (e.target.checked === true){
            const updateItemTrue = {
                "desc": e.target.parentElement.innerText.slice(0,-1),
                "done": true
            }
            toDo[index] = updateItemTrue;
            localStorage.setItem("toDo", JSON.stringify(toDo));
            e.target.parentElement.style.textDecoration = "line-through";
        }
    }
})
//ADD ITEM TO TODO LIST
function makeListItem(listValue){
    const listItem = document.createElement('li')
    listItem.innerText = listValue;
    let toDoItem = {
        "desc": listValue,
        "done": false
    }
    toDo.push(toDoItem);
    localStorage.setItem("toDo", JSON.stringify(toDo));
    return listItem;
}
// REMOVE ITEM FROM TODO LIST
function removeListItem(listItem){
    const itemToRemove = toDo.find(item => item.desc === listItem.innerText.slice(0,-1))
    const index = toDo.indexOf(itemToRemove);
    toDo.splice(index,1);
    localStorage.setItem("toDo", JSON.stringify(toDo));
    listItem.remove();
}