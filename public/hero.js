console.log("Herro from the hero.js file!!"); //smoke test

var sampleVue = new Vue({ //"new constructor" and object literal
  el: "#sample", //define a key called "el" and set it equal to # (id) sample
  data: { //data sample which will be equal to an object
    numbers: [0,6765,38,9], // this is a "data attribute" loop through the numbers array to test
    title: "This is TITLE mustache (dynamically pulled from hero.js and put into the HTML)",
    heroes: [] //defining as an empty array to start, using the fetch below
  }
});

//"fetch" makes a GET request to our URL endpoint -> superheroes
fetch("/API/superheroes") // this endpoint serves json (get data from the database)
  .then(function(blob){
  return blob.json();
  })
  .then(function(data){
    console.table(data)
    sampleVue.heroes = data
  })
