#!/bin/bash

# Could be more than 1
N=1

ls |sort -R |tail -$N |while read file; do
  # Something involving $file, or you can leave
  # off the while to just get the filenames
  # For example:
  basename $file
done

