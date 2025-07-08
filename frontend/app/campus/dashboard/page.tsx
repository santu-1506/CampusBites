'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
// import { BarChart, PieChart } from 'recharts'; // Uncomment and install recharts or chart.js as needed

// TypeScript types
interface MenuItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface NewMenuItem {
  name: string;
  price: string;
  imageUrl: string;
  category: string;
  imageFile: File | null;
}

interface Order {
  id: number;
  items: string[];
  status: string;
  user: string;
  time: string;
}

// Mock data for menu items
const initialMenu: MenuItem[] = [
  { id: 1, name: 'Pizza', price: 200, imageUrl: '', category: 'Italian' },
  { id: 2, name: 'Burger', price: 120, imageUrl: '', category: 'Fast Food' },
];

// Mock data for orders
const initialOrders: Order[] = [
  {
    id: 1,
    items: ['Pizza'],
    status: 'pending',
    user: 'John',
    time: '10:00 AM',
  },
  {
    id: 2,
    items: ['Burger'],
    status: 'preparing',
    user: 'Jane',
    time: '10:05 AM',
  },
];

const statusOptions = ['pending', 'preparing', 'completed'];

export default function CampusDashboardPage() {
  // Menu state
  const [menu, setMenu] = useState<MenuItem[]>(initialMenu);
  const [newItem, setNewItem] = useState<NewMenuItem>({
    name: '',
    price: '',
    imageUrl: '',
    category: '',
    imageFile: null,
  });
  const [imagePreview, setImagePreview] = useState<string>('');

  // Orders state
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  // Revenue summary (mock)
  const revenue = 320; // Sum of order prices (mock)

  // Handle add new item
  const handleAddItem = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Upload image to Firebase Storage and get URL
    // For now, use preview URL
    const id = menu.length + 1;
    setMenu([
      ...menu,
      {
        id,
        name: newItem.name,
        price: Number(newItem.price),
        imageUrl: imagePreview,
        category: newItem.category,
      },
    ]);
    setNewItem({
      name: '',
      price: '',
      imageUrl: '',
      category: '',
      imageFile: null,
    });
    setImagePreview('');
  };

  // Handle image file change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setNewItem({ ...newItem, imageFile: file || null });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview('');
    }
  };

  // Handle order status change
  const handleStatusChange = (orderId: number, newStatus: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  // Handle edit/delete (mock)
  const handleDelete = (id: number) =>
    setMenu(menu.filter((item) => item.id !== id));
  // TODO: Implement edit functionality

  return (
    <div className='p-8 space-y-8'>
      {/* Revenue Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>₹{revenue}</div>
          <div className='text-gray-500'>Total revenue this week</div>
        </CardContent>
      </Card>

      {/* Menu Management */}
      <Card>
        <CardHeader>
          <CardTitle>Menu Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {menu.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>₹{item.price}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className='w-12 h-12 object-cover'
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button size='sm' variant='outline' className='mr-2'>
                      Edit
                    </Button>
                    <Button
                      size='sm'
                      variant='destructive'
                      onClick={() => handleDelete(item.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add New Item Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Menu Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form className='space-y-4' onSubmit={handleAddItem}>
            <div className='flex gap-4'>
              <Input
                placeholder='Name'
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
                required
              />
              <Input
                placeholder='Price'
                type='number'
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({ ...newItem, price: e.target.value })
                }
                required
              />
              <Input
                placeholder='Category'
                value={newItem.category}
                onChange={(e) =>
                  setNewItem({ ...newItem, category: e.target.value })
                }
                required
              />
            </div>
            <div className='flex items-center gap-4'>
              <Input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt='Preview'
                  className='w-16 h-16 object-cover rounded'
                />
              )}
            </div>
            {/* TODO: Upload image to Firebase Storage and use the URL */}
            <Button type='submit'>Add Item</Button>
          </form>
        </CardContent>
      </Card>

      {/* Orders Section */}
      <Card>
        <CardHeader>
          <CardTitle>Real-Time Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.user}</TableCell>
                  <TableCell>{order.items.join(', ')}</TableCell>
                  <TableCell>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className='border rounded px-2 py-1'>
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </TableCell>
                  <TableCell>{order.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* TODO: Fetch real-time orders from backend or use websockets */}
        </CardContent>
      </Card>

      {/* Analytics Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <Card>
          <CardHeader>
            <CardTitle>Orders Per Day/Week</CardTitle>
          </CardHeader>
          <CardContent>
            {/* TODO: Replace with BarChart or LineChart from recharts or chart.js */}
            <div className='h-48 flex items-center justify-center text-gray-400'>
              [Chart Placeholder]
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Most Popular Items This Week</CardTitle>
          </CardHeader>
          <CardContent>
            {/* TODO: Replace with PieChart or BarChart for popular items */}
            <div className='h-48 flex items-center justify-center text-gray-400'>
              [Popular Items Chart Placeholder]
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}