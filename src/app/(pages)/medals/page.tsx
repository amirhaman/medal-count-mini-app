import React, { Suspense } from 'react';
import LoadingIcon from '@/app/ui/loading/LoadingIcon';
import MedalsMain from '@/app/ui/medals/MedalsMain';

export const metadata = {
  title: 'Medal Count Mini App',
  description: 'A list of medals earned.',
};

export default function MedalsPage() {
  return (
    <div className="container mx-auto p-8">
      <Suspense fallback={<LoadingIcon />}>
        <MedalsMain />
      </Suspense>
    </div>
  );
}