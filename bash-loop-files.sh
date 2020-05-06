#!/bin/bash


# This will not work for sourcing but the loop works
ls ~/.bash/functions/ |while read file; do
. ~/.bash/functions/$file
done

# This works for sourcing..
 for f in ~/.bash_profile_*; do source $f; done
