import {IEnumerable} from "./IEnumerable";

export interface IEnumerableMap<K, V> extends IEnumerable<[K, V]> {
	containsKey(key : K) : boolean

	containsValue(value : V) : boolean

	tryAdd(key : K, value : V) : boolean

	tryGetValue(key : K, valueGetter : (value : V) => void) : boolean
}
