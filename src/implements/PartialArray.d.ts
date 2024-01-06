import { Enumerable } from "./Enumerable";
import { IEnumerableArray } from "../interfaces/IEnumerableArray";
import { IEnumerable } from "../interfaces/IEnumerable";
export declare class PartialArray<T> extends Enumerable<T> implements IEnumerableArray<T> {
    private length;
    add(item: T): void;
    addRange(items: IEnumerable<T>): void;
    asEnumerable(): IEnumerable<T>;
    clear(): void;
    elementAt(index: number): T;
    elementAtOrDefault(index: number): T | null;
    exists(match: (item: T) => boolean): boolean;
    findAll(match: (item: T) => boolean): Array<T>;
    getRange(start: number, count: number): Array<T>;
    insert(index: number, item: T): void;
    remove(item: T): boolean;
    removeAll(match: (item: T) => boolean): number;
    removeAt(index: number): T | undefined;
    toArray(): Array<T>;
    push<T extends {}>(...items: T[]): number;
    private splice;
    private slice;
    private findIndex;
}
