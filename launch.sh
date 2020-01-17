#!/bin/bash

# Project path
proj_path="$WORKSPACE/prompt"

tmux new-session -d -n prompt "mvn -f $proj_path/prompt-key/ spring-boot:run;"
tmux split-window -h "cd $proj_path/prompt-client/; yarn install && yarn start"
tmux new-window "cd $proj_path/prompt-server/; ./mvnw"
tmux -2 attach-session -d

