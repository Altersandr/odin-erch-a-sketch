const divContainer = document.getElementById('sketchField');

let colorPick = document.getElementById('colorpicker').value;
let colorSelector = document.getElementById('colorpicker');

// const box = document.querySelectorAll(".box")


divContainer.addEventListener('mouseenter', ()=> {
    const box = document.querySelectorAll(".box")
    // box.forEach(box=> box.classList.remove('rainbow'))
    // console.log(box)
    colorPick = colorSelector.value});

colorSelector.addEventListener('blur', ()=> {
    const box = document.querySelectorAll(".box")
    box.forEach(box=> box.classList.remove('rainbow'))
    // console.log(box)
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
        box.style.width = (cellSize - (borderSize * 2)) + "px";
        box.style.height = (cellSize - (borderSize * 2)) + "px";

        
        divContainer.addEventListener('mousedown', ()=> 

        
        box.addEventListener('mousemove', function backgroundChange(){
            
            if (event.target.classList.contains('rainbow')){
                let rainbow = '#';
                let colorArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

                
                for (let i = 0; i<6; i++){
                rainbow += colorArray[Math.floor(Math.random()*colorArray.length)];


                event.target.style.backgroundColor = rainbow;
                }
            }else{
      
            box.style.backgroundColor = `${colorPick}`;}
        }))
        
        divContainer.appendChild(box);
    
    }
     
}



function mouseOut(e){
    console.log('you left')
    clearInterval(timer);
}

initiateGrid()

function resetGrid(){
    divContainer.innerHTML = "";
}

let rainbowBtn = document.getElementById('rainbow');
rainbowBtn.addEventListener('click', ()=>{
    const box = document.querySelectorAll('.box');
    box.forEach(box=> box.classList.add('rainbow'))

})

