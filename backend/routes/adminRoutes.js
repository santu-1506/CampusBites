const express = require('express');
const router = express.Router();
const { getTotalCounts, getMonthlyUserCount, getUserCountByRole, getTopUsersBySpending, getUsersByRoleList, getMonthlyOrders, getOrdersByCampusCanteen, getOrderStatusBreakdown, getTopCanteensByOrderVolume, getAverageOrderValue, getPeakOrderTimes, getTotalRevenue, getRevenueByPaymentMethod, getDailyRevenue, getWeeklyRevenue, getMonthlyRevenue, banUser, suspendCanteen, adminRateVendor, getRevenueByCampusAndCanteen, getTopCampusesByRevenue, getTopCanteensByRevenue } = require('../controllers/adminController');

router.get('/totals', getTotalCounts);
router.get('/users/monthly', getMonthlyUserCount);
router.get('/users/count-by-role', getUserCountByRole);
router.get('/users/top-spenders', getTopUsersBySpending);
router.get('/users/list-by-role', getUsersByRoleList);
router.get('/orders/monthly', getMonthlyOrders);
router.get('/orders/by-campus-canteen', getOrdersByCampusCanteen);
router.get('/orders/status-wise', getOrderStatusBreakdown);
router.get('/orders/top-tcanteens', getTopCanteensByOrderVolume);
router.get('/orders/average-order-value', getAverageOrderValue);
router.get('/orders/peak-hours', getPeakOrderTimes);  
router.get('/revenue/total', getTotalRevenue);
router.get('/revenue/by-campus-canteen', getRevenueByCampusAndCanteen);
router.get('/revenue/top-canteens', getTopCanteensByRevenue);
router.get('/revenue/top-campuses', getTopCampusesByRevenue);
router.get('/revenue/payment-breakdown', getRevenueByPaymentMethod);
router.get('/revenue/daily', getDailyRevenue);
router.get('/revenue/weekly', getWeeklyRevenue);
router.get('/revenue/monthly', getMonthlyRevenue);
router.post('/banUser', banUser);
router.post('/suspendCanteen', suspendCanteen);
router.post('/rateVendors', adminRateVendor);

module.exports = router;
