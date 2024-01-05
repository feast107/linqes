# Linq
 Linq extension in javascript

## Example

```js
[1,2,3,4]
    .where(x => x >= 2)
    .select(x => [x,[x * 2,[x * 3]]])
    .selectMany(x => x[1])
    .groupBy(x => x)
    .toArray()
```
