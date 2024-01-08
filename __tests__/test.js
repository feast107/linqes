import '../types/index';
const list = new List();
const enumerable = list;
for (const item of enumerable) {
}
const iter = enumerable[Symbol.iterator];
