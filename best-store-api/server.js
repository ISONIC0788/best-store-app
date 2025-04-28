const jsonServer = require('json-server')
const multer  = require('multer')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
// server.get('/echo', (req, res) => {
//   res.jsonp(req.query)
// })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/img')
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // for creatin file name 
    let date  = new  Date();
    let imageFilename  = date.getTime()+ "_"+ file.originalname ;
      req.body.imageFilename = imageFilename
      // callback function 

      cb(null, imageFilename)
    }
  })
  
  const upload = multer({ storage: storage }).any()

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
// jsonServer.
server.use(bodyParser)
server.post("/products",(req, res, next) => {
     let date  = new Date();
     req.body.createdAt = date.toISOString();

     if(req.body.price){
        req.body.price = Number(req.body.price);
     }

     let hasErrors  = false ;
     let errors = {}

     if(req.body.name.length < 2){
         hasErrors = true
         errors.name ="The name lenght should "
     }
  // Continue to JSON Server router
  next()
})

// Use default router
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})