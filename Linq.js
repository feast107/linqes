(function ()
{
	(function (type)
	{
		type.any ??= function (match)
		{
			return this.firstOrDefault(match) !== null;
		}
		type.all ??= function (match)
		{
			let item = this.next();
			while (!item.done)
			{
				if (!match(item.value)) return false;
				item = this.next();
			}
			return true;
		}
		type.count ??= function (match)
		{
			match ??= () => true;
			let count = 0;
			let item = this.next();
			while (!item.done)
			{
				if (match(item.value)) count++;
				item = this.next();
			}
			return count;
		}
		type.concat ??= function* (source)
		{
			for (const item of this)
			{
				yield item
			}
			for (const item of source)
			{
				yield item
			}
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
			let item = this.next();
			while (!item.done)
			{
				if (match(item.value)) return item.value;
				item = this.next();
			}
		}
		type.forEach ??= function (action)
		{
			let item = this.next();
			while (!item.done)
			{
				action(item.value)
				item = this.next();
			}
		}
		type.groupBy ??= function* (keySelector)
		{
			let map = new Map();
			let item = this.next();
			while (!item.done)
			{
				const key = keySelector(item.value);
				let cache = map.get(key);
				if (cache === undefined)
				{
					cache = [];
					cache.key = key;
					map.set(key, cache)
				}
				cache.push(item.value)
				item = this.next();
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
			let item = this.next();
			while (!item.done)
			{
				if (match(item.value)) last = item.value;
				item = this.next();
			}
			return last;
		}
		type.reverse ??= function* ()
		{
			const arr = []
			let item = this.next();
			while (!item.done)
			{
				arr.push(item.value)
				item = this.next();
			}
			while (arr.length > 0)
			{
				yield arr.pop()
			}
		}
		type.select ??= function* (selector)
		{
			let item = this.next();
			while (!item.done)
			{
				yield selector(item.value)
				item = this.next();
			}
		}
		type.selectMany ??= function* (selector)
		{
			let item = this.next();
			while (!item.done)
			{
				for (let sub of selector(item.value))
				{
					yield sub
				}
				item = this.next();
			}
		}
		type.toArray ??= function ()
		{
			const ret = [];
			let item = this.next();
			while (!item.done)
			{
				ret.push(item.value)
				item = this.next();
			}
			return ret
		}
		type.where ??= function* (match)
		{
			let item = this.next();
			while (!item.done)
			{
				const value = item.value;
				if (match(value)) yield value
				item = this.next();
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
			return this.select(x => x).first(match)
		}
		type.firstOrDefault ??= function (match)
		{
			return this.select(x => x).firstOrDefault(match)
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
			return this.select(x => x).last(match)
		}
		type.lastOrDefault ??= function (match)
		{
			return this.select(x => x).lastOrDefault(match)
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
