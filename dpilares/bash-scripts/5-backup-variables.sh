#!/bin/bash

# Este script va a hacer un backup del escritorio del usuario en /tmp/.

user=$(whoami)
input=/home/$user/Desktop
output=/tmp/${user}_desktop_$(date +%Y-%m-%d_%H%M%S).tar.gz

tar -czf $output $input 2> /dev/null
echo "Backup de $input completado! Detalles sobre el archivo:"
ls -l $output
