#!/bin/bash

# Conditional for evaluating current os

echo "this system is:"
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        echo "linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then
        echo "Mac OSX"
elif [[ "$OSTYPE" == "cygwin" ]]; then
        echo "POSIX compatibility layer and Linux environment emulation for Windows"
elif [[ "$OSTYPE" == "msys" ]]; then
        echo "Lightweight shell and GNU utilities compiled for Windows (part of MinGW)"
elif [[ "$OSTYPE" == "win32" ]]; then
        echo "I'm not sure this can happen."
elif [[ "$OSTYPE" == "freebsd"* ]]; then
        echo "..."
else
        echo "Unknown."
fi

