import { Poppins, Inter } from 'next/font/google';

// next.js font 설정
export const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});
