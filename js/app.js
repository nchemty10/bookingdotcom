// select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// classes names
const CHECK ="fa-check-circle";
const UNCHECK ="fa-circle-thin";
const LINE_THROUGH ="lineThrough";

// variables
let LIST = []
    ,id = 0;

// get item from local storage
let data = localStorage.getItem("TODO");

// check if the data is not empty
if (data){
        LIST = JSON.parse(data);
        id = LIST.length; // set the id to the last one in the list
        loadToDo(LIST); // load the list to the user interface
}else{
    // if the data isnt empty
        LIST = [];
        id = 0;
}

// load items to the users interface
function loadToDo(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clear the local storage
clear.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
})

// Show todays date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();
console.log (today)

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function
function addToDo(toDo, id, done, trash){

    if(trash){return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

const item = `<li class="item">
                        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                        <p class="text ${LINE}"> ${toDo} </p>
                        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    </li>`;

const position = "beforeend";

list.insertAdjacentHTML(position, item);
}

// add an item to the list, use the enter key
input.addEventListener("keyup",function(event){
    if(event.keyCode === 13){
        const toDo = input.value;

        // if the input isnt empty
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                    name : toDo,
                    id : id,
                    done : false,
                    trash : false
                });

                // add item to local storage (this code must be added where the LIST array is updated)
                localStorage.setItem("TODO", JSON.stringify(LIST));

                id++;
        }
        input.value = "";


    }


});

// complete to do
function completeToDo(element){

    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;


}

// remove to do
function removeToDo(element){

    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;

}

// target the items created dynamically

list.addEventListener("click", function(event){
    let element = event.target; // <i return the clicked element inside list
    const elementJOB = event.target.attributes.job.value; // delete or complete
    
    if(elementJOB == "complete"){
        completeToDo( element );
    }else if (elementJOB == "delete"){
        removeToDo( element );
    }

    // add item to local storage (this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
