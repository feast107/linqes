import {Enumerable} from "./Enumerable";
import {IEnumerableMap} from "../interfaces/IEnumerableMap";

export class PartialMap<K, V> extends Enumerable<[K, V]> implements IEnumerableMap<K, V> {
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

	tryAdd(key : K, value : V) : boolean {
		return !(this.has(key) || !this.set(key, value));
	}

	tryGetValue(key : K, valueGetter : (value : V) => void) : boolean {
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

	private set(key : K, value : V) : boolean {
		throw new Error("Method not implemented.");
	}

	private values() : Generator<V> {
		throw new Error("Method not implemented.");
	}
}
