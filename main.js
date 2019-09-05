let canvas = document.querySelector("#js-canvas").getContext("2d");

let width = document.querySelector("#js-canvas").getAttribute("width").replace(/px/, '');
let height = document.querySelector("#js-canvas").getAttribute("height").replace(/px/, '');

function rectangulo(x, y, extendX, extendY){
    canvas.fillRect(x, y, extendX, extendY);
}

function arco(x, y, radio, inicio, fin, anchoLinea){
    canvas.arc(x, y, radio, Math.PI*inicio, Math.PI*fin);
    canvas.lineWidth = anchoLinea;
    canvas.lineCap = 'butt';
    canvas.strokeStyle = 'rgb(' + Math.floor(Math.random() * 255+1) + ', ' + Math.floor(Math.random() *255+1) + ', ' + Math.floor(Math.random()*255+1) + ')';
    //canvas.strokeStyle = 'rgb(' + 10000000 + ', ' + 0 + ', ' + 0 + ')';
    canvas.stroke();
}


function gradienteV3(imageData, color1, color2, inicio, fin, esVertical){
    if(inicio < 0 || fin < 0 || inicio >= fin
    || (esVertical && fin >= imageData.height)
    || (!esVertical && fin >= imageData.width)){
        alert("datos erroneos");
        return;
    }
    let diferencia =    {"r" : color2.r - color1.r,
                        "g" : color2.g - color1.g,
                        "b" : color2.b - color1.b
                        }; //variable que contiene la diferencia RGB entre color 1 y color 2
                        console.log(diferencia);
    let recorrido; //variable para recorrer el eje "y" o "x" dependiendo de si el degrade es vertical o no
    if(esVertical){
        recorrido = imageData.width;
    }
    else{
        recorrido = imageData.height;
    }
    let rActual;
    let gActual;
    let bActual;
    for(i1 = inicio; i1 <= fin; i1++){
        posActual = i1 - inicio; //posicion respecto al inico y fin dado
        largoVerdadero = fin - inicio; //largo del degrade
        rActual = colorPixelDegrade(posActual, diferencia.r, largoVerdadero, color1.r);
        gActual = colorPixelDegrade(posActual, diferencia.g, largoVerdadero, color1.g);
        bActual = colorPixelDegrade(posActual, diferencia.b, largoVerdadero, color1.b);
        for(i2 = 0; i2 < recorrido; i2++){
            if(esVertical){
                setPixel(imageData, i2, i1, rActual, gActual, bActual, 255);
            }
            else{
                setPixel(imageData, i1, i2, rActual, gActual, bActual, 255);

            }
        }
    }
}

function colorPixelDegrade(pos, dif, max, base){
    return pos * dif / max + base;
}

function setPixel(imageData, x, y, R, G, B, A){
    let index = (y * imageData.width + x) * 4;
    imageData.data[index] = R;
    imageData.data[index + 1] = G;
    imageData.data[index + 2] = B;
    imageData.data[index + 3] = A;
}

function getPixel(imageData, x, y){
    let index = (y * imageData.width + x) * 4;
    return {    r: imageData.data[index],
                g: imageData.data[index + 1],
                b: imageData.data[index + 2],
                a: imageData.data[index + 3]

    };
}

function putImage(img){

    if(img.width <= width && img.height <= height){
        canvas.putImageData(img, 0, 0);
    }
    else if(img.width >= img.height){
        let alto = width * img.height / img.width; 
        canvas.putImageData(img, 0, 0, 0, 0, width, alto);
    }
    else{
        let ancho = height * img.width / img.height;
        canvas.putImageData(img, 0, 0, 0, 0, ancho, height);
    }
}



document.querySelectorAll(".js-navButton").forEach(button=>{
    button.addEventListener("click", ()=>{
        document.querySelectorAll(".ejercicio").forEach(divEjercicio =>{
            if(!divEjercicio.classList.contains("hidden")){
                divEjercicio.classList.add("hidden");
            }
        })
    })
})

//ejercicio 1
let mat = [];
for(let y = 0; y < 100; y++){
    let xD = [];
    mat[y] = xD;
    for(let x = 0; x < 100; x++){
        mat[y][x] = Math.floor(Math.random() * 100 + 1);
    }
}
console.table(mat);
console.log("ejercicio 1A");
console.log(getMax(mat));

function getMax(matriz){
    let max = null
    matriz.forEach(row=>{
        row.forEach(cell=>{
            if(max == null || cell > max){
                max = cell;
            }
        })
    })
    return max;
}
console.log("ejercicio 1B");
console.log(getMaxMin(mat));
function getMaxMin(matriz){
    let max;
    let min;
    for(let y = 0; y < matriz.length; y++){
        for(let x = 0; x < matriz[y].length; x++){
            if(y % 2 == 0 && (max == null || matriz[y][x] > max)){
                max = matriz[y][x];
            }
            else if(y % 2 != 0 && (min == null || matriz[y][x] < min)){
                min = matriz[y][x];
            }
        }
    }
    return {    max: max,
                min: min};
}

let promedio = promedioFila(mat);
console.log("ejercicio 1C")
console.log(promedio);
function promedioFila(matriz){
    let resultado = {};
    for(let y = 0; y < matriz.length; y++){
        let total = 0;
        for(let x = 0; x < matriz[y].length; x++){
            total += matriz[y][x];
        }
        resultado[y] = total/matriz[y].length;
    }
    return resultado;
}

//ejercicio 2
document.querySelector("#js-ej2button").addEventListener("click", ()=>{
    document.querySelector("#js-ej2").classList.toggle("hidden");
})

let imgEjercicio2 = {
                        r: 0,
                        g: 0,
                        b: 0,
                        w: 100,
                        h: 100,
};

/*let imgEJ2 = canvas.createImageData(100, 100);
colorSolido(imgEJ2, colorEjercicio2);
putImage(imgEJ2);*/

document.querySelector("#js-ej2").querySelector(".js-color").querySelectorAll("input").forEach(input =>{
    input.addEventListener("input", ()=>{
        switch(input.getAttribute("name")){
            case "r":
                imgEjercicio2.r = input.value;
                break;
            case "g":
                imgEjercicio2.g = input.value;
                break;
            case "b":
                imgEjercicio2.b = input.value;
        }
        //colorSolido(imgEJ2, colorEjercicio2);
        //putImage(imgEJ2);
    })
})
document.querySelector("#js-ej2").querySelector(".js-coords").querySelectorAll("input").forEach(input =>{
    input.addEventListener("input", ()=>{
        switch(input.getAttribute("name")){
            case "w":
                imgEjercicio2.w = input.value;
                break;
            case "h":
                imgEjercicio2.h = input.value;
        }
    })
})

document.querySelector("#js-ej2").querySelector("button").addEventListener("click", ()=>{
    canvas.fillStyle = "#FFFFFF";
    canvas.fillRect(0, 0, width, height); //hay que hacer un rectangulo que pinte todo blanco
    let imgFinal = canvas.createImageData(imgEjercicio2.w, imgEjercicio2.h);
    colorSolido(imgFinal, imgEjercicio2);
    putImage(imgFinal);
})

function colorSolido(img, color){
    for(let y = 0; y < img.height; y++){
        for(let x = 0; x < img.width; x++){
            setPixel(img, x, y, color.r, color.g, color.b, 255);
        }
    }
}


//gradiente
document.querySelector("#js-gradienteButton").addEventListener("click", ()=>{
    document.querySelector("#js-gradiente").classList.toggle("hidden");
})

document.querySelector("#js-checkbox").addEventListener("change", accion =>{
    let esVertical = document.querySelector("#js-checkbox").checked;
    let valor;
    if(esVertical){
        valor = 399;
    }
    else{
        valor = 699;
    }
    document.querySelector("#js-gradiente").querySelectorAll(".js-inicio-fin").forEach(input =>{
        input.setAttribute("max", valor);
    })
})
let imgGradiente = canvas.createImageData(width, height);
let coloresGradiente = document.querySelector("#js-gradiente").querySelectorAll(".js-color");
document.querySelector("#js-gradiente").querySelector("button").addEventListener("click", ()=>{
    let color1 = {  r: 0,
                    g: 0,
                    b: 0
    };
    let color2 = {  r: 0,
                    g: 0,
                    b: 0
    };
    coloresGradiente[0].querySelectorAll("input").forEach(input =>{
        switch(input.getAttribute("name")){
            case "r":
                color1.r = Math.floor(input.value);
                break;
            case "g":
                color1.g = Math.floor(input.value);
                break;
            case "b":
                color1.b = Math.floor(input.value);
        }
    });
    coloresGradiente[1].querySelectorAll("input").forEach(input =>{
        switch(input.getAttribute("name")){
            case "r":
                color2.r = Math.floor(input.value);
                break;
            case "g":
                color2.g = Math.floor(input.value);
                break;
            case "b":
                color2.b = Math.floor(input.value);
        }
    });



    let inicio = document.querySelectorAll(".js-inicio-fin")[0].value;
    let fin = document.querySelectorAll(".js-inicio-fin")[1].value;
    let esVertical = document.querySelector("#js-checkbox").checked;
    gradienteV3(imgGradiente, color1, color2, Math.floor(inicio), Math.floor(fin), esVertical);
    putImage(imgGradiente);

})
document.querySelectorAll(".js-limpiar").forEach(botonLimpiar =>{
    botonLimpiar.addEventListener("click", clear);
});

function clear(){
    console.log("cleanBro");
    let color = {   r: 255,
        g: 255,
        b: 255
    };
    colorSolido(imgGradiente, color)
    putImage(imgGradiente);
}



//imagen filtro

document.querySelector("#js-filtroButton").addEventListener("click", ()=>{
    document.querySelector("#js-filtro").classList.toggle("hidden");
})



document.querySelector("#js-filtro").querySelector("input").addEventListener("change", event=>{
    clear();
    let file = document.querySelector('input[type=file]').files[0];
    console.log(file);
    let reader = new FileReader();
    if(file){
        reader.readAsDataURL(file);
    }
    reader.onloadend = function(){
        let img = new Image();
        img.src = reader.result;
        img.onload = function(){
            myDrawImage(img);
        }
    }
})

function filtroGris(img){
    for(let yi = 0; yi < img.height; yi++){
        for(let xi = 0; xi < img.width; xi++){
            let pixel = getPixel(img, xi, yi);
            let gris = Math.floor((pixel.r + pixel.g + pixel.b) / 3);
            setPixel(img, xi, yi, gris, gris, gris, 255);
        }
    }
    putImage(img);
}

function myDrawImage(img){
    console.log(width - img.width);
    console.log(height - img.height);
    let alto = img.height;
    let ancho = img.width;
    if(img.width <= width && img.height <= height){
        console.log("purrfect");
        canvas.drawImage(img, 0, 0);
    }
    else if((width - img.width) <= (height - img.height)){
        console.log("muy ancha");
        alto = Math.ceil(width * img.height / img.width); 
        ancho = width;
    }
    else{
        console.log("muy alta");
        ancho = Math.floor(height * img.width / img.height);
        alto = height;
    }
    canvas.drawImage(img, 0, 0, ancho, alto);


    document.querySelector("#js-filtro").querySelector("button").addEventListener("click", ()=>{
        let imageDataSubido = canvas.getImageData(0, 0, ancho, alto);
        filtroGris(imageDataSubido);
    })
}


//mejoras visuales:
document.querySelectorAll(".js-color").forEach(selectorColores =>{
    let color = selectorColores.querySelectorAll(".slider");
    let mostrador = selectorColores.querySelectorAll(".js-valueBox");
    for(let y = 0; y < color.length; y++){
        color[y].addEventListener("input", ()=>{
            mostrador[y].value = Math.floor(color[y].value);
            console.log("slide");
        })
        mostrador[y].addEventListener("change", ()=>{
            color[y].value = mostrador[y].value;
            console.log("number");
            console.log(mostrador[y].value);
        })
    }
})


//automatic ejercicio
document.querySelector("#js-ejercicio4Auto").addEventListener("click", ()=>{
    let color1 = {  r: 0,
                    g: 0,
                    b: 0
    }
    let color2 = {  r: 255,
                    g: 255,
                    b: 255}
    cargaAutomatica(color1, color2, 0, 399, true);
})
document.querySelector("#js-ejercicio5-1Auto").addEventListener("click", ()=>{
    let color1 = {  r: 0,
                    g: 0,
                    b: 0
    }
    let color2 = {  r: 255,
                    g: 255,
                    b: 0}
    cargaAutomatica(color1, color2, 0, 349, false);
})
document.querySelector("#js-ejercicio5-2Auto").addEventListener("click", ()=>{
    let color1 = {  r: 255,
                    g: 255,
                 b: 0};
    let color2 = {  r: 255,
                    g: 0,
                    b: 0}
    cargaAutomatica(color1, color2, 349, 699, false);
})

function cargaAutomatica(color1, color2, inicioCarga, finCarga, esVertical){
    let gradiente = document.querySelector("#js-gradiente")
    let slidesColor = gradiente.querySelectorAll(".js-color");
    for(let y = 0; y < slidesColor.length; y++){
        let colorElegido = color2;
        if(y == 0){
            colorElegido = color1;
        }
        slidesColor[y].querySelectorAll(".slidecontainer").forEach(slideContainer=>{
            let slide = slideContainer.querySelector(".slider");
            switch(slide.getAttribute("name")){
                case "r":
                    slide.value = colorElegido.r;
                    break;
                case "g":
                    slide.value = colorElegido.g;
                    break;
                case "b":
                    slide.value = colorElegido.b;
            }
            slideContainer.querySelector(".js-valueBox").value = slide.value;
        })
    }
    gradiente.querySelector(".js-coords").querySelectorAll("input").forEach(atributo=>{
        console.log(atributo);
        switch(atributo.getAttribute("name")){
            case "inicio":
                atributo.value = inicioCarga;
                break;
            case "fin":
                atributo.value = finCarga;
                break;
            case "esVertical":
                atributo.checked = esVertical;
        }
    })
}

/* codigo viejo

var imagen = new Image();
imagen.onload = function(){
    canvas.drawImage(this, 0, 0);
    alert("xD");
}
imagen.src = "images/danganronpaV3.jpg";


let testImg = 256;
let img = canvas.createImageData(testImg, testImg);

let color1 =     {"r" : 128,
                "g" : 0,
                "b" : 128};
let color2 =    {"r" : 0,
                "g" : 100,
                "b" : 255};

gradienteV3(img, color1, color2, 0, Math.floor(255/2), false);
gradienteV3(img, color2, color1, (Math.floor(255/2)-1), 255, false);

console.log(img);
canvas.putImageData(img, 0, 0);

function gradiente(imageData, y, yExtend){
    let color = 0;
    for(yi = 0; yi < imageData.height; yi++){
        if(yi < y){
            color = 0;
        }
        else if(yi > yExtend){
            color = 255;
        }else{
            color = Math.ceil(yi * 255 / (imageData.height - 1));
        }
        for(x = 0; x < imageData.width; x++){
            setPixel(imageData, x, yi, color, color, color, 255);
        }
    }
}

function gradiente2goodbyeHardcodeo(imageData, color1, color2){
    let diferencia =    {"r" : color2.r - color1.r,
                        "g" : color2.g - color1.g,
                        "b" : color2.b - color1.b
                        };
    console.log(diferencia);
    let rActual;
    let gActual;
    let bActual;
    for(yi = 0; yi <imageData.height; yi++){
        rActual = colorPixelDegrade(yi, diferencia.r, (imageData.height-1), color1.r);
        gActual = colorPixelDegrade(yi, diferencia.g, (imageData.height-1), color1.g);
        bActual = colorPixelDegrade(yi, diferencia.b, (imageData.height-1), color1.b);
        for(xi = 0; xi < imageData.width; xi++){
            setPixel(imageData, xi, yi, rActual, gActual, bActual, 255);
        }
    }
}
*/