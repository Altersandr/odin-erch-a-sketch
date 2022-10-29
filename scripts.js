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

let timer = null;

function initiateGrid(){
    let gridSize = document.getElementById('size').value;
    if (gridSize >100 || gridSize < 1){
        alert('You cant have less than 1 or more than 100, default grid will be created')
        gridSize = 16;
    }
    let cellSize = (divContainer.clientWidth*1.0) /gridSize;
    for(i = 0; i<gridSize**2; i++){
        let i = document.createElement('div');
        i.style.backgroundColor = 'lightblue';
        i.style.margin = '1px';
        i.className = 'box';   
        i.style.display = 'flex' ;
        i.style.width = (cellSize - (borderSize * 2)) + "px";
        i.style.height = (cellSize - (borderSize * 2)) + "px";
    
        i.addEventListener('mouseenter', function backgroundChange(){
            if (event.target.classList.contains('rainbow')){
                let rainbow = '#';
                let colorArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

                
                for (let i = 0; i<6; i++){
                rainbow += colorArray[Math.floor(Math.random()*colorArray.length)];


                // console.log(event.target.className)
                event.target.style.backgroundColor = rainbow;
                }
            }else{
        //     timer = setInterval( function(e){i.style.backgroundColor = `${colorPick}`
        // console.log('mouse is up')}, 50);
            i.style.backgroundColor = `${colorPick}`;}
        })
        // i.addEventListener('mouseup', mouseOut);
        // i.addEventListener('mouseleave', mouseOut);
        divContainer.appendChild(i);
    
    }
     
}



// box.addEventListener('mouseup', mouseOut);
// box.addEventListener('mousedown', mouseOut);

function mouseOut(e){
    console.log('you left')
    clearInterval(timer);
}

initiateGrid()

function resetGrid(){
    divContainer.innerHTML = "";
}


// rainbow button function
// let rainbow = '#';
// colorArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

// function colorGenerator(){
//     for (let i = 0; i<6; i++){
//         rainbow += colorArray[Math.floor(Math.random()*colorArray.length)];
//     }
//         return rainbow
// }   


// rainbow button function
let rainbowBtn = document.getElementById('rainbow');
rainbowBtn.addEventListener('click', ()=>{
    const box = document.querySelectorAll('.box');
    box.forEach(box=> box.classList.add('rainbow'))

})



function removeBgChange(){
    i.removeEventListener('mouseenter', backgroundChange())
}

