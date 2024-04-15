import CustomersList from "@/components/panel/CustomersList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

export default function Customers() {
  return (
    <div>
      <div className="pb-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        </div>
      </div>
      <div className="grid flex-1 items-start gap-4 md:gap-8">
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Email
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Registration
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <CustomersList />
              </TableBody>
            </Table>


            {/* <div className="w-full">
              <Avatar className="w-[100px] h-[100px] m-auto mt-6">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="text-center mt-2">
              <h3 className="text-lg">Full Name</h3>
              <p className="text-zinc-500">@username</p>
            </div>
            <div>
              <Button asChild>
                <Link href={""}>Info</Link>
              </Button>
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
