//Decorator - a function we apply to the class

//Decorator factory - now we can pass in values
const Logger = (logString: string) => {
  return function(constructor: Function){
    console.log(logString)
    console.log('this is the constructor:',constructor);
  }
}

function WithTemplate(template: string, hookdId: string) {
  return function(constructor: any) {
    const hookEl = document.getElementById(hookdId);
    const person = new constructor();
    if (hookEl) {
      console.log('Rendering template')
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = person.name;
    }
  }
}

@Logger('Logging')
@WithTemplate('<h1>This was set by a decorator factory</h1>', 'app')
class Person {
  name = 'Pedro';

  constructor() {
    console.log('Creating person object...')
  }
}

const person = new Person();
console.log(person)

// ---

function Log(target: any, propertyName: string | Symbol) {
  console.log('Property decorator');
  console.log(target, propertyName);
}

function secondLog(target: any, name: string, descriptor: PropertyDescriptor ) {
  console.log('Accessor decorator');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @secondLog
  set price(val: number){
    if(val > 0){
      this._price = val;
    } else {
      throw new Error('Invalid price - must be >= 0')
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  getPriceWithTax(tax: number) {
    return this._price * (1+tax);
  }
}