var totalItem = 0; //all item in the list 
var checkedItem = 0; // completed items


//function to show add button if input text is not empty
function showAddSign(val){
   if(val){
    document.getElementById('add-sign').removeAttribute("hidden");
   }else{
    document.getElementById('add-sign').setAttribute("hidden","hidden");
   }
}

// function triggered when new Item is added to list
function addItem(){
    var text = document.getElementById('input-text').value;
    if(text){
        //fetch lis
        let list = document.getElementById('list');
        //create parent div
        let item = document.createElement('div');
        item.setAttribute('class','list-item');
        //create checkBox and append to parent div
        item.appendChild(createCheckBoxTag(text));
  
        //create deletebutton
        let btn = createBtnTag();
        item.appendChild(btn);

        item.setAttribute('onmousemove','displayDeleteBtn(this)');
        item.setAttribute('onmouseout','hideDeleteBtn(this)');
        
        // add parent div to list
        list.appendChild(item);
        totalItem++;

        //updaing left task and reset input textbox
        let leftItems = document.getElementById('left-task');
        leftItems.innerHTML = (totalItem-checkedItem) + " tasks left";
        document.getElementById('input-text').value = "";
        document.getElementById('add-sign').setAttribute("hidden","hidden");
    }
}

//function to delete item
function deleteItem(btn){
    var item = btn.parentNode;
    var list = item.parentNode;
    let box = item.querySelector('input');

    //check if item is completed
    if(box.checked){
        //remove the item and update total and checked items
        list.removeChild(item);
        let leftItems = document.getElementById('left-task');
        leftItems.innerHTML = (totalItem-checkedItem) + " tasks left";
        totalItem--;
        checkedItem--;
    }else{
        //if not completed throw alert.
        alert("Please complete the task before deleting");
    }
    
}

//function when item is completed
function crossItemText(box,textDiv){
    var item = textDiv.parentNode;
    let leftItems = document.getElementById('left-task');
 
    //if completed change border color to green and strike the text
    if(box.checked){
        checkedItem++;
        textDiv.style.textDecoration = "line-through";
        leftItems.innerHTML = (totalItem-checkedItem) + " tasks left";
        item.style.border = "2px solid green";
       
    }else{
        //if not completed undo changes
        checkedItem--;;
        textDiv.style.textDecoration = "none";
        leftItems.innerHTML = (totalItem-checkedItem) + " tasks left";
    }
}

//return parentDiv which have checkBox and text
function createCheckBoxTag(text){
    let div = document.createElement('div');
    let checkBox = document.createElement('input');
    checkBox.setAttribute("type","checkbox");
    checkBox.setAttribute("onclick","crossItemText(this,this.parentNode)");
    div.appendChild(checkBox);
    div.appendChild(document.createTextNode(text));
    div.setAttribute('class','box-margin');
    return div;
}

//return new delete button
function createBtnTag(){
    let btn = document.createElement("button");
    btn.setAttribute("class","hide delete-btn");
    btn.setAttribute("type","submit");
    btn.setAttribute("hidden","hidden");
    btn.setAttribute('onclick','deleteItem(this)');
    let img = createImageTag();
    btn.appendChild(img);
    return btn;
}

//add image to button
function createImageTag(){
    let img = document.createElement("img");
    img.setAttribute("src","./images/icons8-cancel-50.png");
    img.setAttribute("width","30");
    img.setAttribute("height","30");
    return img;
}

//function to display delte button
function displayDeleteBtn(item){
    let btn = item.querySelector('button');
    btn.removeAttribute("hidden");
}

//function to hide delte button
function hideDeleteBtn(item){
    let btn = item.querySelector('button');
    btn.setAttribute("hidden","hidden");
}