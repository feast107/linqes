import { Enumerable } from "./Enumerable";
export class PartialArray extends Enumerable {
    add(item) {
        this.push(item);
    }
    addRange(items) {
        for (const item of items) {
            this.push(item);
        }
    }
    // @ts-ignore
    *asEnumerable() {
        for (const item of this)
            yield item;
    }
    clear() {
        this.splice(0, this.length);
    }
    elementAt(index) {
        return this[index];
    }
    elementAtOrDefault(index, defaultValue) {
        var _a;
        return (_a = this[index]) !== null && _a !== void 0 ? _a : defaultValue;
    }
    exists(match) {
        return this.firstOrDefault(match) != null;
    }
    findAll(match) {
        return this.where(match).toArray();
    }
    getRange(start, count) {
        return this.slice(start, count + start);
    }
    insert(index, item) {
        this.splice(index, 0, item);
    }
    remove(item) {
        let index = this.findIndex((x) => Object.is(x, item));
        return index > -1 ? !!this.splice(index, 1) : false;
    }
    removeAll(match) {
        let index = 0, count = 0;
        while (index < this.length) {
            if (match(this[index])) {
                this.splice(index, 1);
                count++;
            }
            else {
                index++;
            }
        }
        return count;
    }
    removeAt(index) {
        return this.splice(index, 1)[0];
    }
    toArray() {
        // @ts-ignore
        return this;
    }
    push(...items) {
        throw new Error("Method not implemented.");
    }
    splice(number, deleteCount, item) {
        throw new Error("Method not implemented.");
    }
    slice(start, number) {
        throw new Error("Method not implemented.");
    }
    findIndex(param) {
        throw new Error("Method not implemented.");
    }
}
