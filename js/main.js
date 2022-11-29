// letiables
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
let tabla = document.getElementById("tabla");
let filas = document.getElementById("filas");
let columnas = document.getElementById("columnas");

// Generacion de numero
let numeros = [];

function devolverNumerosDeCuadrados(filas , columnas){

    let totalNums = filas * columnas;
    // Comrpobamos si el total de casillas es par para poder generar los numeros
    // Si el resultado es un numero par, calculamos el total de numeros a generar 
    // Por ejemplo, el tablero es de 3 X 4 => 12 casillas. Al ser numero par, lo dividimos entre 2 
    // y obtenemos el numero maximo de parejas (6)
    let num = totalNums/2;
    for (let i = 1; i <= num; i++) {
        numeros.push(i);
        numeros.push(i);
        // console.log(numeros);
    }

    // Bucle para desordenar el array de numeros varias veces
    // Al probar el funcionamiento del programa, los valores no estaban del todo desordenador, era muy comun que los numeros que formaban las parejas estuvieran uno a continuacion del otro.
    for (let index = 0; index < 5; index++) {
        numeros = numeros.sort(()=> {return Math.random() - 0.5});
    }
    return numeros;
}

numeros = devolverNumerosDeCuadrados(4 , 3);

// Funcion para obtener la dificultad seleccioanda 
// Una vez obtenemos la dificultad, calculamos los numeros
function obtenerDificultad(event) { 

    event.preventDefault();
    
    // Al pulsar el boton para seleccionar la dificultar , se elimina el tablero por defecto para generar uno nuevo segun los datos seleccionados
    while (tabla.firstChild) { 
        tabla.removeChild(tabla.firstChild);
    }
    // Cada vez que seleccionamos un nivel nuevo, reiniciamos el contador de movimientos
    //contadorMovs.value = 0; 

    // Se reinicia el valor de la lista de numeros para evitar posibles errores
    numeros = []; 

    // Cada vez que se recarga el tablero, el contador de movimientos se reinicia a 0
    accMovs = 0;
    contadorMovs.innerHTML = 0;
    
    // Comprobamos que dificulad se selecciono y generamos el tablero y numeros
    if (document.getElementById("facil").checked) {

        // En caso de que se pulse cualquier opcion diferente a "Custom", se borrara el contenido de los cuadros de texto
        filas.value = "";
        columnas.value = "";

        genera_tabla(3 , 4);
        numeros = devolverNumerosDeCuadrados(3 , 4);

        accParejas = (numeros.length/2); // 6
        parejasRestantes.innerHTML = accParejas;
    }

    if (document.getElementById("medio").checked) {

        filas.value = "";
        columnas.value = "";

        genera_tabla(4 , 5);
        numeros = devolverNumerosDeCuadrados(4 , 5);

        accParejas = (numeros.length/2); // 10
        parejasRestantes.innerHTML = accParejas;
    }

    if (document.getElementById("dificil").checked) {

        filas.value = "";
        columnas.value = "";

        genera_tabla(6 , 6);
        numeros = devolverNumerosDeCuadrados(6 , 6); 

        accParejas = (numeros.length/2); // 18
        parejasRestantes.innerHTML = accParejas;
    }

    if (document.getElementById("custom").checked) {

        // Obtenemos el valor de los campos de texto 
        let filas = document.getElementById("filas").value;
        let columnas = document.getElementById("columnas").value;

        if (filas > 1 && columnas > 1) {
            // Comprobamos que la multiplicacion de un numero para para calcular las parejas
            if ((filas * columnas) % 2 == 0) {
                // Generamos la tabla y la lista de numeros en funcion de los datos introducidos
                genera_tabla(filas , columnas);
                numeros = devolverNumerosDeCuadrados(filas , columnas); 

                accParejas = (numeros.length/2);
                parejasRestantes.innerHTML = accParejas;

            } else {
                alert("Numero no validos\nFilas X columnas tiene que dar par");
                // En caso de que se pulse cualquier opcion diferente a "Custom" o que los numeros no sean validos, se borrara el contenido de los cuadros de texto
            }
        } else {
            alert("Numero no validos\nEl tamaño minimo es 2x2");
        }
    }
}

function mostrarNum(idBoton) {

    numerosMostrados++; // variable de control para saber cuantos botones se han pulsado

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
            // En caso de que lo numeros sean iguales reseteamos el contador de numeros mostrados a 0 y mostramos que queda 1 pareja menos por buscar
            numerosMostrados = 0;
            accParejas--;
            parejasRestantes.innerHTML = accParejas;

        } else {
            // En caso de no sean iguales reseteamos el contador de numeros mostrados a 0 y mostramos que queda 1 pareja menos por buscar

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

function genera_tabla(filas , columnas) {
    // referencia a los elementos
    let tablero = document.getElementById("tablero")
    let tabla = document.getElementById("tabla");

    let id = 0; // Id que se le asignara a cada boton

    // Creamos cada fila
    for (let i = 0; i < filas; i++) {
      // Crea las filas de la tabla
        let fila = document.createElement("tr");

        for (let j = 0; j < columnas; j++) {
            // En cada una de las filas crearemos el elemento <td> al que se le añadira un boton
            let celda = document.createElement("td");
            let botonCelda = document.createElement("button");

            // Cada vez que se crea un boton se le asignara un id la funcion onClick que tendra asignada
            botonCelda.setAttribute("id" , id);
            botonCelda.setAttribute("onClick" , "mostrarNum("+id+")");
            // Una vez listo el boton, lo añadiremos a la celda, y esta, a la fila
            celda.appendChild(botonCelda);
            fila.appendChild(celda);

            // Y sumaremos 1 al contador de id's
            id++;
        }

        // Se agrega la tabla
        tabla.appendChild(fila);
    }
    // Una vez la tabla ya esta creada, la añadimos a la seccion "tablero"
    tablero.appendChild(tabla);
}