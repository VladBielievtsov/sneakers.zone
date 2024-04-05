import React from 'react'
import { Input } from './ui/input'
import { Search } from 'lucide-react';

export default function SearchInput() {
  return (
    <label className="flex items-center cursor-text text-zinc-500">
      <Search className='h-[22px]' />
      <Input type="text" placeholder="Search for items, brands and inspiration..." className="w-full border-0 outline-0 focus-visible:ring-transparent" />
    </label>
  )
}
