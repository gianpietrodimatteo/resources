# Project path
proj_path="$WORKSPACE/prompt"

st -n projname -e bash -c "tmux new-session -s dev 'mvn -f $proj_path/prompt-key/ spring-boot:run;'"
