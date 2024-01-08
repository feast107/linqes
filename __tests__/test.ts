import '../types/index'


const list = new List<number>()
const enumerable : IEnumerable<number> = list;

const ie : IEnumerable<any> = new Array<number>();

for(const item of enumerable){

}

const iter = enumerable[Symbol.iterator]
