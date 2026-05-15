-- Drop existing tables to ensure correct structure
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Users;

-- Create Users Table
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Categories Table
CREATE TABLE Categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    userId INT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);

-- Create Products Table
CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    discountPrice DECIMAL(10, 2) DEFAULT 0.00,
    stock INT NOT NULL DEFAULT 0,
    image VARCHAR(255),
    categoryId INT NOT NULL,
    userId INT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categoryId) REFERENCES Categories(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);

-- Create Orders Table
CREATE TABLE Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    orderItems JSON NOT NULL,
    shippingAddress JSON NOT NULL,
    totalPrice DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    status ENUM('pending', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);

-- Sample Data Insertions
INSERT INTO Users (name, email, password, role) VALUES 
('Admin', 'admin@stylegen.com', '$2b$10$WJv6kmRERSgc0O3LKN7c5.imj2Fe6kiLE8xagY9a5pPZkTdIlKzGq', 'admin');

-- Insert 8 Categories
INSERT INTO Categories (name, description, userId) VALUES 
('Shoes', 'Premium footwear collection', 1),
('Wallet', 'Executive leather wallets', 1),
('Bags', 'Artisanal travel bags', 1),
('Belt', 'Classic formal belts', 1),
('T-Shirt', 'Casual cotton collection', 1),
('Watch', 'Timeless chronographs', 1),
('Sunglasses', 'Designer eyewear', 1),
('Cap', 'Minimalist headwear', 1);

-- Insert 8 Mock Products with DIFFERENT images
INSERT INTO Products (name, description, price, stock, image, categoryId, userId) VALUES 
('Original Leather Loafer', 'Premium handcrafted leather shoes.', 1200.00, 50, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800', 1, 1),
('Leather Bi-fold Wallet', 'Elegant slim leather wallet.', 750.00, 100, 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800', 2, 1),
('Handcrafted Travel Bag', 'Spacious leather bag.', 3800.00, 15, 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800', 3, 1),
('Formal Leather Belt', 'Classic professional belt.', 990.00, 80, 'https://images.unsplash.com/photo-1614165939020-f71f168ba256?auto=format&fit=crop&w=800', 4, 1),
('Cotton Comfort T-Shirt', 'Soft cotton daily t-shirt.', 550.00, 200, 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800', 5, 1),
('Classic Chronograph Watch', 'Timeless timepiece.', 4500.00, 25, 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800', 6, 1),
('Aviator Sunglasses', 'Stylish UV protection.', 1500.00, 40, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800', 7, 1),
('Minimalist Baseball Cap', 'Modern casual cap.', 450.00, 120, 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800', 8, 1);
