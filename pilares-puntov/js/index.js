var nombre = "";
var timeOn = false;
/* alert("¡Bienvenidas mujeres emprendedoras!");
confirm("¿Deseas saber acerca de autonomía económica para mujeres?");
var nombre = prompt("Introduce tu nombre:", "");
alert("Hola " + nombre + " te invitamos a ser" +
" emprendedora y a desarrollar tu" +
" autonomía económica");  */

document.addEventListener("DOMContentLoaded", function(event) { 
    
    document.getElementById("nombre").innerHTML = nombre;
    timer();
    var timeInter = setInterval(function(){timer()}, 1000);

});

function timer() {
    var hoy = new Date();
    var fecha = hoy.getDate() + "/" + hoy.getMonth() + "/" + hoy.getFullYear();
    var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
    document.getElementById("fecha").innerHTML = fecha;
    document.getElementById("hora").innerHTML = hora;    
}

function addMensajeConsola() {
    console.log("Buen día!");
}

function clickConsoleTime() {
    if(!timeOn) {
        timeOn = true;
        console.log("Iniciaste un Timer");
        console.time("pilares");
        document.getElementById("ctime").innerHTML = "Detener console.time";
    } else {
        timeOn = false;
        console.log("Timer finalizado");
        console.timeEnd("pilares");
        document.getElementById("ctime").innerHTML = "Inciar console.time";
    }
}