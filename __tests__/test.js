import '../types/index';
let enumerable = new List();
enumerable = enumerable
    .where(x => x > 3)
    .append(1)
    .concat([1, 2, 3, 4])
    .prepend(3)
    .select(x => x * 2)
    .reverse()
    .chunk(3)
    .selectMany(x => x);
const list = enumerable.toArray();
for (const item of enumerable) {
    console.log(item);
}
let chars = 'This is a string';
chars.select(x => x + ' ').toArray();
