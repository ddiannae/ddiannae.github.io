#!/bin/bash
  
counter=1
echo "Valor de counter antes del until $counter"
until [ $counter -lt 3 ]; do
    let counter-=1
    echo $counter
done
echo "Valor de counter después del until $counter"
