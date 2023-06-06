#!/bin/bash

# Classic
read -r -p "Are you sure? [y/N] " response
case "$response" in
    [yY][eE][sS]|[yY])
        do_something
        ;;
    *)
        do_something_else
        ;;
esac

# >= version 3.2
read -r -p "Are you sure? [y/N] " response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]
then
    do_something
else
    do_something_else
fi

# > version 4
read -r -p "Are you sure? [y/N] " response
response=${response,,}    # tolower
if [[ "$response" =~ ^(yes|y)$ ]]
then
    do_something
else
    do_something_else
fi


# Classic true/false function
confirm() {
    # call with a prompt string or use a default
    read -r -p "${1:-Are you sure? [y/N]} " response
    case "$response" in
        [yY][eE][sS]|[yY])
            true
            ;;
        *)
            false
            ;;
    esac
}
# Usage:
# confirm && hg push ssh://..
# confirm "Would you really like to do a push?" && hg push ssh://..


