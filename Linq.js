(function ()
{
	(function (type)
	{
		type.aggregate ??= function (seed, accumulate)
		{
			for (const item of this) seed = accumulate(seed, item)
			return seed;
		}
		type.all ??= function (match)
		{
			for (const item of this) if (!match(item)) return false;
			return true;
		}
		type.any ??= function (match)
		{
			return this.firstOrDefault(match) !== null;
		}
		type.append ??= function* (item)
		{
			for (const item of this) yield item
			yield item
		}
		type.count ??= function (match)
		{
			match ??= () => true;
			let count = 0;
			for (const item of this) if (match(item)) count++;
			return count;
		}
		type.concat ??= function* (source)
		{
			for (const item of this) yield item
			for (const item of source) yield item
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
		type.distinctBy ??= function* (selector, comparer)
		{
			comparer ??= Object.is;
			const stack = []
			for (const item of this)
			{
				if (stack.findIndex(x => comparer(selector(x), selector(item))) < 0)
				{
					stack.push(item)
				}
			}
			for (const item of stack) yield item
		}
		type.first ??= function (match)
		{
			const ret = this.firstOrDefault(match);
			if (ret == null) throw 'Yield no result'
			return ret;
		}
		type.firstOrDefault ??= function (match)
		{
			match ??= () => true;
			for (const item of this)
			{
				if (match(item)) return item;
			}
		}
		type.forEach ??= function (action)
		{
			for (const item of this)
			{
				action(item)
			}
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
		type.last ??= function (match)
		{
			const ret = this.lastOrDefault(match)
			if (ret == null) throw 'Yield no result'
			return ret;
		}
		type.lastOrDefault ??= function (match)
		{
			match ??= () => true;
			let last = null;
			for (const item of this)
			{
				if (match(item)) last = item;
			}
			return last;
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
		type.takeWhile ??= function* (match)
		{
			let index = 0;
			for (const item of this)
			{
				if (!match(item, index)) return;
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
		type.where ??= function* (match)
		{
			for (const item of this)
			{
				if (match(item)) yield item
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
			items.forEach(
			(x) =>
			{
				this.push(x);
			});
		};
		type.aggregate ??= function (seed, func)
		{
			return this.reduce(func, seed);
		};
		type.all ??= function (match)
		{
			return this.every(match);
		};
		type.any ??= function (match)
		{
			match ??= () => true;
			for (let i = 0; i < this.length; i++)
			{
				if (match(this[i]))
				{
					return true;
				}
			}
			return false;
		};
		type.asEnumerable ??= function* ()
		{
			for (const item of this) yield item;
		}
		type.clear ??= function ()
		{
			while (this.length > 0)
			{
				this.pop();
			}
		};
		type.contains ??= function (item)
		{
			return this.findIndex((x) => Object.is(x, item)) > -1;
		};
		type.distinct ??= function (comparer)
		{
			comparer ??= Object.is;
			let ret = [];
			this.forEach((x) =>
						 {
							 if (ret.findIndex((i) => comparer(x, i)) < 0)
							 {
								 ret.push(x);
							 }
						 });
			return ret;
		};
		type.exists ??= function (match)
		{
			return this.firstOrDefault(match) != null;
		}
		type.findAll ??= function (match)
		{
			return this.where(match).toArray();
		}
		type.first ??= function (match)
		{
			return this.asEnumerable().first(match)
		}
		type.firstOrDefault ??= function (match)
		{
			return this.asEnumerable().firstOrDefault(match)
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
		type.last ??= function (match)
		{
			return this.asEnumerable().last(match)
		}
		type.lastOrDefault ??= function (match)
		{
			return this.asEnumerable().lastOrDefault(match)
		}
		type.remove ??= function (item)
		{
			let index = this.findIndex((x) => Object.is(x, item));
			return index > -1 ? !!this.splice(index, 1) : false;
		};
		type.removeAll ??= function (match)
		{
			let index = 0,
				count = 0;
			while (index < this.length)
			{
				if (match(this[index]))
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
		type.select ??= function* (selector)
		{
			let index = 0;
			for (const item of this)
			{
				yield selector(item, index++)
			}
		};
		type.selectMany ??= function* (selector)
		{
			for (let i = 0; i < this.length; i++)
			{
				for (let item of selector(this[i], i))
				{
					yield item
				}
			}
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
		type.orderBy ??= function (selector)
		{
			return this.sort(
			function (a, b)
			{
				return selector(a) - selector(b);
			});
		};
		type.orderByDescending ??= function (selector)
		{
			return this.sort(
			function (a, b)
			{
				return selector(b) - selector(a);
			});
		};
		type.where ??= function* (match)
		{
			for (let i = 0; i < this.length; i++)
			{
				const curr = this[i]
				if (match(curr, i))
				{
					yield curr;
				}
			}
		};
	})(Array.prototype);


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
	})(Map.prototype)


})();
