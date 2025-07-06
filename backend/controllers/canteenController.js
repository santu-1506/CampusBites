const Canteen = require("../models/Canteen");
const Campus = require("../models/Campus");
const cloudinary = require("../utils/cloudinary");

// Create Canteen with image support
exports.createCanteen = async (req, res) => {
    try {
        const { name, campus } = req.body;

        if (!name || !campus) {
        return res.status(400).json({ message: "Name and campus are required" });
        }

        // Handle image uploads (if any)
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
        const uploads = await Promise.all(
            req.files.map(file =>
            cloudinary.uploader.upload(file.path, {
                folder: "campus_bites/canteens",
                resource_type: "image",
            })
            )
        );
        imageUrls = uploads.map(upload => upload.secure_url);
        }

        const newCanteen = await Canteen.create({
        name,
        campus,
        owner: req.user?._id || null, // assuming req.user from auth middleware
        images: imageUrls,
        });

        res.status(201).json({ message: "Canteen created successfully", canteen: newCanteen });
    } catch (error) {
        console.error("Error in creating canteen:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.getAllCanteens = async (req, res) => {
    try {
        const { campus } = req.query;

        // Filter: if campus is passed, filter by campus ID
        // Use $ne: true to include canteens where isDeleted is false, null, or undefined
        const filter = { isDeleted: { $ne: true } };
        if (campus) {
        filter.campus = campus; // campus should be ObjectId
        }

        console.log("🔍 Fetching canteens with filter:", filter);
        
        const canteens = await Canteen.find(filter)
        .populate({
            path: "campus",
            select: "name code city",
            strictPopulate: false // Don't fail if campus is null/invalid
        })
        .select("-__v");

        console.log("📋 Found canteens:", canteens.length);
        console.log("🏢 Canteen names:", canteens.map(c => c.name));

        // Transform data to match frontend expectations
        const transformedCanteens = canteens.map(canteen => ({
            ...canteen.toObject(),
            image: canteen.images?.[0] || '/placeholder.jpg' // Use first image as main image
        }));

        res.status(200).json({ 
            success: true,
            data: transformedCanteens,
            count: transformedCanteens.length
        });
    } catch (err) {
        console.error("Error fetching canteens:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.deleteCanteen = async (req, res) => {
    try {
        const { id } = req.params;

        const canteen = await Canteen.findById(id);

        if (!canteen) {
        return res.status(404).json({ message: "Canteen not found" });
        }

        if (canteen.isDeleted) {
        return res.status(400).json({ message: "Canteen already deleted" });
        }

        canteen.isDeleted = true;
        await canteen.save();

        res.status(200).json({ message: "Canteen soft-deleted successfully" });
    } catch (err) {
        console.error("Error deleting canteen:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.updateCanteen = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, isOpen, clearImages } = req.body; // 🆕 added clearImages

        const canteen = await Canteen.findById(id);
        if (!canteen || canteen.isDeleted) {
        return res.status(404).json({ message: "Canteen not found" });
        }

        // 🧹 Clear all images if requested
        if (clearImages === "true") {
        canteen.images = [];
        }

        //  Handle uploaded images
        if (req.files && req.files.length > 0) {
        const uploadPromises = req.files.map(file =>
            cloudinary.uploader.upload(file.path, {
            folder: "campus_bites/canteens",
            })
        );
        const uploaded = await Promise.all(uploadPromises);
        canteen.images = uploaded.map(file => file.secure_url);
        }

        if (name) canteen.name = name;
        if (isOpen !== undefined) canteen.isOpen = isOpen;

        await canteen.save();

        res.status(200).json({ message: "Canteen updated", canteen });
    } catch (error) {
        console.error("Update Canteen Error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


exports.getCanteenById = async (req, res) => {
    try {
        const { id } = req.params;

        const canteen = await Canteen.findOne({ 
            _id: id, 
            isDeleted: { $ne: true } // Use same filter as getAllCanteens
        }).populate({
            path: "campus",
            select: "name code city",
            strictPopulate: false
        });

        if (!canteen) {
        return res.status(404).json({ message: "Canteen not found" });
        }

        // Transform data to match frontend expectations (add image field)
        const transformedCanteen = {
            ...canteen.toObject(),
            image: canteen.images?.[0] || '/placeholder.jpg'
        };

        res.status(200).json({ canteen: transformedCanteen });
    } catch (error) {
        console.error("Fetch Canteen Error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};