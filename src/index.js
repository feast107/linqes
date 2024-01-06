import { Enumerable } from "./implements/Enumerable";
import { PartialArray } from "./implements/PartialArray";
import { PartialMap } from "./implements/PartialMap";
function ownPropertiesOf(prototype) {
    return Object.getOwnPropertyNames(prototype).filter(x => {
        return Object.getOwnPropertyNames(class {
        }.prototype).findIndex(y => x == y) < 0;
    });
}
function defineProperty(prototype, name, method) {
    if (prototype[name] != undefined)
        return;
    Object.defineProperty(prototype, name, {
        value: method,
        writable: false
    });
}
ownPropertiesOf(PartialMap.prototype).forEach(name => {
    defineProperty(Map.prototype, name, PartialMap.prototype[name]);
});
ownPropertiesOf(PartialArray.prototype).forEach(name => {
    defineProperty(Array.prototype, name, PartialArray.prototype[name]);
});
ownPropertiesOf(Enumerable.prototype).forEach(name => {
    defineProperty((function* () {
        // @ts-ignore
    })().__proto__.__proto__, name, Enumerable.prototype[name]);
    defineProperty(Array.prototype, name, Enumerable.prototype[name]);
});
