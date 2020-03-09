#!/bin/bash

# Node's version
. ~/.config/nvm.sh
nvm use node

# Project path
proj_path="$WORKSPACE/wallet-dashboard"

tmux new-session -d -n wallet "cd $proj_path/dashboard-client/; npm run dev"
tmux split-window -h "cd $proj_path/dashboard-server/; npm run start:dev"
tmux -2 attach-session -d

