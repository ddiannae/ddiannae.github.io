#!/bin/bash

function detalles_de_usuario {
	echo "Nombre del Usuario: $(whoami)"
	echo "Directorio Home: $HOME"
}

detalles_de_usuario
echo "Voy a mandar llamar la funcion nuevamente"
detalles_de_usuario

