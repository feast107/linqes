declare interface Array<T> {
	add(item : T) : void;

	addRange(items : Array<T>) : void;

	aggregate<TSeed>(seed : TSeed, accumulator : (seed : TSeed, item : T) => TSeed) : TSeed;

	all(predicate : (item : T) => boolean) : boolean;

	any(predicate : (item : T) => boolean) : boolean;

	clear() : void;

	contains(item : T) : boolean;

	insert(index : number, item : T) : void;

	remove(item : T) : boolean;

	removeAt(index : number) : T | undefined;

	removeAll(predicate : (item : T) => boolean) : void;

	select<TReturn>(selector : (item : T, index? : Number) => TReturn) : Generator<TReturn, TReturn, unknown>;

	where(predicate : (item : T, index? : Number) => boolean) : Generator<T, T, unknown>;

	// @ts-ignore
	toDictionary<TKey, TValue>(keySelector : (item : T) => TKey, valueSelector : (item : T) => TValue) : Map<TKey, TValue>
}

// @ts-ignore
declare interface Generator<T = unknown, TReturn = any, TNext = unknown> extends Iterator<T, TReturn, TNext> {
	toArray() : Array<T>;

	select<TReturn>(selector : (item : T) => TReturn) : Generator<TReturn, TReturn, unknown>;

	where(predicate : (item : T) => boolean) : Generator<T, TReturn, unknown>;

	firstOrDefault(predicate? : (item : T) => boolean) : T | null

	first(predicate? : (item : T) => boolean) : T
}

