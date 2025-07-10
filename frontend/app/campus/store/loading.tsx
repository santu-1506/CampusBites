import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function StoreLoading() {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header Skeleton */}
      <div className='bg-white border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
            <div className='space-y-2'>
              <Skeleton className='h-8 w-64' />
              <Skeleton className='h-4 w-96' />
              <div className='flex items-center gap-4'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-4 w-40' />
              </div>
            </div>
            <Skeleton className='h-6 w-24' />
          </div>
        </div>
      </div>

      {/* Filters Skeleton */}
      <div className='bg-white border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex flex-col sm:flex-row gap-4'>
            <Skeleton className='h-10 flex-1' />
            <Skeleton className='h-10 w-48' />
            <Skeleton className='h-10 w-48' />
          </div>
        </div>
      </div>

      {/* Products Grid Skeleton */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className='h-full'>
              <CardHeader className='pb-3'>
                <Skeleton className='aspect-square w-full rounded-lg' />
              </CardHeader>
              <CardContent className='space-y-3'>
                <div className='flex items-start justify-between'>
                  <Skeleton className='h-5 w-3/4' />
                  <Skeleton className='h-5 w-16' />
                </div>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-2/3' />
                <div className='flex items-center justify-between'>
                  <Skeleton className='h-6 w-20' />
                  <Skeleton className='h-4 w-16' />
                </div>
                <div className='flex items-center gap-2'>
                  <Skeleton className='h-8 w-8' />
                  <Skeleton className='h-4 w-8' />
                  <Skeleton className='h-8 w-8' />
                </div>
              </CardContent>
              <div className='p-6 pt-0'>
                <Skeleton className='h-10 w-full' />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
