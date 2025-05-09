
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { 
  User, Mail, Calendar, MapPin, Phone, Briefcase, Clock
} from "lucide-react";

// Mock data for employee profile
const employeeData = {
  id: 101,
  name: "John Doe",
  email: "john.doe@example.com",
  position: "Desarrollador Frontend",
  department: "Tecnología",
  joinDate: "15/03/2022",
  address: "Calle Principal 123, Ciudad",
  phone: "+34 612 345 678",
  status: "Activo",
  schedule: "Lunes a Viernes, 9:00 - 18:00",
  vacationDays: 21,
  usedVacationDays: 5,
  remainingVacationDays: 16,
};

// Mock data for recent activity
const recentActivity = [
  {
    id: 1,
    type: "schedule",
    description: "Horario actualizado",
    date: "12 May 2023",
  },
  {
    id: 2,
    type: "evaluation",
    description: "Evaluación de desempeño completada",
    date: "05 May 2023",
  },
  {
    id: 3,
    type: "permission",
    description: "Solicitud de vacaciones aprobada",
    date: "28 Apr 2023",
  },
  {
    id: 4,
    type: "payroll",
    description: "Nómina del mes procesada",
    date: "01 Apr 2023",
  },
];

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mi Perfil</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Información Personal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-3xl">
                  {employeeData.name.charAt(0)}
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Nombre completo</p>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{employeeData.name}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Correo electrónico</p>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{employeeData.email}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Cargo</p>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span>{employeeData.position}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Departamento</p>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span>{employeeData.department}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Fecha de ingreso</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{employeeData.joinDate}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Estado</p>
                    <div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        {employeeData.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Dirección</p>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{employeeData.address}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Teléfono</p>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{employeeData.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Horario</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Horario laboral</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{employeeData.schedule}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Días de vacaciones</h4>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-lg font-bold text-blue-600">{employeeData.vacationDays}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <p className="text-sm text-muted-foreground">Usados</p>
                    <p className="text-lg font-bold text-green-600">{employeeData.usedVacationDays}</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <p className="text-sm text-muted-foreground">Disponibles</p>
                    <p className="text-lg font-bold text-purple-600">{employeeData.remainingVacationDays}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader className="pb-3">
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-primary"></div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
