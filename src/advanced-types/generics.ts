//class generics
type Default = any;

class KeyValuePair<K = Default, V = Default> {
  constructor(public key: K, public value: V) {}
}

const newItem = new KeyValuePair<string, number>('name', 1);
//Generic Functions

class Utils {
  static WrapInArray<T>(arg: T): T[] {
    return [arg];
  }
}

const number = Utils.WrapInArray('str');

//Generic Interfaces

interface Result<T> {
  data: T | null;
  error: string | null;
}

interface User {
  userName: string;
}

interface Product {
  title: string;
}

function fetch<T>(url: string): Result<T> {
  return { data: null, error: null };
}

const result = fetch<User>('https');

result.data?.userName;

//Generic Constraints

function echo<T extends { name: string }>(data: T): T {
  return data;
}

echo({ name: 'Borhan' });

//generics classes

interface Product {
  name: string;
  price: number;
  category?: string;
}

class Store<T> {
  protected _objects: T[] = [];

  add(object: T): void {
    this._objects.push(object);
  }

  //Keyof
  find(property: keyof T, value: unknown): T[] {
    return this._objects.filter(obj => obj[property] === value);
  }
}

/**Extending Generic Class */

//Passing On Child Class
class CompressableStrore<T> extends Store<T> {
  compress(): void {}
}

//Restricting the generic type parameter with constraints

class SearchableStore<T extends { name: string }> extends Store<T> {
  search(name: string): T | undefined {
    return this._objects.find(obj => obj.name === name);
  }
}

class ProductStore extends Store<Product> {
  filterByCategory(category: string): Product[] {
    return this._objects.filter(obj => obj.category === category);
  }
}

//Type Mapping

interface UserDis {
  name: string;
  age: number;
}

const user: NullAble<UserDis> = {
  name: 'John',
  age: null
};

type NullAble<T> = {
  [P in keyof T]: T[P] | null;
};
