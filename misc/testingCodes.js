//ES6 and Arrays

//Objects
const object1 = {
  name: "Rohit",
  learn() {
    console.log(this);
  },
};
const array1 = ["a", "b", "c", "b"];
object1.learn(); //this keyword points toward the current object (refrence to object1)
const learn = object1.learn.bind(object1); //every func in js is object, bind prop can be used to bind a function to a certain object which will be assigned to this keyword for the func
learn(); //this returns glsobal object as the method is called as standalone function

//Arrow functions and Arrays
const doSomething = (task) => task;
console.log(doSomething("Doing smthng"));

const mappedArray = array1.map((element) => element + " mapped");
console.log(mappedArray);
const filteredArray = array1.filter((element) => element !== "b");
console.log(filteredArray);

const foundElement = array1.find((element) => element == "b");
console.log(foundElement);

const array2 = [1, 2, 3, 4, 5];
const reducedResult = array2.reduce(
  (firstValue, element) => element + firstValue,
  0
);
console.log(reducedResult);
