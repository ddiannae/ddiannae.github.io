#!/bin/bash

string_a="UNIX"
string_b="GNU"

echo "Las cadenas de caracteres $string_a y $string_b son iguales?"
[ $string_a = $string_b ]
echo $?

num_a=109
num_b=100

echo "Los números $num_a y $num_b son iguales ?" 
[ $num_a -eq $num_b ]
echo $?
