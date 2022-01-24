const express=require('express');

const path=require('path');

const db= require('./config/mongoose')
const Contact=require('./model/contact');

const port=8000;
const app=express();


app.use(express.urlencoded());
app.use(express.static('assets'));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.get('/',function(req,res){
    res.render('home',{title:'contact list'});
});
app.get('/profile',function(req,res){
    Contact.find({},function(err,contact){
        if(err)
        {
            console.log("Error in finding the module")
            return;
        }
        res.render('profile',{
            title:'profile page',
            contact_list:contact
        })

    })
   /*res.render('profile',
   {
       title:'Profile page ',
       contact_list:contactList
   })*/
});
app.get('/contact',function(req,res){
    res.render('contact');
})
app.get('/delete-contact/',function(req,res){
    console.log(req.query)
    let id=req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err)
        {
            console.log("error in delteing");
            return;
        }
        return res.redirect('back');
    })
    /*let index=contactList.findIndex(contact=>contact.number==phone);
    if(index!=-1)
    {
        contactList.splice(index,1);
    }*/
   // return res.redirect('/profile')
})
app.post('/create-contact',function(req,res){
    //contactList.push(req.body);
    //or
    Contact.create({
        name:req.body.name,
        number:req.body.number
    },function(err){
        if(err)
        {
            console.log("error encountered in fetching the request");
            return;
        }
        res.redirect('back');
    })
    /*contactList.push({
        name:req.body.name,
        number:req.body.number
    })
    return res.redirect('/profile')*/
});
app.listen(port,function(err){
    if(err)
    {
        console.log('error in running the server', err);
        return;
    }
    console.log('Running Successfully at port ',port);
    return;
})
