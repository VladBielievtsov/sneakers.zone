import React from 'react'
import { Input } from './ui/input'
import { FiSearch } from "react-icons/fi";

export default function SearchInput() {
  return (
    <label className="flex items-center cursor-text text-zinc-500">
      <FiSearch />
      <Input type="text" placeholder="Search for items, brands and inspiration..." className="w-full border-0 outline-0 focus-visible:ring-transparent" />
    </label>
  )
}
