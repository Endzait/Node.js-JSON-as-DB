var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var hb = require('handlebars');
var fs = require('fs');




app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));

app.get('/', function (req, res) {
  var data = fs.readFileSync('./data.json');
  var index = fs.readFileSync('./template.html');
  var comp = hb.compile(""+index);
  data = JSON.parse(data);
  //console.log(data.data);
  index = comp(data);
  fs.writeFileSync('./index.html',index);
  res.sendFile(__dirname + '/index.html');

});

app.get('/add', function (req, res) {
  var data = fs.readFileSync('./data.json');
  var json = JSON.parse(data);
  req.query.id=json.data.length;
  //console.log(json.data);
  json.data.push(req.query);
  //console.log(json);
  var data = fs.writeFileSync('./data.json',JSON.stringify(json));
  var data = fs.readFileSync('./data.json');

});
app.delete('/delete/:id',function(req,res){
  var id = req.params.id;
  var data = fs.readFileSync('./data.json');
  var json = JSON.parse(data);
  json.data.splice(id-1,1);
  //console.log(json);
  var data = fs.writeFileSync('./data.json',JSON.stringify(json));
  res.location('/');
})

app.get('/change/:id', function (req, res) {
  var id = req.params.id;
  //console.log(id);
  //console.log(req.query);
  var data = fs.readFileSync('./data.json');
  var json = JSON.parse(data);
  json.data.splice(id, 1, req.query);
  //console.log(json);
  var data = fs.writeFileSync('./data.json',JSON.stringify(json));
  res.location('/');
});


app.listen(3000);
console.log("Server running on port 3000");
