const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

const port=process.env.PORT || 4000;
var app=express();
app.set('view engine','hbs');
app.use(express.static(__dirname+'/web'));
app.use((req,res,next)=>{
	const now=new Date().toString();
	const log=`${now} ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log+"\n",(err)=>{
		if(err) console.log("Not logged !")
	})
	next();
});
// app.use((req,res,next)=>{
// 	res.render('maintenance.hbs');
// })
hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('date',()=>{
	return new Date().getFullYear()
})

hbs.registerHelper('transform',(text)=>{
	return text.toUpperCase();
})

const profile={
	           name:"Prithivraj",
		       aoi:'Ionic'
		      }
const data=`I'm ${profile.name} with area of Interest in ${profile.aoi}`;

app.get('/',(req,res)=>{
	res.render('home.hbs',{
		message:'Welcome Home Baby!'
	});
})

app.get('/info',(req,res)=>{
	res.render('info.hbs',{
		message:data
	});
})

app.get('/profile',(req,res)=>{
	res.render('profile.hbs',{
		message:data
	});
})

app.listen(port,()=>{
	console.log(`server is up on port ${port}`)
});