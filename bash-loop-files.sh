#!/bin/bash


# This will not work for sourcing but the loop works
ls ~/.bash/functions/ |while read file; do
. ~/.bash/functions/$file
done

# This works for sourcing..
for f in ~/.bash_profile_*; do source $f; done

#print version
for f in ./liquibesta/*; do echo "ola senhor $f"; done

#print version taking spaces into account
OIFS="$IFS"
IFS=$'\n'
for f in ./liquibesta/*; do echo "ola senhor $f"; done
IFS="$OIFS"
