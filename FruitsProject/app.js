const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name: "Peach",
  rating: 10,
  review: "Peach is yummy!"
});

// fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const mango = new Fruit({
  name: "mango",
  score: 6,
  review: "Decent fruit."
});

mango.save();

Person.updateOne({ name: "John" }, { favoriteFruit: mango }, function(err) {
  if (err) console.log(err);
  else console.log("Updated!");
});

// const person = new Person({
//   name: "Amy",
//   age: 12,
//   favoriteFruit: pinenapple
// });

// person.save();

// const kiwi = new Fruit({
//   name: "Kiwi",
//   score: 10,
//   review: "The best fruit!"
// });

// const orange = new Fruit({
//   name: "Orange",
//   score: 4,
//   review: "Too sour for me"
// });
// const banana = new Fruit({
//   name: "Banana",
//   score: 3,
//   review: "Weird texture"
// });

// Fruit.insertMany([kiwi, orange, banana], function(err) {
//   if (err) {
//     console.log(err);
//   } else console.log("Success!");
// });

Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    fruits.forEach(fruit => {
      console.log(fruit.name);
    });
  }
});

// Fruit.updateOne(
//   { _id: "5e66abeb17ee252bd4c19ca4" },
//   { review: "Peach is like a butt!" },
//   function(err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Successfully updated the document.");
//     }
//   }
// );

// Fruit.deleteOne({ _id: "5e66abeb17ee252bd4c19ca4" }, function(err) {
//   if (err) console.log(err);
//   else console.log("Deleted!");
// });

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection("fruits");
  // Insert some documents
  collection.insertMany(
    [
      {
        name: "Apple",
        score: 8,
        review: "Great fruit"
      },
      {
        name: "Orange",
        score: 6,
        review: "Kinda sour"
      },
      {
        name: "Banana",
        score: 9,
        review: "Great stuff"
      }
    ],
    function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    }
  );
};

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection("fruits");
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  });
};
