// //ES6 and Arrays

// //Objects
// const object1 = {
//   name: "Rohit",
//   learn() {
//     console.log(this);
//   },
// };
// const array1 = ["a", "b", "c", "b"];
// object1.learn(); //this keyword points toward the current object (refrence to object1)
// const learn = object1.learn.bind(object1); //every func in js is object, bind prop can be used to bind a function to a certain object which will be assigned to this keyword for the func
// learn(); //this returns glsobal object as the method is called as standalone function

// //Arrow functions and Arrays
// const doSomething = (task) => task;
// console.log(doSomething("Doing smthng"));

// const mappedArray = array1.map((element) => element + " mapped");
// console.log(mappedArray);
// const filteredArray = array1.filter((element) => element !== "b");
// console.log(filteredArray);

// const foundElement = array1.find((element) => element == "b");
// console.log(foundElement);

// const array2 = [1, 2, 3, 4, 5];
//syntax for reduce function array.reduce((firstValue, element)=> element + firstValue, initial value)
//first value is equal to initial value or the value returned by the function previously
// const reducedResult = array2.reduce(
//   (firstValue, element) => element + firstValue,
//   0
// );
// console.log(reducedResult);
// const axios = require("axios");
// const fetch = require("node-fetch");
// const { response } = require("express");
// async function getUsers() {
//   // axios
//   //   .get("https://jsonplaceholder.typicode.com/users")
//   //   .then((resJson) => console.log(resJson))
//   //   .catch((err) => {
//   //     console.log(err);
//   //   });
//   // fetch("https://jsonplaceholder.typicode.com/users")
//   //   .then((response) => response.json())
//   //   .then((resJson) => console.log(resJson));
//   const response = await fetch("https://jsonplaceholder.typicode.com/users");
//   console.log(await response.json());
// }
// const array3 = ["a", "b", "c"];
// for (let i in array3) {
//   console.log(array3[i]);
// }
// console.log(array3.toString());
// console.log(array3.join("*"));
// console.log(array3.shift());
// const obj = {
//   a: "1",
//   b: "2",
//   c: "3",
// };
// console.log({ ...obj, c: "5" });
// const { a } = obj;
// console.log(a);
const Product = require("../models/products");

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/Ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log("Something went wrong"));

async function getProducts() {
  try {
    const product = await Product.findById("60e569ec952c7b3a40d3812e").populate(
      "category"
    );
    console.log(product);
  } catch (ex) {
    console.log(ex.message);
  }
}

getProducts();
