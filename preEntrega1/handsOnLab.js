let arrayOriginal = [1,2,3]
let arraySecundario = [... arrayOriginal]

console.log(arraySecundario);
arrayOriginal.push('4')

console.log(arrayOriginal);
console.log(arraySecundario);

arraySecundario.push('5')

console.log(arrayOriginal);
console.log(arraySecundario);