import {IEnumerable} from "../interfaces/IEnumerable";
import {KeyedArray} from "../KeyedArray";

class EmptyGenerator<T> implements Generator<T> {
	[Symbol.iterator]() : Generator<T, T, T> {
		return undefined;
	}

	next(...args : [] | [unknown]) : IteratorResult<T, T>;
	next(...args : [] | [unknown]) : IteratorResult<T, T>;
	next(...args : [] | [unknown]) : IteratorResult<T, T> {
		return undefined;
	}

	return(value : any) : IteratorResult<T, T> {
		return undefined;
	}

	throw(e : any) : IteratorResult<T, T> {
		return undefined;
	}

}

export class Enumerable<T> extends EmptyGenerator<T> implements IEnumerable<T> {
	aggregate<TSeed, TReturn>(seed : TSeed, accumulator : (seed : TSeed, item : T) => TReturn) : TReturn {
		let tmp : TSeed | TReturn = seed;
		for (const item of this) tmp = accumulator(seed, item)
		return tmp as TReturn;
	}

	all(predicate : (item : T) => boolean) : boolean {
		for (const item of this) if (!predicate(item)) return false;
		return true;
	}

	any() : boolean;
	any(predicate : (item : T) => boolean) : boolean;
	any(predicate? : (item : T) => boolean) : boolean {
		return this.firstOrDefault(predicate) !== null;
	}

	// @ts-ignore
	* append(element : T) : IEnumerable<T> {
		for (const item of this) yield item
		yield element
	}

	asEnumerable() : IEnumerable<T> {
		return this;
	}

	// @ts-ignore
	* chunk(size : number) : IEnumerable<Array<T>> {
		let chunk = new Array<T>()
		for (const item of this) {
			if (chunk.length === size) {
				yield chunk
				chunk = []
			}
			chunk.push(item)
		}
		yield chunk
	}

	// @ts-ignore
	* concat(source : IEnumerable<T>) : IEnumerable<T> {
		for (const item of this) yield item
		// @ts-ignore
		for (const item of source) yield item
	}

	contains(value : T) : boolean;
	contains(value : T, comparer? : (left : T, right : T) => boolean) : boolean;
	contains(value : T, comparer? : (left : T, right : T) => boolean) : boolean {
		comparer ??= Object.is;
		for (const item of this) if (comparer(value, item)) return true;
		return false
	}

	count() : number;
	count(predicate : (item : T) => boolean) : number;
	count(predicate? : (item : T) => boolean) : number {
		predicate ??= () => true;
		let count = 0;
		for (const item of this) if (predicate(item)) count++;
		return count;
	}

	distinct() : IEnumerable<T>;
	distinct(comparer : (left : T, right : T) => boolean) : IEnumerable<T>;
	//@ts-ignore
	* distinct(comparer? : (left : T, right : T) => boolean) : IEnumerable<T> {
		comparer ??= Object.is;
		const stack = []
		for (const item of this) {
			if (stack.findIndex((x : any) => comparer(x, item)) < 0) {
				stack.push(item)
			}
		}
		for (const item of stack) yield item
	}

	distinctBy<TKey>(keySelector : (item : T) => TKey) : IEnumerable<T>;
	//@ts-ignore
	* distinctBy<TKey>(keySelector : (item : T) => TKey, comparer? : (left : TKey, right : TKey) => boolean) : IEnumerable<T> {
		comparer ??= Object.is;
		const stack = []
		for (const item of this) {
			if (stack.findIndex((x : any) => comparer(keySelector(x), keySelector(item))) < 0) {
				stack.push(item)
			}
		}
		for (const item of stack) yield item
	}

	elementAt(index : number) : T {
		const ret = this.elementAtOrDefault(index);
		if (ret == null) throw 'Yield no result'
		return ret;
	}

	elementAtOrDefault(index : number) : T | null {
		for (const item of this) {
			if (index === 0) return item;
			index--;
		}
		return null;
	}

	except(source : Array<T> | IEnumerable<T>) : IEnumerable<T>;
	except(source : Array<T> | IEnumerable<T>, comparer? : (left : T, right : T) => boolean) : IEnumerable<T>;
	//@ts-ignore
	* except(source : Array<T> | IEnumerable<T>, comparer? : (left : T, right : T) => boolean) : IEnumerable<T> {
		comparer ??= Object.is
		const compares = []
		for (const item of source) {
			compares.push(item)
		}
		for (const item of this) {
			if (compares.findIndex((x : any) => comparer(x, item)) < 0) {
				yield item
				compares.push(item)
			}
		}
	}

	exceptBy<TKey>(source : Array<T> | IEnumerable<T>, keySelector : (item : T) => TKey) : IEnumerable<T>;
	//@ts-ignore
	* exceptBy<TKey>(source : Array<T> | IEnumerable<T>, keySelector : (item : T) => TKey, comparer? : (left : TKey, right : TKey) => boolean) : IEnumerable<T> {
		comparer ??= Object.is
		const compares = []
		for (const item of source) {
			compares.push(item)
		}
		for (const item of this) {
			if (compares.findIndex(x => comparer(keySelector(x), keySelector(item))) < 0) {
				yield item
				compares.push(item)
			}
		}
	}


	first() : T;
	first(predicate : (item : T) => boolean) : T;
	first(predicate? : (item : T) => boolean) : T {
		const ret = this.firstOrDefault(predicate);
		if (ret == null) throw 'Yield no result'
		return ret;
	}

	firstOrDefault() : T | null;
	firstOrDefault(defaultValue : T) : T | null;
	firstOrDefault(predicate : (item : T) => boolean) : T | null;
	firstOrDefault(predicate : (item : T) => boolean, defaultValue : T) : T | null;
	firstOrDefault(predicate? : T | ((item : T) => boolean), defaultValue? : T) : T | null {
		predicate ??= () => true;
		if (typeof (predicate) != 'function') {
			defaultValue = predicate;
			predicate = () => true;
		}
		for (const item of this) if ((predicate as (item? : T) => boolean)(item)) return item;
		return defaultValue;
	}

	//@ts-ignore
	* groupBy<TKey>(keySelector : (item : T) => TKey) : IEnumerable<KeyedArray<T, TKey>> {
		let map = new Map();
		for (const item of this) {
			const key = keySelector(item);
			let cache = map.get(key);
			if (cache === undefined) {
				cache = [];
				cache.key = key;
				map.set(key, cache)
			}
			cache.push(item)
		}
		for (let value of map.values()) yield value
	}

	last() : T;
	last(predicate : (item : T) => boolean) : T;
	last(predicate? : (item : T) => boolean) : T {
		const ret = this.lastOrDefault(predicate)
		if (ret == null) throw 'Yield no result'
		return ret;
	}

	lastOrDefault() : T | null;
	lastOrDefault(defaultValue : T) : T | null;
	lastOrDefault(predicate : (item : T) => boolean) : T | null;
	lastOrDefault(predicate : (item : T) => boolean, defaultValue : T) : T | null;
	lastOrDefault(predicate? : T | ((item : T) => boolean), defaultValue? : T) : T | null {
		predicate ??= () => true;
		if (typeof (predicate) != 'function') {
			defaultValue = predicate;
			predicate = () => true;
		}
		let last = defaultValue;
		for (const item of this) {
			if ((predicate as (item? : T) => boolean)(item)) last = item;
		}
		return last;
	}

	order() : IEnumerable<T>;
	order(comparer : (current : T, exist : T) => number) : IEnumerable<T>;
	// @ts-ignore
	* order(comparer? : (current : T, exist : T) => number) : IEnumerable<T> {
		comparer ??= (left, right) => left as any - (right as any)
		const stack = []
		for (const item of this) {
			const index = stack.findIndex((x : any) => comparer(item, x) <= 0)
			if (index < 0) {
				stack.push(item)
			} else {
				stack.splice(index, 0, item)
			}
		}
	}

	orderBy<TKey>(keySelector : (item : T) => TKey) : IEnumerable<T>;
	orderBy<TKey>(keySelector : (item : T) => TKey, comparer : (current : TKey, exist : TKey) => number) : IEnumerable<T>;
	// @ts-ignore
	* orderBy<TKey>(keySelector : (item : T) => TKey, comparer? : (current : TKey, exist : TKey) => number) : IEnumerable<T> {
		comparer ??= (left, right) => left as any - (right as any)
		const stack = []
		for (const item of this) {
			const index = stack.findIndex(x => comparer(keySelector(item), keySelector(x)) <= 0)
			if (index < 0) {
				stack.push(item)
			} else {
				stack.splice(index, 0, item)
			}
		}
		for (const item of stack) yield item
	}

	orderByDescending<TKey>(keySelector : (item : T) => TKey) : IEnumerable<T>;
	orderByDescending<TKey>(keySelector : (item : T) => TKey, comparer : (current : TKey, exist : TKey) => number) : IEnumerable<T>;
	// @ts-ignore
	* orderByDescending<TKey>(keySelector : (item : T) => TKey, comparer? : (current : TKey, exist : TKey) => number) : IEnumerable<T> {
		comparer ??= (left, right) => left as any - (right as any)
		const stack = []
		for (const item of this) {
			const index = stack.findIndex(x => comparer(keySelector(item), keySelector(x)) >= 0)
			if (index < 0) {
				stack.push(item)
			} else {
				stack.splice(index, 0, item)
			}
		}
		for (const item of stack) yield item
	}

	orderDescending() : IEnumerable<T>;
	orderDescending(comparer : (current : T, exist : T) => number) : IEnumerable<T>;
	// @ts-ignore
	* orderDescending(comparer? : (current : T, exist : T) => number) : IEnumerable<T> {
		comparer ??= (left, right) => left as any - (right as any)
		const stack = []
		for (const item of this) {
			const index = stack.findIndex(x => comparer(item, x) >= 0)
			if (index < 0) {
				stack.push(item)
			} else {
				stack.splice(index, 0, item)
			}
		}
		for (const item of stack) yield item
	}

	// @ts-ignore
	* prepend(element : T) : IEnumerable<T> {
		yield element;
		for (const item of this) yield item
	}

	// @ts-ignore
	* reverse() : IEnumerable<T> {
		const arr = []
		for (const item of this) {
			arr.push(item)
		}
		while (arr.length > 0) {
			yield arr.pop()
		}
	}

	// @ts-ignore
	* select<TReturn>(selector : ((item : T) => TReturn) | ((item : T, index : number) => TReturn)) : IEnumerable<TReturn> {
		let index = 0
		for (const item of this) {
			yield selector(item, index++)
		}
	}

	// @ts-ignore
	* selectMany<TReturn>(selector : (item : T) => IEnumerable<TReturn>) : IEnumerable<TReturn> {
		for (const item of this) {
			for (let sub of selector(item)) {
				yield sub
			}
		}
	}

	single() : T;
	single(predicate : (item : T) => boolean) : T;
	single(predicate? : (item : T) => boolean) : T {
		const ret = this.singleOrDefault(predicate)
		if (ret == null) throw 'Yield no result'
		return ret;
	}

	singleOrDefault() : T | null;
	singleOrDefault(defaultValue : T) : T | null;
	singleOrDefault(predicate : (item : T) => boolean) : T | null;
	singleOrDefault(predicate : (item : T) => boolean, defaultValue : T) : T | null;
	singleOrDefault(predicate? : T | ((item : T) => boolean), defaultValue? : T) : T | null {
		predicate ??= () => true
		if (typeof (predicate) != 'function') {
			defaultValue = predicate;
			predicate = () => true;
		}
		let single = defaultValue
		for (const item of this) {
			if ((predicate as (item? : T) => boolean)(item)) {
				if (single != null) throw 'Duplicate item of single'
				single = item;
			}
		}
		return single
	}

	// @ts-ignore
	* skip(count : number) : IEnumerable<T> {
		for (const item of this) {
			count--;
			if (count < 0) {
				yield item
			}
		}
	}

	// @ts-ignore
	* skipLast(count : number) : IEnumerable<T> {
		const stack = []
		for (const item of this) {
			stack.push(item)
			if (stack.length > count) {
				yield stack.shift()
			}
		}
	}

	// @ts-ignore
	* skipWhile(predicate : (item : T) => boolean) : IEnumerable<T> {
		let start = false
		for (const item of this) {
			if (start) yield item
			else if (predicate(item)) start = true;
		}
	}

	take(count : number) : IEnumerable<T>;
	take(range : [start : number, end : number]) : IEnumerable<T>;
	// @ts-ignore
	* take(count : number | [start : number, end : number]) : IEnumerable<T> {
		const start = Number.isInteger(count) ? 0 : count[0]
		const num = Number.isInteger(count) ? count : count[1] > 0 ? count[1] - start : count[1];
		let begin = 0;
		let accumulate = 0;
		if (num > 0) {
			for (const item of this) {
				if (begin >= start) {
					if (accumulate < num) {
						yield item
						accumulate++;
					}
					if (accumulate >= num) return
				}
				begin++;
			}

			throw 'Not satisfied'

		} else {
			let queue = []
			for (const item of this) {
				if (begin >= start) {
					queue.push(item)
					if (queue.length >= -num) {
						yield queue.shift()
					}
				}
				begin++;
			}
		}
	}

	// @ts-ignore
	* takeLast(count : number) : IEnumerable<T> {
		const stack = []
		for (const item of this) {
			stack.push(item)
			if (stack.length > count) {
				stack.shift()
			}
		}
		for (const item of stack) {
			yield item
		}
	}

	// @ts-ignore
	* takeWhile(predicate : ((item : T) => boolean) | ((item : T, index : number) => boolean)) : IEnumerable<T> {
		let index = 0;
		for (const item of this) {
			if (!predicate(item, index)) return;
			yield item
			index++;
		}
	}

	toArray() : Array<T> {
		const ret = [];
		for (const item of this) {
			ret.push(item)
		}
		return ret
	}

	toDictionary<K, V>(keySelector : (item : T) => K, valueSelector : (item : T) => V) : Map<K, V> {
		let map = new Map();
		for (const item of this) {
			const key = keySelector(item)
			const value = valueSelector(item)
			if (map.has(key)) throw 'Duplicate dictionary key'
			map.set(key, value)
		}
		return map;
	}

	// @ts-ignore
	* union(source : Array<T>, comparer? : (left : T, right : T) => boolean) : IEnumerable<T> {
		comparer ??= Object.is
		const union = []
		for (const item of this) {
			if (union.findIndex(x => comparer(x, item)) < 0) {
				union.push(item)
			}
		}
		for (const item of source) {
			if (union.findIndex(x => comparer(x, item)) < 0) {
				union.push(item)
			}
		}
		for (const item of union) {
			yield item
		}
	}

	// @ts-ignore
	* unionBy<TKey>(source : Array<T>, keySelector : (item : T) => TKey, comparer? : (left : TKey, right : TKey) => boolean) : IEnumerable<T> {
		comparer ??= Object.is
		const union = []
		for (const item of this) {
			if (union.findIndex(x => comparer(keySelector(x), keySelector(item))) < 0) {
				union.push(item)
			}
		}
		for (const item of source) {
			if (union.findIndex(x => comparer(keySelector(x), keySelector(item))) < 0) {
				union.push(item)
			}
		}
		for (const item of union) {
			yield item
		}
	}

	// @ts-ignore
	* where(predicate : ((item : T) => boolean) | ((item : T, index : number) => boolean)) : IEnumerable<T> {
		let count = 0
		for (const item of this) {
			if (predicate(item, count++)) yield item
		}
	}
}
