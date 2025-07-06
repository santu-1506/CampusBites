'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  Eye,
  EyeOff,
  ArrowRight,
  Users,
  GraduationCap,
  Shield,
} from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { login } from '@/services/authService';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['student', 'campus', 'admin'], {
    errorMap: () => ({ message: 'Please select your role' }),
  }),
});

type LoginSchema = z.infer<typeof loginSchema>;
type UserRole = LoginSchema['role'];

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { loginWithToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      role: undefined,
    },
  });

  const selectedRole = form.watch('role');

  const onSubmit = async (values: LoginSchema) => {
    setIsLoading(true);
    try {
      const { token } = await login(values);
      loginWithToken(token);

      toast({
        title: 'Welcome back! 🎉',
        description: `Logged in as ${values.role}`,
      });

      switch (values.role) {
        case 'student':
          router.push('/student/dashboard');
          break;
        case 'campus':
          router.push('/campus/dashboard');
          break;
        case 'admin':
          router.push('/admin/dashboard');
          break;
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description:
          error?.response?.data?.message ||
          error.message ||
          'Invalid credentials. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'student':
        return <GraduationCap className='w-5 h-5' />;
      case 'campus':
        return <Users className='w-5 h-5' />;
      case 'admin':
        return <Shield className='w-5 h-5' />;
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'student':
        return 'from-blue-500 to-purple-600';
      case 'campus':
        return 'from-green-500 to-emerald-600';
      case 'admin':
        return 'from-red-500 to-pink-600';
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center'>
      <div className='w-full max-w-md p-8 bg-gray-800/30 backdrop-blur-2xl border border-gray-700/30 rounded-3xl shadow-2xl'>
        <div className='text-center mb-10'>
          <h2 className='text-4xl font-bold text-white mb-2'>Welcome Back!</h2>
          <p className='text-gray-400'>
            New to Campus Bites?{' '}
            <Link
              href='/register'
              className='text-orange-400 hover:underline font-semibold'>
              Join us here
            </Link>
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            {/* Role */}
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-gray-300'>I am a</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className='bg-gray-700/50 text-white rounded-xl h-12'>
                        <SelectValue placeholder='Select your role' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='bg-gray-800 text-white border-gray-600'>
                      <SelectItem value='student'>Student</SelectItem>
                      <SelectItem value='campus'>Campus Partner</SelectItem>
                      <SelectItem value='admin'>Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className='text-red-400' />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-gray-300'>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='email'
                      placeholder=''
                      className='bg-gray-700/50 text-white rounded-xl h-12 placeholder-gray-400'
                    />
                  </FormControl>
                  <FormMessage className='text-red-400' />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-gray-300'>Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        placeholder=''
                        className='bg-gray-700/50 text-white rounded-xl h-12 pr-10 placeholder-gray-400'
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                        {showPassword ? (
                          <EyeOff className='w-5 h-5' />
                        ) : (
                          <Eye className='w-5 h-5' />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className='text-red-400' />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type='submit'
              disabled={isLoading}
              className={`w-full ${
                selectedRole
                  ? `bg-gradient-to-r ${getRoleColor(selectedRole)}`
                  : 'bg-gradient-to-r from-orange-500 to-red-500'
              } text-white font-semibold py-3 rounded-xl`}>
              {isLoading ? (
                'Signing in...'
              ) : (
                <span className='flex items-center justify-center gap-2'>
                  {getRoleIcon(selectedRole!)} Sign In{' '}
                  <ArrowRight className='w-5 h-5' />
                </span>
              )}
            </Button>
          </form>
        </Form>

        {/* Google Login for students */}
        {selectedRole === 'student' && (
          <div className='mt-6'>
            <div className='text-center text-gray-400 mb-3'>
              Or continue with
            </div>
            <Button
              variant='outline'
              className='w-full h-12 text-white bg-transparent border-gray-600 hover:bg-gray-700/50'
              onClick={() =>
                (window.location.href = 'http://localhost:8080/api/auth/google')
              }>
              <span className='flex items-center justify-center gap-3'>
                <svg className='w-5 h-5' viewBox='0 0 48 48'>
                  <path
                    fill='#EA4335'
                    d='M24 9.5c3.15 0 5.72 1.09 7.56 2.9l5.62-5.62C33.16 3.77 28.9 2 24 2 14.95 2 7.59 7.73 4.36 15h7.63C14.07 11.06 18.66 9.5 24 9.5z'
                  />
                  <path
                    fill='#4285F4'
                    d='M46.1 24.5c0-1.6-.14-3.13-.4-4.6H24v9h12.5c-.55 3-2.3 5.55-5 7.24l7.64 5.94C43.8 37.2 46.1 31.3 46.1 24.5z'
                  />
                  <path
                    fill='#FBBC05'
                    d='M11.99 28.5c-1.05-3.05-1.05-6.45 0-9.5H4.36c-2.17 4.33-2.17 9.67 0 14l7.63-4.5z'
                  />
                  <path
                    fill='#34A853'
                    d='M24 44c5.85 0 10.74-1.93 14.29-5.26l-7.64-5.94c-2.12 1.44-4.87 2.2-6.65 2.2-5.35 0-9.93-3.55-11.57-8.5l-7.63 4.5C7.59 40.27 14.95 46 24 46z'
                  />
                </svg>
                Continue with Google
              </span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
