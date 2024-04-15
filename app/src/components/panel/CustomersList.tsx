"use client"

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import React, { useEffect } from 'react'
import { TableCell, TableRow } from '../ui/table';
import { Skeleton } from '../ui/skeleton';
import CustomerCard from './CustomerCard';
import { getCustomers } from '@/lib/features/customers/customersActions';

export default function CustomersList() {
  const dispatch = useAppDispatch();

  const customersStatus = useAppSelector(
    (state: RootState) => state.customers.status
  );

  let { list } = useAppSelector((state: RootState) => state.customers);

  useEffect(() => {
    dispatch(getCustomers())
  }, [])

  let content = null;

  if (customersStatus === "loading" || customersStatus === "idle") {
    content = [...Array(4)].map((_, id) => (
      <TableRow key={id}>
        <TableCell>
          <Skeleton className="w-[68px] h-[68px] rounded-xl" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-full h-[20px] rounded-xl" />
        </TableCell>
      </TableRow>
    ));
  } else if (customersStatus === "succeeded") {
      list?.length
      ? (content = [...list].map((customer) => (
          <CustomerCard 
            key={customer.id}
            name={customer.fullname}
            email={customer.email}
            created={customer.createdAt}
          />
        )))
      : (content = <TableRow><TableCell><h3>There is no customers</h3></TableCell></TableRow>);
  }

  return content;
}