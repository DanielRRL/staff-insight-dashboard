
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  Users, Briefcase, Calendar, Award, Receipt, LogOut, 
  Menu, X, ChevronDown, ChevronRight 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { logout, user } = useAuth();
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const [openGroup, setOpenGroup] = useState("employees");
  
  // Check if sidebar is collapsed using state from useSidebar
  const collapsed = state === "collapsed";

  const menuItems = [
    {
      label: "Empleados",
      id: "employees",
      icon: Users,
      submenu: [
        { label: "Gestionar Empleados", path: "/admin/employees" },
        { label: "Roles", path: "/admin/roles" },
      ],
    },
    {
      label: "Horarios",
      id: "schedules",
      icon: Calendar,
      submenu: [
        { label: "Gestionar Horarios", path: "/admin/schedules" },
        { label: "Asignar Horarios", path: "/admin/assign-schedules" },
      ],
    },
    {
      label: "Evaluaciones",
      id: "evaluations",
      icon: Award,
      submenu: [
        { label: "Crear Evaluación", path: "/admin/create-evaluation" },
        { label: "Ver Evaluaciones", path: "/admin/evaluations" },
      ],
    },
    {
      label: "Nómina",
      id: "payroll",
      icon: Receipt,
      submenu: [
        { label: "Gestionar Nómina", path: "/admin/payroll" },
        { label: "Ajustes de Nómina", path: "/admin/payroll-adjustments" },
      ],
    },
  ];

  const isActive = (path: string) => currentPath === path;
  const isGroupActive = (submenu: any[]) => submenu.some((item) => isActive(item.path));
  
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
      : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80 hover:text-sidebar-foreground";

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar
        className={cn(
          "transition-all duration-300 bg-sidebar h-screen",
          collapsed ? "w-20" : "w-64"
        )}
        collapsible="icon"
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          {!collapsed && (
            <h1 className="text-lg font-semibold text-sidebar-foreground truncate">
              Staff Manager
            </h1>
          )}
          <SidebarTrigger asChild>
            <Button
              variant="ghost"
              className="p-2 text-sidebar-foreground hover:bg-sidebar-accent/50"
            >
              {collapsed ? <Menu size={20} /> : <X size={20} />}
            </Button>
          </SidebarTrigger>
        </div>
        
        <SidebarContent className="p-2">
          {menuItems.map((item) => (
            <SidebarGroup
              key={item.id}
              defaultOpen={openGroup === item.id || isGroupActive(item.submenu)}
            >
              <div className="flex items-center px-3 py-2 mb-1 cursor-pointer text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-md" 
                   onClick={() => setOpenGroup(openGroup === item.id ? "" : item.id)}>
                <item.icon className="mr-2 h-5 w-5" />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {openGroup === item.id ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </>
                )}
              </div>

              <SidebarGroupContent>
                <SidebarMenu>
                  {!collapsed && item.submenu.map((subItem) => (
                    <SidebarMenuItem key={subItem.path}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={subItem.path}
                          className={({ isActive }) =>
                            cn(
                              "flex items-center px-8 py-2 text-sm rounded-md",
                              getNavLinkClass({ isActive })
                            )
                          }
                        >
                          {subItem.label}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}

          <div className="mt-auto pt-4">
            <Button 
              variant="ghost" 
              className="w-full justify-start px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent/50"
              onClick={logout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              {!collapsed && <span>Cerrar Sesión</span>}
            </Button>
          </div>
        </SidebarContent>
      </Sidebar>

      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b flex items-center justify-between px-6 bg-white">
          <div className="flex items-center">
            <Briefcase className="mr-2 h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Panel de Administración</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{user?.name}</span>
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              {user?.name.charAt(0)}
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
