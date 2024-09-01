< and $ :- start and End and for . we use special character

### digit characters :

- `\d` : mathecs any digit (0-9)
- `\D` : mathes any non-digit.

### white space :

- `\s` mathces any whitespace, tabs and line breaks
- `\S` : matches any non-whitespace character

### quantifiers :

specify how many times a character can occur.

- ( one or more) or \* ( zero or more times) or {1,3} between one and three times

### escape character

use a backlash \ to escape special character and tret them like ordinary charactes.

\. : matches a literal dot
\$ : matches a dollar sign
\^ : mathces a caret `^`.

(?:[.%_+]) non capturing group

#####

[abc] a,b or c
[^abc] any character except a,b,c
[a-z] a to z
[A - Z] A to Z
[a-zA-Z] a to z , A to Z
[0-9] 0 to 9

#### quntifiers

[ ]? occurs 0 or 1 time,
[ ]+ occ 1 or more imes
[ ]* occ 0 or more times
[ ]{n} occ n times
[ ]{n} occur n or more times
[ ]{y,z} occ atleast y times but less then z times

### metacharacters

\d [ 0 -9]
\D [^0-9]
\w [a-zA-Z_0-9]
\W [^\w]

#### Summary of Regex Methods

test(): Checks if a string matches the regex.
exec(): Extracts matches into an array.
match(): Retrieves matches in a string.
matchAll(): Iterates over all matches, including groups.
replace(): Replaces matched patterns with another string.
replaceAll(): Replaces all matched patterns.
search(): Finds the index of the first match.
split(): Splits a string into an array using regex.



test(): Checks if a string matches the regex.

const regex = /^[a-zA-Z0-9]+$/;
const result = regex.test('abc123'); // true

exec(): Extracts matches into an array.

const regex = /(\d+)/;
const result = regex.exec('Price: 100 dollars'); // ["100", "100"]

match(): Retrieves matches in a string.

const str = 'The year is 2024.';
const result = str.match(/\d+/); // ["2024"]

matchAll(): Iterates over all matches, including groups.

const str = 'abc 123 def 456';
const regex = /\d+/g;
const matches = str.matchAll(regex);

for (const match of matches) {
console.log(match); // ["123"], ["456"]
}

replace(): Replaces matched patterns with another string.

const str = 'Hello World!';
const result = str.replace(/World/, 'JavaScript'); // "Hello JavaScript!"

replaceAll(): Replaces all matched patterns.

const str = 'Hello World! World is great!';
const result = str.replaceAll('World', 'JavaScript'); // "Hello JavaScript! JavaScript is great!"

search(): Finds the index of the first match.

const str = 'Find the number 42.';
const result = str.search(/\d+/); // 16 (index of "42")

split(): Splits a string into an array using regex.

const str = 'apple, banana, cherry';
const result = str.split(/,\s\*/); // ["apple", "banana", "cherry"]

These methods are fundamental tools when working with regular expressions in JavaScript, allowing for powerful and flexible string manipulation.
