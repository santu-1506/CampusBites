const Order = require('../models/Order');
const Menu = require('../models/Menu');
const Canteen = require('../models/Canteen');

// @desc    Get logged in user's orders
// @route   GET /api/orders
// @access  Private
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ student: req.user.id })
            .populate('canteen', 'name')
            .populate('items.item', 'name price image')
            .sort({ createdAt: -1 });

        // Filter out null/undefined items and log for debugging
        const processedOrders = orders.map(order => {
            const processedItems = order.items.map(item => {
                if (!item.item) {
                    console.log(`Missing item reference in order ${order._id}`);
                    return {
                        ...item,
                        item: {
                            _id: 'missing',
                            name: 'Item No Longer Available',
                            price: 0,
                            images: []
                        }
                    };
                }
                return item;
            });
            
            return {
                ...order.toObject(),
                items: processedItems
            };
        });

        res.status(200).json({ success: true, count: processedOrders.length, data: processedOrders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('canteen', 'name')
            .populate('items.item', 'name price image');

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Check if the order belongs to the logged-in user
        if (order.student.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'Not authorized to access this order' });
        }

        // Process items to handle missing references
        const processedItems = order.items.map(item => {
            if (!item.item) {
                console.log(`Missing item reference in order ${order._id}`);
                return {
                    ...item,
                    item: {
                        _id: 'missing',
                        name: 'Item No Longer Available',
                        price: 0,
                        image: null
                    }
                };
            }
            return item;
        });

        const processedOrder = {
            ...order.toObject(),
            items: processedItems
        };

        res.status(200).json({ success: true, data: processedOrder });
    } catch (error) {
        console.error('Error fetching order by ID:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create new order
// @route   POST /api/orders
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