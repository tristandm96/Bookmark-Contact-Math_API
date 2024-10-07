
export function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}
export function isPrime(value) {
    for (var i = 2; i < value; i++) {
        if (value % i === 0) {
            return false;
        }
    }
    return value > 1;
}
export function findPrime(n) {
    let primeNumber = 0;
    for (let i = 0; i < n; i++) {
        primeNumber++;
        while (!isPrime(primeNumber)) {
            primeNumber++;
        }
    }
    return primeNumber;

}
 export function Addition(x,y){
    return x + y
}
export function soustraction(x,y){
    return x - y
 }
 export function multiplication(x,y){

    return x * y
 }
 export function division(x,y){
    return  x / y
 }
 export function modulo(x,y){
  return x % y
 }
 export function validateInputs(data, x, y, n,nbOp) {
       
    if ([' ', '-', '*', '/', '%'].includes(data.op)) {
        if(nbOp > 3) return 'too many parameters'
        if (x == null) return 'x parameter is missing';
        if (isNaN(x)) return 'X must be an Integer';
        if (y == null) return 'y parameter is missing';
        if (isNaN(y)) return 'Y must be an Integer';
    }

    if (['!', 'p', 'np'].includes(data.op)) {
        if(nbOp > 2) return 'too many parameters'
        if (isNaN(n)) return 'n parameter is not a number';
        if (!Number.isInteger(n) || n <= 0) return 'n must be an Integer > 0';
    }
    return null; 
} 
 