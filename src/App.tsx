import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider, UserRole } from "./context/AuthContext";

// Layouts
import AdminLayout from "./components/AdminLayout";
import EmployeeLayout from "./components/EmployeeLayout";

// Auth and Error pages
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import EmployeesPage from "./pages/admin/Employees";

// Employee pages
import ProfilePage from "./pages/employee/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <SidebarProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Login />} />

              {/* Admin routes */}
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute requiredRole={UserRole.ADMIN}>
                    <AdminLayout>
                      <AdminDashboard />
                    </AdminLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/employees" 
                element={
                  <ProtectedRoute requiredRole={UserRole.ADMIN}>
                    <AdminLayout>
                      <EmployeesPage />
                    </AdminLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/roles" 
                element={
                  <ProtectedRoute requiredRole={UserRole.ADMIN}>
                    <AdminLayout>
                      <div className="space-y-6">
                        <h1 className="text-3xl font-bold">Gestión de Roles</h1>
                        <p>Esta sección está en construcción</p>
                      </div>
                    </AdminLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/schedules" 
                element={
                  <ProtectedRoute requiredRole={UserRole.ADMIN}>
                    <AdminLayout>
                      <div className="space-y-6">
                        <h1 className="text-3xl font-bold">Gestión de Horarios</h1>
                        <p>Esta sección está en construcción</p>
                      </div>
                    </AdminLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/assign-schedules" 
                element={
                  <ProtectedRoute requiredRole={UserRole.ADMIN}>
                    <AdminLayout>
                      <div className="space-y-6">
                        <h1 className="text-3xl font-bold">Asignación de Horarios</h1>
                        <p>Esta sección está en construcción</p>
                      </div>
                    </AdminLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/create-evaluation" 
                element={
                  <ProtectedRoute requiredRole={UserRole.ADMIN}>
                    <AdminLayout>
                      <div className="space-y-6">
                        <h1 className="text-3xl font-bold">Crear Evaluación</h1>
                        <p>Esta sección está en construcción</p>
                      </div>
                    </AdminLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/evaluations" 
                element={
                  <ProtectedRoute requiredRole={UserRole.ADMIN}>
                    <AdminLayout>
                      <div className="space-y-6">
                        <h1 className="text-3xl font-bold">Evaluaciones de Desempeño</h1>
                        <p>Esta sección está en construcción</p>
                      </div>
                    </AdminLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/payroll" 
                element={
                  <ProtectedRoute requiredRole={UserRole.ADMIN}>
                    <AdminLayout>
                      <div className="space-y-6">
                        <h1 className="text-3xl font-bold">Gestión de Nómina</h1>
                        <p>Esta sección está en construcción</p>
                      </div>
                    </AdminLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/payroll-adjustments" 
                element={
                  <ProtectedRoute requiredRole={UserRole.ADMIN}>
                    <AdminLayout>
                      <div className="space-y-6">
                        <h1 className="text-3xl font-bold">Ajustes de Nómina</h1>
                        <p>Esta sección está en construcción</p>
                      </div>
                    </AdminLayout>
                  </ProtectedRoute>
                } 
              />

              {/* Employee routes */}
              <Route 
                path="/employee/profile" 
                element={
                  <ProtectedRoute requiredRole={UserRole.EMPLOYEE}>
                    <EmployeeLayout>
                      <ProfilePage />
                    </EmployeeLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/employee/schedules" 
                element={
                  <ProtectedRoute requiredRole={UserRole.EMPLOYEE}>
                    <EmployeeLayout>
                      <div className="space-y-6">
                        <h1 className="text-3xl font-bold">Mis Horarios</h1>
                        <p>Esta sección está en construcción</p>
                      </div>
                    </EmployeeLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/employee/payroll" 
                element={
                  <ProtectedRoute requiredRole={UserRole.EMPLOYEE}>
                    <EmployeeLayout>
                      <div className="space-y-6">
                        <h1 className="text-3xl font-bold">Mi Nómina</h1>
                        <p>Esta sección está en construcción</p>
                      </div>
                    </EmployeeLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/employee/evaluations" 
                element={
                  <ProtectedRoute requiredRole={UserRole.EMPLOYEE}>
                    <EmployeeLayout>
                      <div className="space-y-6">
                        <h1 className="text-3xl font-bold">Mis Evaluaciones</h1>
                        <p>Esta sección está en construcción</p>
                      </div>
                    </EmployeeLayout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/employee/request-permission" 
                element={
                  <ProtectedRoute requiredRole={UserRole.EMPLOYEE}>
                    <EmployeeLayout>
                      <div className="space-y-6">
                        <h1 className="text-3xl font-bold">Solicitar Permiso</h1>
                        <p>Esta sección está en construcción</p>
                      </div>
                    </EmployeeLayout>
                  </ProtectedRoute>
                } 
              />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SidebarProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
