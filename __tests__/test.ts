import '../types/index'


let enumerable : IEnumerable<number>;

enumerable = new Array<number>();

let str : IEnumerable<string>;

str = '';

(enumerable as ConcatArray<number>)
