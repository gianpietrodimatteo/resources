var date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

// requer um dia da semana jutamente com uma data longa
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
console.log(date.toLocaleDateString('de-DE', options));
// → "Donnerstag, 20. Dezember 2012"

// uma aplicação pode querer usar UTC e fazê-lo visível
options.timeZone = 'UTC';
options.timeZoneName = 'short';
console.log(date.toLocaleDateString('en-US', options));
// → "Thursday, December 20, 2012, GMT"
console.log(date.toLocaleDateString('pt-BR', options));


// When using date:

formatDate(originalDate: moment.Moment, localeString: string) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC', // optional
    timeZoneName: 'short' // optional
  };
  // pt-BR or en-US
  return moment(originalDate).toDate().toLocaleDateString(localeString, options);
}
