// noinspection JSConstantReassignment,JSValidateTypes,JSUnresolvedReference,TypeScriptUnresolvedReference,JSUnusedGlobalSymbols

(function () {

		const enumerable = {
			aggregate<TSeed, TReturn>(seed : TSeed, accumulator : (seed : TSeed, item : any) => TReturn) {
				let tmp : TSeed | TReturn = seed;
				for (const item of this) tmp = accumulator(seed, item)
				return tmp;
			},
			all(predicate : (item : any) => boolean) {
				for (const item of this) if (!predicate(item)) return false;
				return true;
			},
			any(predicate? : (item : any) => boolean) {
				return this.firstOrDefault(predicate) !== null;
			},
			* append(element : any) {
				for (const item of this) yield item
				yield element
			},
			asEnumerable() {
				return this;
			},
			* chunk(size : number) {
				let chunk = []
				for (const item of this) {
					if (chunk.length === size) {
						yield chunk
						chunk = []
					}
					chunk.push(item)
				}
				yield chunk
			},
			* concat(source : any[]) {
				for (const item of this) yield item
				for (const item of source) yield item
			},
			contains(value : any, comparer? : (left : any, right : any) => boolean) {
				comparer ??= Object.is;
				for (const item of this) if (comparer(value, item)) return true;
				return false
			},
			count(predicate? : (item : any) => boolean) {
				predicate ??= () => true;
				let count = 0;
				for (const item of this) if (predicate(item)) count++;
				return count;
			},
			* distinct(comparer? : (left : any, right : any) => boolean) {
				comparer ??= Object.is;
				const stack = []
				for (const item of this) {
					if (stack.findIndex((x : any) => comparer(x, item)) < 0) {
						stack.push(item)
					}
				}
				for (const item of stack) yield item
			},
			* distinctBy<TKey>(keySelector : (item : any) => TKey, comparer? : (left : any, right : any) => boolean) {
				comparer ??= Object.is;
				const stack = []
				for (const item of this) {
					if (stack.findIndex((x : any) => comparer(keySelector(x), keySelector(item))) < 0) {
						stack.push(item)
					}
				}
				for (const item of stack) yield item
			},
			elementAt(index : number) {
				const ret = this.elementAtOrDefault(index);
				if (ret == null) throw 'Yield no result'
				return ret;
			},
			elementAtOrDefault(index : number) {
				for (const item of this) {
					if (index === 0) return item;
					index--;
				}
				return null;
			},
			* except(source : any[], comparer? : (left : any, right : any) => boolean) {
				comparer ??= Object.is
				const compares = []
				for (const item of source) {
					compares.push(item)
				}
				for (const item of this) {
					if (compares.findIndex((x : any) => comparer(x, item)) < 0) {
						yield item
						compares.push(item)
					}
				}
			},
			* exceptBy<TKey>(source : any[], keySelector : (item : any) => TKey, comparer? : (left : any, right : any) => boolean) {
				comparer ??= Object.is
				const compares = []
				for (const item of source) {
					compares.push(item)
				}
				for (const item of this) {
					if (compares.findIndex(x => comparer(keySelector(x), keySelector(item))) < 0) {
						yield item
						compares.push(item)
					}
				}
			},
			first(predicate? : (item : any) => boolean) {
				const ret = this.firstOrDefault(predicate);
				if (ret == null) throw 'Yield no result'
				return ret;
			},
			firstOrDefault(predicate? : (item : any) => boolean, defaultValue? : any) {
				predicate ??= () => true;
				if (typeof (predicate) != 'function') {
					defaultValue = predicate;
					predicate = () => true;
				}
				for (const item of this) if (predicate(item)) return item;
				return defaultValue;
			},
			* groupBy<TKey>(keySelector : (item : any) => TKey) {
				let map = new Map();
				for (const item of this) {
					const key = keySelector(item);
					let cache = map.get(key);
					if (cache === undefined) {
						cache = [];
						cache.key = key;
						map.set(key, cache)
					}
					cache.push(item)
				}
				// @ts-ignore
				for (let value of map.values()) yield value
			},
			last(predicate? : (item : any) => boolean) {
				const ret = this.lastOrDefault(predicate)
				if (ret == null) throw 'Yield no result'
				return ret;
			},
			lastOrDefault(predicate? : (item : any) => boolean, defaultValue? : any) {
				predicate ??= () => true;
				if (typeof (predicate) != 'function') {
					defaultValue = predicate;
					predicate = () => true;
				}
				let last = defaultValue;
				for (const item of this) {
					if (predicate(item)) last = item;
				}
				return last;
			},
			* order(comparer : (current : any, exist : any) => number) {
				comparer ??= (left, right) => left - right
				const stack = []
				for (const item of this) {
					const index = stack.findIndex((x : any) => comparer(item, x) <= 0)
					if (index < 0) {
						stack.push(item)
					} else {
						stack.splice(index, 0, item)
					}
				}
				for (const item of stack) yield item
			},
			* orderBy<TKey>(keySelector : (item : any) => TKey, comparer? : (current : any, exist : any) => number) {
				comparer ??= (left, right) => left - right
				const stack = []
				for (const item of this) {
					const index = stack.findIndex(x => comparer(keySelector(item), keySelector(x)) <= 0)
					if (index < 0) {
						stack.push(item)
					} else {
						stack.splice(index, 0, item)
					}
				}
				for (const item of stack) yield item
			},
			* orderDescending(comparer? : (current : any, exist : any) => number) {
				comparer ??= (left, right) => left - right
				const stack = []
				for (const item of this) {
					const index = stack.findIndex(x => comparer(item, x) >= 0)
					if (index < 0) {
						stack.push(item)
					} else {
						stack.splice(index, 0, item)
					}
				}
				for (const item of stack) yield item
			},
			* orderByDescending<TKey>(keySelector : (item : any) => TKey, comparer? : (current : any, exist : any) => number) {
				comparer ??= (left, right) => left - right
				const stack = []
				for (const item of this) {
					const index = stack.findIndex(x => comparer(keySelector(item), keySelector(x)) >= 0)
					if (index < 0) {
						stack.push(item)
					} else {
						stack.splice(index, 0, item)
					}
				}
				for (const item of stack) yield item
			},
			* prepend(element : any) {
				yield element;
				for (const item of this) yield item
			},
			* reverse() {
				const arr = []
				for (const item of this) {
					arr.push(item)
				}
				while (arr.length > 0) {
					yield arr.pop()
				}
			},
			* select<TReturn>(selector : ((item : any) => TReturn) | ((item : any, index : number) => TReturn)) {
				let index = 0
				for (const item of this) {
					yield selector(item, index++)
				}
			},
			* selectMany<TReturn>(selector : (item : any) => Array<TReturn>) {
				for (const item of this) {
					for (let sub of selector(item)) {
						yield sub
					}
				}
			},
			single(predicate? : (item : any) => boolean) {
				const ret = this.singleOrDefault(predicate)
				if (ret == null) throw 'Yield no result'
				return ret;
			},
			singleOrDefault(predicate? : (item : any) => boolean, defaultValue? : any) {
				predicate ??= () => true
				if (typeof (predicate) != 'function') {
					defaultValue = predicate;
					predicate = () => true;
				}
				let single = defaultValue
				for (const item of this) {
					if (predicate(item)) {
						if (single != null) throw 'Duplicate item of single'
						single = item;
					}
				}
				return single
			},
			* skip(count : number) {
				for (const item of this) {
					count--;
					if (count < 0) {
						yield item
					}
				}
			},
			* skipLast(count : number) {
				const stack = []
				for (const item of this) {
					stack.push(item)
					if (stack.length > count) {
						yield stack.shift()
					}
				}
			},
			* skipWhile(predicate : (item : any) => boolean) {
				let start = false
				for (const item of this) {
					if (start) yield item
					else if (predicate(item)) start = true;
				}
			},
			* take(count : number | [start : number, end : number]) {
				const start = Number.isInteger(count) ? 0 : count[0]
				const num = Number.isInteger(count) ? count : count[1] > 0 ? count[1] - start : count[1];
				let begin = 0;
				let accumulate = 0;
				if (num > 0) {
					for (const item of this) {
						if (begin >= start) {
							if (accumulate < num) {
								yield item
								accumulate++;
							}
							if (accumulate >= num) return
						}
						begin++;
					}

					throw 'Not satisfied'

				} else {
					let queue = []
					for (const item of this) {
						if (begin >= start) {
							queue.push(item)
							if (queue.length >= -num) {
								yield queue.shift()
							}
						}
						begin++;
					}
				}
			},
			* takeLast(count : number) {
				const stack = []
				for (const item of this) {
					stack.push(item)
					if (stack.length > count) {
						stack.shift()
					}
				}
				for (const item of stack) {
					yield item
				}
			},
			* takeWhile(predicate : ((item : any) => boolean) | ((item : any, index : number) => boolean)) {
				let index = 0;
				for (const item of this) {
					if (!predicate(item, index)) return;
					yield item
					index++;
				}
			},
			toArray() {
				const ret = [];
				for (const item of this) {
					ret.push(item)
				}
				return ret
			},
			toDictionary<K, V>(keySelector : (item : any) => K, valueSelector : (item : any) => V) {
				let map = new Map();
				for (const item of this) {
					const key = keySelector(item)
					const value = valueSelector(item)
					if (map.has(key)) throw 'Duplicate dictionary key'
					map.set(key, value)
				}
				return map;
			},
			* union(source : Array<any>, comparer? : (left : any, right : any) => boolean) {
				comparer ??= Object.is
				const union = []
				for (const item of this) {
					if (union.findIndex(x => comparer(x, item)) < 0) {
						union.push(item)
					}
				}
				for (const item of source) {
					if (union.findIndex(x => comparer(x, item)) < 0) {
						union.push(item)
					}
				}
				for (const item of union) {
					yield item
				}
			},
			* unionBy<TKey>(source : Array<any>, keySelector : (item : any) => TKey, comparer? : (left : any, right : any) => boolean) {
				comparer ??= Object.is
				const union = []
				for (const item of this) {
					if (union.findIndex(x => comparer(keySelector(x), keySelector(item))) < 0) {
						union.push(item)
					}
				}
				for (const item of source) {
					if (union.findIndex(x => comparer(keySelector(x), keySelector(item))) < 0) {
						union.push(item)
					}
				}
				for (const item of union) {
					yield item
				}
			},
			* where(predicate : ((item : any) => boolean) | ((item : any, index : number) => boolean)) {
				let count = 0
				for (const item of this) {
					if (predicate(item, count++)) yield item
				}
			}
		}

		const array = {
			add(item : any) {
				this.push(item);
			},
			addRange(items : any) {
				for (const item of items) {
					this.push(item);
				}
			},
			* asEnumerable() {
				for (const item of this) yield item;
			},
			clear() {
				this.splice(0, this.length)
			},
			elementAt(index : number) {
				return this[index]
			},
			elementAtOrDefault(index : number, defaultValue : any) {
				return this[index] ?? defaultValue
			},
			exists(predicate? : (item : any) => boolean) {
				return this.firstOrDefault(predicate) != null;
			},
			findAll(match : (item : any) => boolean) {
				return this.where(match).toArray();
			},
			getRange(start : number, count : number) {
				return this.slice(start, count + start)
			},
			insert(index : number, item : any) {
				this.splice(index, 0, item)
			},
			remove(item : any) {
				let index = this.findIndex((x : any) => Object.is(x, item));
				return index > -1 ? !!this.splice(index, 1) : false;
			},
			removeAll(predicate : (item : any) => boolean) {
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
			},
			removeAt(index : number) {
				return this.splice(index, 1)[0];
			},
			toArray() {
				return this;
			}
		}

		const map = {
			* asEnumerable() {
				for (const item of this) yield item;
			},
			containsKey(key : any) {
				return this.has(key);
			},
			containsValue(value : any) {
				let iter = this.entries();
				let item = iter.next();
				while (!item.done) {
					if (Object.is(item.value[1], value)) {
						return true;
					}
					item = iter.next();
				}
				return false;
			},
			tryAdd(key : any, value : any) {
				return !(this.has(key) || !this.set(key, value));
			},
			tryGetValue(key : any, valueGetter : (value : any) => void) {
				let ret = this.get(key);
				valueGetter(ret);
				return ret != null;
			}

		}

		function mount(prototype : any, name : string, method : any) {
			Object.defineProperty(prototype, name, {
				value   : method,
				writable: true
			})
		}

		Object.keys(enumerable).forEach(
			name => {
				const method = enumerable[name];
				mount((function* () {
					// @ts-ignore
				})().__proto__.__proto__, name, method)
				mount(globalThis.Array.prototype, name, method)
				mount(globalThis.Map.prototype, name, method)
			});
		Object.keys(array).forEach(
			name => {
				const method = array[name];
				mount(globalThis.Array.prototype, name, method)
			});
		Object.keys(map).forEach(
			name => {
				const method = map[name];
				mount(globalThis.Map.prototype, name, method)
			});
	}
)
();
