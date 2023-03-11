const express = require("express")
const hbs = require("hbs")
const path = require("path")

const bodyParser= require("body-Parser")
const nodeMailer = require("nodemailer")

const transporter =nodeMailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    requireTLS:true,
    auth:{
        user:"anjali8423333@gmail.com",
        pass:"upveetydvodrcgqs"
    }
})

const app = express()


app.set("view engine", "hbs")
hbs.registerPartials(path.join(__dirname + '/views/partials'))
app.use(express.static(path.join(__dirname, "/views/public")))

const urlEncoder = bodyParser.urlencoded({extended:true})


app.get("/", (req, res) => {
    return res.render("index")
})
    app.get("/about", (req, res) => {
        return res.render("about")

    })
    app.get("/faq", (req, res) => {
        return res.render("faq")

    })
    app.get("/service", (req, res) => {
        return res.render("service")

    })
    app.get("/gallary", (req, res) => {
        return res.render("gallary")

    })
    app.get("/contact", (req, res) => {
        return res.render("contact",{show:false})

    })

    app.post("/contact",urlEncoder,(req,res)=>{
        let mailOption = {
            from:"anjali842333@gmail.com",
            to:req.body.email,
            subject:"Your Query Received!!! : Team Interio",
            text : "Thanks to Share Your Query with Us!!!\nOur team Will Contact Your Soon\n"
        }
        transporter.sendMail(mailOption,(error,data)=>{
            if(error)
            console.log(error);
        })
        mailOption = {
            from:"anjali842333@gmail.com",
            to:"anjali842333@gmail.com",
            subject:"Query Received!!! : Team Interio",
            text : `
                Name :  ${req.body.name}
                Email :  ${req.body.email}
                Phone :  ${req.body.phone}
                Subject :  ${req.body.subject}
                Message :  ${req.body.message}
            `
        }
        transporter.sendMail(mailOption,(error,data)=>{
            if(error)
            console.log(error);
        })
        return res.render("contact",{show:true})
    })
    
    
    
    // app.post("/contact",urlEncoder, (req, res) => {
    //     console.log(req.body)
    //     return res.render("contact",{show:true})

    // })

app.listen(80, () => console.log("server is runnig at port 80"))