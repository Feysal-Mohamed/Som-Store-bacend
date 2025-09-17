const product=require("../Models/productModel")

const createProduct=async(req,res)=>{
  
        const{quantity,desc,price,name,categ}=req.body
        const newDAta=product({
            quantity:quantity,
            name:name,
            desc:desc,
            categ:categ,
            price:price,
            prImg:req.file.filename
        })
        const saveData=await newDAta.save()
        if (saveData){
            res.send(saveData)
        }
}

const updateProduct = async (req, res) => {
  const updateFields = {
    name: req.body.name,
    price: req.body.price,
    desc: req.body.desc,
    quantity: req.body.quantity,
    categ: req.body.categ
  };

  if (req.file) {
    updateFields.prImg = req.file.filename;
  }

  const updated = await product.findByIdAndUpdate(req.params.id, updateFields, { new: true });
  if (updated) res.send(updated);
};


const readData=async (req,res)=>{

  const {categ}=req.body || {}
  const filterData={}
 if (categ) {
  filterData.categ = categ
}
    const getData=await product.find(filterData)
    if(getData){res.send(getData)}
}

const deleteProduct = async (req, res) => {
    const deleted = await product.findByIdAndDelete(req.params.id);
    if (deleted) res.send(deleted);
}

const ReadSingleData = async (req, res) => {
  const readSingle = await product.findById(req.params.id);
  if (readSingle) res.send(readSingle);
}



module.exports={createProduct,readData,deleteProduct,ReadSingleData,updateProduct}