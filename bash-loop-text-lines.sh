#!/bin/bash

# Possible bash functions to loop thorugh the lines of a file
# Bear in mind that if you want to do something more than echoing the file it might take more work

# Simple while loop
while read p; do
  echo "$p"
done <peptides.txt

# While loop without:
# trimming leading whitespace, interpreting backslash sequences, and skipping the last line if it's missing a terminating linefeed.
while IFS="" read -r p || [ -n "$p" ]
do
  printf '%s\n' "$p"
done < peptides.txt

# alternative from reading standard input
# Here, 10 is just an arbitrary number (different from 0, 1, 2).
while read -u 10 p; do
  echo "$p"
done 10<peptides.txt

# another example with conditional
gitme () {
  while read -u 10 p; do
    if [[ "$p" != \#* ]]; then
      echo "# $p:";
          git --git-dir=$p/.git --work-tree=$p "$@";
          echo -e;
    fi
  done 10<$HOME/.myrepos
}

# Using for loop BEST
for HOST in $(cat servers.txt ) ; do
ssh $HOST "uname -a" ;
done
