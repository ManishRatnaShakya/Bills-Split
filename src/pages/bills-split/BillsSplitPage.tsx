import { useState, useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { format } from "date-fns"
import { useDropzone } from "react-dropzone"
import { Link } from "react-router-dom"

import {
  Button,
} from "@/components/ui/button"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "@/components/ui/card"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from "@/components/ui/form"
import {
  Input,
} from "@/components/ui/input"
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table"


import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FormItemComponent } from "@/components/ui/formItems/FormItemComponent"

const FormSchema = z.object({
  date: z.date({
    required_error: "A date of birth is required.",
  }),
  paidBy: z.array(z.string()).min(1, "Select at least one participant."),
  name: z.string().min(1, "Bill name should be atleast 2 or more" )
})

export function BillsSplitPage() {
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
    
        name: '',
        date: undefined,
        paidBy: [],
    },
  })

  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const filesWithPreview = acceptedFiles.map(file => {
      const preview = file.type.startsWith("image/")
        ? Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        : file
      return preview
    })
    setFiles(filesWithPreview)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "application/pdf": [],
    },
    multiple: false,
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Submitted data:", data)
    console.log("Uploaded file:", files)
  }

  const filePreview = files.map((file) => (
    <div key={file.name} className="relative mt-4 w-fit">
      <button
        type="button"
        onClick={() => setFiles([])}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600"
      >
        ✕
      </button>
      {file.type.startsWith("image/") ? (
        <img
          src={(file as any).preview}
          alt={file.name}
          className="h-32 w-auto rounded-md border"
        />
      ) : (
        <div className="bg-gray-100 border rounded p-4">
          <p className="text-sm font-medium">{file.name}</p>
        </div>
      )}
    </div>
  ))

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Form Section */}
      <div className="w-full lg:w-[30%]">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Upload A bill</CardTitle>
            <CardDescription>Fill all descriptions below</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                  <FormItemComponent  formDescription = "" name="name" formLabel="Bill name" placeholderValue="Harry potter" type="text" form={form} />
                  </div>
                  <div>
                      <FormField
                        control={form.control}
                        name="date"
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
                    name="paidBy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Paid By</FormLabel>
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

                  {/* File Drop Area */}
                  <div {...getRootProps()} className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:border-blue-500 transition-colors">
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <p>Drag & drop an image or PDF here, or click to select files</p>
                    )}
                  </div>

                  {/* Preview */}
                  {filePreview}
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
