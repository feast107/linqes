import { Enumerable } from "./Enumerable";
import { IEnumerableMap } from "../interfaces/IEnumerableMap";
export declare class PartialMap<K, V> extends Enumerable<[K, V]> implements IEnumerableMap<K, V> {
    containsKey(key: K): boolean;
    containsValue(value: V): boolean;
    tryAdd(key: K, value: V): boolean;
    tryGetValue(key: K, valueGetter: (value: V) => void): boolean;
    private has;
    private get;
    private set;
    private values;
}
