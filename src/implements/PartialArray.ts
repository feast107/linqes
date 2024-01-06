import {Enumerable} from "./Enumerable";
import {IEnumerableArray} from "../interfaces/IEnumerableArray";
import {IEnumerable} from "../interfaces/IEnumerable";
export class PartialArray<T> extends Enumerable<T> implements IEnumerableArray<T> {
	private length : number;

	add(item : T) : void {
		this.push(item);
	}

	addRange(items : IEnumerable<T>) : void {
		for (const item of items) {
			this.push(item);
		}
	}

	// @ts-ignore
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
	elementAtOrDefault(index : number, defaultValue? : any) : T | null {
		return this[index] ?? defaultValue
	}

	exists(match : (item : T) => boolean) : boolean {
		return this.firstOrDefault(match) != null;
	}

	findAll(match : (item : T) => boolean) : Array<T> {
		return this.where(match).toArray();
	}

	getRange(start : number, count : number) : Array<T> {
		return this.slice(start, count + start)
	}

	insert(index : number, item : T) : void {
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

	private splice(number : number, deleteCount? : number, item? : T) : number {
		throw new Error("Method not implemented.");
	}

	private slice(start : number, number : number) : T[] {
		throw new Error("Method not implemented.");
	}

	private findIndex(param : (x : any) => boolean) : number {
		throw new Error("Method not implemented.");
	}
}
