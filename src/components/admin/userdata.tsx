'use client'

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown, MessageSquare } from "lucide-react"
import { collection, getDocs } from "firebase/firestore"
import * as XLSX from 'xlsx'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { db } from "@/lib/firebase"

interface FirebaseUser {
  id: string;
  contactInfo?: {
    phone?: string;
    email?: string;
  };
  summary: string;
  referralSource: string;
  messages: {
    isBot: boolean;
    createdAt: number;
    text: string;
  }[];
  visitCount: number;
  totalVisits: number;
  lastVisit: number;
  deviceInfo: {
    browser: string;
    os: string;
    deviceType: string;
  };
  location: {
    country: string;
    region: string;
    city: string;
  };
}

const ConversationCell = ({ user }: { user: FirebaseUser }) => {
  const [showMessages, setShowMessages] = React.useState(false)

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setShowMessages(true)}>
        <MessageSquare className="mr-2 h-4 w-4" />
        View
      </Button>
      <Dialog open={showMessages} onOpenChange={setShowMessages}>
        <DialogContent className="max-w-[800px] w-full">
          <DialogHeader>
            <DialogTitle>Conversation for {user.id}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            {user.messages.map((message, index) => (
              <div key={index} className={`mb-4 flex flex-col ${message.isBot ? "items-start" : "items-end"}`}>
                <div
                  className={`rounded-lg px-4 py-2 ${message.isBot ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"}`}
                >
                  {message.text}
                </div>
                <span className="mt-1 text-xs text-muted-foreground">
                  {new Date(message.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}

const formatDataForExcel = (users: FirebaseUser[]) => {
  return users.map(user => ({
    ID: user.id,
    Phone: user.contactInfo?.phone || 'N/A',
    Email: user.contactInfo?.email || 'N/A',
    'Referral Source': user.referralSource,
    Summary: user.summary,
    'Total Visits': user.totalVisits,
    'Last Visit': user.lastVisit ? new Date(user.lastVisit).toLocaleString() : 'N/A',
    Browser: user.deviceInfo?.browser || 'N/A',
    OS: user.deviceInfo?.os || 'N/A',
    'Device Type': user.deviceInfo?.deviceType || 'N/A',
    Location: user.location ? `${user.location.city}, ${user.location.region}, ${user.location.country}` : 'N/A',
    'Message Count': user.messages.length,
  }))
}

export const columns: ColumnDef<FirebaseUser>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "contactInfo.phone",
    header: "Phone",
    cell: ({ row }) => <div>{row.original.contactInfo?.phone || "N/A"}</div>,
  },
  {
    accessorKey: "contactInfo.email",
    header: "Email",
    cell: ({ row }) => <div>{row.original.contactInfo?.email || "N/A"}</div>,
  },
  {
    accessorKey: "referralSource",
    header: "Referral Source",
    cell: ({ row }) => <div>{row.getValue("referralSource")}</div>,
  },
  {
    accessorKey: "summary",
    header: "Summary",
    cell: ({ row }) => <div>{row.getValue("summary")}</div>,
  },
  {
    accessorKey: "totalVisits",
    header: "Total Visits",
    cell: ({ row }) => <div>{row.getValue("totalVisits")}</div>,
  },
  {
    accessorKey: "lastVisit",
    header: "Last Visit",
    cell: ({ row }) => (
      <div>
        {row.getValue("lastVisit") ? new Date(row.getValue("lastVisit") as number).toLocaleString() : "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "deviceInfo.browser",
    header: "Browser",
    cell: ({ row }) => <div>{row.original.deviceInfo?.browser || "N/A"}</div>,
  },
  {
    accessorKey: "deviceInfo.os",
    header: "OS",
    cell: ({ row }) => <div>{row.original.deviceInfo?.os || "N/A"}</div>,
  },
  {
    accessorKey: "deviceInfo.deviceType",
    header: "Device Type",
    cell: ({ row }) => <div>{row.original.deviceInfo?.deviceType || "N/A"}</div>,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (
      <div>
        {row.original.location
          ? `${row.original.location.city}, ${row.original.location.region}, ${row.original.location.country}`
          : "N/A"}
      </div>
    ),
  },
  {
    id: "conversation",
    header: "Conversation",
    cell: ({ row }) => <ConversationCell user={row.original} />,
  },
];

export function UserData() {
  const [data, setData] = React.useState<FirebaseUser[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const exportToExcel = () => {
    const selectedRows = table.getSelectedRowModel().rows
    const dataToExport = selectedRows.length > 0 
      ? selectedRows.map(row => row.original)
      : data
    const formattedData = formatDataForExcel(dataToExport)
    const worksheet = XLSX.utils.json_to_sheet(formattedData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users")
    
    const wscols = [
      { wch: 20 }, // ID
      { wch: 15 }, // Phone
      { wch: 25 }, // Email
      { wch: 20 }, // Referral Source
      { wch: 30 }, // Summary
      { wch: 12 }, // Total Visits
      { wch: 20 }, // Last Visit
      { wch: 15 }, // Browser
      { wch: 15 }, // OS
      { wch: 15 }, // Device Type
      { wch: 25 }, // Location
      { wch: 12 }, // Message Count
    ]
    worksheet['!cols'] = wscols

    XLSX.writeFile(workbook, `user_data_${new Date().toISOString().split('T')[0]}.xlsx`)
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"))
        const users = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as FirebaseUser[]
        setData(users)
        setLoading(false)
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to fetch data")
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="w-full bg-white p-5 overflow-y-scroll">
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Filter by ID..."
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("id")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <Button 
          variant="outline" 
          onClick={exportToExcel}
        >
          Export to Excel
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
      <div className="rounded-md border min-h-[80vh]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default UserData