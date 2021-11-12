let idIntervalo = null;
function moverCuadrito() {
  var elem = document.getElementById("cuadrito");   
  var pos = 0;
  clearInterval(idIntervalo);
  idIntervalo = setInterval(frame, 5);
  function frame() {
    if (pos == 350) {
      clearInterval(idIntervalo);
    } else {
      pos++; 
      elem.style.top = pos + "px"; 
      elem.style.left = pos + "px"; 
    }
  }
}
let cambio = true;
function cambiarTexto(id) {
    if(cambio) {
        id.innerHTML = "Hola!";
        cambio = false;
    } else {
        id.innerHTML = "Haz click en este texto.";
        cambio = true;
    }
    
}


function formFn()
{
  alert('click sobre form');
}

function divFn()
{
   alert('click sobre div');
}  

function pFn(e)
{
  alert('click sobre p');
  e.stopPropagation();
}


var usarCapture = true;
document.getElementById("formcap").addEventListener("click", function(e){
   
  alert("click sobre form");
  
}, true);

document.getElementById("pcap").addEventListener("click", function(e){
   alert("click sobre p");
}, true);