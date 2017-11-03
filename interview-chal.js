// Find Zero
const arra = [-2, -1, 0, 2]

// rl.question 

function findZero(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[i] + arr[j] == 0) {
                console.log(`${arr[i]} + ${arr[j]} = 0`);
            }
        }
    }
}
console.log(findZero(arra));



// Write a Bozo sort algorithm, not to be confused with the slightly less efficient bogo sort, consists out of checking if 
// the input sequence is sorted and if not swapping randomly two elements. This is repeated until eventually the sequence is sorted.
// function realsort(arr) {
//     for (let i=0;i<arr.length;i++) {
//         if (arr[i] > arr[i+1]) {
//             return false;
//         }
//     }
//     return true;
// }

// while (realsort == false) {
//     let x = Math.random() * arr.length
//     }
//     for (let i = 0; i < arr.length; i++) {
//         for(j = 0; j < arr.length; j++) {

//         }
//     }
// }