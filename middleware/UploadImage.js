const multer=require("multer")

const StoreImage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"imageDocuments")
    },
    filename:(req,file,cb)=>{
        cb(null, file.originalname)
    }
})

const uploadImage=multer({
    storage:StoreImage
}) 

module.exports=uploadImage