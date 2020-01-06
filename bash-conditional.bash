#!/bin/bash

# If conditionals
if [ "$#" -eq 0 ] || [ "$#" -gt 1 ] ; then
  echo "hello"
fi

# Check if folder exists
# -f to check if file exists
# "$var" to use variable;
if [ -d "folder/path" ]; then
  echo "folder exists ";
fi

# check if arguments were passed to function
if [ $# -eq 0 ]
  then
    echo "No arguments supplied"
fi
# or
if [ -z "$1" ]
  then
    echo "No argument supplied"
fi

# Select example
select folder in `ls`; do
  if [ ! -z "$folder" ]; then
    echo "you chose $folder!";
    break;
  fi
done

# Select list simple
select option in mary john bob joyce; do
  echo "you chose $option";
done
