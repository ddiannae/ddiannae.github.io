#!/bin/bash

## -z regresa verdadero si el tamaño del string es 0
## Lo utilizamos para saber si el parámetro $1 tiene información
if [ -z $1 ]; then
	user=$(whoami)
else
	## -d regresa verdadero si el directorio existe
	if [ ! -d "/home/$1/Desktop" ]; then
		echo "La carpeta Desktop del usuario $1 no existe." 
		exit 1
	fi
	user=$1
fi

input=/home/$user/Desktop
output=/tmp/${user}_desktop_$(date +%Y-%m-%d_%H%M%S).tar.gz

function archivos_totales {
        find $1 -type f | wc -l
}

function directorios_totales {
        find $1 -type d | wc -l
}

function directorios_totales_guardados {
        tar -tzf $1 | grep  /$ | wc -l
}

function archivos_totales_guardados {
        tar -tzf $1 | grep -v /$ | wc -l
}

tar -czf $output $input 2> /dev/null

src_files=$( archivos_totales $input )
src_directories=$( directorios_totales $input )

arch_files=$( archivos_totales_guardados $output )
arch_directories=$( directorios_totales_guardados $output )

echo "Archivos a incluirse: $src_files"
echo "Directorios a incluire: $src_directories"
echo "Archivos guardados: $arch_files"
echo "Directorios guardados: $arch_directories"

if [ $src_files -eq $arch_files ]; then
        echo "Backup de $input completado!"
        echo "Detalles del archivo:"
        ls -l $output
else
        echo "Oh no, el backup de $input falló!"
fi
