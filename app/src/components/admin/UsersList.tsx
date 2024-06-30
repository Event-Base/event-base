import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { PrismaClient } from "@prisma/client";
import {makeAdmin,makeParticipant} from "@/app/actions";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const users = await prisma.user.findMany();
  return { props: { users } };
}

export default async function UsersList() {
  const users = await prisma.user.findMany();
  return (
    <>
      <div className="flex flex-1 overflow-hidden">
        <main className="container grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-5">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                Manage user roles and permissions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="grid grid-cols-[1fr_auto] items-center gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src={user.image || "/placeholder-user.jpg"}
                        />
                        <AvatarFallback>
                          {user.name ? user.name[0] : "N/A"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">
                          {user.name || "Unknown"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {user.email || "No email"}
                        </p>
                      </div>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">
                          {user.role}{" "}
                          <ChevronDownIcon className="w-4 h-4 ml-2 text-muted-foreground" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="p-0"
                        align="end"
                      ></PopoverContent>
                    </Popover>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
}

function ChevronDownIcon(props: any) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
