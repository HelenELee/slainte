console.log("HELLO!")
const myArray = [
    {
        "date": '2023-01-15',
     },
     {
        "date": '2023-01-16',
     },
     {
        "date": '2023-01-14',
     }

];
const daysSorted = myArray.sort(function(a,b){
    console.log(new Date(a.date));
    console.log(new Date(b.date));
    return new Date(b.date) - new Date(a.date);
 });

 console.log(myArray);
 const days = [{score: 2}, {score:4}];
 let initialScore = 0;
  let sum = days.reduce(function (accumulator, curValue) {
      return accumulator + curValue.score
    }, initialScore);

console.log(sum);
   