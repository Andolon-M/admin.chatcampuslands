import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, MessageSquare, TrendingUp } from "lucide-react";

export const StatsOverview = ({ stats }) => {
  // Definición de las tarjetas de estadísticas
  const statsCards = [
    {
      title: "Usuarios Totales",
      icon: Users,
      value: stats.totalUsers,
      color: "cyan",
      description: "Total de usuarios únicos"
    },
    {
      title: "Usuarios Registrados",
      icon: MessageSquare,
      value: stats.registeredUsers,
      color: "cyan",
      description: "Usuarios que completaron registro"
    },
    {
      title: "Tasa de Conversión",
      icon: TrendingUp,
      value: `${stats.conversionRate}%`,
      color: "cyan",
      description: "Porcentaje de usuarios registrados"
    },
    {
      title: "Costo Global por Usuario",
      icon: MessageSquare, value: `$${new Intl.NumberFormat('es-CO', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(stats.costPerUser)}`,
      color: "cyan",
      description: "Costo promedio por usuario"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((stat, index) => (
        <Card
          key={index}
          className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{stat.title}</p>
                <p className={`text-2xl font-bold text-${stat.color}-400 mt-2`}>
                  {stat.value}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {stat.description}
                </p>
              </div>
              <stat.icon className={`w-8 h-8 text-${stat.color}-400 opacity-80`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};