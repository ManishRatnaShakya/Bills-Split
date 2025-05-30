import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { Outlet } from "react-router-dom"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />

      <div className="w-[100%] mt-[50px] m-[20px]">
        <Outlet/>
      </div>
      
    </SidebarProvider>
  )
}