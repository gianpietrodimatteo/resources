#!/bin/bash

# Multi lined string examples
# Here Documents, heredoc

# Use read to store it to variables:

read -d '' sql << EOF
select c1, c2 from foo
where c1='something'
EOF

echo "$sql"

read -r -d '' VAR << EOM
This is line 1.
This is line 2.
Line 3.
EOM

echo "$VAR"

# Use cat for commands:

cat << EndOfMessage
This is line 1.
This is line 2.
Line 3.
EndOfMessage

cat > $FILE <<- EOM
Line 1.
Line 2.
EOM

# cheo <<- is to remove tabs
