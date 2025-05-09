
import { useAuth } from "../context/AuthContext";
import { NavLink, useLocation } from "react-router-dom";
import {
  UserCircle,
  Calendar,
  Receipt,
  Award,
  FileText,
  LogOut,
  Menu,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmployeeLayoutProps {
  children: React.ReactNode;
}

const EmployeeLayout = ({ children }: EmployeeLayoutProps) => {
  const { logout, user } = useAuth();
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Check if sidebar is collapsed using state from useSidebar
  const collapsed = state === "collapsed";

  const menuItems = [
    {
      label: "Mi Perfil",
      path: "/employee/profile",
      icon: UserCircle,
    },
    {
      label: "Mis Horarios",
      path: "/employee/schedules",
      icon: Calendar,
    },
    {
      label: "Mi Nómina",
      path: "/employee/payroll",
      icon: Receipt,
    },
    {
      label: "Mis Evaluaciones",
      path: "/employee/evaluations",
      icon: Award,
    },
    {
      label: "Solicitar Permiso",
      path: "/employee/request-permission",
      icon: FileText,
    },
  ];

  const isActive = (path: string) => currentPath === path;
  
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
              Mi Portal
            </h1>
          )}
          <SidebarTrigger asChild>
            <Button
              variant="ghost"
              className="p-2 text-sidebar-foreground hover:bg-sidebar-accent/50"
            >
              <Menu size={20} />
            </Button>
          </SidebarTrigger>
        </div>
        
        <SidebarContent className="p-2">
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton asChild>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center px-3 py-2 rounded-md",
                        getNavLinkClass({ isActive })
                      )
                    }
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    {!collapsed && <span>{item.label}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>

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
          <h2 className="text-xl font-semibold">Portal del Empleado</h2>
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

export default EmployeeLayout;
