"use client";
import Link from "next/link";
import {
    Activity,
    ArrowUpRight,
    CircleUser,
    CreditCard,
    DollarSign,
    Menu,
    Package2,
    Search,
    Users,
    X,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { notFound, usePathname } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { getIndividualEventDetailsProp } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getIndividualEventDetails } from "@/app/actions";
import { getRemainingDay } from "@/lib/helper";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";


export const description =
    "An application shell with a header and main content area. The header has a navbar, a search input and and a user nav dropdown. The user nav is toggled by a button with an avatar image.";

export const iframeHeight = "825px";

export const containerClassName = "w-full h-full";

export default function Dashboard({ session }: any) {
    const pathname = usePathname();

    //take only the last name
    const eventName = pathname.replace(/%20/g, "-").split("/").pop();
    const { data, error, isLoading } = useQuery<getIndividualEventDetailsProp | null, Error>({
        queryKey: ["student"],
        queryFn: async () => await getIndividualEventDetails(eventName as string),
    });

    if(session.user.email !== data?.coordinatorEmail){
        return notFound()
    }

    const chartData = [
        { day: "01", registration: 186 },
        { day: "02", registration: 187 },
        { day: "04", registration: 188 },
        { day: "05", registration: 189 },
        { day: "06", registration: 190 },
        { day: "07", registration: 191 },
        { day: "08", registration: 192 },
        { day: "09", registration: 193 },
        { day: "10", registration: 289 },
        { day: "11", registration: 134 },
        { day: "12", registration: 201 },
        { day: "13", registration: 260 },
        { day: "14", registration: 178 },
        { day: "15", registration: 332 },
        { day: "16", registration: 147 },
        { day: "17", registration: 265 },
        { day: "18", registration: 94 },
        { day: "19", registration: 220 },
        { day: "20", registration: 185 },
        { day: "21", registration: 312 },
        { day: "22", registration: 150 },
        { day: "23", registration: 273 },
        { day: "24", registration: 200 },
        { day: "25", registration: 245 },
        { day: "26", registration: 176 },
        { day: "27", registration: 288 },
        { day: "28", registration: 215 },
        { day: "29", registration: 299 },
        { day: "30", registration: 184 },
        { day: "31", registration: 231 },
    ];
    
    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
        },
    } satisfies ChartConfig;

    const remainingDay = getRemainingDay((data?.date.toDateString() as string) ?? "");

    return (
        <div className="flex min-h-screen w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
                        <Package2 className="h-6 w-6" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    <Link href="#" className="text-foreground transition-colors hover:text-foreground">
                        Dashboard
                    </Link>
                    <Link
                        href="/coordinators"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Events
                    </Link>
                    <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                        Products
                    </Link>
                    <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                        Customers
                    </Link>
                    <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                        Analytics
                    </Link>
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
                                <Package2 className="h-6 w-6" />
                                <span className="sr-only">Acme Inc</span>
                            </Link>
                            <Link href="#" className="hover:text-foreground">
                                Dashboard
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                Orders
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                Products
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                Customers
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                Analytics
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <form className="ml-auto flex-1 sm:flex-initial">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search products..."
                                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                            />
                        </div>
                    </form>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    <Card x-chunk="A card showing the total revenue in USD and the percentage difference from last month.">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Registration</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{data?.count ?? 0}</div>
                            <p className="text-xs text-muted-foreground"></p>
                        </CardContent>
                    </Card>
                    <Card x-chunk="A card showing the total subscriptions and the percentage difference from last month.">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Location</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{data?.location ?? ""}</div>
                            <p className="text-xs text-muted-foreground"></p>
                        </CardContent>
                    </Card>
                    <Card x-chunk="A card showing the total sales and the percentage difference from last month.">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Date</CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {data?.date.toISOString().split("T")[0] ?? ""}
                            </div>
                            <p className="text-xs text-muted-foreground"></p>
                        </CardContent>
                    </Card>
                    <Card x-chunk="A card showing the total active users and the percentage difference from last hour.">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Day remaining</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{isNaN(remainingDay) ? 0 : remainingDay}</div>
                            <p className="text-xs text-muted-foreground"></p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-1 md:gap-8 lg:grid-cols-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Line Chart - Linear</CardTitle>
                            <CardDescription>January - June 2024</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig}>
                                <LineChart
                                    accessibilityLayer
                                    data={chartData}
                                    margin={{
                                        left: 12,
                                        right: 12,
                                    }}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="day"
                                        tickLine={true}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent hideLabel />}
                                    />
                                    <Line
                                        dataKey="count"
                                        type="linear"
                                        stroke="var(--color-desktop)"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ChartContainer>
                        </CardContent>
                        {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
                    </Card>
                    <Card x-chunk="A card showing a list of recent sales with customer names and email addresses.">
                        <CardHeader>
                            <CardTitle>Recent Sales</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-8">
                            <div className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage src={session.user?.image} alt="Avatar" />
                                    <AvatarFallback>OM</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">Olivia Martin</p>
                                    <p className="text-sm text-muted-foreground">olivia.martin@email.com</p>
                                </div>
                                <div className="ml-auto font-medium">+$1,999.00</div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage src={session.user?.image} alt="Avatar" />
                                    <AvatarFallback>JL</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">Jackson Lee</p>
                                    <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
                                </div>
                                <div className="ml-auto font-medium">+$39.00</div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage src={session.user?.image} alt="Avatar" />
                                    <AvatarFallback>IN</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
                                    <p className="text-sm text-muted-foreground">isabella.nguyen@email.com</p>
                                </div>
                                <div className="ml-auto font-medium">+$299.00</div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage src={session.user?.image} alt="Avatar" />
                                    <AvatarFallback>WK</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">William Kim</p>
                                    <p className="text-sm text-muted-foreground">will@email.com</p>
                                </div>
                                <div className="ml-auto font-medium">+$99.00</div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage src={session.user?.image} alt="Avatar" />
                                    <AvatarFallback>SD</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">Sofia Davis</p>
                                    <p className="text-sm text-muted-foreground">sofia.davis@email.com</p>
                                </div>
                                <div className="ml-auto font-medium">+$39.00</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
