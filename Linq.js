(function () {
    const KeyValuePair = class {
        constructor(key, value) {
            if (key == null) throw "key is required";
            this.key = key;
            this.value = value;
            Object.freeze(this);
        }
    };
    globalThis.KeyValuePair = KeyValuePair;
    Array.prototype.add ??= function (item) {
        this.push(item);
    };
    Array.prototype.remove ??= function (item) {
        let index = this.findIndex((x) => Object.is(x, item));
        return index > -1 ? !!this.splice(index, 1) : false;
    };
    Array.prototype.insert ??= function (index, item) {
        index = parseInt(index);
        if (index > this.length) {
            this.push(item);
            return;
        }
        let rest = this.splice(index);
        this.push(item);
        rest.forEach((x) => {
            this.push(x);
        });
    };
    Array.prototype.contains ??= function (item) {
        return this.findIndex((x) => x == item) > -1;
    };
    Array.prototype.clear ??= function () {
        while (this.length > 0) {
            this.pop();
        }
    };
    Array.prototype.addRange ??= function (another) {
        another.forEach((x) => {
            this.push(x);
        });
    };
    Array.prototype.removeAll ??= function (predicate) {
        let index = 0,
            count = 0;
        while (index < this.length) {
            if (predicate(this[index])) {
                this.splice(index, 1);
                count++;
            } else {
                index++;
            }
        }
        return count;
    };
    Array.prototype.toDictionary ??= function (keySelector, valueSelector) {
        let ret = new Map();
        this.forEach((x) => {
            ret.set(keySelector(x), valueSelector(x));
        });
        return ret;
    };
    Array.prototype.distinct ??= function (comparer) {
        comparer ??= (left, right) => Object.is(left, right);
        let ret = [];
        this.forEach((x) => {
            if (ret.findIndex((i) => comparer(x, i)) < 0) {
                ret.push(x);
            }
        });
        return ret;
    };
    Array.prototype.aggregate ??= function (seed, func) {
        return this.reduce(func, seed);
    };
    Array.prototype.select ??= function (selector) {
        let ret = [];
        this.forEach((x) => {
            ret.push(selector(x));
        });
        return ret;
    };
    Array.prototype.where ??= function (predicate) {
        let ret = [];
        this.forEach((x) => {
            if (predicate(x)) {
                ret.push(x);
            }
        });
        return ret;
    };
    Array.prototype.removeAt ??= function (index) {
        return this.splice(index, 1);
    };
    Array.prototype.any ??= function (predicate) {
        let index = 0;
        while (index < this.length) {
            if (predicate(this[index])) {
                break;
            }
            index++;
        }
        return index < this.length;
    };
    Array.prototype.all ??= function (predicate) {
        return this.every(predicate);
    };
    Array.prototype.orderBy ??= function (property) {
        return this.sort(function (a, b) {
            return property(a) - property(b);
        });
    };
    Array.prototype.orderByDescending ??= function (property) {
        return this.sort(function (a, b) {
            return property(b) - property(a);
        });
    };
    Array.prototype.withIndex ??= function* () {
        let i = 0;
        for (let item of this) {
            yield [item, i++];
        }
    }
    Map.prototype.containsKey ??= function (key) {
        return this.has(key);
    };
    Map.prototype.containsValue ??= function (value) {
        let iter = this.entries();
        let item = iter.next();
        while (!item.done) {
            if (Object.is(item.value[1], value)) {
                return true;
            }
            item = iter.next();
        }
        return false;
    };
    Map.prototype.tryAdd ??= function (key, value) {
        return !(this.has(key) || !this.set(key, value));
    };
    Map.prototype.tryGetValue ??= function (key, valueGetter) {
        let ret = this.get(key);
        valueGetter(ret);
        return ret != null;
    };
})();
