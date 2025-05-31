import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
  import { Button } from "@/components/ui/button"
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { cn } from "@/lib/utils"
  import { format } from "date-fns"
  import z from "zod"
  
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import { Calendar } from "@/components/ui/calendar"
  import { CalendarIcon } from "lucide-react"
  import { useForm } from "react-hook-form"
  import { zodResolver } from "@hookform/resolvers/zod"
  import { useState } from "react"
import { Link } from "react-router-dom"
  
  const FormSchema = z.object({
    dob: z.date({
      required_error: "A date of birth is required.",
    }),
    participants: z.array(z.string()).min(1, "Select at least one participant."),
  })
  
  export function Trips() {
    const [dropdowndata] = useState([
      { id: "1", alias: "Manish" },
      { id: "2", alias: "Sushmi" },
      { id: "3", alias: "Alex" },
      { id: "4", alias: "Rijan" },
      { id: "5", alias: "Suna" },
      { id: "6", alias: "kanxa" },
      { id: "7", alias: "Easy" },
    ])
  
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        dob: undefined,
        participants: [],
      },
    })
  
    function onSubmit(data: z.infer<typeof FormSchema>) {
      console.log("Submitted data:", data)
    }
  
    return (
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Form Section */}
        <div className="w-full lg:w-[30%]">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Create a trip</CardTitle>
              <CardDescription>Create a trip in one click.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Trip Name</Label>
                      <Input id="name" placeholder="Name of your trip" />
                    </div>
  
                    <div>
                      <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Trip Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              Your trip date.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
  
                    <FormField
                      control={form.control}
                      name="participants"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Participants</FormLabel>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline">
                                {field.value?.length
                                  ? `${field.value.length} selected`
                                  : "Select participants"}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-56">
                              {dropdowndata.map((user) => (
                                <DropdownMenuCheckboxItem
                                  key={user.id}
                                  checked={field.value?.includes(user.id)}
                                  onCheckedChange={(checked) => {
                                    const newValue = checked
                                      ? [...field.value, user.id]
                                      : field.value.filter((id) => id !== user.id)
                                    field.onChange(newValue)
                                  }}
                                >
                                  {user.alias}
                                </DropdownMenuCheckboxItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
  
                          {/* Show selected aliases as chips */}
                          <div className="flex flex-wrap gap-2 mt-2">
                            {field.value?.map((id) => {
                              const user = dropdowndata.find((u) => u.id === id)
                              return (
                                <span
                                  key={id}
                                  className="inline-flex items-center rounded-full bg-blue-100 text-blue-800 text-sm px-3 py-1"
                                >
                                  {user?.alias}
                                </span>
                              )
                            })}
                          </div>
  
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
  
                  <CardFooter className="flex justify-between px-0 mt-6">
                    <Button type="button" variant="outline">Cancel</Button>
                    <Button type="submit">Create Trip</Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
  
        {/* Table Section */}
        <div className="w-full lg:w-[70%]">
          <Table>
            <TableCaption>A list of your recent trips.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Trip Id</TableHead>
                <TableHead>Trip Name</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Pay info</TableHead>
                <TableHead className="text-right">Total Spent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                    <Link to={`/trips/id`}>IV000</Link>
                </TableCell>
                <TableCell>Mountain Escape</TableCell>
                <TableCell>Manish, Sushmi</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }
  