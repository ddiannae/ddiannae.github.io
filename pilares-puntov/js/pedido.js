var productos = [];
var precios = [];
var nprod = 0;
var tprod = 0;
var tprec = 0;

document.addEventListener("DOMContentLoaded", function(event) { 

    var form  = document.getElementById('create');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        var element = document.getElementById("addprod");
        element.parentNode.removeChild(element);
        
        if(nprod > 0){
            var buttonDel = document.getElementById("delprod" + nprod);
            buttonDel.style.display = "none";
        }

        productos.push(form.elements["fnombre" + nprod].value);
        precios.push(parseFloat(form.elements["fprecio" + nprod].value));
        nprod = productos.length;
        var newProduct = '<div id="prod' + nprod + '">' +
        '<label for="fnombre' + nprod + '">Nombre del producto:</label>' +
        '<input type="text" id="fnombre' + nprod + '" name="fnombre' + nprod + '" required maxlength="25"><br>' +
        '<label for="fprecio' + nprod + '">Precio del producto:</label>' +
        '$<input type="text" id="fprecio' + nprod + '" name="fprecio' + nprod + '" required pattern="[0-9]+(\.[0-9][0-9]?)?" >' +
        '  <input type="button" id="delprod' + nprod + '" onclick="delProducto()" value="Eliminar producto" > <br>' +
        '<hr></div>' +
        '<input type="submit" id="addprod" value="Agregar nuevo" >';
        form.insertAdjacentHTML('beforeend', newProduct);

        updateTotales();
    });

});

function delProducto() {
    var element = document.getElementById("prod" + nprod);   // Get the <ul> element with id="myList"
    element.parentNode.removeChild(element);

    productos.pop();
    precios.pop();
    nprod = productos.length;

    if(nprod > 0){
        var buttonDel = document.getElementById("delprod" + nprod);
        buttonDel.style.display = "inline-block";
    }
    updateTotales();
}

function updateTotales(){
    tprec = 0;
    for(i=0; i<precios.length; i++) {
        tprec = tprec + precios[i];
    }
    document.getElementById("totalprecio").innerHTML = tprec.toFixed(2);
    document.getElementById("totalprod").innerHTML = productos.length;
}
