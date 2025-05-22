var Product = require('../schemas/product.schema');
var Category = require('../schemas/category.schema');
var Movement = require('../schemas/movement.schema');
class ProductService {

  constructor(){
    this.products = [];
  }

  async get(req, res) {
     Category.aggregate([
        {  $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_categoryId",
            as: "products"
          }
        },  {
          "$project": {
            "products._id": 1,
            "products.categoryId": 1,
            "categoryName": 1,
            "products.description": 1,
            "products.stock": 1,
            "products.price": 1, //Para seleccionar campos
           }
        }]). 
    exec(function(err, products) {
      if(err) {
        return res.status(500).json( {
          message: 'Error',
          error: err
        })
      } else
      return res.status(201).json(products)
    })  
}  

async create(req, res) {
    var product = new Product(req.body)
    product.save(function(err, product){
    if(err) {
      return res.status(500).json( {
        message: 'Error in create',
        error: err
      })
    } else
    return res.status(201).json({
      message: 'saved',
      _id: product._id
    })
  })  
}

async delete(id, res) {
  Product.deleteOne({_id : id}, function(err, product){
  if(err) {
    return res.status(500).json( {
      message: 'Error in delete',
      error: err
    })
  } else
  return res.status(200).json({
    message: 'deleted',
    _id: product
  })
})  
}

async update(req, res) {
  Product.findByIdAndUpdate(req.body._id, { description: req.body.description, stock: req.body.stock, price: req.body.price}, function(err, product){
  if(err) {
    return res.status(500).json( {
      message: 'Error in update',
      error: err
    })
  } else
  return res.status(200).json({
    message: 'updated',
    _id: product._id
  })
})  
}

async state(id, res) {
    Product.findOne({ _id: id }, function(err, product) {
    product.enabled = !product.enabled;
    product.save(function(err, success) {
  if(err) {
    return res.status(500).json( {
      message: 'Error in change state',
      error: err
    })
  } else
  return res.status(200).json({
    message: 'state change',
    _id: success._id
  })
})
})  
}
// metodo para obtener los movimientos de un producto por su id y por el tipo de movimiento
async getByMovementType(id, direction, res) {
  Product.aggregate([
    { $match: { _id: id } },
    { $lookup: {
      from: "movements",
      localField: "_id",
      foreignField: "_productId",
      as: "products_movements"
    }},
    {
      $project: {
        "_id": 1,
        "description": 1,
        "stock": 1,
        "price": 1,
        "products_movements": {
          $filter: {
            input: "$products_movements",
            as: "movement",
            cond: { $and: [
              { $eq: ["$$movement.type", direction] },
              { $eq: ["$$movement._productId", id] }
            ]}
        }
      }
    }}
  ]).exec(function(err, products){
    if(err) {
      return res.status(500).json( {
        message: 'Error',
        error: err
      })
    } else
    return res.status(201).json(products)
  })
}
}
  
module.exports = ProductService;
