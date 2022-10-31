const divContainer = document.getElementById('sketchField');

let colorPick = document.getElementById('colorpicker').value;
let colorSelector = document.getElementById('colorpicker');

colorSelector.addEventListener('blur', ()=> {
    const box = document.querySelectorAll(".box")
    box.forEach(box=> box.classList.remove('rainbow'))
    box.forEach(box=> box.classList.remove('eraser'))
    box.forEach(box=> box.classList.remove('darken'))
    colorPick = colorSelector.value});
    divContainer.addEventListener('mouseenter', ()=> {
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
        box.style.backgroundColor = '#ffffff';
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
                box.style.backgroundColor = `#ffffff`;
            }else if(event.target.classList.contains('darken')){

                let rgb = event.target.style.backgroundColor;
                // let hex = '#' + rgb.substr(4, rgb.indexOf(')') - 4).split(',').map((color) => parseInt(color).toString(16).padStart(2, '0')).join('');
                event.target.style.backgroundColor = pSBC ( -0.6, rgb )
            }else{
            box.style.backgroundColor = `${colorPick}`;}
        }
        
        divContainer.addEventListener('mousedown', ()=> 
        box.addEventListener('mouseenter', backgroundChange))
        divContainer.addEventListener('mouseup', ()=>
        box.removeEventListener('mouseenter', backgroundChange ))
        
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


function LightenDarkenColor(col,amt) {
    let usePound = false;
    if ( col[0] == "#" ) {
        col = col.slice(1);
        usePound = true;
    }

    let num = parseInt(col,16);

    let r = (num >> 16) + amt;

    if ( r > 255 ) r = 255;
    else if  (r < 0) r = 0;

    let b = ((num >> 8) & 0x00FF) + amt;

    if ( b > 255 ) b = 255;
    else if  (b < 0) b = 0;
    
    let g = (num & 0x0000FF) + amt;

    if ( g > 255 ) g = 255;
    else if  ( g < 0 ) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}


//no idea how to read this code or write it, i got it from stackoverflow, in my case it darkens the color you hover over, but it has many other uses
//https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors

const pSBC=(p,c0,c1,l)=>{
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}


initiateGrid()
