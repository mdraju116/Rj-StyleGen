import { sequelize } from "./src/config/database.js";
import dotenv from "dotenv";
import User from "./src/models/userModel.js";
import Product from "./src/models/productModel.js";
import Category from "./src/models/categoryModel.js";
import bcrypt from "bcrypt";

dotenv.config();

const seedData = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected for seeding...");

        await sequelize.sync({ alter: true });
        console.log("Database synced.");

        // 1. Create Admin if not exists
        let admin = await User.findOne({ where: { email: "admin@stylegen.com" } });
        if (!admin) {
            const hashedPassword = await bcrypt.hash("admin123", 10);
            admin = await User.create({
                name: "StyleGen Admin",
                email: "admin@stylegen.com",
                password: hashedPassword,
                role: "admin",
            });
            console.log("Admin created: admin@stylegen.com / admin123");
        }

        // 2. Create 8 Categories as requested
        const categories = ["Shoes", "Wallet", "Bags", "Belt", "T-Shirt", "Watch", "Sunglasses", "Cap"];
        const categoryDocs = {};

        for (const name of categories) {
            let cat = await Category.findOne({ where: { name } });
            if (!cat) {
                cat = await Category.create({ name, description: `${name} artisanal collection`, userId: admin.id });
            }
            categoryDocs[name] = cat;
        }
        console.log("Categories ready.");

        // 3. Create Mock Products for all categories
        const products = [
            { name: "Original Leather Loafer", description: "Premium handcrafted leather shoes.", price: 1200, discountPrice: 1499, stock: 50, categoryId: categoryDocs["Shoes"].id, userId: admin.id },
            { name: "Leather Bi-fold Wallet", description: "Elegant slim leather wallet.", price: 750, discountPrice: 950, stock: 100, categoryId: categoryDocs["Wallet"].id, userId: admin.id },
            { name: "Handcrafted Travel Bag", description: "Spacious leather bag.", price: 3800, discountPrice: 4500, stock: 15, categoryId: categoryDocs["Bags"].id, userId: admin.id },
            { name: "Formal Leather Belt", description: "Classic professional belt.", price: 990, discountPrice: 1200, stock: 80, categoryId: categoryDocs["Belt"].id, userId: admin.id },
            { name: "Cotton Comfort T-Shirt", description: "Soft cotton daily t-shirt.", price: 550, discountPrice: 800, stock: 200, categoryId: categoryDocs["T-Shirt"].id, userId: admin.id },
            { name: "Classic Chronograph Watch", description: "Timeless timepiece.", price: 4500, discountPrice: 5500, stock: 25, categoryId: categoryDocs["Watch"].id, userId: admin.id },
            { name: "Aviator Sunglasses", description: "Stylish UV protection.", price: 1500, discountPrice: 1800, stock: 40, categoryId: categoryDocs["Sunglasses"].id, userId: admin.id },
            { name: "Minimalist Baseball Cap", description: "Modern casual cap.", price: 450, discountPrice: 600, stock: 120, categoryId: categoryDocs["Cap"].id, userId: admin.id }
        ];

        for (const p of products) {
            const exists = await Product.findOne({ where: { name: p.name } });
            if (!exists) {
                await Product.create(p);
            }
        }

        console.log("Database seeded successfully with all 8 categories!");
        process.exit();
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedData();
