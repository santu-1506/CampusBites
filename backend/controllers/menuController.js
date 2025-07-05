const Item = require("../models/Item");

exports.getMenuByCanteen = async (req, res) => {
  try {
    const { canteenId } = req.params;
    const menuItems = await Item.find({ canteen: canteenId });

    res.status(200).json({
      success: true,
      data: menuItems,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const { itemId } = req.params;
    const item = await Item.findById(itemId).populate('canteen', 'name');

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
}; 