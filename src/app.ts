//Decorator - a function we apply to the class

//Decorator factory - now we can pass in values
const Logger = (logString: string) => {
  return function(constructor: Function){
    console.log(logString)
    console.log('this is the constructor:',constructor);
  }
}



@Logger('Logging person')
class Person {
  name = 'Pedro';

  constructor() {
    console.log('Creating person object...')
  }
}

const person = new Person();
console.log(person)