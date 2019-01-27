import * as firebase from 'firebase';
//Child removed
database.ref('expenses').on('child_removed', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
})

//Child changed
database.ref('expenses').on('child_changed', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
})

//Child added
database.ref('expenses').on('child_added', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
})

// database.ref('expense').on('value', (snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         })
//     });
//     console.log(expenses);
// })

database.ref('expenses').push(
        {
            description: "two",
            note: "child addition",
            amount: 195893,
            createdAt: 0,
        }
)


// database.ref('notes').push({
//     title: 'Courses to take',
//     body: 'Computer Networks, Secure and Dependable Systems'
// });



// database.ref().once('value')
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     })
//     .catch((e) => {
//         console.log("error: ", e)
//     })


// database.ref().set('this is my data');

// database.ref('age').set(22);
// database.ref('location/city').set("Hamburg");

// database.ref('job').update({
//     company: "Google"
// })

// setTimeout(() => {
//     database.ref().off('value' ,onValueChange);
// }, 5000);

console.log("I made a request to change the data");