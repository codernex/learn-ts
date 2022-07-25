// class Decorators
// function Component(constructor: Function) {
//   console.log('Component decorator');
//   constructor.prototype.uniquId = Date.now();
//   constructor.prototype.InsertInDOM = function () {
//     console.log('Inserting in DOM');
//   };
// }

// Paramiterized decorator
type ComponentOptions = {
  selector: string;
};

function Component(options: ComponentOptions) {
  //Decorator Factory
  return function (constructor: Function) {
    console.log('Component decorator');
    constructor.prototype.selector = options.selector;
  };
}

// Decorator Composition
function Pipe(constructor: Function) {
  console.log('Pipe decorator');
  constructor.prototype.pipe = true;
}

@Component({ selector: '#app' })
@Pipe
class MyComponent {}

//Method Decorator
function Log(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value as Function;
  descriptor.value = function (...args: any) {
    console.log('Before Implementation');
    original.call(this, ...args);
    console.log('After Implementation');
  };
}

//Accessor Decorator

function Capitalize(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.get;
  descriptor.get = function () {
    const result = original!.call(this);

    return typeof result === 'string' ? result.toUpperCase() : result;
  };
}

class Person {
  constructor(private _firstName: string, private _lastName: string) {}
  @Log
  say(message: string) {
    console.log('Person says: ' + message);
  }

  @Capitalize
  get fullName() {
    return `${this._firstName} ${this._lastName}`;
  }
}

const person = new Person('John', 'Doe');

//Property Decorator

function MinLength(length: number) {
  return function (_target: any, propertyName: string) {
    let value: string;
    const descriptor: PropertyDescriptor = {
      get() {
        return value;
      },

      set: function (newValue: string) {
        if (newValue.length < length) {
          throw new Error(`${propertyName} is too short`);
        }
        value = newValue;
      }
    };

    Object.defineProperty(_target, propertyName, descriptor);
  };
}

class User {
  @MinLength(4)
  password: string;

  constructor(password: string) {
    this.password = password;
  }
}

let user = new User('1234');

//Parameter
type WatchedParameter = {
  methodName: string;
  parameterIndex: number;
};

const watchedParameter: WatchedParameter[] = [];

function Watch(_target: any, methodName: string, parameterIndex: number) {
  watchedParameter.push({
    methodName,
    parameterIndex
  });
}

class Vehicle {
  move(@Watch speed: number) {
    console.log(speed);
  }
}

console.log(watchedParameter);
