const express = require("express");
const bodyParser = require("body-parser");
var mongoose = require('mongoose');
const app = express();
var assert = require('assert');
const { Configuration, OpenAIApi } = require("openai");

app.use(express.json());

const OPENAI_API_KEY = "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";
const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


var username = "valdrion96"
var password = "Valdrion161102"
var database = "Beehive"
// const connectionString = `mongodb+srv://valdrion96:${password}@valdcluster.r4ab8vr.mongodb.net/${database}?retryWrites=true&w=majority`;
// try{
//     mongoose.connect(connectionString, { 
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         serverSelectionTimeoutMS: 30000 
// })
// }
// catch(error){
//     console.log(error)
// }

// .then(() => {
//   console.log('Connected to MongoDB');
// })
// .catch((err) => {
//   console.error('Failed to connect to MongoDB:', err);
// });


// LocalHost
mongoose.connect('mongodb://localhost:27017/Beehive');








const teacherSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true]
    },
    mail:{
        type:String,
        required:[true]
    },
    password:{
        type:String,
        required:[true]
    },
    tags:{
        type:Array,
        required:[true]
    },
    image:{
        data: Buffer,
        contentType: String
    }

});

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true]
    },
    mail:{
        type:String,
        required:[true]
    },
    password:{
        type:String,
        required:[true]
    },
    tags:{
        type:Array,
        required:[true]
    },

});

const questionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:[true]
    },
    answer:{
        type:String,
    },
    solved:{
        type:Boolean,
        required:[true]
    },
    solvedBy:{
        type:String,
    },
    tags:{
        type:Array,
        required:[true]
    },

});


const Teacher = mongoose.model('Teacher',teacherSchema);
const Student = mongoose.model('Student',studentSchema);
const Question = mongoose.model('Question',questionSchema);



app.get("/signup",(req,res)=>{
})
app.post("/signup",(req,res)=>{
    

    const {name, mail, password, tags} = req.body;
    // console.log(name, mail, password, tags);
    console.log(req.body);

    if(mail.includes("@sathyabama.ac.in")){
        const new_teach = new Teacher({
            name:name,
            password:password,
            mail:mail,
            tags:tags
        })
    new_teach.save();

    }
    else{
        const new_stud = new Student({
            name:name,
            password:password,
            mail:mail,
            tags:tags
        })
    new_stud.save();

    }
    
})

app.post("/login",async (req,res)=>{
    const {mail, password} = req.body;

    console.log(mail, password);

    if(mail.includes("@sathyabama.ac.in")){

 

        var teach = await Teacher.findOne({mail:mail, password:password}).exec();


            if(teach){
                console.log("teacher found")
                res.json({teach});
            }
            else{
                console.log("teacher not found")
                res.json({message:"teacher not found"});
            }
    }
    else{
        var stud = await Student.findOne({mail:mail, password:password}).exec();
        
            if(stud){
                console.log("student found")
                res.json({stud});
            }
            else{
                console.log("student not found")
                res.json({message:"student not found"});
            }
    }
      

})



app.get("/feed", (req,res)=>{
    const teach =  Question.find({}).exec();
    teach.then((result)=>{
      res.json(result);
    })
})



app.get("/teacherslist",(req,res)=>{
    const teach = Teacher.find({}).exec();
    console.log(teach);
    teach.then((result)=>{
        res.json(result);
        }
    )
})

app.post("/ask",(req,res)=>{

    const {question,tags} = req.body;
    console.log(question,tags);

    try {
    const new_que = new Question({
        question:question,
        solved:false,
        tags:tags
    })
    new_que.save();

    res.status(200).json({ success: true, message: 'Data added successfully', data: new_que });
} catch (error) {
  res.status(500).json({ success: false, message: 'Failed to add data', error: error.message });
}
})

app.post("/answer",(req,res)=>{
    const {ques,ans} = req.body;
    console.log(ques,ans);


    const question = Question.findOneAndUpdate({question:ques},{answer:ans,solved:true}).exec();
        question.then((result)=>{
            res.json(result);
            }
        )

})



app.post('/asktheguy', async (req, res) => {
    const { text } = req.body;

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${text}`,
        temperature: 0,
        max_tokens: 1000,
      });
      console.log(response.data.choices)
    // const responseMessage = `You entered: "${text}"`;

    if(response.data.choices){
        res.json({ message: response.data.choices[0].text });
    }
    else{
        console.log("not found")
    }
  });







app.listen(5000, ()=>{
    console.log("Server is running in 5000");
})