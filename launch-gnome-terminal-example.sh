#d Workspace/prompt/prompt-client/ installbin/bash

# Script to launch the prompt application
export PPROJSDIR="$HOME/Workspace/prompt/"

# Key
#mvn -f $PPROJSDIR/prompt-key/ spring-boot:run;

# Server
#cd $PPROJSDIR/prompt-server/ ; ./mvnw

# Client
#yarn --cwd $PPROJSDIR/prompt-client/ install
#sudo yarn --cwd $PPROJSDIR/prompt-client/ start

gnome-terminal --tab -e \
'bash -c "mvn -f $PPROJSDIR/prompt-key/ spring-boot:run;"' \
--tab --working-directory $PPROJSDIR/prompt-server/ -e 'bash -c "./mvnw"' \
--tab -e \
'bash -c "yarn --cwd $PPROJSDIR/prompt-client/ install; yarn --cwd $PPROJSDIR/prompt-client/ start"'
