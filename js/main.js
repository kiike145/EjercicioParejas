// Variables
let numerosMostrados = 0;
let boton1 = null;
let boton2 = null;
let resultado1 = null;
let resultado2 = null;
let accMovs = 0;
let accParejas = 6;

// Elementos HTML
let contadorMovs = document.getElementById("contadorMovs");
let parejasRestantes = document.getElementById("parejasRestantes");

// Generacion de numero
let numeros = [];

function devolverNumerosDeCuadrados(horizontal , vertical){

    var totalNums = horizontal * vertical;
    // Comrpobamos si el total de casillas es par para poder generar los numeros
    if((totalNums % 2) == 0){
        // Si el resultado es un numero par, calculamos el total de numeros a generar 
        // Por ejemplo, el tablero es de 3 X 4 => 12 casillas. Al ser numero par, lo dividimos entre 2 
        // y obtenemos el numero maximo de parejas (6)
        var num = totalNums/2;

        for (let i = 1; i <= num; i++) {
            numeros.push(i);
            numeros.push(i);
            // console.log(numeros);
        }
    } else {
        // En caso de que no lo sea, mostramos un mensaje de aviso para que lo corrija
    }

    // console.log("Numero ordenados:" + numeros);
    return numeros;
}

numeros = devolverNumerosDeCuadrados(3 , 4);
numeros = numeros.sort(()=> {return Math.random() - 0.5});

function obtenerDificultad(event) { 
    event.preventDefault();
    // Funcion para obtener la dificultad seleccioanda 
    // Una vez obtenemos la dificultad, calculamos los numeros
    
    numeros = []; // Se reinicia el valor de la lista de numeros para que no se arrastren numeros a mayores

    if (document.getElementById("facil").checked) {
        // console.log("facil");
        numeros = devolverNumerosDeCuadrados(3 , 4);
        numeros = numeros.sort(()=> {return Math.random() - 0.5});

        accParejas = (numeros.length/2); // 6
        parejasRestantes.innerHTML = accParejas;

        console.log(accParejas);
    }

    if (document.getElementById("medio").checked) {
        //console.log("medio");
        numeros = devolverNumerosDeCuadrados(4 , 5);
        numeros = numeros.sort(()=> {return Math.random() - 0.5});

        accParejas = (numeros.length/2); // 10
        parejasRestantes.innerHTML = accParejas;
        console.log(accParejas);
    }

    if (document.getElementById("dificil").checked) {
        //console.log("dificil");
        numeros = devolverNumerosDeCuadrados(6 , 6); // 18
        numeros = numeros.sort(()=> {return Math.random() - 0.5});

        accParejas = (numeros.length/2);
        parejasRestantes.innerHTML = accParejas;
        console.log(accParejas);
    }
}

// let numerosDesordenados = numeros.sort(()=> {return Math.random() - 0.5});
// console.log("Numero DESordenados:" + numeros);

function mostrarNum(idBoton) {

    numerosMostrados++; // Variable de control para saber cuantos botones se han pulsado

    if (numerosMostrados == 1) {
        // Recogermos el boton con el id que se le pasa como parametro
        // y el valor que le agregamos es el numero que esta en la posicion
        // con la misma id que el boton (valor boton(1) = valor array(1))
        boton1 = document.getElementById(idBoton);
        resultado1 = numeros[idBoton];
        boton1.innerHTML = numeros[idBoton];

        // Deshabilitamos el boton una vez esta pulsado
        boton1.disabled = true;

    } else if (numerosMostrados == 2 ) {
        // Repetimos el proceso con el segundo boton
        boton2 = document.getElementById(idBoton);
        resultado2 = numeros[idBoton];
        boton2.innerHTML = numeros[idBoton];

        // Deshabilitamos el boton una vez esta pulsado
        boton2.disabled = true;

        // Sumamos 1 al contador de elementos y cambiamos el valor
        accMovs++;
        contadorMovs.innerHTML = accMovs;

        if (resultado1 == resultado2) {
            /* 
            En caso de que lo numeros sean iguales reseteamos el contador de numeros mostrados a 0 y mostramos que queda 1 pareja menos por buscar
            */
            numerosMostrados = 0;
            accParejas--;
            parejasRestantes.innerHTML = accParejas;

        } else {
            /* 
            En caso de no sean iguales reseteamos el contador de numeros mostrados a 0 y mostramos que queda 1 pareja menos por buscar
            */
            setTimeout(()=>{
                boton1.innerHTML = " ";
                boton1.disabled = false;

                boton2.innerHTML = " ";
                boton2.disabled = false;
            } , 750);

            numerosMostrados = 0;
        }
    }
}