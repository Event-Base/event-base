import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Link from "next/link";
import prisma from "@/lib/db";
import { Badge } from "@/components/ui/badge";

export default async function AdminEventList() {
  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
    include: {
      _count: {
        select: { registrations: true },
      },
    },
  });

  const completedEvents = events.filter(
    (event) => new Date() > new Date(event.date)
  ).length;
  const upcomingEvents = events.filter(
    (event) => new Date() <= new Date(event.date)
  ).length;
  return (
    <>
      <div className="flex flex-1 overflow-hidden">
        <main className="container flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-5">
          <div className="flex justify-between gap-2">
            <div className="flex justify-start gap-2">
              <div>Total :{completedEvents + upcomingEvents}</div>
              <div>Completed :{completedEvents}</div>
              <div>Upcoming :{upcomingEvents}</div>
            </div>
            <div className="flex justify-end gap-2">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search events..."
                  className="pl-8 sm:w-[200px] md:w-[300px]"
                />
              </div>
              <Button variant="outline" asChild>
                <Link href="/admin/events/create">Create Event</Link>
              </Button>
            </div>
          </div>
          <div className="border shadow-sm rounded-lg p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="hidden md:table-cell">Time</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Location
                  </TableHead>
                  <TableHead className="text-center">Registrations</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Type</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.name}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(event.date).toDateString()}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(event.date).toLocaleTimeString()}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {event.location}
                    </TableCell>
                    <TableCell className="text-center">
                      {event._count.registrations}
                    </TableCell>

                    <TableCell className="text-center">
                      {new Date() > new Date(event.date) ? (
                        <Badge variant="outline">Done</Badge>
                      ) : (
                        <Badge>Upcoming</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{event.eventType}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoveHorizontalIcon className="w-4 h-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </>
  );
}

function MoveHorizontalIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
