import { Enumerable } from "./Enumerable";
export class PartialMap extends Enumerable {
    containsKey(key) {
        return this.has(key);
    }
    containsValue(value) {
        for (const val of this.values()) {
            if (Object.is(val, value)) {
                return true;
            }
        }
        return false;
    }
    tryAdd(key, value) {
        return !(this.has(key) || !this.set(key, value));
    }
    tryGetValue(key, valueGetter) {
        let ret = this.get(key);
        valueGetter(ret);
        return ret != null;
    }
    has(key) {
        throw new Error("Method not implemented.");
    }
    get(key) {
        throw new Error("Method not implemented.");
    }
    set(key, value) {
        throw new Error("Method not implemented.");
    }
    values() {
        throw new Error("Method not implemented.");
    }
}
