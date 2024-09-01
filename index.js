import express from 'express'
import mongoose, { mongo } from 'mongoose'
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// creating Schema 

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Electronics', 'Footwear', 'Accessories', 'Furniture', 'Sports', 'Health', 'Fitness', 'Home Appliances'],
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  brand: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  ratings: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  discount: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  releaseDate: {
    type: Date,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
});

const Product = mongoose.model("Product", productSchema);


app.get("/", async (req, res) => {
  const myData = await Product.find();
  res.json(myData);
})

//count documents 
app.get("/count" , async (req, res) => {
  try{
    const count = await Product.countDocuments();
    res.json({"count" : count});
  } catch(err) {
    res.status(500).json({"message" : "internal server error"})
  }
})

//count documents category wise 

app.get("/count-cagegorywise" , async (req, res) => {
  try{
    const count = await Product.countDocuments({ category: "Electronics" });
    res.json({"count" : count});
  } catch(err) {
    res.status(500).json({"message" : "internal server error"})
  }
})

/////////////////////////////////////  BASIC QUERY OPERATORS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// using eq
app.get("/eq", async (req , res) => {
try{
  const electronicsProduct = await Product.find({category : {$eq : "Electronics"}});
  res.json(electronicsProduct);
}catch(err){
  res.status(500).json("internal server error")
}
})

//using $ne
app.get("/ne", async (req, res) => {
  try{
    const notEqualTo = await Product.find({category : {$ne : "Electronics"}})
    res.json(notEqualTo);
  } catch(err) {
    res.status(500).json({"message" : "INTERNAL SERVER ERRRO"}, {"error" : err})
  }
})

//using $gt

app.get("/gt", async(req, res) => {
  try{
    const greaterThan = await Product.find({price : {$gt : 50}})
    res.json(greaterThan)
  } catch(err) {
    res.status(500).json({"message" : "INTERNAL SERVER ERRRO"})
  }
})

//using $gte
app.get("/gte", async(req, res) => {
  try{
    const greaterThanEqualTo = await Product.find({price : {$gte : 100}});
    res.json(greaterThanEqualTo);
  } catch(err) {
    res.status(500).json({"message" : "INTERNAL SERVER ERRRO"})
  }
})

//using $lt
app.get("/lt", async(req, res) => {
  try{
    const lessThan = await Product.find({stock : {$lt : 50}});
    res.json(lessThan);
  } catch(err) {
    res.status(500).json({"message" : "INTERNAL SERVER ERRRO"})
  }
})

//using $lte
app.get("/lte", async(req, res) => {
  try{
    const lessThanEqual = await Product.find({stock : {$lte : 50}});
    res.json(lessThanEqual);
  } catch(err) {
    res.status(500).json({"message" : "INTERNAL SERVER ERRRO"})
  }
})

//using $in 
app.get("/in", async(req, res) => {
  try{
    const inAnArray = await Product.find({category : {$in : ["Electronics", "Furniture"]}});
    res.json(inAnArray);
  } catch(err) {
    res.status(500).json({"message" : "INTERNAL SERVER ERRRO"})
  }
})

//using $nin
app.get("/nin", async(req, res) => {
  try{
    const notInAnArray = await Product.find({category : {$nin : ["Electronics", "Furniture"]}});
    res.json(notInAnArray);
  } catch(err) {
    res.status(500).json({"message" : "INTERNAL SERVER ERRRO"})
  }
})

/////////////////////////////////////  LOGICAL OPERATORS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// using $or
app.get("/or", async(req, res) => {
  try{
    const orOperator = await Product.find({$or : [{category : "Electronics"}, {price : {$gte : 100}}]});
    res.json(orOperator)
  } catch(err) {
    res.status(500).json({"message" : "INTERNAL SERVER ERRRO"})
  }
})

//using $and
app.get("/and", async(req, res) => {
  try{
    const andOperator = await Product.find({$and : [{category : "Furniture" }, {price : 249.99}]})
    res.json(andOperator);
  } catch(err) {
    res.status(500).json({"message" : "INTERNAL SERVER ERRRO"})
  }
})

//using $not
app.get("/not", async(req, res) => {
  try{
    const notOperator = await Product.find({price : {$not : {$eq : 100}}});
    res.json(notOperator);
  } catch(err) {
    res.status(500).json({"message" : "INTERNAL SERVER ERRRO"})
  }
})

//using $nor it take array of conditona and it return those object which doent meed the array conditon
app.get("/nor", async(req, res) => {
  try{
    const norOperator = await Product.find({$nor : [{category : "Electronics"}, {price : {$gt : 100}}]});
    res.json(norOperator);
  } catch(err) {
    res.status(500).json({"message" : "INTERNAL SERVER ERRRO"})
  }
})

/////////////////////////////////////  Element OPERATORS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//using exists we use this operator to check where some specific field exists or or not in the object
app.get("/exists", async(req, res) => {
  try{
    const existsOperator = await Product.find({price : {$exists : true}});
    res.json(existsOperator);
  } catch(err) {
    res.status(500).json({"message" : "INTERNAL SERVER ERRRO"})
  }
})

// $type: Matches documents where the field is of a specified type.
//using $type
app.get("/type", async(req, res) => {
  try{
    const typeOperator = await Product.find({category : {$type : "string"}});
    res.json(typeOperator);
  } catch(err) {
    res.status(500).json({"message" : "INTERNAL SERVER ERRRO"})
  }
})

//using $regex opeators 
app.get("/regex", async(req, res) => {
  try{
    const regextOperator = await Product.find({category : {$regex :/^[a-zA-Z]+$/}})
    res.json(regextOperator);
  } catch(err) {
    res.status(500).json({"message" : "INTERNAL SERVER ERRRO"})
  }
})

//using $option operatos 
// Common $options Values:
// "i": Case-insensitive matching
// "m": Multi-line matching (changes the behavior of ^ and $ to match the start and end of each line)
// "x": Extended mode (ignores whitespace and allows comments within the regex)
// "s": Dotall mode (allows . to match newline characters)
// "g": Global search (not directly supported in MongoDB, but relevant in some regex contexts)

app.get("/options", async(req, res) => {
  try{
    const optionOperator = await Product.find({category : {$regex : "Elec", $options:"i"}})
    res.json(optionOperator);
  } catch(err) {
    res.status(500).json({"message" : "INTERNAL SERVER ERRRO"})
  }
})

////////////////////////////////////////////////////////////////  ARRAY OPERATOR /////////////////////////////////////////

//using $all operator
// The $all operator in Mongoose (and MongoDB) is used to match documents where an array field contains all the elements specified in a given array. It's useful for querying documents where the array field must include a specific set of values, but the values can be in any order and the array can contain additional elements.

app.get("/all", async(req, res) => {
  try{
    const allOperator = await Product.find({tags : {$all : ["sale", "discount"]}});
    res.json({"result" : allOperator, "message" : "sorry this tags is not avialbe we will add it on later "});
  } catch(err) {
    res.status(500).json({"message" : "INTERNAL SERVER ERRRO"})
  }
})

//using $eleMatch operator 
// The $elemMatch operator in Mongoose (and MongoDB) is used to match documents where at least one element in an array field matches the specified query criteria. This is particularly useful when you need to query for documents based on the properties of individual elements within an array.
// this example is not associated with the database data so it will not give any responce this code is only for understadning purpose only 

//sample object idea 
// {
//   "_id": "64d4c1e1d4e7f8a1c5f3b8e5",
//   "name": "Smartphone X",
//   "category": "Electronics",
//   "price": 699.99,
//   "reviews": [
//     {
//       "rating": 5,
//       "comment": "Excellent phone with great features!"
//     },
//     {
//       "rating": 4,
//       "comment": "Good phone but a bit pricey."
//     }
//   ]
// }
app.get("/eleMatch", async(req, res) => {
  try{
// Using $elemMatch to match array elements with specific criteria
const eleMatch = await Product.find({
  reviews: {
    $elemMatch: {
      rating: { $gt: 4 },
      comment: { $regex: /excellent/i }
    }
  }
});
    res.json(eleMatch);
  } catch(err) {
    res.status(500).json({"message" : "INTERNAL SERVER ERRRO"})
  }
})

//using $size
// The $size operator in Mongoose (and MongoDB) is used to match documents based on the size of an array field. It allows you to filter documents where an array field contains a specific number of elements.

app.get("/size", async(req, res) => {
  try{
    const sizeOperator = await Product.find({tags : {$size : 3}}) 
  } catch(err) {
    res.status(500).json({"message" : "INTERNAL SERVER ERRRO"})
  }
})

////////////////////////////////////////////////////////////////  Geospatial Operators ///////////////////////////////////////// 

//using $geoWithin
//The $geoWithin operator in Mongoose (and MongoDB) is used to match documents where a geospatial field is within a specified geometric shape. It is commonly used for geospatial queries, such as finding documents that fall within a certain area or distance.


////////////////////////////////////////////////////////////////  Projection  Operators ///////////////////////////////////////// 

//Basic usage of projection 
// Include only the `name` and `price` fields in the query results
app.get("/projection-one", async(req, res) => {
  try{
    const projection = await Product.find({}, { name: 1, price: 1, _id : 0});
    res.json(projection);
  } catch(err) {
    res.status(500).json({"message" : "INTERNAL SERVER ERRRO"})
  }
})

// Exclude the `stock` field in the query results
app.get("/projection-two", async(req, res) => {
  try{
    const projectionTwo = await Product.find({}, { stock : 0 });
    res.json(projectionTwo);
  } catch(err) {
    res.status(500).json({"message" : "INTERNAL SERVER ERRRO"})
  }
})

// 2. Positional $ Operator in Projections

// The positional $ operator is used to project the first matching element from an array that meets the query condition.

// Example Scenario:
// Consider a products collection where each document contains an array of reviews. Each review has a rating and a comment.

// Example Document:
// {
//   "_id": "64d4c1e1d4e7f8a1c5f3b8e5",
//   "name": "Smartphone X",
//   "reviews": [
//     { "rating": 5, "comment": "Excellent phone!" },
//     { "rating": 4, "comment": "Good phone, but a bit pricey." }
//   ]
// }
// Use Case:
// You want to find the document where the reviews.rating is 5, but you only want to return the review with that rating.

// Query Using Positional $:
// db.products.find(
//   { "reviews.rating": 5 },
//   { "reviews.$": 1 } // Project only the first review that matches the rating of 5
// );
// Explanation:

// { "reviews.rating": 5 }: This finds documents where at least one review has a rating of 5.
// { "reviews.$": 1 }: The $ operator returns only the first matching review within the reviews array.

// Resutl
// {
//   "_id": "64d4c1e1d4e7f8a1c5f3b8e5",
//   "reviews": [
//     { "rating": 5, "comment": "Excellent phone!" }
//   ]
// }

// 3. Use in Aggregation
// When used in an aggregation pipeline with $project, the $ operator allows you to include, exclude, or manipulate fields in the output documents, similar to the examples mentioned earlier.

// Example:
// db.products.aggregate([
//   {
//     $match: { "reviews.rating": 5 }
//   },
//   {
//     $project: {
//       name: 1,
//       "reviews.$": 1 // Similar use within aggregation to project the matching array element
//     }
//   }
// ]);


////////////////////////////////////////////////////////////////  UPDATE OPERATOR  /////////////////////////////////////////

//using $set Basic use case
app.get("/set", async(req, res) => {
  try{
    const setOperator = await Product.updateOne({"name": "Wireless Mouse"}, {$set : {name : "wihtou wire mouse"}});
    res.json(setOperator)
  } catch(err) {
    res.status(500).json({"message" : "INTERNAL SERVER ERRRO"})
  }
})

//Setting Multiple Fields

app.get("/set-multiple", async(req, res) => {
  try {
    const settingMultipleFields = await Product.updateOne(
      { _id : "66d3f72beab5083448a706a5" },  // Filter: Find the document with the name "Without Wire Mouse"
      { $set: { price: 505, category: "My-Electronics" } }  // Update: Set the price and category fields
    );
    res.json(settingMultipleFields);  // Return the result of the update operation
  } catch (err) {
    res.status(500).json({ "message": "INTERNAL SERVER ERROR" });  // Handle any errors
  }
})


//3. Adding a New Field
// 1. Schema Strict Mode
// Mongoose schemas have a strict option that controls whether values passed to a model that are not specified in the schema are saved or not.

// Strict Mode (Default Behavior): If strict mode is enabled (which is the default setting), any fields that are not defined in the schema will not be added to the document in the database.

// Loose Mode: If strict mode is set to false, Mongoose will allow fields not defined in the schema to be added to the document.
app.get("/adding-new-field", async(req, res) => {
  try{
    const addingNewField = await Product.find({ _id : "66d3f72beab5083448a706a5" }, {$set : {location : "INDIA"}});
    res.json(addingNewField);
  } catch(err) {
    res.status(500).json({"message" : err})
  }
})


// 4. Using $set in Arrays











////////////////////////////////////////////////////////////////  END QUERRY /////////////////////////////////////////

// We use this code to save many object at once and we dont use .save() method here 

app.post("/create-user", async (req, res)=> {
  const newData = req.body;
try{

    await Product.insertMany(newData);
    // const user = new User(newData);
    // user.save();
    res.status(201).json({message : "user created successfully", thedata : newData});
    
} catch (err){
  res.status(501).json({message : "unable to create user ", error : err.message});
}
})



const dbURL = 'mongodb://localhost:27017/thenewdb'
const connectDb = async () => {
  try{
    await mongoose.connect(dbURL);
    console.log('Db connect successful');
  }catch (err) {
    console.log('unable to connect DB due to :', err)
  }
}
connectDb()

app.listen(3000, () => {
  console.log('server started at http://localhost:3000');
})