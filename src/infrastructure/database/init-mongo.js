db = db.getSiblingDB('coffee-shop');

db.createCollection("categories");
db.createCollection("products");
db.createCollection("users");

db.products.insertMany([
    {
        "title": "Harika Kahve",
        "category_title": "Kahve",
        "description": "Özel karışım, harika lezzet!",
        "price": 24.99,
        "stock_quantity": 50,
        "origin": "Brezilya",
        "roast_level": "Orta",
        "flavor_notes": ["Çikolata", "Fındık", "Vanilya"]
    },
    {
        "title": "Yoğun Lezzet",
        "category_title": "Kahve",
        "description": "Güçlü ve yoğun aromalar.",
        "price": 29.99,
        "stock_quantity": 30,
        "origin": "Kolombiya",
        "roast_level": "Koyu",
        "flavor_notes": ["Karamel", "Kara Kiraz", "Baharatlı"]
    },
    {
        "title": "Hafif Sipariş",
        "category_title": "Kahve",
        "description": "Hafif ve ferahlatıcı bir deneyim.",
        "price": 19.99,
        "stock_quantity": 40,
        "origin": "Etiyopya",
        "roast_level": "Hafif",
        "flavor_notes": ["Meyve", "Çiçek", "Nane"]
    },
    {
        "title": "Espresso Gücü",
        "category_title": "Kahve",
        "description": "Espresso severler için güçlü bir tercih.",
        "price": 27.99,
        "stock_quantity": 25,
        "origin": "İtalya",
        "roast_level": "Orta-Koyu",
        "flavor_notes": ["Çikolata", "Fındık", "Kavrulmuş Ekmek"]
    },
    {
        "title": "Özel Karışım",
        "category_title": "Kahve",
        "description": "Uzmanlar tarafından özel olarak hazırlanan karışım.",
        "price": 34.99,
        "stock_quantity": 20,
        "origin": "Karışık",
        "roast_level": "Orta",
        "flavor_notes": ["Karışık Notlar"]
    },
    {
        "title": "Doğal Yollarla Yetiştirilmiş",
        "category_title": "Kahve",
        "description": "Kimyasal gübre veya ilaç içermez.",
        "price": 39.99,
        "stock_quantity": 15,
        "origin": "Peru",
        "roast_level": "Hafif",
        "flavor_notes": ["Meyve", "Çiçek", "Ahududu"]
    },
    {
        "title": "Geleneksel Türk Kahvesi",
        "category_title": "Kahve",
        "description": "Türk kahvesi keyfi evinizde!",
        "price": 22.99,
        "stock_quantity": 35,
        "origin": "Türkiye",
        "roast_level": "Orta"
    },
    {
        "title": "Vanilla Dream",
        "category_title": "Kahve",
        "description": "Vanilya sevenler için rüya gibi bir kahve.",
        "price": 31.99,
        "stock_quantity": 28,
        "origin": "Madagaskar",
        "roast_level": "Orta",
        "flavor_notes": ["Vanilya", "Karamel", "Hafif Baharatlı"]
    },
    {
        "title": "Organik Karadeniz",
        "category_title": "Kahve",
        "description": "Doğal ve organik, Karadeniz'in en iyisi.",
        "price": 26.99,
        "stock_quantity": 22,
        "origin": "Türkiye",
        "roast_level": "Orta-Koyu",
        "flavor_notes": ["Çikolata", "Fındık", "Hafif Baharatlı"]
    },
    {
        "title": "Özel Filtrasyon",
        "category_title": "Kahve",
        "description": "Özel filtre yöntemiyle hazırlanmış.",
        "price": 29.99,
        "stock_quantity": 18,
        "origin": "Kenya",
        "roast_level": "Orta",
        "flavor_notes": ["Meyve", "Çiçek", "Şeker Kamışı"]
    },
    {
        "title": "Iced Coffee",
        "category_title": "Kahve",
        "description": "Soğuk kahve keyfi!",
        "price": 17.99,
        "stock_quantity": 45,
        "origin": "Kolombiya",
        "roast_level": "Hafif",
        "flavor_notes": ["Çikolata", "Kara Kiraz", "Buzlu"]
    },
    {
        "title": "Kahve Çikolata Karışımı",
        "category_title": "Kahve",
        "description": "İki lezzet bir arada.",
        "price": 32.99,
        "stock_quantity": 23,
        "origin": "Karışık",
        "roast_level": "Orta-Koyu",
        "flavor_notes": ["Çikolata", "Vanilya", "Fındık"]
    },
    {
        "title": "Bergamot Burst",
        "category_title": "Kahve",
        "description": "Bergamot aromasıyla canlanın!",
        "price": 28.99,
        "stock_quantity": 27,
        "origin": "Kosta Rika",
        "roast_level": "Orta",
        "flavor_notes": ["Bergamot", "Çiçek", "Meyve"]
    },
    {
        "title": "Dark Delight",
        "category_title": "Kahve",
        "description": "Koyu kavrulmuş bir zevk.",
        "price": 36.99,
        "stock_quantity": 16,
        "origin": "Brexit Coffee Co.",
        "roast_level": "Koyu",
        "flavor_notes": ["Koyu Çikolata", "Fındık", "Kavrulmuş Ekmek"]
    },
    {
        "title": "Sürpriz Karışım",
        "category_title": "Kahve",
        "description": "Her fincanda farklı bir lezzet sürprizi!",
        "price": 38.99,
        "stock_quantity": 14,
        "origin": "Dünya Geneli",
        "roast_level": "Orta-Koyu",
        "flavor_notes": ["Karışık Notlar"]
    },
    {
        "title": "Şeker Kamışı Rüyası",
        "category_title": "Kahve",
        "description": "Doğal şeker kamışı notalarıyla tatlı bir deneyim.",
        "price": 30.99,
        "stock_quantity": 31,
        "origin": "Brasil",
        "roast_level": "Orta",
        "flavor_notes": ["Şeker Kamışı", "Vanilya", "Çikolata"]
    },
    {
        "title": "Honey Hike",
        "category_title": "Kahve",
        "description": "Ballı bir yolculuk!",
        "price": 25.99,
        "stock_quantity": 29,
        "origin": "Etiyopya",
        "roast_level": "Hafif",
        "flavor_notes": ["Bal", "Meyve", "Çiçek"]
    },
    {
        "title": "Mocha Magic",
        "category_title": "Kahve",
        "description": "Mocha severler için sihirli bir lezzet.",
        "price": 33.99,
        "stock_quantity": 21,
        "origin": "Gana",
        "roast_level": "Orta-Koyu",
        "flavor_notes": ["Çikolata", "Kahve", "Karamel"]
    },
    {
        "title": "Exotic Espresso",
        "category_title": "Kahve",
        "description": "Espresso sevenler için egzotik bir seçenek.",
        "price": 35.99,
        "stock_quantity": 19,
        "origin": "Endonezya",
        "roast_level": "Koyu",
        "flavor_notes": ["Çikolata", "Baharatlı", "Vanilya"]
    },
    {
        "title": "Tropikal Rüya",
        "category_title": "Kahve",
        "description": "Tropikal meyve notalarıyla dolu bir rüya.",
        "price": 37.99,
        "stock_quantity": 17,
        "origin": "Kosta Rika",
        "roast_level": "Orta",
        "flavor_notes": ["Mango", "Ananas", "Kokos"]
    }
])

print("seeder success")