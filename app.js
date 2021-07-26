// For Mac
// run the server by using: brew services start mongodb-community

const mongoose = require("mongoose")

// Connecting to a database/ creating a databse(if the name doesnt exits)
mongoose.connect("mongodb://localhost:27017/fruitDatabase", {useNewUrlParser: true, useUnifiedTopology: true})

// declaring a schema
const fruitSchema = new mongoose.Schema({
    name: String,
    rating: {
        type:Number,
        min:1,
        max:10
    },
    review:String
})

const Fruit = mongoose.model("Fruit", fruitSchema)

// Creating Data
const apple = new Fruit({
    name: "Apple",
    rating:7,
    review: "Decent"
})

const kiwi = new Fruit({
    name: "Kiwi",
    rating:3,
    review: "ehh"
})

const banana = new Fruit({
    name: "Banana",
    rating:9,
    review: "Very gud"
})

const mango = new Fruit({
    name: "Mango",
    rating:10,
    review: "Awesome"
})

// apple.save()

// inserting the data into the database
Fruit.insertMany([apple, kiwi, banana, mango], function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Added fruits succesfully");
    }
})

// updating data by id
Fruit.updateOne({_id : "60fe9f34c7353e48b40735f2"}, {name: "Peach"}, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Updated succesfully");
    }
})

// deleting data by name
Fruit.deleteOne({name: "Apple"}, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Deleted succesfully");
    }
})

// retreiving data
Fruit.find(function(err, fruits){
        if(err){
        console.log(err);
        }
        else{
            mongoose.connection.close()
            // console.log(fruits);
            fruits.forEach(function(fruit){
                console.log(fruit.name)
            })
        }
})


// relationship bw two models
const personSchema = mongoose.Schema({
    name: String,
    age:Number,
    favouriteFruit: fruitSchema
})

const Person = mongoose.model("Person", personSchema)

const person = new Person({
    name: "John",
    age: 37,
    favouriteFruit: mango
})

person.save()
