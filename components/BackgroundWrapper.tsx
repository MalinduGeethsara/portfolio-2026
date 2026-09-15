'use client';

import dynamic from 'next/dynamic';

const Background3D = dynamic(() => import('./canvas/Background3D'), {
  ssr: false,
});

export default function BackgroundWrapper() {
  return <Background3D />;
}
