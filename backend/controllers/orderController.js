const Order = require('../models/Order');

// @desc    Get logged in user's orders
// @route   GET /api/v1/orders
// @access  Private
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ student: req.user.id })
            .populate('canteen', 'name')
            .populate('items.item', 'name price image')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private
exports.createOrder = async (req, res) => {
    try {
        const { canteen, items, total, payment } = req.body;
        
        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        const order = new Order({
            student: req.user.id,
            canteen,
            items,
            total,
            payment,
        });

        const createdOrder = await order.save();
        res.status(201).json({ success: true, data: createdOrder });

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}; 