var catalogo = {
    productos : Array(),
    existeProducto : function(producto) {
        for(var i = 0; i< this.productos.length; i++) {
            if(this.productos[i]["nombre"] == producto["nombre"]) {
                return true;
            }
        }
        return false;
    },
    ordernarProductos : function() {
        this.productos.sort((a,b) => (a["nombre"] > b["nombre"] ? 1 : -1)); 
    },
    desplegar : function() {
        this.ordernarProductos();
        var catalogoStr = "";
        for(var prod of this.productos){
            catalogoStr += "<li>" + prod.desplegar() + "</li>";
        }
        return catalogoStr;
    }
}
document.addEventListener("DOMContentLoaded", function(event) { 

    var form  = document.getElementById('create');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        var producto = {
            nombre : form.elements["fnombre"].value,
            departamento : form.elements["fdepto"].value,
            precio : form.elements["fprecio"].value,
            existencia: form.elements["fexistencia"].value,
            desplegar : function() {
                return `Nombre: ${this.nombre} Departamento: ${this.departamento} Precio: ${parseFloat(this.precio).toFixed(2)} Existencia: ${this.existencia}`;
            }
        };

        document.getElementById('nombre').innerHTML = producto["nombre"];
        document.getElementById('departamento').innerHTML = producto.departamento;
        document.getElementById('precio').innerHTML = parseFloat(producto["precio"]).toFixed(2);
        document.getElementById('existencia').innerHTML = parseInt(producto["existencia"]);
        document.getElementById("datosProducto").style.visibility = "visible";
        form.elements["fnombre"].value = "";
        form.elements["fdepto"].value = "";
        form.elements["fprecio"].value = "";
        form.elements["fexistencia"].value = "";

        catalogo.productos.push(producto);
        document.getElementById('liscat').innerHTML = catalogo.desplegar();
    });

});

