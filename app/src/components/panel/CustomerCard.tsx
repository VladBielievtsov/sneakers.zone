import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface CustomerCardProps {
  name: string
  email: string
  created: string
}

export default function CustomerCard({name, email, created}: CustomerCardProps) {
  const date = new Date(created)
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <div className='flex items-center space-x-2'>
          <Avatar className="">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h4 className='font-bold'>{name}</h4>
            <p className='text-zinc-500'>{email}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="font-medium">
       
      </TableCell>
      <TableCell className="font-medium">
       <p>{formattedDate}</p>
      </TableCell>
    </TableRow>
  )
}
