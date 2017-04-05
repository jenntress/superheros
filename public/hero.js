console.log("Herro from the hero.js file!!"); //smoke test

var sampleVue = new Vue({ //"new constructor" and object literal
  el: "#sample", //define a key called "el" and set it equal to # (id) sample
  data: { //data sample which will be equal to an object
    numbers: [1,2,3,4,5,6], // this is a "data attribute" loop through the numbers array to test
    title: "Hello from the sample Vue component",
    heroes: []
  }
});

//GET request to superheroes
fetch("/superheroes") // this endpoint serves json (get data from the database)
  .then(function(blob){
  return blob.json();
  })
  .then(function(data){
    console.table(data)
    sampleVue.heroes = data
  })
