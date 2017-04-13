//console.log("Herro from the evildoer.js file!!"); //smoke test

var componentVue = new Vue({ //"new constructor" and object literal
  el: "#component", //define a key called "el" and set it equal to # (id) sample
  data: { //data sample which will be equal to an object
    villains: [], //defining as an empty array to start, using the fetch below
    villain: {}, // "empty object" this naming convention means "ONE BAD GUY" stick to this format
  }
});

//"fetch" makes a GET request to our URL endpoint -> villains
fetch("/api/villains") // this endpoint serves json (get data from the database)
.then(function(blob){
  return blob.json();
})
.then(function(data){
  console.table(data);
  componentVue.villain = data[2]; //want to get specificlly index 2 from the database (which is Batman)
  componentVue.villains = data;
})
.catch(function(err){
  console.log("something is broken!");
  return err
});
