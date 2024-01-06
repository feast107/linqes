import {IEnumerable} from "./IEnumerable";

export interface IEnumerableArray<T> extends IEnumerable<T> {

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
	getRange(start : number, count : number) : Array<T>

	/**
	 * Inserts an element into the array at the specified index.
	 * @param index The zero-based index at which item should be inserted.
	 * @param item The object to insert. The value can be null for reference types.
	 */
	insert(index : number, item : T) : void

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
