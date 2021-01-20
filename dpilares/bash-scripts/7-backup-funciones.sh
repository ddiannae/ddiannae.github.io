#!/bin/bash

# Este script va a hacer un backup del escritorio del usuario en /tmp/.

user=$(whoami)
input=/home/$user/Desktop
output=/tmp/${user}_desktop_$(date +%Y-%m-%d_%H%M%S).tar.gz

# La función archivos_totales reporta el número total de
# archivos en un directorio
function archivos_totales {
        find $1 -type f | wc -l
}

# La función directorios_totales reporta el número total de
# directorios en un directorio
function directorios_totales {
        find $1 -type d | wc -l
}

tar -czf $output $input 2> /dev/null

echo -n "Archivos a incluirse:"
archivos_totales $input
echo -n "Directorios a incluirse:"
directorios_totales $input

echo "Backup de $input completado!"

echo "Detalles sobre el archivo:"
ls -l $output
