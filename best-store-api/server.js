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
  
  const bodyParser = multer({ storage: storage }).any()

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
         errors.name ="The name lenght should be at least two characters "
     }
     if(req.body.category.length < 2){
      hasErrors = true
      errors.category ="The category should be at least 2 characters  "
      }
      if(req.body.price.length <= 0){
        hasErrors = true 
        errors.price ="The price is not valid  "
      }
     if(req.body.description.length < 10){
        hasErrors = true
        errors.description ="The descrption should be at least 10 charater lenght should "
      }
      if(req.body.brand < 2){
        hasErrors = true
        errors.brand =" The brand should be at least 2 characters  "
      }
      if(hasErrors){
         res.status(400).jsonp(errors)
         return
      }
      
  // Continue to JSON Server router
  next()
})

// Use default router
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})