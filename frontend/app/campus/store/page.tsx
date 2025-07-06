'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Search,
  Filter,
  Store,
  MapPin,
  Clock,
  Loader2,
  Star,
  Phone,
  Mail,
  ExternalLink,
} from 'lucide-react';

interface FoodVendor {
  id: number;
  name: string;
  description: string;
  cuisine: string;
  location: string;
  operatingHours: string;
  rating: number;
  image: string;
  phone: string;
  email: string;
  isOpen: boolean;
  specialties: string[];
  priceRange: 'Budget' | 'Moderate' | 'Premium';
}

export default function CampusStorePage() {
  const [vendors, setVendors] = useState<FoodVendor[]>([]);
  const [filteredVendors, setFilteredVendors] = useState<FoodVendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const { toast } = useToast();

  const cuisines = [
    'all',
    'indian',
    'chinese',
    'italian',
    'continental',
    'fast-food',
    'beverages',
    'desserts',
    'multi-cuisine',
  ];

  const priceRanges = ['all', 'budget', 'moderate', 'premium'];

  useEffect(() => {
    async function fetchVendors() {
      try {
        setIsLoading(true);
        // Simulate API call - replace with actual API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Sample vendor data
        const sampleVendors: FoodVendor[] = [
          {
            id: 1,
            name: 'Spice Garden',
            description:
              'Authentic North Indian cuisine with fresh ingredients and traditional recipes. Famous for butter chicken and naan bread.',
            cuisine: 'indian',
            location: 'Block A, Student Center',
            operatingHours: '9:00 AM - 11:00 PM',
            rating: 4.5,
            image:
              'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
            phone: '+91 98765 43210',
            email: 'spicegarden@campus.edu',
            isOpen: true,
            specialties: ['Butter Chicken', 'Biryani', 'Naan Bread'],
            priceRange: 'Moderate',
          },
          {
            id: 2,
            name: 'Pizza Corner',
            description:
              'Wood-fired pizzas with fresh toppings and crispy crust. Perfect for quick meals and group orders.',
            cuisine: 'italian',
            location: 'Block B, Food Court',
            operatingHours: '11:00 AM - 12:00 AM',
            rating: 4.2,
            image:
              'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
            phone: '+91 98765 43211',
            email: 'pizzacorner@campus.edu',
            isOpen: true,
            specialties: [
              'Margherita Pizza',
              'Pepperoni Pizza',
              'Garlic Bread',
            ],
            priceRange: 'Budget',
          },
          {
            id: 3,
            name: 'Healthy Bites',
            description:
              'Nutritious and delicious meals focused on health-conscious students. Fresh salads and protein-rich options.',
            cuisine: 'continental',
            location: 'Block C, Health Center',
            operatingHours: '7:00 AM - 10:00 PM',
            rating: 4.7,
            image:
              'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',
            phone: '+91 98765 43212',
            email: 'healthybites@campus.edu',
            isOpen: true,
            specialties: ['Quinoa Bowl', 'Grilled Chicken', 'Smoothies'],
            priceRange: 'Premium',
          },
          {
            id: 4,
            name: 'Wok & Roll',
            description:
              'Authentic Chinese cuisine with wok-fried dishes and traditional flavors. Quick service and generous portions.',
            cuisine: 'chinese',
            location: 'Block D, International Hub',
            operatingHours: '10:00 AM - 11:00 PM',
            rating: 4.3,
            image:
              'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop',
            phone: '+91 98765 43213',
            email: 'wokandroll@campus.edu',
            isOpen: false,
            specialties: ['Fried Rice', 'Noodles', 'Spring Rolls'],
            priceRange: 'Budget',
          },
          {
            id: 5,
            name: 'Burger Junction',
            description:
              'Juicy burgers with fresh buns and premium ingredients. Perfect for quick bites between classes.',
            cuisine: 'fast-food',
            location: 'Block E, Sports Complex',
            operatingHours: '10:00 AM - 11:00 PM',
            rating: 4.0,
            image:
              'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop',
            phone: '+91 98765 43214',
            email: 'burgerjunction@campus.edu',
            isOpen: true,
            specialties: ['Classic Burger', 'Chicken Burger', 'French Fries'],
            priceRange: 'Budget',
          },
          {
            id: 6,
            name: 'Coffee House',
            description:
              'Premium coffee and tea with freshly baked pastries. Perfect study spot with comfortable seating.',
            cuisine: 'beverages',
            location: 'Library Building, Ground Floor',
            operatingHours: '7:00 AM - 9:00 PM',
            rating: 4.6,
            image:
              'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
            phone: '+91 98765 43215',
            email: 'coffeehouse@campus.edu',
            isOpen: true,
            specialties: ['Cappuccino', 'Croissants', 'Sandwiches'],
            priceRange: 'Moderate',
          },
          {
            id: 7,
            name: 'Sweet Treats',
            description:
              'Artisanal desserts and pastries made fresh daily. Perfect for celebrations and sweet cravings.',
            cuisine: 'desserts',
            location: 'Block F, Student Union',
            operatingHours: '9:00 AM - 8:00 PM',
            rating: 4.8,
            image:
              'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop',
            phone: '+91 98765 43216',
            email: 'sweettreats@campus.edu',
            isOpen: true,
            specialties: ['Chocolate Cake', 'Ice Cream', 'Cupcakes'],
            priceRange: 'Premium',
          },
          {
            id: 8,
            name: 'Global Kitchen',
            description:
              'Multi-cuisine restaurant offering dishes from around the world. Perfect for diverse taste preferences.',
            cuisine: 'multi-cuisine',
            location: 'Block G, International Center',
            operatingHours: '11:00 AM - 11:00 PM',
            rating: 4.4,
            image:
              'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
            phone: '+91 98765 43217',
            email: 'globalkitchen@campus.edu',
            isOpen: true,
            specialties: ['Pasta', 'Curry', 'Salads'],
            priceRange: 'Moderate',
          },
        ];

        setVendors(sampleVendors);
        setFilteredVendors(sampleVendors);
      } catch (error) {
        console.error('Error fetching vendors:', error);
        toast({
          variant: 'destructive',
          title: 'Failed to load vendors',
          description: 'Please try again later.',
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchVendors();
  }, [toast]);

  useEffect(() => {
    let filtered = vendors;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (vendor) =>
          vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vendor.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          vendor.specialties.some((specialty) =>
            specialty.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Filter by cuisine
    if (selectedCuisine !== 'all') {
      filtered = filtered.filter(
        (vendor) => vendor.cuisine === selectedCuisine
      );
    }

    // Filter by price range
    if (selectedPriceRange !== 'all') {
      filtered = filtered.filter(
        (vendor) => vendor.priceRange.toLowerCase() === selectedPriceRange
      );
    }

    setFilteredVendors(filtered);
  }, [vendors, searchQuery, selectedCuisine, selectedPriceRange]);

  const handleOrderNow = (vendor: FoodVendor) => {
    // Navigate to vendor's menu page or open ordering interface
    toast({
      title: `Ordering from ${vendor.name}`,
      description: 'Redirecting to menu...',
    });
    // Add navigation logic here
  };

  const getPriceRangeColor = (priceRange: string) => {
    switch (priceRange.toLowerCase()) {
      case 'budget':
        return 'bg-green-100 text-green-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'premium':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>
                Campus Food Vendors
              </h1>
              <p className='text-gray-600 mt-1'>
                Discover and order from the best food outlets on campus
              </p>
              <div className='flex items-center gap-4 mt-2 text-sm text-gray-500'>
                <div className='flex items-center gap-1'>
                  <Store className='h-4 w-4' />
                  <span>{filteredVendors.length} vendors available</span>
                </div>
                <div className='flex items-center gap-1'>
                  <Clock className='h-4 w-4' />
                  <span>Order anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className='bg-white border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex flex-col sm:flex-row gap-4'>
            {/* Search */}
            <div className='flex-1'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                <Input
                  placeholder='Search vendors, cuisines, or specialties...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-10'
                />
              </div>
            </div>

            {/* Cuisine Filter */}
            <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
              <SelectTrigger className='w-full sm:w-48'>
                <Filter className='h-4 w-4 mr-2' />
                <SelectValue placeholder='Cuisine' />
              </SelectTrigger>
              <SelectContent>
                {cuisines.map((cuisine) => (
                  <SelectItem key={cuisine} value={cuisine}>
                    {cuisine === 'all'
                      ? 'All Cuisines'
                      : cuisine
                          .split('-')
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Range Filter */}
            <Select
              value={selectedPriceRange}
              onValueChange={setSelectedPriceRange}>
              <SelectTrigger className='w-full sm:w-48'>
                <SelectValue placeholder='Price Range' />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range === 'all'
                      ? 'All Prices'
                      : range.charAt(0).toUpperCase() + range.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Vendors Grid */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {isLoading ? (
          <div className='flex items-center justify-center py-12'>
            <Loader2 className='h-8 w-8 animate-spin text-primary' />
            <span className='ml-2 text-lg'>Loading vendors...</span>
          </div>
        ) : filteredVendors.length === 0 ? (
          <div className='text-center py-12'>
            <Store className='h-12 w-12 text-gray-400 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No vendors found
            </h3>
            <p className='text-gray-500'>
              {searchQuery
                ? 'Try adjusting your search terms'
                : 'No vendors available at the moment'}
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredVendors.map((vendor) => (
              <Card
                key={vendor.id}
                className='hover:shadow-lg transition-shadow'>
                <CardHeader className='pb-3'>
                  <div className='relative aspect-video overflow-hidden rounded-lg'>
                    <img
                      src={vendor.image}
                      alt={vendor.name}
                      className='w-full h-full object-cover'
                    />
                    {!vendor.isOpen && (
                      <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
                        <Badge variant='destructive'>Closed</Badge>
                      </div>
                    )}
                    <div className='absolute top-2 right-2'>
                      <Badge className={getPriceRangeColor(vendor.priceRange)}>
                        {vendor.priceRange}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className='flex items-start justify-between mb-2'>
                    <h3 className='font-semibold text-xl line-clamp-1'>
                      {vendor.name}
                    </h3>
                    <div className='flex items-center gap-1'>
                      <Star className='h-4 w-4 text-yellow-500 fill-current' />
                      <span className='text-sm font-medium'>
                        {vendor.rating}
                      </span>
                    </div>
                  </div>

                  <p className='text-sm text-gray-600 line-clamp-2 mb-3'>
                    {vendor.description}
                  </p>

                  <div className='flex items-center gap-2 mb-3'>
                    <MapPin className='h-4 w-4 text-gray-400' />
                    <span className='text-sm text-gray-600'>
                      {vendor.location}
                    </span>
                  </div>

                  <div className='flex items-center gap-2 mb-3'>
                    <Clock className='h-4 w-4 text-gray-400' />
                    <span className='text-sm text-gray-600'>
                      {vendor.operatingHours}
                    </span>
                  </div>

                  <div className='mb-4'>
                    <p className='text-sm font-medium text-gray-700 mb-1'>
                      Specialties:
                    </p>
                    <div className='flex flex-wrap gap-1'>
                      {vendor.specialties
                        .slice(0, 3)
                        .map((specialty, index) => (
                          <Badge
                            key={index}
                            variant='outline'
                            className='text-xs'>
                            {specialty}
                          </Badge>
                        ))}
                      {vendor.specialties.length > 3 && (
                        <Badge variant='outline' className='text-xs'>
                          +{vendor.specialties.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <Button
                      onClick={() => handleOrderNow(vendor)}
                      disabled={!vendor.isOpen}
                      className='flex-1'>
                      <ExternalLink className='h-4 w-4 mr-2' />
                      {vendor.isOpen ? 'Order Now' : 'Currently Closed'}
                    </Button>
                    <Button variant='outline' size='sm'>
                      <Phone className='h-4 w-4' />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
