//Type Alaises

type Employee = {
  readonly id: number;
  name: string;
  retire: (date: Date) => void;
};

let empoyee: Employee = {
  id: 1,
  name: 'Max',
  retire: (date: Date) => {
    console.log(date);
  }
};

//Union Types

function kgToLbg(weight: number | string): number | string {
  //narrow down to a specific type
  if (typeof weight === 'number') return weight * 2.2;
  return parseInt(weight) * 2.2;
}

//Intersection Types

type Dragable = {
  drag: () => void;
};

type Resizeable = {
  resize: () => void;
};

type UiWidget = Dragable & Resizeable;

let textBox: UiWidget = {
  drag: () => {},
  resize: () => {}
};

//Literals Types

type Quantiy = 50 | 100;

let quantity: Quantiy = 100;

//Nullable Types

function greet(name: string | null) {
  if (name) console.log(`Greetings ${name}`);
  else console.log('Hola');
}

greet(null);

//Optional Chaining

type Customer = {
  birthDate?: Date;
};

function getCustomer(id: number): Customer | null | undefined {
  return id === 0 ? null : { birthDate: new Date() };
}

//Nullish colaesing operator

let speed: number | null = null;

let ride = {
  speed: speed ?? 30
};

//Type Assertions

// const phone = document.getElementById('phone');

//Unknown Type

function render(document: unknown) {
  if (typeof document === 'string') document.toUpperCase();
  else if (document instanceof HTMLElement) document.style.color = 'red';
}

//Never type

function processEvents(): never {
  while (true) {}
}
processEvents();
