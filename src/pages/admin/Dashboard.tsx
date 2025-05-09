
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Award, Receipt } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Empleados",
      value: "32",
      description: "Activos en la empresa",
      icon: Users,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Horarios Activos",
      value: "8",
      description: "Plantillas configuradas",
      icon: Calendar,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Evaluaciones Pendientes",
      value: "12",
      description: "Por completar este mes",
      icon: Award,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Total Nómina",
      value: "$42,500",
      description: "Proyectado este mes",
      icon: Receipt,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Panel de Control</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>
              Últimas acciones en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-2"></div>
                <div>
                  <p className="text-sm font-medium">Nuevo empleado registrado</p>
                  <p className="text-xs text-muted-foreground">Hoy, 9:30 AM</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-2"></div>
                <div>
                  <p className="text-sm font-medium">Horario actualizado</p>
                  <p className="text-xs text-muted-foreground">Ayer, 2:15 PM</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-yellow-500 mt-2 mr-2"></div>
                <div>
                  <p className="text-sm font-medium">Solicitud de permiso pendiente</p>
                  <p className="text-xs text-muted-foreground">Ayer, 11:45 AM</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-purple-500 mt-2 mr-2"></div>
                <div>
                  <p className="text-sm font-medium">Evaluación completada</p>
                  <p className="text-xs text-muted-foreground">18 Mayo, 4:30 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Permisos Pendientes</CardTitle>
            <CardDescription>
              Solicitudes que requieren aprobación
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-start border-b pb-2">
                <div>
                  <p className="text-sm font-medium">Juan Pérez</p>
                  <p className="text-xs text-muted-foreground">Vacaciones: 20/05 - 27/05</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Rechazar</Button>
                  <Button variant="default" size="sm">Aprobar</Button>
                </div>
              </div>
              <div className="flex justify-between items-start border-b pb-2">
                <div>
                  <p className="text-sm font-medium">María García</p>
                  <p className="text-xs text-muted-foreground">Permiso médico: 19/05</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Rechazar</Button>
                  <Button variant="default" size="sm">Aprobar</Button>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">Carlos López</p>
                  <p className="text-xs text-muted-foreground">Medio día: 22/05 (tarde)</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Rechazar</Button>
                  <Button variant="default" size="sm">Aprobar</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
