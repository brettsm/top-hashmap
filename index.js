import { HashMap } from "./datastructures/hashMap.js";

const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log(test.entries());
console.log(test.length());

test.set('apple', 'green');
test.set('jacket', 'gold');

console.log(test.entries());
console.log(test.length());

test.set('moon', 'silver');

console.log(test.entries());
console.log(test.length());

test.set('frog', 'orange');
console.log(test.get('frog'));
test.remove('moon');
console.log(test.entries());
console.log(test.values());
console.log(test.entries());

test.clear();

console.log(test.entries());
