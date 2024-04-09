"use client"

import PanelProductsList from "@/components/panel/PanelProductsList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from 'lucide-react';
import Link from "next/link";

export default function Products() {
  
  return (
    <div>
      <div className="pb-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <div>
            <Button asChild>
              <Link href={"/panel/products/add"} className="space-x-2"><PlusCircle className="h-5" /><span>Add New</span></Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="grid flex-1 items-start gap-4 md:gap-8">
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  {/* <TableHead>Status</TableHead> */}
                  <TableHead className="hidden md:table-cell">
                    Price
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Total Sales
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created at
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <PanelProductsList />
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>32</strong>{" "}
              products
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
