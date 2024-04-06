import React, { useEffect } from 'react'
import { TableCell, TableRow } from '../ui/table'
import Image from 'next/image'
import { Badge } from '../ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { MoreHorizontal } from 'lucide-react'

interface PanelProductCardProps {
  id: number
  title: string
  price: string
  createdAt: string
}

export default function PanelProductCard({id, title, price, createdAt}: PanelProductCardProps) {
  const date = new Date(createdAt)
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt={title}
          className="aspect-square rounded-md object-cover"
          height="128"
          src="https://static.staff-clothes.com/uploads/media/image_product/0003/37/b3f8333e28404f78aa0db1369a27ba33.jpeg"
          width="128"
        />
      </TableCell>
      <TableCell className="font-medium">
        {title}
      </TableCell>
      <TableCell>
        <Badge variant="outline">Draft</Badge> 
      </TableCell>
      <TableCell className="hidden md:table-cell">
        ${price}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        0
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {formattedDate}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-haspopup="true"
              size="icon"
              variant="ghost"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <button className='w-full cursor-pointer'>
                Edit
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button className='w-full cursor-pointer'>
                Delete
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
