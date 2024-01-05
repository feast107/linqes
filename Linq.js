(function ()
{
	const Generator = (function* ()
	{
		yield
	})()
	.__proto__
	.__proto__;
	Generator.any ??= function (match)
	{
		return this.firstOrDefault(match) !== null;
	}
	Generator.all ??= function (match)
	{
		let item = this.next();
		while (!item.done)
		{
			if (!match(item.value)) return false;
			item = this.next();
		}
		return true;
	}
	Generator.first ??= function (match)
	{
		const ret = this.firstOrDefault(match);
		if (ret == null) throw 'No result'
		return ret;
	}
	Generator.firstOrDefault ??= function (match)
	{
		let item = this.next();
		match ??= () => true;
		while (!item.done)
		{
			if (match(item.value)) return item.value;
			item = this.next();
		}
	}
	Generator.forEach ??= function (action)
	{
		let item = this.next();
		while (!item.done)
		{
			action(item.value)
			item = this.next();
		}
	}
	Generator.groupBy ??= function* (keySelector)
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
	Generator.select ??= function* (selector)
	{
		let item = this.next();
		while (!item.done)
		{
			yield selector(item.value)
			item = this.next();
		}
	}
	Generator.selectMany ??= function* (selector)
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
	Generator.toArray ??= function ()
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
	Generator.where ??= function* (match)
	{
		let item = this.next();
		while (!item.done)
		{
			const value = item.value;
			if (match(value)) yield value
			item = this.next();
		}
	}
	globalThis.KeyValuePair = class
	{
		constructor(key, value)
		{
			if (key == null) throw "key is required";
			this.key = key;
			this.value = value;
			Object.freeze(this);
		}
	};
	Array.prototype.add ??= function (item)
	{
		this.push(item);
	};
	Array.prototype.addRange ??= function (items)
	{
		items.forEach(
		(x) =>
		{
			this.push(x);
		});
	};
	Array.prototype.aggregate ??= function (seed, func)
	{
		return this.reduce(func, seed);
	};
	Array.prototype.all ??= function (match)
	{
		return this.every(match);
	};
	Array.prototype.any ??= function (match)
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
	Array.prototype.clear ??= function ()
	{
		while (this.length > 0)
		{
			this.pop();
		}
	};
	Array.prototype.contains ??= function (item)
	{
		return this.findIndex((x) => x === item) > -1;
	};
	Array.prototype.distinct ??= function (comparer)
	{
		comparer ??= (left, right) => Object.is(left, right);
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
	Array.prototype.groupBy ??= function* (keySelector)
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
	Array.prototype.insert ??= function (index, item)
	{
		this.splice(index, 0, item)
	};
	Array.prototype.remove ??= function (item)
	{
		let index = this.findIndex((x) => Object.is(x, item));
		return index > -1 ? !!this.splice(index, 1) : false;
	};
	Array.prototype.removeAll ??= function (match)
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
	Array.prototype.removeAt ??= function (index)
	{
		return this.splice(index, 1)[0];
	};
	Array.prototype.select ??= function* (selector)
	{
		for (let i = 0; i < this.length; i++)
		{
			yield selector(this[i], i)
		}
	};
	Array.prototype.selectMany ??= function* (selector)
	{
		for (let i = 0; i < this.length; i++)
		{
			for (let item of selector(this[i], i))
			{
				yield item
			}
		}
	};
	Array.prototype.toDictionary ??= function (keySelector, valueSelector)
	{
		let ret = new Map();
		this.forEach((x) =>
					 {
						 ret.set(keySelector(x), valueSelector(x));
					 });
		return ret;
	};
	Array.prototype.orderBy ??= function (selector)
	{
		return this.sort(
		function (a, b)
		{
			return selector(a) - selector(b);
		});
	};
	Array.prototype.orderByDescending ??= function (selector)
	{
		return this.sort(
		function (a, b)
		{
			return selector(b) - selector(a);
		});
	};
	Array.prototype.where ??= function* (match)
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
	Map.prototype.containsKey ??= function (key)
	{
		return this.has(key);
	};
	Map.prototype.containsValue ??= function (value)
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
	Map.prototype.tryAdd ??= function (key, value)
	{
		return !(this.has(key) || !this.set(key, value));
	};
	Map.prototype.tryGetValue ??= function (key, valueGetter)
	{
		let ret = this.get(key);
		valueGetter(ret);
		return ret != null;
	};
})();
