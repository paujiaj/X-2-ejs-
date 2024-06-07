const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const util = require("util")
const exp = require("constants")
const https = require("https");
const unlinkFile = util.promisify(fs.unlink)

const port = 5000
const app = express()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/img/upload/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + path.extname(file.originalname))
    }
})

const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        const page = req.body.page || 'default';
        const uploadPath = `./public/murid/${page}/img`;
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
  
const upload = multer({ 
    storage: storage, 
    limits: {fileSize:10000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
}).any()

const upload2 = multer({ 
    storage: storage2, 
    limits: {fileSize:10000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
}).any()

function checkFileType (file, cb) {
    const fileTypes = /jpeg|png|jpg/
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = fileTypes.test(file.mimetype)

    if(mimetype && extname){
        return cb(null, true)
    } else {
        cb("Please upload images only")
    }
}

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set("view engine", "ejs")

app.use(express.static("public"))

const pages = ["index", "about", "setting",];

pages.forEach(page => {
    app.get(`/${page === 'index' ? '' : page}`, (req, res) => {
        const filePath = (page === 'index' || page === 'about' || page === 'setting') ? page : `murid/${page}`;
        res.render(filePath);
    });
});

const handleRoute = (dir, view, route) => {
    app.get(route, (req, res) => {
        let images = [];
        fs.readdir(dir, (err, files) => {
            if (!err) {
                files.forEach(file => {
                    images.push(file);
                });
                res.render(view, { images: images });
            } else {
                console.log(err);
                res.status(500).send("Internal Server Error");
            }
        });
    });
};

handleRoute("./public/img/upload", "foto", "/foto");
handleRoute("./public/murid/adiva", "murid/adiva", "/adiva");
handleRoute("./public/murid/adrian", "murid/adrian", "/adrian");
handleRoute("./public/murid/akhmad", "murid/akhmad", "/akhmad");
handleRoute("./public/murid/anissa", "murid/anissa", "/anissa");
handleRoute("./public/murid/ansar", "murid/ansar", "/ansar");
handleRoute("./public/murid/daniel", "murid/daniel", "/daniel");
handleRoute("./public/murid/dzia", "murid/dzia", "/dzia");
handleRoute("./public/murid/emir", "murid/emir", "/emir");
handleRoute("./public/murid/fahri", "murid/fahri", "/fahri");
handleRoute("./public/murid/ghaisan", "murid/ghaisan", "/ghaisan");
handleRoute("./public/murid/ghea", "murid/ghea", "/ghea");
handleRoute("./public/murid/hanan", "murid/hanan", "/hanan");
handleRoute("./public/murid/idelia", "murid/idelia", "/idelia");
handleRoute("./public/murid/kaisya", "murid/keisya", "/keisya");
handleRoute("./public/murid/maulana", "murid/maulana", "/maulana");
handleRoute("./public/murid/muhfarhan", "murid/muhfarhan", "/muhfarhan");
handleRoute("./public/murid/muhyaga", "murid/muhyaga", "/muhyaga");
handleRoute("./public/murid/naila", "murid/naila", "/naila");
handleRoute("./public/murid/naraya", "murid/naraya", "/naraya");
handleRoute("./public/murid/raditya", "murid/raditya", "/raditya");
handleRoute("./public/murid/raisya", "murid/raisya", "/raisya");
handleRoute("./public/murid/rajwa", "murid/rajwa", "/rajwa");
handleRoute("./public/murid/reva", "murid/reva", "/reva");
handleRoute("./public/murid/salisah", "murid/salisah", "/salisah");
handleRoute("./public/murid/salma", "murid/salma", "/salma");
handleRoute("./public/murid/sheilvani", "murid/sheilvani", "/sheilvani");
handleRoute("./public/murid/shifwah", "murid/shifwah", "/shifwah");
handleRoute("./public/murid/vito", "murid/vito", "/vito");
handleRoute("./public/murid/khalila", "murid/khalila", "/khalila");
handleRoute("./public/murid/muhfauzi", "murid/muhfauzi", "/muhfauzi");

app.post("/upload", (req, res) => {
    upload(req, res, (err) => {
        if(!err && req.files != ""){
            res.status(200).send()
        } else if(!err && req.files == ""){
            res.statusMessage = "Please select an image to upload"
            res.status(400).end()
        } else {
            res.statusMessage = (err === "Please upload images only") ? err : "Photo exceed limit of 10 MB"
            res.status(400).end()
        }
    })
})

app.post("/upload2", (req, res) => {
    upload2(req, res, (err) => {
        if(!err && req.files != ""){
            res.status(200).send()
        } else if(!err && req.files == ""){
            res.statusMessage = "Please select an image to upload"
            res.status(400).end()
        } else {
            res.statusMessage = (err === "Please upload images only") ? err : "Photo exceed limit of 10 MB"
            res.status(400).end()
        }
    })
})

const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
};

https.createServer(options, app).listen(port, () => {
    console.log(`Server running at https://localhost:${port}/`);
});

