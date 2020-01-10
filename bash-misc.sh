# Exchange white spaces for underscores
str="${str// /_}"

# Remove empty lines from file
sed '/^[[:space:]]*$/d'
# A shorter version that uses ERE, for example with gnu sed:
sed -r '/^\s*$/d'
