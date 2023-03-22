// throw es comoo un return
// Per genera una interrupción, ademas se uso cuando pasa algo inesperado
// Con throw puedes devolver numeros, strings, objetos
    //Pero con el new Error ya me detalla más dónde se ubica el problema 
function division(dividendo, divisor) {
    // if (divisor === 0)  throw {errorCode: 1, mensaje: 'No s epuede dividir por cero'}
    if (divisor === 0)  throw new Error('no se puede dividir por cero')
    const cociente = dividendo / divisor
    return cociente
}

function main(){
    const resultado = division(10, 0);
    console.log(resultado)
}

// const resultado = division(10, 0);
// console.log(resultado === null? 'No se puede realizar' : resultado)

// El trycatch es una estructura que me protege ante un eventual fallo
try{
    main()
} catch (error) {
    console.log(error);
}