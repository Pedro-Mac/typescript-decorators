//Decorator - a function we apply to the class

//Decorator factory - now we can pass in values
const Logger = (logString: string) => {
  return function(constructor: Function){
    console.log(logString)
    console.log('this is the constructor:',constructor);
  }
}

function WithTemplate(template: string, hookdId: string) {
  return function<T extends {new(...args: any[]): {name: string}}>(originalContructor: T) {
    return class extends originalContructor {
      constructor(..._: any[]) {
        super();
        const hookEl = document.getElementById(hookdId);

        console.log('Rendering template')
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
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

// --- Creating an decorator that binds 'this' to the class on event listener

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjustedDecriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFunction = originalMethod.bind(this); // *this* refers to what is responsible for triggering the getter method 
      return boundFunction;
    }
  };
  return adjustedDecriptor;
}


class Printer {
  message = 'The click worked';

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const printMessage = new Printer();

document.querySelector('button')!.addEventListener('click', printMessage.showMessage);