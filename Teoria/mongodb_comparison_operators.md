# MongoDB: Comparison Operators to Filter Numbers

## $eq (Equal)
Finds documents where the value is **equal** to the specified value.

```json
{ "edad": { "$eq": 10 } } // Returns all documents where edad equals 10
```

---

## $gt (Greater Than)
Finds documents where the value is **greater** than the specified value.

```json
{ "edad": { "$gt": 5 } } // Returns all documents where edad is greater than 5
```

---

## $lt (Less Than)
Finds documents where the value is **less** than the specified value.

```json
{ "edad": { "$lt": 20 } } // Returns all documents where edad is less than 20
```

---

## $lte and $gte (Less Than or Equal / Greater Than or Equal)
Work the same as `$lt` and `$gt`, but **include** the specified value.

```json
{ "edad": { "$lte": 18 } } // edad is less than or equal to 18
{ "edad": { "$gte": 18 } } // edad is greater than or equal to 18
```

---

## $ne (Not Equal)
Finds documents where the value is **not equal** to the specified value.

```json
{ "edad": { "$ne": 7 } } // Returns all documents where edad is NOT 7
```

---

## Full Example

To find documents in a collection called `clientes` where edad is greater than 18:

```javascript
db.clientes.find({ "edad": { "$gt": 18 } })
```

And if we want to **include people who are exactly 18**?

```javascript
db.clientes.find({ "edad": { "$gte": 18 } })
```