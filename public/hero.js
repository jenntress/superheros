console.log("Herro from the hero.js file!!"); //smoke test

var componentVue = new Vue({ //"new constructor" and object literal
  el: "#component", //define a key called "el" and set it equal to # (id) sample
  data: { //data sample which will be equal to an object
    numbers: [0,6765,38,9], // this is a "data attribute" loop through the numbers array to test
    title: "This is TITLE mustache (dynamically pulled from hero.js and put into the HTML)",
    heroes: [], //defining as an empty array to start, using the fetch below
    hero: {}// "empty object" this naming convention means "ONE HERO" stick to this format
  }
});

//"fetch" makes a GET request to our URL endpoint -> superheroes
fetch("/api/superheroes") // this endpoint serves json (get data from the database)
  .then(function(blob){
  return blob.json();
  })
  .then(function(data){
  console.table(data);
   componentVue.hero = data[4]; //want to get specificlly index 4 from the database (which is Spiderman)
   componentVue.heroes = data;
 });
