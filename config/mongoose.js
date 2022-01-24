const mongoose=require('mongoose');
//require the library


mongoose.connect('mongodb://localhost/contact_list');
//connect to the database


const db= mongoose.connection;
//aquire the connection to check if it is successfull

db.on('error',console.error.bind(console,'error connecting to db'))
//error


db.once('open',function(){
    console.log('sucessfully connected to the database');
})
//up and running print the message