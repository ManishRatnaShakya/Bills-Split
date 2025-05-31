import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { Outlet } from "react-router-dom"

export default function Layout() {
  const user =  {
    name: "string",
    email: "string",
    avatar: "string"
  }
  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarTrigger />

      <div className="w-[100%] mt-[50px] m-[20px]">
        <Outlet/>
      </div>
      
    </SidebarProvider>
  )
}