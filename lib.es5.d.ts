declare interface Array<T> {
	count : number;

	add(item : T) : void

	addRange(items : Array<T>) : void

	aggregate<TSeed>(seed : TSeed, accumulator : (seed : TSeed, item : T) => TSeed) : TSeed

	all(match : (item : T) => boolean) : boolean

	any() : boolean

	any(match : (item : T) => boolean) : boolean

	asEnumerable() : Generator<T, T, unknown>

	clear() : void

	contains(item : T) : boolean

	exists(match : (item : T) => boolean) : boolean

	findAll(match : (item : T) => boolean) : Array<T>

	findLast(match : (item : T) => boolean) : T

	first() : T

	first(match : (item : T) => boolean) : T

	firstOrDefault() : T | null

	firstOrDefault(match : (item : T) => boolean) : T | null

	getRange(start : number, count : number) : Array<T>

	groupBy<TKey>(keySelector : (item : T) => TKey) : Generator<KeyedArray<T, TKey>, KeyedArray<T, TKey>, unknown>

	insert(index : number, item : T) : void

	last() : T

	last(match : (item : T) => boolean) : T

	lastOrDefault() : T | null

	lastOrDefault(match : (item : T) => boolean) : T | null

	orderBy<TKey>(selector : (item : T) => TKey) : Array<T>

	orderByDescending<TKey>(selector : (item : T) => TKey) : Array<T>

	remove(item : T) : boolean

	removeAll(match : (item : T) => boolean) : void

	removeAt(index : number) : T | undefined

	select<TReturn>(selector : (item : T) => TReturn) : Generator<TReturn, TReturn, unknown>

	select<TReturn>(selector : (item : T, index : number) => TReturn) : Generator<TReturn, TReturn, unknown>

	selectMany<TReturn>(selector : (item : T, index? : Number) => Array<TReturn>) : Generator<TReturn, TReturn, unknown>

	toArray() : Array<T>

	toDictionary<TKey, TValue>(keySelector : (item : T) => TKey, valueSelector : (item : T) => TValue) : Map<TKey, TValue>

	where(match : (item : T) => boolean) : Generator<T, T, unknown>

	where(match : (item : T, index : number) => boolean) : Generator<T, T, unknown>
}

declare interface KeyedArray<T, TKey> extends Array<T> {
	key : TKey;
}

// @ts-ignore
declare interface Generator<T = unknown, TReturn = any, TNext = unknown> extends Iterator<T, TReturn, TNext> {

	aggregate<TSeed, TReturn>(seed : TSeed, accumulate : (seed : TSeed, item : T) => TReturn) : TReturn

	all(match : (item : T) => boolean) : boolean

	any() : boolean

	any(match : (item : T) => boolean) : boolean

	count() : number

	count(match : (item : T) => boolean) : number

	concat(source : Array<T>) : Generator<T, T, TNext>

	distinct() : Generator<T, T, TNext>

	distinct(comparer : (left : T, right : T) => boolean) : Generator<T, T, TNext>

	distinctBy<TKey>(selector : (item : T) => TKey) : Generator<T, T, TNext>

	distinctBy<TKey>(selector : (item : T) => TKey, comparer : (left : T, right : T) => boolean) : Generator<T, T, TNext>

	first() : T

	first(match? : (item : T) => boolean) : T

	firstOrDefault() : T | null

	firstOrDefault(match : (item : T) => boolean) : T | null

	forEach(action : (item : T) => void) : void;

	groupBy<TKey>(keySelector : (item : T) => TKey) : Generator<KeyedArray<T, TKey>, KeyedArray<T, TKey>, TNext>

	last() : T

	last(match : (item : T) => boolean) : T

	lastOrDefault() : T | null

	lastOrDefault(match : (item : T) => boolean) : T | null

	reverse() : Generator<T, T, TNext>

	select<TReturn>(selector : (item : T) => TReturn) : Generator<TReturn, TReturn, unknown>

	select<TReturn>(selector : (item : T, index : number) => TReturn) : Generator<TReturn, TReturn, unknown>

	selectMany<TReturn>(selector : (item : T) => Array<TReturn>) : Generator<TReturn, TReturn, unknown>

	take(count : number) : Generator<T, TReturn, TNext>

	take(range : [start : number, end : number]) : Generator<T, TReturn, TNext>

	takeLast(count : number) : Generator<T, TReturn, TNext>

	takeWhile(match : (item : T) => boolean) : Generator<T, TReturn, TNext>

	takeWhile(match : (item : T, index : number) => boolean) : Generator<T, TReturn, TNext>

	toArray() : Array<T>

	where(match : (item : T) => boolean) : Generator<T, TReturn, TNext>
}

declare interface KeyValuePair<TKey, TValue> {
	key : TKey;
	value : TValue;
}

declare interface Map<TKey, TValue> {
	containsKey(key : TKey) : boolean

	containsValue(value : TValue) : boolean

	tryAdd(key : TKey, value : TValue) : boolean

	tryGetValue(key : TKey, valueGetter : (value : TValue) => void) : boolean
}
