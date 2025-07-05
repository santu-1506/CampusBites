const Canteen = require("../models/Canteen");
// const Review = require("../models/Review"); // Temporarily remove dependency

const simpleHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

exports.getAllCanteens = async (req, res) => {
  try {
    const canteens = await Canteen.find();

    const canteensWithDetails = canteens.map(canteen => {
        // const reviews = await Review.find({ canteen: canteen._id });
        // const totalRating = reviews.reduce(
        //   (acc, review) => acc + (review ? review.rating : 0),
        //   0
        // );
        // const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
        
        const canteenIdStr = canteen._id.toString();
        const hash = simpleHash(canteenIdStr);

        return {
          ...canteen.toObject(),
          rating: ((hash % 15) / 10 + 3.5).toFixed(1), // Placeholder rating
          deliveryTime: `${(hash % 20) + 10}-${(hash % 20) + 25} min`,
          distance: `${((hash % 17) / 10 + 0.3).toFixed(1)} km`,
          image: "/placeholder.svg?height=200&width=300",
          discount: (hash % 3) === 0 ? "20% OFF" : undefined,
          featured: (hash % 2) === 0,
        };
      });

    res.status(200).json({
      success: true,
      data: canteensWithDetails,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

exports.getCanteenById = async (req, res) => {
  try {
    const canteen = await Canteen.findById(req.params.id);
    if (!canteen) {
      return res.status(404).json({ success: false, message: "Canteen not found" });
    }

    // const reviews = await Review.find({ canteen: canteen._id });
    // const totalRating = reviews.reduce((acc, review) => acc + (review ? review.rating : 0), 0);
    // const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

    const canteenIdStr = canteen._id.toString();
    const hash = simpleHash(canteenIdStr);

    const canteenWithDetails = {
      ...canteen.toObject(),
      rating: ((hash % 15) / 10 + 3.5).toFixed(1), // Placeholder rating
      deliveryTime: `${(hash % 20) + 10}-${(hash % 20) + 25} min`,
      distance: `${((hash % 17) / 10 + 0.3).toFixed(1)} km`,
      image: "/placeholder.svg?height=200&width=300",
      discount: (hash % 3) === 0 ? "20% OFF" : undefined,
      featured: (hash % 2) === 0,
    };

    res.status(200).json({
      success: true,
      data: canteenWithDetails,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
}; 