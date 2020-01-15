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
