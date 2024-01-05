declare interface Array<T> {
	add(item : T) : void;

	addRange(items : Array<T>) : void;

	aggregate<TSeed>(seed : TSeed, accumulator : (seed : TSeed, item : T) => TSeed) : TSeed;

	all(match : (item : T) => boolean) : boolean;

	any(match? : (item : T) => boolean) : boolean;

	clear() : void;

	contains(item : T) : boolean;

	groupBy<TKey>(keySelector : (item : T) => TKey) : Generator<KeyedArray<T, TKey>, KeyedArray<T, TKey>, unknown>;

	insert(index : number, item : T) : void;

	orderBy<TKey>(selector : (item : T) => TKey) : Array<T>

	orderByDescending<TKey>(selector : (item : T) => TKey) : Array<T>

	remove(item : T) : boolean;

	removeAll(match : (item : T) => boolean) : void;

	removeAt(index : number) : T | undefined;

	select<TReturn>(selector : (item : T, index? : Number) => TReturn) : Generator<TReturn, TReturn, unknown>;

	selectMany<TReturn>(selector : (item : T, index? : Number) => Array<TReturn>) : Generator<TReturn, TReturn, unknown>;

	toDictionary<TKey, TValue>(keySelector : (item : T) => TKey, valueSelector : (item : T) => TValue) : Map<TKey, TValue>

	where(match : (item : T, index? : Number) => boolean) : Generator<T, T, unknown>;
}

declare interface KeyedArray<T, TKey> extends Array<T> {
	key : TKey;
}

// @ts-ignore
declare interface Generator<T = unknown, TReturn = any, TNext = unknown> extends Iterator<T, TReturn, TNext> {

	any(match? : (item : T) => boolean) : T

	all(match : (item : T) => boolean) : T

	first(match? : (item : T) => boolean) : T

	firstOrDefault(match? : (item : T) => boolean) : T | null

	forEach(action : (item : T) => void) : void;

	groupBy<TKey>(keySelector : (item : T) => TKey) : Generator<KeyedArray<T, TKey>, KeyedArray<T, TKey>, unknown>;

	select<TReturn>(selector : (item : T) => TReturn) : Generator<TReturn, TReturn, unknown>;

	selectMany<TReturn>(selector : (item : T) => Array<TReturn>) : Generator<TReturn, TReturn, unknown>;

	toArray() : Array<T>;

	where(match : (item : T) => boolean) : Generator<T, TReturn, unknown>;
}

declare interface Map<TKey, TValue> {
	containsKey(key : TKey) : boolean;

	containsValue(value : TValue) : boolean;

	tryAdd(key : TKey, value : TValue) : boolean;

	tryGetValue(key : TKey, valueGetter : (value : TValue) => void) : boolean;
}
