var express     = require('express');
var bodyParser  = require('body-parser');
var fs          = require('fs');

var app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true,limit:'50mb',parameterLimit:50000}));

app.use('/jquery',express.static(__dirname+'/node_modules/jquery/dist/'));

app.get('/',(req,res)=>{
   res.render('demo');
});

app.post('/upload',(req,res)=>{
   var path     = __dirname+'/'+req.body.filename;
   var image    = req.body.file;
   var data     = image.split(',')[1];
   fs.writeFileSync(path,data,{encoding:'base64'});
    var temp        = fs.readFileSync(path);
    var buff        = new Buffer(temp);
    var base64data  = buff.toString('base64');
    res.json({msg:'success',data:base64data});
});

var port  = process.env.port || 3000;
app.listen(port,()=>console.log('server run at port '+port));