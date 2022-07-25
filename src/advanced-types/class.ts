//index signatures

/**
 * Open closed principle
 * Classes should be open for extension and closed for modification.
 * Private methos won't interfere with other classes.
 * Protected methods would inherit from parent class
 */

class MyAccount {
  nickName?: string;

  constructor(
    public readonly id: number,
    public owner: string,
    private _balance: number
  ) {}

  deposit(amount: number): void {
    if (amount <= 0) throw new Error('Invalid amount to deposit');
    this._balance += amount;
  }

  withdraw(amount: number): void {
    if (amount <= 0) throw new Error('Invalid amount to withdraw');
    this._balance -= amount;
  }

  get balance(): number {
    return this._balance;
  }
}

const accountNew = new MyAccount(1, 'Max', 100);

console.log(accountNew);

//Index signatures

class SeatsAssignment {
  [seatNumber: string]: string;
}

const seat = new SeatsAssignment();

seat.A1 = 'Borhan';
seat[20] = 'Borhan';

console.log(seat['20']);

class Riding {
  private static _activeRides = 0;

  start() {
    Riding._activeRides++;
  }
  stop() {
    Riding._activeRides--;
  }
  static get activeRides(): number {
    return Riding._activeRides;
  }
}

const ride1 = new Riding();

ride1.start();

const ride2 = new Riding();

ride2.start();

console.log(Riding.activeRides);

class Person {
  constructor(public firstName: string, public lastName: string) {}

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

class Student extends Person {
  constructor(public id: number, firstName: string, lastName: string) {
    super(firstName, lastName);
  }
}

class Teacher extends Person {
  override get fullName(): string {
    return `Professor ${super.fullName}`;
  }
}

function printName(people: Person[]) {
  for (let person of people) {
    console.log(person.fullName);
  }
}

printName([new Student(1, 'John', 'Doe'), new Teacher('Borhan', 'Uddin')]);

/**Abstract class */

abstract class Shape {
  constructor(public color: string) {}

  abstract render(): void;
}

class Circle extends Shape {
  constructor(color: string, public radius: number) {
    super(color);
  }

  override render(): void {
    console.log(`Circle with radius ${this.radius} and color ${this.color}`);
  }
}

const circle = new Circle('red', 5);

circle.render();
