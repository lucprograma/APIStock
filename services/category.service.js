var Category = require('../schemas/category.schema');

exports.create = function(req, res) {
  var category = new Category(req.body)
    category.save(function(err, category){
    if(err) {
      return res.status(500).json( {
        message: 'Error',
        error: err
      })
    }
    return res.status(201).json({
      message: 'saved',
      _id: category._id
    })
  })  
};
exports.getByOption = function(req, res) {
  //var id = req.params ? req.params.id : null
  if(req.params && req.params.id){
    try{
    const category = Category.findById(req.params.id, function(err, category){
      if (err) {
        return res.status(500).json({
          message: 'error'
        })
      }
      if (!category) {
        return res.status(404).json({
          message: 'Category not found'
        })
      }
      return res.status(201).json(category)
    });
    }
    catch(e){
      return res.status(500).json(
        {
          message: 'An error has occurred in a server side script, a no more specific message is suitable.',
          error: e
        }
      )
    }
  }
  else {
    try{
      Category.find({}, function(err, categories){
        if (err) {
          return res.status(500).json({
            message: 'error'
          })
        } else {
          return res.status(201).json(categories)
        }
      });
    }
    catch(e){
      return res.status(500).json(
        {
          message: 'An error has occurred in a server side script, a no more specific message is suitable.',
          error: e
        }
      )
    }
  }
};
