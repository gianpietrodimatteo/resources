#!/bin/bash



alias count_files= "echo $(( $RANDOM % $(ls -1q | wc -l) ))"
