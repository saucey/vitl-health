#!/bin/bash

LIST=`/usr/bin/find ./dist -regextype posix-extended -regex './dist/.*\.(css|js)$'`

for filename in $LIST; do
    aws s3 cp $filename s3://vitl/$1/$(basename "$filename")
done
