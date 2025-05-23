import { Feed } from 'feed';
import { blog } from '@/lib/source';
import { NextResponse } from 'next/server';

export const revalidate = false;

export function GET() {
  const feed = new Feed({
    title: 'Nopends Blog',
    id: 'https://docs.nopends.com',
    link: 'https://docs.nopends.com',
    language: 'en',

    image: 'https://docs.nopends.com/banner.png',
    favicon: 'https://docs.nopends.com/icon.png',
    copyright: 'All rights reserved 2025, Fuma Nama',
  });

  for (const page of blog.getPages()) {
    feed.addItem({
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      link: page.url,
      date: new Date(page.data.date ?? Date.now()),

      author: [
        {
          name: page.data.author,
        },
      ],
    });
  }

  return new NextResponse(feed.rss2());
}
