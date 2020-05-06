# Boolean options!
foo () {
    local flag=0

    while getopts 't' opt; do
        case $opt in
            t) flag=1 ;;
            *) echo 'Error in command line parsing' >&2
               exit 1
        esac
    done
    shift "$(( OPTIND - 1 ))"

    local param1=$1
    local param2=$2

    if [ "$flag" -eq 1 ]; then
        # do things for "foo -t blah blah"
        echo "flag is active, m8"
    else
        echo "flag is NOT active, m8"
        # do things for "foo blah blah"
    fi
}

while getopts u:d:p:f: option
do
  case "${option}"
    in
    u) user=${OPTARG};;
    d) date=${OPTARG};;
    p) product=${OPTARG};;
    f) format=${OPTARG};;
  esac
done


while getopts "hf:t:" OPT; do
  case "$OPT" in
    "h") usage;; # exibir ajuda
    "f") FROM=$OPTARG;;
    "t") TO=$OPTARG;;
    "?") exit -1;;
  esac
done
# ? is how you treat invalid parameters

# If you want to use positional arguments AND paramenters
# Essentially if you want to do something like:

# $ script.sh [options] ARG1 ARG2
# Then get your options like this:

while getopts "h:u:p:d:" flag; do
case "$flag" in
    h) HOSTNAME=$OPTARG;;
    u) USERNAME=$OPTARG;;
    p) PASSWORD=$OPTARG;;
    d) DATABASE=$OPTARG;;
esac
done
# And then you can get your positional arguments like this:

ARG1=${@:$OPTIND:1}
ARG2=${@:$OPTIND+1:1}


