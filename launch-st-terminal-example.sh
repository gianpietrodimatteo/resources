# Script to launch the prompt application
export PPROJSDIR="$HOME/Workspace/prompt/"

st -n project -e sh -c 'mvn -f $PPROJSDIR/prompt-key/ spring-boot:run;' &
st -n project -e sh -c 'cd $PPROJSDIR/prompt-server/; ./mvnw' &
st -n project -e sh -c 'yarn --cwd $PPROJSDIR/prompt-client/ install; yarn --cwd $PPROJSDIR/prompt-client/ start'

