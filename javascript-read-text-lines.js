var lines = $('textarea').val().split('\n');
for(var i = 0;i < lines.length;i++){
    //code here using lines[i] which will give you each line
}

// or

var input = 'Your large string with multiple new lines...';
var char = '\n';
var i = j = 0;

while ((j = input.indexOf(char, i)) !== -1) {
  console.log(input.substring(i, j));
  i = j + 1;
}

console.log(input.substring(i));
