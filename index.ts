// MIT License
//
// Copyright (c) 2023 Feast
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

declare interface Generator<T> {

	/**
	 * Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value.
	 * @param seed The initial accumulator value.
	 * @param accumulator An accumulator function to be invoked on each element.
	 */
	aggregate<TSeed, TReturn>(
		seed : TSeed,
		accumulator : (seed : TSeed, item : T) => TReturn) : TReturn;

	/**
	 * Determines whether all elements of a sequence satisfy a condition.
	 * @param predicate
	 */
	all(predicate : (item : T) => boolean) : boolean;

	/**
	 * Determines whether a sequence contains any elements.
	 */
	any() : boolean;

	/**
	 * Determines whether any element of a sequence satisfies a condition.
	 * @param predicate A function to test each element for a condition.
	 */
	any(predicate : (item : T) => boolean) : boolean;

	/**
	 * Appends a value to the end of the sequence.
	 * @param element The value to append to
	 */
	append(element : T) : IEnumerable<T>;

	/**
	 * Returns the input typed as enumerable.
	 */
	asEnumerable() : IEnumerable<T>;

	/**
	 * Splits the elements of a sequence into chunks of size at most
	 * @param size The maximum size of each chunk.
	 */
	chunk(size : number) : IEnumerable<Array<T>>;

	/**
	 * Concatenates two sequences.
	 * @param source The sequence to concatenate to the current.
	 */
	concat(source : IEnumerable<T>) : IEnumerable<T>;

	/**
	 * Determines whether a sequence contains a specified element by using the default equality comparer.
	 * @param value The value to locate in the sequence.
	 */
	contains(value : T) : boolean;

	/**
	 * Determines whether a sequence contains a specified element by using a specified comparer.
	 * @param value The value to locate in the sequence.
	 * @param comparer An equality comparer to compare values.
	 */
	contains(
		value : T,
		comparer? : (left : T, right : T) => boolean) : boolean;

	/**
	 * Returns the number of elements in a sequence.
	 */
	count() : number;

	/**
	 * Returns a number that represents how many elements in the specified sequence satisfy a condition.
	 * @param predicate A function to test each element for a condition.
	 */
	count(predicate : (item : T) => boolean) : number;

	/**
	 * Returns distinct elements from a sequence by using the default equality comparer to compare values.
	 */
	distinct() : IEnumerable<T>;

	/**
	 * Returns distinct elements from a sequence by using a specified comparer to compare values.
	 * @param comparer An comparer to compare values.
	 */
	distinct(comparer : (left : T, right : T) => boolean) : IEnumerable<T>;

	/**
	 * Returns distinct elements from a sequence according to a specified key selector function.
	 * @param keySelector A function to extract the key for each element.
	 */
	distinctBy<TKey>(keySelector : (item : T) => TKey) : IEnumerable<T>;

	/**
	 * Returns distinct elements from a sequence according to a specified key selector function and using a specified
	 * comparer to compare keys.
	 * @param keySelector A function to extract the key for each element.
	 * @param comparer An comparer to compare keys.
	 */
	distinctBy<TKey>(
		keySelector : (item : T) => TKey,
		comparer? : (left : TKey, right : TKey) => boolean) : IEnumerable<T>;

	/**
	 * Returns the element at a specified index in a sequence.
	 * @param index The zero-based index of the element to retrieve.
	 */
	elementAt(index : number) : T;

	/**
	 * Returns the element at a specified index in a sequence.
	 * @param index The index of the element to retrieve, which is either from the beginning or the end of the sequence.
	 */
	elementAtOrDefault(index : number) : T | null;

	/**
	 * Produces the set difference of two sequences by using the default equality comparer to compare values.
	 * @param source An array whose elements that also occur in the first sequence will cause those elements to be
	 * removed from the returned sequence.
	 */
	except(source : Array<T> | IEnumerable<T>) : IEnumerable<T>;

	/**
	 * Produces the set difference of two sequences by using the specified comparer to compare values.
	 * @param source An array whose elements that also occur in the first sequence will cause those elements to be
	 * removed from the returned sequence.
	 * @param comparer An comparer to compare values.
	 */
	except(
		source : Array<T> | IEnumerable<T>,
		comparer? : (left : T, right : T) => boolean) : IEnumerable<T>;

	/**
	 * Produces the set difference of two sequences according to a specified key selector function.
	 * @param source An source whose keys that also occur in the first sequence will cause those elements to be removed
	 * from the returned sequence.
	 * @param keySelector A function to extract the key for each element.
	 */
	exceptBy<TKey>(
		source : Array<T> | IEnumerable<T>,
		keySelector : (item : T) => TKey) : IEnumerable<T>;

	/**
	 * Produces the set difference of two sequences according to a specified key selector function.
	 * @param source An source whose keys that also occur in the first sequence will cause those elements to be removed
	 * from the returned sequence.
	 * @param keySelector A function to extract the key for each element.
	 * @param comparer The comparer to compare values.
	 */
	exceptBy<TKey>(
		source : Array<T> | IEnumerable<T>,
		keySelector : (item : T) => TKey,
		comparer? : (left : TKey, right : TKey) => boolean) : IEnumerable<T>;

	/**
	 * Returns the first element of a sequence.
	 */
	first() : T;

	/**
	 * Returns the first element in a sequence that satisfies a specified condition.
	 * @param predicate A function to test each element for a condition.
	 */
	first(predicate : (item : T) => boolean) : T;

	/**
	 * Returns the first element of a sequence, or a default value if the sequence contains no elements.
	 */
	firstOrDefault() : T | null;

	/**
	 * Returns the first element of a sequence, or a specified default value if the sequence contains no elements.
	 * @param defaultValue The default value to return if the sequence is empty.
	 */
	firstOrDefault(defaultValue : T) : T | null;

	/**
	 * Returns the first element of a sequence, or a default value if the sequence contains no elements.
	 * @param predicate A function to test each element for a condition.
	 */
	firstOrDefault(predicate : (item : T) => boolean) : T | null;

	/**
	 * Returns the first element of the sequence that satisfies a condition, or a specified default value if no such element is found.
	 * @param predicate A function to test each element for a condition.
	 * @param defaultValue The default value to return if the sequence is empty.
	 */
	firstOrDefault(
		predicate : (item : T) => boolean,
		defaultValue : T) : T | null;

	/**
	 * Groups the elements of a sequence according to a specified key selector function.
	 * @param keySelector A function to extract the key for each element.
	 */
	groupBy<TKey>(keySelector : (item : T) => TKey) : IEnumerable<Array<T> & { key : TKey }>;

	/**
	 * Groups the elements of a sequence according to a specified key selector function and compares the keys by using a specified comparer.
	 * @param keySelector A function to extract the key for each element.
	 * @param comparer An comparer to compare keys.
	 */
	groupBy<TKey>(
		keySelector : (item : T) => TKey,
		comparer : (left : TKey, right : TKey) => boolean) : IEnumerable<Array<T> & { key : TKey }>;

	/**
	 * Groups the elements of a sequence according to a specified key selector function and projects the elements for
	 * each group by using a specified function.
	 * @param keySelector A function to extract the key for each element.
	 * @param elementSelector A function to map each source element to an element in the source.
	 */
	groupBy<TKey, TElement>(
		keySelector : (item : T) => TKey,
		elementSelector : (item : T) => TElement) : IEnumerable<Array<TElement> & { key : TKey }>;

	/**
	 * Groups the elements of a sequence according to a key selector function. The keys are compared by using a comparer
	 * and each group's elements are projected by using a specified function.
	 * @param keySelector A function to extract the key for each element.
	 * @param elementSelector A function to map each source element to an element in the source.
	 * @param comparer An comparer to compare keys.
	 */
	groupBy<TKey, TElement>(
		keySelector : (item : T) => TKey,
		elementSelector : (item : T) => TElement,
		comparer : (left : TKey, right : TKey) => boolean) : IEnumerable<Array<TElement> & { key : TKey }>;

	/**
	 * Returns the last element of a sequence.
	 */
	last() : T;

	/**
	 * Returns the last element of a sequence that satisfies a specified condition.
	 * @param predicate A function to test each element for a condition.
	 */
	last(predicate : (item : T) => boolean) : T;

	/**
	 * Returns the last element of a sequence, or a default value if the sequence contains no elements.
	 */
	lastOrDefault() : T | null;

	/**
	 * Returns the last element of a sequence, or a specified default value if the sequence contains no elements.
	 * @param defaultValue The default value to return if the sequence is empty.
	 */
	lastOrDefault(defaultValue : T) : T | null;

	/**
	 * Returns the last element of a sequence that satisfies a condition or a default value if no such element is found.
	 * @param predicate A function to test each element for a condition.
	 */
	lastOrDefault(predicate : (item : T) => boolean) : T | null;

	/**
	 * Returns the last element of a sequence that satisfies a condition, or a specified default value if no such element is found.
	 * @param predicate A function to test each element for a condition.
	 * @param defaultValue The default value to return if the sequence is empty.
	 */
	lastOrDefault(
		predicate : (item : T) => boolean,
		defaultValue : T) : T | null;

	/**
	 * Sorts the elements of a sequence in ascending order.
	 */
	order() : IEnumerable<T>;

	/**
	 * Sorts the elements of a sequence in ascending order.
	 * @param comparer An comparer to compare keys.
	 */
	order(comparer : (current : T, exist : T) => number) : IEnumerable<T>;

	/**
	 * Sorts the elements of a sequence in ascending order according to a key.
	 * @param keySelector A function to extract a key from an element.
	 */
	orderBy<TKey>(keySelector : (item : T) => TKey) : IEnumerable<T>;

	/**
	 * Sorts the elements of a sequence in ascending order according to a key.
	 * @param keySelector A function to extract a key from an element.
	 * @param comparer An comparer to compare keys.
	 */
	orderBy<TKey>(
		keySelector : (item : T) => TKey,
		comparer : (current : TKey, exist : TKey) => number) : IEnumerable<T>;

	/**
	 * Sorts the elements of a sequence in descending order.
	 */
	orderDescending() : IEnumerable<T>;

	/**
	 * Sorts the elements of a sequence in descending order.
	 * @param comparer An comparer to compare keys.
	 */
	orderDescending(comparer : (current : T, exist : T) => number) : IEnumerable<T>;

	/**
	 * Sorts the elements of a sequence in descending order according to a key.
	 * @param keySelector A function to extract a key from an element.
	 */
	orderByDescending<TKey>(keySelector : (item : T) => TKey) : IEnumerable<T>;

	/**
	 * Sorts the elements of a sequence in descending order according to a key.
	 * @param keySelector A function to extract a key from an element.
	 * @param comparer An comparer to compare keys.
	 */
	orderByDescending<TKey>(
		keySelector : (item : T) => TKey,
		comparer : (current : TKey, exist : TKey) => number) : IEnumerable<T>;

	/**
	 * Adds a value to the beginning of the sequence.
	 * @param element The value to prepend to
	 */
	prepend(element : T) : IEnumerable<T>;

	/**
	 * Inverts the order of the elements in a sequence.
	 */
	reverse() : IEnumerable<T>;

	/**
	 * Projects each element of a sequence into a new form by incorporating the element's index.
	 * @param selector A transform function to apply to each element.
	 */
	select<TReturn>(selector : (item : T) => TReturn) : IEnumerable<TReturn>;

	/**
	 * Projects each element of a sequence into a new form by incorporating the element's index.
	 * @param selector A transform function to apply to each element. The second parameter of the function
	 * represents the index of the source element.
	 */
	select<TReturn>(selector : (item : T, index : number) => TReturn) : IEnumerable<TReturn>;

	/**
	 * Projects each element of a sequence to an array and flattens the resulting sequences into one sequence.
	 * @param selector A transform function to apply to each element.
	 */
	selectMany<TReturn>(selector : (item : T) => IEnumerable<TReturn>) : IEnumerable<TReturn>;

	/**
	 * Returns the only element of a sequence that satisfies a specified condition, and throws an exception if more than
	 * one such element exists.
	 */
	single() : T;

	/**
	 * Returns the only element of a sequence that satisfies a specified condition, and throws an exception if more than
	 * one such element exists.
	 * @param predicate A function to test an element for a condition.
	 */
	single(predicate : (item : T) => boolean) : T;

	/**
	 * Returns the only element of a sequence, or a default value if the sequence is empty; this method throws an exception
	 * if there is more than one element in the sequence.
	 */
	singleOrDefault() : T | null;

	/**
	 * Returns the only element of a sequence, or a specified default value if the sequence is empty; this method throws
	 * an exception if there is more than one element in the sequence.
	 * @param defaultValue The default value to return if the sequence is empty.
	 */
	singleOrDefault(defaultValue : T) : T | null;

	/**
	 * Returns the only element of a sequence, or a specified default value if the sequence is empty; this method throws
	 * an exception if there is more than one element in the sequence.
	 * @param predicate A function to test an element for a condition.
	 */
	singleOrDefault(predicate : (item : T) => boolean) : T | null;

	/**
	 * Returns the only element of a sequence that satisfies a specified condition, or a specified default value if no
	 * such element exists; this method throws an exception if more than one element satisfies the condition.
	 * @param predicate A function to test an element for a condition.
	 * @param defaultValue The default value to return if the sequence is empty.
	 */
	singleOrDefault(
		predicate : (item : T) => boolean,
		defaultValue : T) : T | null;

	/**
	 * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
	 * @param count The number of elements to skip before returning the remaining elements.
	 */
	skip(count : number) : IEnumerable<T>;

	/**
	 * Returns a new enumerable collection that contains the elements from source with the last count elements of the
	 * source collection omitted.
	 * @param count The number of elements to omit from the end of the collection.
	 */
	skipLast(count : number) : IEnumerable<T>;

	/**
	 * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
	 * @param predicate A function to test each element for a condition.
	 */
	skipWhile(predicate : (item : T) => boolean) : IEnumerable<T>;

	/**
	 * Returns a specified number of contiguous elements from the start of a sequence.
	 * @param count The number of elements to return
	 */
	take(count : number) : IEnumerable<T>;

	/**
	 * Returns a specified number of contiguous elements from the start of a sequence.
	 * @param range The range of elements to return, which has start and end indexes either from the beginning or the
	 * end of the sequence.
	 */
	take(range : [start : number, end : number]) : IEnumerable<T>;

	/**
	 * Returns a new enumerable collection that contains the last count elements from source.
	 * @param count The number of elements to take from the end of the collection.
	 */
	takeLast(count : number) : IEnumerable<T>;

	/**
	 * Returns elements from a sequence as long as a specified condition is true.
	 * @param predicate A function to test each element for a condition.
	 */
	takeWhile(predicate : (item : T) => boolean) : IEnumerable<T>;

	/**
	 * Returns elements from a sequence as long as a specified condition is true.
	 * @param predicate A function to test each element for a condition. The second parameter of the function
	 * represents the index of the source element.
	 */
	takeWhile(predicate : (item : T, index : number) => boolean) : IEnumerable<T>;

	/**
	 * Creates an array from an enumerable.
	 */
	toArray() : Array<T>;

	/**
	 * Creates a Map from an enumerable according to specified key selector and element selector functions.
	 * @param keySelector A function to extract a key from each element.
	 * @param valueSelector A transform function to produce a result element value from each element.
	 */
	toDictionary<K, V>(keySelector : (item : T) => K, valueSelector : (item : T) => V) : Map<K, V>;

	/**
	 * Produces the set union of two sequences by using a specified comparer.
	 * @param source An enumerable whose distinct elements form the second set for the union.
	 * @param comparer The comparer to compare values.
	 */
	union(source : Array<T>, comparer? : (left : T, right : T) => boolean) : IEnumerable<T>;

	/**
	 * Produces the set union of two sequences according to a specified key selector function.
	 * @param source An enumerable whose distinct elements form the second set for the union.
	 * @param keySelector A function to extract the key for each element.
	 * @param comparer The comparer to compare values.
	 */
	unionBy<TKey>(
		source : Array<T>, keySelector : (item : T) => TKey,
		comparer? : (left : TKey, right : TKey) => boolean) : IEnumerable<T>;

	/**
	 * Filters a sequence of values based on a predicate. Each element's index is used in the logic of the predicate function.
	 * @param predicate A function to test each source element for a condition;
	 */
	where(predicate : (item : T) => boolean) : IEnumerable<T>;

	/**
	 * Filters a sequence of values based on a predicate. Each element's index is used in the logic of the predicate function.
	 * @param predicate A function to test each source element for a condition; The second parameter of the function
	 * represents the index of the source element.
	 */
	where(predicate : (item : T, index : number) => boolean) : IEnumerable<T>;
}

type IEnumerable<T> = Generator<T>;

(function () {

	interface IEnumerableArray<T> extends IEnumerable<T> {

		/**
		 * Adds the given object to the end of this list. The size of the list is
		 * increased by one. If required, the capacity of the list is doubled
		 * before adding the new element.
		 * @param item
		 */
		add(item : T) : void

		/**
		 * Adds the elements of the given collection to the end of this list. If
		 * required, the capacity of the list is increased to twice the previous
		 * capacity or the new size, whichever is larger.
		 * @param items
		 */
		addRange(items : IEnumerable<T>) : void

		/**
		 * Clears the contents of List.
		 */
		clear() : void

		/**
		 * Determines whether the array contains elements that match the conditions defined by the specified predicate.
		 * @param match The delegate that defines the conditions of the elements to search for.
		 */
		exists(match : (item : T) => boolean) : boolean

		/**
		 * Retrieves all the elements that match the conditions defined by the specified predicate.
		 * @param match The delegate that defines the conditions of the elements to search for.
		 */
		findAll(match : (item : T) => boolean) : Array<T>

		/**
		 * Creates a shallow copy of a range of elements in the source.
		 * @param start The zero-based index at which the range starts.
		 * @param count The number of elements in the range.
		 */
		getRange(
			start : number,
			count : number) : Array<T>

		/**
		 * Inserts an element into the array at the specified index.
		 * @param index The zero-based index at which item should be inserted.
		 * @param item The object to insert. The value can be null for reference types.
		 */
		insert(
			index : number,
			item : T) : void

		/**
		 * Removes the first occurrence of a specific object from the array.
		 * @param item The object to remove from the array. The value can be null for reference types.
		 */
		remove(item : T) : boolean

		/**
		 * Removes all the elements that match the conditions defined by the specified predicate.
		 * @param match The delegate that defines the conditions of the elements to remove.
		 */
		removeAll(match : (item : T) => boolean) : void

		/**
		 * Removes the element at the specified index of the array.
		 * @param index The zero-based index of the element to remove.
		 */
		removeAt(index : number) : T | undefined
	}

	interface IEnumerableMap<K, V> extends IEnumerable<[K, V]> {
		containsKey(key : K) : boolean

		containsValue(value : V) : boolean

		tryAdd(
			key : K,
			value : V) : boolean

		tryGetValue(
			key : K,
			valueGetter : (value : V) => void) : boolean
	}

	class Enumerable<T> implements IEnumerable<T> {
		[Symbol.iterator]() : Generator<T> {
			return this;
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

		aggregate<TSeed, TReturn>(
			seed : TSeed,
			accumulator : (seed : TSeed, item : T) => TReturn) : TReturn {
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

		* append(element : T) : IEnumerable<T> {
			for (const item of this) yield item
			yield element
		}

		asEnumerable() : IEnumerable<T> {
			return this;
		}

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

		* concat(source : IEnumerable<T>) : IEnumerable<T> {
			for (const item of this) yield item
			for (const item of source) yield item
		}

		contains(value : T) : boolean;
		contains(value : T, comparer : (left : T, right : T) => boolean) : boolean;
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
		* distinct(comparer? : (left : T, right : T) => boolean) : IEnumerable<T>
		{
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
		* distinctBy<TKey>(
			keySelector : (item : T) => TKey,
			comparer? : (left : TKey, right : TKey) => boolean) : IEnumerable<T>
		{
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
		except(
			source : Array<T> | IEnumerable<T>,
			comparer? : (left : T, right : T) => boolean) : IEnumerable<T>;
		* except(
			source : Array<T> | IEnumerable<T>,
			comparer? : (left : T, right : T) => boolean) : IEnumerable<T>
		{
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

		exceptBy<TKey>(
			source : Array<T> | IEnumerable<T>,
			keySelector : (item : T) => TKey) : IEnumerable<T>;
		* exceptBy<TKey>(
			source : Array<T> | IEnumerable<T>,
			keySelector : (item : T) => TKey,
			comparer? : (left : TKey, right : TKey) => boolean) : IEnumerable<T>
		{
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
		firstOrDefault(
			predicate : (item : T) => boolean,
			defaultValue : T) : T | null;
		firstOrDefault(
			predicate? : T | ((item : T) => boolean),
			defaultValue? : T) : T | null {
			predicate ??= () => true;
			if (typeof (predicate) != 'function') {
				defaultValue = predicate;
				predicate = () => true;
			}
			for (const item of this) if ((predicate as (item? : T) => boolean)(item)) return item;
			return defaultValue;
		}

		groupBy<TKey>(keySelector : (item : T) => TKey) : IEnumerable<Array<T> & { key : TKey }>;
		groupBy<TKey>(
			keySelector : (item : T) => TKey,
			comparer : (left : TKey, right : TKey) => boolean) : IEnumerable<Array<T> & { key : TKey }>;
		groupBy<TKey, TElement>(
			keySelector : (item : T) => TKey,
			elementSelector : (item : T) => TElement) : IEnumerable<Array<TElement> & { key : TKey }>;
		groupBy<TKey, TElement>(
			keySelector : (item : T) => TKey,
			elementSelector : (item : T) => TElement,
			comparer : (left : TKey, right : TKey) => boolean) : IEnumerable<Array<TElement> & { key : TKey }>;
		* groupBy<TKey, TElement>(
			keySelector : (item : T) => TKey,
			elementSelector? : ((item : T) => TElement) | ((left : TKey, right : TKey) => boolean),
			comparer? : (left : TKey, right : TKey) => boolean)
			: IEnumerable<Array<T> & { key : TKey } | Array<TElement> & { key : TKey }>
		{
			comparer ??= Object.is;
			elementSelector ??= (x : any) => x
			if (elementSelector.length == 2) {
				comparer = elementSelector as (left : TKey, right : TKey) => boolean
				elementSelector = (x : any) => x
			}
			const groups = []
			for (const item of this) {
				const key = keySelector(item)
				let cache = groups.find(x => comparer(x.key, key))
				if (!cache) {
					cache = []
					cache.key = key
					groups.push(cache)
				}
				cache.push((elementSelector as (item : T) => any)(item))
			}
			for (const group of groups) yield group;
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
		lastOrDefault(
			predicate : (item : T) => boolean,
			defaultValue : T) : T | null;
		lastOrDefault(
			predicate? : T | ((item : T) => boolean),
			defaultValue? : T) : T | null {
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
		* order(comparer? : (current : T, exist : T) => number) : IEnumerable<T> {
			comparer ??= (
				left,
				right) => left as any - (right as any)
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
		orderBy<TKey>(
			keySelector : (item : T) => TKey,
			comparer : (current : TKey, exist : TKey) => number) : IEnumerable<T>;
		* orderBy<TKey>(
			keySelector : (item : T) => TKey,
			comparer? : (current : TKey, exist : TKey) => number) : IEnumerable<T> {
			comparer ??= (
				left,
				right) => left as any - (right as any)
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
		orderByDescending<TKey>(
			keySelector : (item : T) => TKey,
			comparer : (current : TKey, exist : TKey) => number) : IEnumerable<T>;
		* orderByDescending<TKey>(
			keySelector : (item : T) => TKey,
			comparer? : (current : TKey, exist : TKey) => number) : IEnumerable<T> {
			comparer ??= (
				left,
				right) => left as any - (right as any)
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
		* orderDescending(comparer? : (current : T, exist : T) => number) : IEnumerable<T> {
			comparer ??= (
				left,
				right) => left as any - (right as any)
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

		* prepend(element : T) : IEnumerable<T> {
			yield element;
			for (const item of this) yield item
		}

		* reverse() : IEnumerable<T> {
			const arr = []
			for (const item of this) {
				arr.push(item)
			}
			while (arr.length > 0) {
				yield arr.pop()
			}
		}

		select<TReturn>(selector : (item : T) => TReturn) : IEnumerable<TReturn>;
		select<TReturn>(selector : (item : T, index : number) => TReturn) : IEnumerable<TReturn>;
		* select<TReturn>(selector : ((item : T) => TReturn) | ((item : T, index : number) => TReturn))
			: IEnumerable<TReturn> {
			let index = 0
			for (const item of this) {
				yield selector(item, index++)
			}
		}

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
		singleOrDefault(
			predicate : (item : T) => boolean,
			defaultValue : T) : T | null;
		singleOrDefault(
			predicate? : T | ((item : T) => boolean),
			defaultValue? : T) : T | null {
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

		* skip(count : number) : IEnumerable<T> {
			for (const item of this) {
				count--;
				if (count < 0) {
					yield item
				}
			}
		}

		* skipLast(count : number) : IEnumerable<T> {
			const stack = []
			for (const item of this) {
				stack.push(item)
				if (stack.length > count) {
					yield stack.shift()
				}
			}
		}

		* skipWhile(predicate : (item : T) => boolean) : IEnumerable<T> {
			let start = false
			for (const item of this) {
				if (start) yield item
				else if (predicate(item)) start = true;
			}
		}

		take(count : number) : IEnumerable<T>;
		take(range : [start : number, end : number]) : IEnumerable<T>;
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

		takeWhile(predicate : (item : T) => boolean) : IEnumerable<T>;
		takeWhile(predicate : (item : T, index : number) => boolean) : IEnumerable<T>;
		* takeWhile(predicate : ((item : T) => boolean) | ((item : T, index : number) => boolean))
			: IEnumerable<T> {
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

		toDictionary<K, V>(
			keySelector : (item : T) => K,
			valueSelector : (item : T) => V) : Map<K, V> {
			let map = new Map();
			for (const item of this) {
				const key = keySelector(item)
				const value = valueSelector(item)
				if (map.has(key)) throw 'Duplicate dictionary key'
				map.set(key, value)
			}
			return map;
		}

		* union(
			source : Array<T>,
			comparer? : (left : T, right : T) => boolean) : IEnumerable<T>
		{
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

		* unionBy<TKey>(
			source : Array<T>,
			keySelector : (item : T) => TKey,
			comparer? : (left : TKey, right : TKey) => boolean) : IEnumerable<T>
		{
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


		where(predicate : (item : T) => boolean) : IEnumerable<T>;
		where(predicate : (item : T, index : number) => boolean) : IEnumerable<T>
		* where(predicate : ((item : T) => boolean) | ((item : T, index : number) => boolean))
			: IEnumerable<T>
		{
			let count = 0
			for (const item of this) {
				if (predicate(item, count++)) yield item
			}
		}
	}

	class PartialArray<T> extends Enumerable<T> implements IEnumerableArray<T> {
		private length : number;

		add(item : T) : void {
			this.push(item);
		}

		addRange(items : IEnumerable<T>) : void {
			for (const item of items) {
				this.push(item);
			}
		}

		* asEnumerable() : IEnumerable<T> {
			for (const item of this) yield item;
		}

		clear() : void {
			this.splice(0, this.length)
		}

		elementAt(index : number) : T {
			return this[index]
		}

		elementAtOrDefault(index : number) : T | null
		elementAtOrDefault(
			index : number,
			defaultValue? : any) : T | null {
			return this[index] ?? defaultValue
		}

		exists(match : (item : T) => boolean) : boolean {
			return this.firstOrDefault(match) != null;
		}

		findAll(match : (item : T) => boolean) : Array<T> {
			return this.where(match).toArray();
		}

		getRange(
			start : number,
			count : number) : Array<T> {
			return this.slice(start, count + start)
		}

		insert(
			index : number,
			item : T) : void {
			this.splice(index, 0, item)
		}

		remove(item : T) : boolean {
			let index = this.findIndex((x : any) => Object.is(x, item));
			return index > -1 ? !!this.splice(index, 1) : false;
		}

		removeAll(match : (item : T) => boolean) : number {
			let index = 0,
			    count = 0;
			while (index < this.length) {
				if (match(this[index])) {
					this.splice(index, 1);
					count++;
				} else {
					index++;
				}
			}
			return count;
		}

		removeAt(index : number) : T | undefined {
			return this.splice(index, 1)[0];
		}

		toArray() : Array<T> {
			// @ts-ignore
			return this;
		}

		push<T extends {}>(...items : T[]) : number {
			throw new Error("Method not implemented.");
		}

		private splice(
			number : number,
			deleteCount? : number,
			item? : T) : number {
			throw new Error("Method not implemented.");
		}

		private slice(
			start : number,
			number : number) : T[] {
			throw new Error("Method not implemented.");
		}

		private findIndex(param : (x : any) => boolean) : number {
			throw new Error("Method not implemented.");
		}
	}

	class PartialMap<K, V> extends Enumerable<[K, V]> implements IEnumerableMap<K, V> {
		containsKey(key : K) : boolean {
			return this.has(key);
		}

		containsValue(value : V) : boolean {
			for (const val of this.values()) {
				if (Object.is(val, value)) {
					return true;
				}
			}
			return false;
		}

		tryAdd(
			key : K,
			value : V) : boolean {
			return !(this.has(key) || !this.set(key, value));
		}

		tryGetValue(
			key : K,
			valueGetter : (value : V) => void) : boolean {
			let ret = this.get(key);
			valueGetter(ret);
			return ret != null;
		}

		private has(key : K) : boolean {
			throw new Error("Method not implemented.");
		}

		private get(key : K) : V | null {
			throw new Error("Method not implemented.");
		}

		private set(
			key : K,
			value : V) : boolean {
			throw new Error("Method not implemented.");
		}

		private values() : Generator<V> {
			throw new Error("Method not implemented.");
		}
	}


	function defineProperty(
		prototype : any,
		name : string,
		method : any)
	{
		if (prototype[name] != undefined) return;
		Object.defineProperty(prototype, name, {
			value: method,
			writable: false
		})
	}

	Object.getOwnPropertyNames(PartialMap.prototype).forEach(name => {
		defineProperty(Map.prototype, name, PartialMap.prototype[name])
	})
	Object.getOwnPropertyNames(PartialArray.prototype).forEach(name => {
		defineProperty(Array.prototype, name, PartialArray.prototype[name])
	})
	Object.getOwnPropertyNames(Enumerable.prototype).forEach(name => {
		defineProperty((function* () {
			// @ts-ignore
		})().__proto__.__proto__, name, Enumerable.prototype[name])
		defineProperty(Array.prototype, name, Enumerable.prototype[name])
		defineProperty(Map.prototype, name, Enumerable.prototype[name])
	});
})()
