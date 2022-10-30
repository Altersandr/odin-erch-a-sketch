const divContainer = document.getElementById('sketchField');

let colorPick = document.getElementById('colorpicker').value;
let colorSelector = document.getElementById('colorpicker');


divContainer.addEventListener('mouseenter', ()=> {
    const box = document.querySelectorAll(".box")
  
    colorPick = colorSelector.value});

colorSelector.addEventListener('blur', ()=> {
    const box = document.querySelectorAll(".box")
    box.forEach(box=> box.classList.remove('rainbow'))
    box.forEach(box=> box.classList.remove('eraser'))
    box.forEach(box=> box.classList.remove('darken'))
    colorPick = colorSelector.value});


let borderSize = 1;

const reset = document.getElementById('resetField');
reset.addEventListener('click', resetGrid);
reset.addEventListener('click', initiateGrid);


function initiateGrid(){
    let gridSize = document.getElementById('size').value;
    if (gridSize >100 || gridSize < 1){
        alert('You cant have less than 1 or more than 100, default grid will be created')
        gridSize = 16;
    }
    let cellSize = (divContainer.clientWidth*1.0) /gridSize;
    for(i = 0; i<gridSize**2; i++){
        let box = document.createElement('div');
        box.className = 'box'; 
        box.style.margin= "1px"; 
        box.style.width = (cellSize - (borderSize * 2)) + "px";
        box.style.height = (cellSize - (borderSize * 2)) + "px";


        function backgroundChange(){
            
            if (event.target.classList.contains('rainbow')){
                let rainbow = '#';
                let colorArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
        
                
                for (let i = 0; i<6; i++){
                rainbow += colorArray[Math.floor(Math.random()*colorArray.length)];
        
        
                event.target.style.backgroundColor = rainbow;
                }
            }else if(event.target.classList.contains('eraser')){
                box.style.backgroundColor = `white`;
            }else if(event.target.classList.contains('darken')){
                // FIX THIS STUFF
                box.className = 'box1'
                console.log("shit")
            }
            
            else{
        
            box.style.backgroundColor = `${colorPick}`;}
        }
        

        divContainer.addEventListener('mousedown', ()=> 
        box.addEventListener('mousemove', backgroundChange))
        divContainer.addEventListener('mouseup', ()=>
        box.removeEventListener('mousemove', backgroundChange ))
        
        divContainer.appendChild(box);
    }   
}

function resetGrid(){
    divContainer.innerHTML = "";
}

let rainbowBtn = document.getElementById('rainbow');
rainbowBtn.addEventListener('click', ()=>{
    const box = document.querySelectorAll('.box');
    box.forEach(box=> box.classList.add('rainbow'))

})

let darkenBtn = document.getElementById('darken');
darkenBtn.addEventListener('click', ()=>{
    const box = document.querySelectorAll('.box');
    box.forEach(box=> box.classList.remove('rainbow'));
    box.forEach(box=> box.classList.remove('eraser'));
    box.forEach(box=> box.classList.add('darken'))
    
})




let eraserBtn = document.getElementById('eraser');
eraserBtn.addEventListener('click', ()=>{
    const box = document.querySelectorAll('.box');
    box.forEach(box=> box.classList.remove('rainbow'))
    box.forEach(box=> box.classList.add('eraser')) 

})


//border toggle
let toggleBtn = document.getElementById('borderToggle');
toggleBtn.addEventListener('mousedown', toggleBorder)


function toggleBorder() {
    const box = document.querySelectorAll('.box');
    box.forEach(box=> {if(box.style.margin === "1px"){
        box.style.margin ='0';
        box.style.padding = '1px'
    }else{box.style.margin ='1px';
    box.style.padding = '0'
}})
                      
}




// initiate the sketchin  
initiateGrid()