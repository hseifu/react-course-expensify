//
// Object Destructuring
//

// const person = {
//     name: 'Henok',
//     age: 20,
//     location: {
//         city: 'Bremen',
//         temp: 5
//     }
// }

// const { name: firstName = "Anonymous", age, location } = person;

// console.log(`${firstName} is ${age}.`);

// const { city, temp: temperature } = person.location;

// console.log(`It's ${temperature} in ${city}`);

const book = {
    title: 'Ego is the Enemy',
    author: 'Ryan Holiday',
    publisher: {
        name: 'Penguin'
    }
}

const {name: publisherName = "Self-Published"} = book.publisher;

console.log(publisherName); //Penguin, Self-Published


//
// Array Destructuring
//

const address = ['College Ring 7', 'Bremen', 'Germany', '28759']
const [,city,country="Deutchland"] = address;

console.log(`You are in ${city}, ${country}.`);