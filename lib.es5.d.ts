// @ts-ignore
declare interface Generator<T = unknown, TReturn = any, TNext = unknown> extends Iterator<T, TReturn, TNext> {

	aggregate<TSeed, TReturn>(seed : TSeed, accumulate : (seed : TSeed, item : T) => TReturn) : TReturn

	all(match : (item : T) => boolean) : boolean

	any(match? : (item : T) => boolean) : boolean

	append(element : T) : Generator<T, T, TNext>

	chunk(size : number) : Generator<Array<T>, Array<T>, unknown>

	concat(source : Array<T>) : Generator<T, T, TNext>

	contains(value : T, comparer? : (left : T, right : T) => boolean) : boolean

	count(match? : (item : T) => boolean) : number

	distinct(comparer? : (left : T, right : T) => boolean) : Generator<T, T, TNext>

	distinctBy<TKey>(selector : (item : T) => TKey, comparer? : (left : T, right : T) => boolean) : Generator<T, T, TNext>

	elementAt(index : number) : T

	elementAtOrDefault(index : number) : T | null

	except(source : Array<T>, comparer? : (left : T, right : T) => boolean) : Generator<T, T, TNext>

	exceptBy<TKey>(source : Array<T>, keySelector : (item : T) => TKey, comparer? : (left : T, right : T) => boolean) : Generator<T, T, TNext>

	first(match? : (item : T) => boolean) : T

	firstOrDefault(match? : (item : T) => boolean) : T | null

	forEach(action : (item : T) => void) : void;

	groupBy<TKey>(keySelector : (item : T) => TKey) : Generator<KeyedArray<T, TKey>, KeyedArray<T, TKey>, TNext>

	last(match? : (item : T) => boolean) : T

	lastOrDefault(match? : (item : T) => boolean) : T | null

	prepend(element : T) : Generator<T, T, TNext>

	reverse() : Generator<T, T, TNext>

	select<TReturn>(selector : ((item : T) => TReturn) | ((item : T, index : number) => TReturn)) : Generator<TReturn, TReturn, unknown>

	selectMany<TReturn>(selector : (item : T) => Array<TReturn>) : Generator<TReturn, TReturn, unknown>

	single(match? : (item : T) => boolean) : T

	singleOrDefault(match? : (item : T) => boolean) : T | null

	skip(count : number) : Generator<T, TReturn, TNext>

	skipLast(count : number) : Generator<T, TReturn, TNext>

	skipWhile(match : (item : T) => boolean) : Generator<T, TReturn, TNext>

	take(countOrRange : number | [start : number, end : number]) : Generator<T, TReturn, TNext>

	takeLast(count : number) : Generator<T, TReturn, TNext>

	takeWhile(match : ((item : T) => boolean) | ((item : T, index : number) => boolean)) : Generator<T, TReturn, TNext>

	toArray() : Array<T>

	union(source : Array<T>, comparer? : (left : T, right : T) => boolean) : Generator<T, TReturn, TNext>

	unionBy<TKey>(source : Array<T>, keySelector : (item : T) => TKey, comparer? : (left : T, right : T) => boolean) : Generator<T, TReturn, TNext>

	where(match : ((item : T) => boolean) | ((item : T, index : number) => boolean)) : Generator<T, TReturn, TNext>
}


declare interface Array<T> {
	count : number;

	add(item : T) : void

	addRange(items : Array<T>) : void

	aggregate<TSeed>(seed : TSeed, accumulator : (seed : TSeed, item : T) => TSeed) : TSeed

	all(match : (item : T) => boolean) : boolean

	any(match? : (item : T) => boolean) : boolean

	append(element : T) : Generator<T, T, unknown>

	asEnumerable() : Generator<T, T, unknown>

	chunk(size : number) : Generator<Array<T>, Array<T>, unknown>

	clear() : void

	contains(item : T) : boolean

	distinct(comparer? : (left : T, right : T) => boolean) : Generator<T, T, unknown>

	distinctBy<TKey>(selector : (item : T) => TKey, comparer? : (left : T, right : T) => boolean) : Generator<T, T, unknown>

	elementAt(index : number) : T

	elementAtOrDefault(index : number) : T | null

	except(source : Array<T>, comparer? : (left : T, right : T) => boolean) : Generator<T, T, unknown>

	exceptBy<TKey>(source : Array<T>, keySelector : (item : T) => TKey, comparer? : (left : T, right : T) => boolean) : Generator<T, T, unknown>

	exists(match : (item : T) => boolean) : boolean

	findAll(match : (item : T) => boolean) : Array<T>

	first(match? : (item : T) => boolean) : T

	firstOrDefault(match? : (item : T) => boolean) : T | null

	getRange(start : number, count : number) : Array<T>

	groupBy<TKey>(keySelector : (item : T) => TKey) : Generator<KeyedArray<T, TKey>, KeyedArray<T, TKey>, unknown>

	insert(index : number, item : T) : void

	last(match? : (item : T) => boolean) : T

	lastOrDefault(match? : (item : T) => boolean) : T | null

	orderBy<TKey>(selector : (item : T) => TKey) : Array<T>

	orderByDescending<TKey>(selector : (item : T) => TKey) : Array<T>

	prepend(element : T) : Generator<T, T, unknown>

	remove(item : T) : boolean

	removeAll(match : (item : T) => boolean) : void

	removeAt(index : number) : T | undefined

	select<TReturn>(selector : ((item : T) => TReturn) | ((item : T, index : number) => TReturn)) : Generator<TReturn, TReturn, unknown>

	selectMany<TReturn>(selector : (item : T, index? : Number) => Array<TReturn>) : Generator<TReturn, TReturn, unknown>

	single(match? : (item : T) => boolean) : T

	singleOrDefault(match? : (item : T) => boolean) : T | null

	skip(count : number) : Generator<T, T, unknown>

	skipLast(count : number) : Generator<T, T, unknown>

	skipWhile(match : (item : T) => boolean) : Generator<T, T, unknown>

	take(countOrRange : number | [start : number, end : number]) : Generator<T, T, unknown>

	takeLast(count : number) : Generator<T, T, unknown>

	takeWhile(match : ((item : T) => boolean) | ((item : T, index : number) => boolean)) : Generator<T, T, unknown>

	toArray() : Array<T>

	toDictionary<TKey, TValue>(keySelector : (item : T) => TKey, valueSelector : (item : T) => TValue) : Map<TKey, TValue>

	union(source : Array<T>, comparer? : (left : T, right : T) => boolean) : Generator<T, T, unknown>

	unionBy<TKey>(source : Array<T>, keySelector : (item : T) => TKey, comparer? : (left : T, right : T) => boolean) : Generator<T, T, unknown>

	where(match : ((item : T) => boolean) | ((item : T, index : number) => boolean)) : Generator<T, T, unknown>
}

declare interface KeyedArray<T, TKey> extends Array<T> {
	key : TKey;
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
