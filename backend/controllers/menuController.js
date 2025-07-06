const mongoose = require("mongoose");

// Create a Menu model based on what I see in the database
const MenuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, default: "" },
    category: { type: String, default: "General" },
    canteen: { type: mongoose.Schema.Types.ObjectId, ref: "Canteen", required: true },
    isVeg: { type: Boolean, default: true },
    image: { type: String, default: "" },
    available: { type: Boolean, default: true },
    __v: { type: Number, default: 0 }
}, { timestamps: true });

const Menu = mongoose.model("Menu", MenuSchema);

// Get menu items by canteen ID
exports.getMenuByCanteenId = async (req, res) => {
    try {
        const { canteenId } = req.params;

        // Find menu items associated with the canteen
        const menuItems = await Menu.find({ canteen: canteenId })
            .populate("canteen", "name")
            .select("-__v");

        res.status(200).json({ 
            success: true,
            data: menuItems,
            count: menuItems.length
        });
    } catch (error) {
        console.error("Error fetching menu items:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Create new menu item
exports.createMenuItem = async (req, res) => {
    try {
        const { name, price, description, category, canteen, isVeg, image } = req.body;

        if (!name || !price || !canteen) {
            return res.status(400).json({ message: "Name, price, and canteen are required" });
        }

        const newMenuItem = await Menu.create({
            name,
            price,
            description,
            category,
            canteen,
            isVeg: isVeg || true,
            image
        });

        res.status(201).json({ 
            message: "Menu item created successfully", 
            data: newMenuItem 
        });
    } catch (error) {
        console.error("Error creating menu item:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Update menu item
exports.updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const menuItem = await Menu.findByIdAndUpdate(
            id, 
            updateData, 
            { new: true, runValidators: true }
        );

        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        res.status(200).json({ 
            message: "Menu item updated successfully", 
            data: menuItem 
        });
    } catch (error) {
        console.error("Error updating menu item:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Delete menu item
exports.deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;

        const menuItem = await Menu.findByIdAndDelete(id);

        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        res.status(200).json({ message: "Menu item deleted successfully" });
    } catch (error) {
        console.error("Error deleting menu item:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}; 