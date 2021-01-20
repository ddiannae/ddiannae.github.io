#!/bin/bash

saludo="Hola, como estas?"
usuario=$(whoami)
dia=$(date +%A)

echo "$saludo $usuario! Hoy es  $dia, y tenemos sesión de Escuela de código!"
echo "La versión de tu bash es: $BASH_VERSION. :)!"
