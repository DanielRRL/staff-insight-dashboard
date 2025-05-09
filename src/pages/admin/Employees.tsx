
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, Search, MoreHorizontal, Edit, Trash } from "lucide-react";

// Mock data for demonstration
const mockEmployees = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    position: "Desarrollador Senior",
    department: "Tecnología",
    status: "Activo",
  },
  {
    id: 2,
    name: "María García",
    email: "maria.garcia@example.com",
    position: "Diseñadora UX",
    department: "Diseño",
    status: "Activo",
  },
  {
    id: 3,
    name: "Carlos López",
    email: "carlos.lopez@example.com",
    position: "Analista de Datos",
    department: "Análisis",
    status: "Activo",
  },
  {
    id: 4,
    name: "Ana Martínez",
    email: "ana.martinez@example.com",
    position: "Gerente de Proyecto",
    department: "Administración",
    status: "Activo",
  },
  {
    id: 5,
    name: "Roberto Sánchez",
    email: "roberto.sanchez@example.com",
    position: "Desarrollador Frontend",
    department: "Tecnología",
    status: "Inactivo",
  },
];

const mockPositions = [
  { id: 1, name: "Desarrollador Senior", department: "Tecnología" },
  { id: 2, name: "Desarrollador Frontend", department: "Tecnología" },
  { id: 3, name: "Diseñador UX", department: "Diseño" },
  { id: 4, name: "Analista de Datos", department: "Análisis" },
  { id: 5, name: "Gerente de Proyecto", department: "Administración" },
];

const EmployeesPage = () => {
  const [employees, setEmployees] = useState(mockEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<any>(null);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    status: "Activo",
  });

  const { toast } = useToast();

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = () => {
    const id = employees.length ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
    setEmployees([...employees, { ...newEmployee, id }]);
    setNewEmployee({
      name: "",
      email: "",
      position: "",
      department: "",
      status: "Activo",
    });
    setIsAddDialogOpen(false);
    toast({
      title: "Empleado agregado",
      description: "El empleado ha sido agregado exitosamente.",
    });
  };

  const handleEditEmployee = () => {
    setEmployees(
      employees.map((employee) =>
        employee.id === currentEmployee.id ? { ...currentEmployee } : employee
      )
    );
    setIsEditDialogOpen(false);
    toast({
      title: "Empleado actualizado",
      description: "La información del empleado ha sido actualizada.",
    });
  };

  const handleDeleteEmployee = () => {
    setEmployees(employees.filter((employee) => employee.id !== currentEmployee.id));
    setIsDeleteDialogOpen(false);
    toast({
      title: "Empleado eliminado",
      description: "El empleado ha sido eliminado exitosamente.",
    });
  };

  const openEditDialog = (employee: any) => {
    setCurrentEmployee({ ...employee });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (employee: any) => {
    setCurrentEmployee(employee);
    setIsDeleteDialogOpen(true);
  };

  const handlePositionChange = (value: string) => {
    const position = mockPositions.find((p) => p.name === value);
    if (position) {
      setNewEmployee({
        ...newEmployee,
        position: position.name,
        department: position.department,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestión de Empleados</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Empleado
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar empleados..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="w-[100px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        employee.status === "Activo"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(employee)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openDeleteDialog(employee)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No se encontraron empleados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Employee Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Empleado</DialogTitle>
            <DialogDescription>
              Ingrese los datos del nuevo empleado
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input
                id="name"
                value={newEmployee.name}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, name: e.target.value })
                }
                placeholder="Nombre del empleado"
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newEmployee.email}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, email: e.target.value })
                }
                placeholder="correo@ejemplo.com"
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="position">Cargo</Label>
              <Select
                onValueChange={handlePositionChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar cargo" />
                </SelectTrigger>
                <SelectContent>
                  {mockPositions.map((position) => (
                    <SelectItem key={position.id} value={position.name}>
                      {position.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="status">Estado</Label>
              <Select
                onValueChange={(value) =>
                  setNewEmployee({ ...newEmployee, status: value })
                }
                defaultValue="Activo"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Inactivo">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddEmployee}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Employee Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Empleado</DialogTitle>
            <DialogDescription>
              Modifique los datos del empleado
            </DialogDescription>
          </DialogHeader>
          {currentEmployee && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="edit-name">Nombre Completo</Label>
                <Input
                  id="edit-name"
                  value={currentEmployee.name}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={currentEmployee.email}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="edit-position">Cargo</Label>
                <Select
                  value={currentEmployee.position}
                  onValueChange={(value) => {
                    const position = mockPositions.find((p) => p.name === value);
                    if (position) {
                      setCurrentEmployee({
                        ...currentEmployee,
                        position: position.name,
                        department: position.department,
                      });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPositions.map((position) => (
                      <SelectItem key={position.id} value={position.name}>
                        {position.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="edit-status">Estado</Label>
                <Select
                  value={currentEmployee.status}
                  onValueChange={(value) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      status: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditEmployee}>Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Está seguro de que desea eliminar a este empleado?
              Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          {currentEmployee && (
            <div className="py-4">
              <p className="font-medium">{currentEmployee.name}</p>
              <p className="text-sm text-muted-foreground">
                {currentEmployee.email}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteEmployee}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeesPage;
