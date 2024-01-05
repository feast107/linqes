// noinspection JSConstantReassignment,JSValidateTypes,JSUnresolvedReference

(function ()
{
	(function (type)
	{
		type.aggregate ??= function (seed, accumulator)
		{
			for (const item of this) seed = accumulator(seed, item)
			return seed;
		}
		type.all ??= function (predicate)
		{
			for (const item of this) if (!predicate(item)) return false;
			return true;
		}
		type.any ??= function (predicate)
		{
			return this.firstOrDefault(predicate) !== null;
		}
		type.append ??= function* (element)
		{
			for (const item of this) yield item
			yield element
		}
		type.asEnumerable ??= function ()
		{
			return this;
		}
		type.chunk ??= function* (size)
		{
			let chunk = []
			for (const item of this)
			{
				if (chunk.length === size)
				{
					yield chunk
					chunk = []
				}
				chunk.push(item)
			}
			yield chunk
		}
		type.concat ??= function* (source)
		{
			for (const item of this) yield item
			for (const item of source) yield item
		}
		type.contains ??= function (value, comparer)
		{
			comparer ??= Object.is;
			for (const item of this) if (comparer(value, item)) return true;
			return false
		}
		type.count ??= function (predicate)
		{
			predicate ??= () => true;
			let count = 0;
			for (const item of this) if (predicate(item)) count++;
			return count;
		}
		type.distinct ??= function* (comparer)
		{
			comparer ??= Object.is;
			const stack = []
			for (const item of this)
			{
				if (stack.findIndex(x => comparer(x, item)) < 0)
				{
					stack.push(item)
				}
			}
			for (const item of stack) yield item
		}
		type.distinctBy ??= function* (keySelector, comparer)
		{
			comparer ??= Object.is;
			const stack = []
			for (const item of this)
			{
				if (stack.findIndex(x => comparer(keySelector(x), keySelector(item))) < 0)
				{
					stack.push(item)
				}
			}
			for (const item of stack) yield item
		}
		type.elementAt ??= function (index)
		{
			const ret = this.elementAtOrDefault(index);
			if (ret == null) throw 'Yield no result'
			return ret;
		}
		type.elementAtOrDefault ??= function (index)
		{
			for (const item of this)
			{
				if (index === 0) return item;
				index--;
			}
			return null;
		}
		type.except ??= function* (source, comparer)
		{
			comparer ??= Object.is
			const compares = []
			for (const item of source)
			{
				compares.push(item)
			}
			for (const item of this)
			{
				if (compares.findIndex(x => comparer(x, item)) < 0)
				{
					yield item
					compares.push(item)
				}
			}
		}
		type.exceptBy ??= function* (source, keySelector, comparer)
		{
			comparer ??= Object.is
			const compares = []
			for (const item of source)
			{
				compares.push(item)
			}
			for (const item of this)
			{
				if (compares.findIndex(x => comparer(keySelector(x), keySelector(item))) < 0)
				{
					yield item
					compares.push(item)
				}
			}
		}
		type.first ??= function (predicate)
		{
			const ret = this.firstOrDefault(predicate);
			if (ret == null) throw 'Yield no result'
			return ret;
		}
		type.firstOrDefault ??= function (predicate, defaultValue)
		{
			predicate ??= () => true;
			if (typeof (predicate) != 'function')
			{
				defaultValue = predicate;
				predicate = () => true;
			}
			for (const item of this) if (predicate(item)) return item;
			return defaultValue;
		}
		type.groupBy ??= function* (keySelector)
		{
			let map = new Map();
			for (const item of this)
			{
				const key = keySelector(item);
				let cache = map.get(key);
				if (cache === undefined)
				{
					cache = [];
					cache.key = key;
					map.set(key, cache)
				}
				cache.push(item)
			}
			for (let value of map.values()) yield value
		}
		type.last ??= function (predicate)
		{
			const ret = this.lastOrDefault(predicate)
			if (ret == null) throw 'Yield no result'
			return ret;
		}
		type.lastOrDefault ??= function (predicate, defaultValue)
		{
			predicate ??= () => true;
			if (typeof (predicate) != 'function')
			{
				defaultValue = predicate;
				predicate = () => true;
			}
			let last = defaultValue;
			for (const item of this)
			{
				if (predicate(item)) last = item;
			}
			return last;
		}
		type.order ??= function* (comparer)
		{
			comparer ??= (left, right) => left - right
			const stack = []
			for (const item of this)
			{
				const index = stack.findIndex(x => comparer(item, x) <= 0)
				if (index < 0)
				{
					stack.push(item)
				}
				else
				{
					stack.splice(index, 0, item)
				}
			}
			for (const item of stack) yield item
		}
		type.orderBy ??= function* (keySelector, comparer)
		{
			comparer ??= (left, right) => left - right
			const stack = []
			for (const item of this)
			{
				const index = stack.findIndex(x => comparer(keySelector(item), keySelector(x)) <= 0)
				if (index < 0)
				{
					stack.push(item)
				}
				else
				{
					stack.splice(index, 0, item)
				}
			}
			for (const item of stack) yield item
		}
		type.orderDescending ??= function* (comparer)
		{
			comparer ??= (left, right) => left - right
			const stack = []
			for (const item of this)
			{
				const index = stack.findIndex(x => comparer(item, x) >= 0)
				if (index < 0)
				{
					stack.push(item)
				}
				else
				{
					stack.splice(index, 0, item)
				}
			}
			for (const item of stack) yield item
		}
		type.orderByDescending ??= function* (keySelector, comparer)
		{
			comparer ??= (left, right) => left - right
			const stack = []
			for (const item of this)
			{
				const index = stack.findIndex(x => comparer(keySelector(item), keySelector(x)) >= 0)
				if (index < 0)
				{
					stack.push(item)
				}
				else
				{
					stack.splice(index, 0, item)
				}
			}
			for (const item of stack) yield item
		}
		type.prepend ??= function* (element)
		{
			yield element;
			for (const item of this) yield item
		}
		type.reverse ??= function* ()
		{
			const arr = []
			for (const item of this)
			{
				arr.push(item)
			}
			while (arr.length > 0)
			{
				yield arr.pop()
			}
		}
		type.select ??= function* (selector)
		{
			let index = 0
			for (const item of this)
			{
				yield selector(item, index++)
			}
		}
		type.selectMany ??= function* (selector)
		{
			for (const item of this)
			{
				for (let sub of selector(item))
				{
					yield sub
				}
			}
		}
		type.single ??= function (predicate)
		{
			const ret = this.singleOrDefault(predicate)
			if (ret == null) throw 'Yield no result'
			return ret;
		}
		type.singleOrDefault ??= function (predicate, defaultValue)
		{
			predicate ??= () => true
			if (typeof (predicate) != 'function')
			{
				defaultValue = predicate;
				predicate = () => true;
			}
			let single = defaultValue
			for (const item of this)
			{
				if (predicate(item))
				{
					if (single != null) throw 'Duplicate item of single'
					single = item;
				}
			}
			return single
		}
		type.skip ??= function* (count)
		{
			for (const item of this)
			{
				count--;
				if (count < 0)
				{
					yield item
				}
			}
		}
		type.skipLast ??= function* (count)
		{
			const stack = []
			for (const item of this)
			{
				stack.push(item)
				if (stack.length > count)
				{
					yield stack.shift()
				}
			}
		}
		type.skipWhile ??= function* (predicate)
		{
			let start = false
			for (const item of this)
			{
				if (start) yield item
				else if (predicate(item)) start = true;
			}
		}
		type.take ??= function* (count)
		{
			const start = Number.isInteger(count) ? 0 : count[0]
			const num = Number.isInteger(count) ? count : count[1] > 0 ? count[1] - start : count[1];
			let begin = 0;
			let accumulate = 0;
			if (num > 0)
			{
				for (const item of this)
				{
					if (begin >= start)
					{
						if (accumulate < num)
						{
							yield item
							accumulate++;
						}
						if (accumulate >= num) return
					}
					begin++;
				}

				throw 'Not satisfied'

			}
			else
			{
				let queue = []
				for (const item of this)
				{
					if (begin >= start)
					{
						queue.push(item)
						if (queue.length >= -num)
						{
							yield queue.shift()
						}
					}
					begin++;
				}
			}
		}
		type.takeLast ??= function* (count)
		{
			const stack = []
			for (const item of this)
			{
				stack.push(item)
				if (stack.length > count)
				{
					stack.shift()
				}
			}
			for (const item of stack)
			{
				yield item
			}
		}
		type.takeWhile ??= function* (predicate)
		{
			let index = 0;
			for (const item of this)
			{
				if (!predicate(item, index)) return;
				yield item
				index++;
			}
		}
		type.toArray ??= function ()
		{
			const ret = [];
			for (const item of this)
			{
				ret.push(item)
			}
			return ret
		}
		type.union ??= function* (source, comparer)
		{
			comparer ??= Object.is
			const union = []
			for (const item of this)
			{
				if (union.findIndex(x => comparer(x, item)) < 0)
				{
					union.push(item)
				}
			}
			for (const item of source)
			{
				if (union.findIndex(x => comparer(x, item)) < 0)
				{
					union.push(item)
				}
			}
			for (const item of union)
			{
				yield item
			}
		}
		type.unionBy ??= function* (source, keySelector, comparer)
		{
			comparer ??= Object.is
			const union = []
			for (const item of this)
			{
				if (union.findIndex(x => comparer(keySelector(x), keySelector(item))) < 0)
				{
					union.push(item)
				}
			}
			for (const item of source)
			{
				if (union.findIndex(x => comparer(keySelector(x), keySelector(item))) < 0)
				{
					union.push(item)
				}
			}
			for (const item of union)
			{
				yield item
			}
		}
		type.where ??= function* (predicate)
		{
			let count = 0
			for (const item of this)
			{
				if (predicate(item, count++)) yield item
			}
		}
	})((function* ()
	{
		yield
	})()
	   .__proto__
	   .__proto__);

	globalThis.KeyValuePair = class
	{
		constructor(key, value)
		{
			if (key == null) throw "key is required";
			/*this.key = key;
			this.value = value;
			Object.freeze(this);*/
			Object.defineProperty(this, 'key', {
				get()
				{
					return key;
				},
				set(_)
				{
					throw 'KeyValuePair is readonly'
				}
			})
			Object.defineProperty(this, 'value', {
				get()
				{
					return value;
				},
				set(_)
				{
					throw 'KeyValuePair is readonly'
				}
			})
		}
	};

	(function (type)
	{
		Object.defineProperty(type, 'count', {
			get()
			{
				return this.length;
			}
		})
		type.add ??= function (item)
		{
			this.push(item);
		};
		type.addRange ??= function (items)
		{
			for (const item of items)
			{
				this.push(item);
			}
		};
		type.aggregate ??= function (seed, func)
		{
			return this.reduce(func, seed);
		};
		type.all ??= function (predicate)
		{
			return this.every(predicate);
		};
		type.any ??= function (predicate)
		{
			predicate ??= () => true;
			for (let i = 0; i < this.length; i++)
			{
				if (predicate(this[i]))
				{
					return true;
				}
			}
			return false;
		};
		type.append ??= function (element)
		{
			return this.asEnumerable().append(element)
		}
		type.asEnumerable ??= function* ()
		{
			for (const item of this) yield item;
		}
		type.chunk ??= function (size)
		{
			return this.asEnumerable().chunk(size)
		}
		type.clear ??= function ()
		{
			this.splice(0, this.length)
		};
		type.contains ??= function (item)
		{
			return this.findIndex((x) => Object.is(x, item)) > -1;
		};
		type.distinct ??= function (comparer)
		{
			return this.asEnumerable().distinct(comparer)
		};
		type.distinctBy ??= function (selector, comparer)
		{
			return this.asEnumerable().distinctBy(selector, comparer)
		}
		type.elementAt ??= function (index)
		{
			return this[index]
		};
		type.elementAtOrDefault ??= function (index)
		{
			return this[index]
		}
		type.except ??= function (source, comparer)
		{
			return this.asEnumerable().except(source, comparer)
		};
		type.exceptBy ??= function (source, keySelector, comparer)
		{
			return this.asEnumerable().exceptBy(source, keySelector, comparer)
		}
		type.exists ??= function (predicate)
		{
			return this.firstOrDefault(predicate) != null;
		}
		type.findAll ??= function (match)
		{
			return this.where(match).toArray();
		}
		type.first ??= function (predicate)
		{
			return this.asEnumerable().first(predicate)
		}
		type.firstOrDefault ??= function (predicate, defaultValue)
		{
			return this.asEnumerable().firstOrDefault(predicate, defaultValue)
		}
		type.getRange ??= function (start, count)
		{
			return this.slice(start, count + start)
		}
		type.groupBy ??= function* (keySelector)
		{
			let map = new Map();
			for (let item of this)
			{
				const key = keySelector(item);
				let cache = map.get(key);
				if (cache === undefined)
				{
					cache = [];
					cache.key = key;
					map.set(key, cache)
				}
				cache.push(item)
			}
			for (let value of map.values())
			{
				yield value
			}
		}
		type.insert ??= function (index, item)
		{
			this.splice(index, 0, item)
		};
		type.last ??= function (predicate)
		{
			return this.asEnumerable().last(predicate)
		}
		type.lastOrDefault ??= function (predicate, defaultValue)
		{
			return this.asEnumerable().lastOrDefault(predicate, defaultValue)
		}
		type.order ??= function (comparer)
		{
			return this.asEnumerable().order(comparer)
		};
		type.orderDescending ??= function (comparer)
		{
			return this.asEnumerable().orderDescending(comparer)
		};
		type.orderBy ??= function (selector, comparer)
		{
			return this.asEnumerable().orderBy(selector, comparer)
		};
		type.orderByDescending ??= function (selector, comparer)
		{
			return this.asEnumerable().orderByDescending(selector, comparer)
		};
		type.prepend ??= function (element)
		{
			return this.asEnumerable().prepend(element)
		}
		type.remove ??= function (item)
		{
			let index = this.findIndex((x) => Object.is(x, item));
			return index > -1 ? !!this.splice(index, 1) : false;
		};
		type.removeAll ??= function (predicate)
		{
			let index = 0,
				count = 0;
			while (index < this.length)
			{
				if (predicate(this[index]))
				{
					this.splice(index, 1);
					count++;
				}
				else
				{
					index++;
				}
			}
			return count;
		};
		type.removeAt ??= function (index)
		{
			return this.splice(index, 1)[0];
		};
		type.select ??= function (selector)
		{
			return this.asEnumerable().select(selector)
		};
		type.selectMany ??= function (selector)
		{
			return this.asEnumerable().selectMany(selector)
		};
		type.single ??= function (predicate)
		{
			return this.asEnumerable().single(predicate)
		};
		type.singleOrDefault ??= function (predicate, defaultValue)
		{
			return this.asEnumerable().singleOrDefault(predicate, defaultValue)
		};
		type.skip ??= function (count)
		{
			return this.asEnumerable().skip(count)
		};
		type.skipLast ??= function (count)
		{
			return this.asEnumerable().skipLast(count)
		};
		type.skipWhile ??= function (predicate)
		{
			return this.asEnumerable().skipWhile(predicate)
		};
		type.take ??= function (countOrRange)
		{
			return this.asEnumerable().take(countOrRange)
		};
		type.takeLast ??= function (count)
		{
			return this.asEnumerable().takeLast(count)
		};
		type.takeWhile ??= function (predicate)
		{
			return this.asEnumerable().takeWhile(predicate)
		};
		type.toArray ??= function ()
		{
			return this;
		}
		type.toDictionary ??= function (keySelector, valueSelector)
		{
			let ret = new Map();
			this.forEach((x) =>
						 {
							 ret.set(keySelector(x), valueSelector(x));
						 });
			return ret;
		};
		type.union ??= function (source, comparer)
		{
			return this.asEnumerable().union(source, comparer)
		};
		type.unionBy ??= function (source, keySelector, comparer)
		{
			return this.asEnumerable().unionBy(source, keySelector, comparer)
		};
		type.where ??= function (predicate)
		{
			return this.asEnumerable().where(predicate)
		};
	})(globalThis.Array.prototype);

	(function (type)
	{
		type.containsKey ??= function (key)
		{
			return this.has(key);
		};
		type.containsValue ??= function (value)
		{
			let iter = this.entries();
			let item = iter.next();
			while (!item.done)
			{
				if (Object.is(item.value[1], value))
				{
					return true;
				}
				item = iter.next();
			}
			return false;
		};
		type.tryAdd ??= function (key, value)
		{
			return !(this.has(key) || !this.set(key, value));
		};
		type.tryGetValue ??= function (key, valueGetter)
		{
			let ret = this.get(key);
			valueGetter(ret);
			return ret != null;
		};
	})(globalThis.Map.prototype)

})();
