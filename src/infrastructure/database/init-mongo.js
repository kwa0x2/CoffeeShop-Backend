db = db.getSiblingDB('coffee-shop');

db.createCollection("categories");
db.createCollection("products");
db.createCollection("users");