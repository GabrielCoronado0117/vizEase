import React from 'react';
import { 
  LayoutDashboard,
  Table,
  Upload,
  Download,
  PlusCircle,
  User,
  LogOut,
  Settings,
  ChevronRight
} from 'lucide-react';

const MenuItem = ({ icon: Icon, label, href, variant = 'default' }) => {
  const baseStyles = "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group relative";
  const variants = {
    default: "text-gray-600 hover:bg-gray-100 hover:text-blue-600",
    danger: "text-gray-600 hover:bg-red-50 hover:text-red-600"
  };
  
  return (
    <a 
      href={href}
      className={`${baseStyles} ${variants[variant]}`}
    >
      <Icon className="w-5 h-5 transition-colors duration-200" />
      <span className="font-medium">{label}</span>
      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 absolute right-4 transition-all duration-200" />
    </a>
  );
};

const Sidebar = () => {
  return (
    <div className="w-64 bg-white h-screen flex flex-col border-r border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">Vizease</h1>
            <p className="text-sm text-gray-500">Panel de Control</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 pt-4 overflow-y-auto">
        <div className="px-3 space-y-1">
          <MenuItem 
            icon={Table} 
            label="Tablas" 
            href="/tables" 
          />
          <MenuItem 
            icon={Upload} 
            label="Importar datos" 
            href="/import" 
          />
          <MenuItem 
            icon={Download} 
            label="Exportar datos" 
            href="/export" 
          />
          <MenuItem 
            icon={PlusCircle} 
            label="Agregar componentes" 
            href="/add-components" 
          />
        </div>

        {/* Settings Section */}
        <div className="mt-8 px-4">
          <h2 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Configuración
          </h2>
          <div className="mt-4 px-3 space-y-1">
            <MenuItem 
              icon={Settings} 
              label="Preferencias" 
              href="/settings" 
            />
          </div>
        </div>
      </nav>

      {/* User Section */}
      <div className="border-t border-gray-200 p-4">
        <div className="px-3 space-y-1">
          <MenuItem 
            icon={User} 
            label="Mi Perfil" 
            href="/profile" 
          />
          <MenuItem 
            icon={LogOut} 
            label="Cerrar Sesión" 
            href="/logout" 
            variant="danger" 
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;