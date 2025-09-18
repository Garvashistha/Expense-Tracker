import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Plus, 
  CreditCard, 
  BarChart3, 
  Menu,
  X,
  LogOut,
  User
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/add', icon: Plus, label: 'Add Expense' },
  { to: '/transactions', icon: CreditCard, label: 'Transactions' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();

  return (
    <motion.aside 
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="glass-card h-screen flex flex-col z-50 border-r border-border/50"
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="p-6 flex-1 overflow-y-auto overflow-x-hidden">
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ExpenseTracker
              </span>
            </motion.div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-accent/50 smooth-transition"
          >
            {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
        </div>

        {/* User info */}
        {!isCollapsed && user && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-3 glass rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-primary rounded-full">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <nav className="space-y-2 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-xl smooth-transition group ${
                  isActive
                    ? 'bg-gradient-primary text-white shadow-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`
              }
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 smooth-transition" />
              {!isCollapsed && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-medium"
                >
                  {item.label}
                </motion.span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout button */}
        <div className="mt-auto pt-4 border-t border-border/50">
          <Button
            onClick={logout}
            variant="ghost"
            className={`w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent/50 ${
              isCollapsed ? 'px-3' : 'px-4'
            }`}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="ml-3"
              >
                Logout
              </motion.span>
            )}
          </Button>
        </div>
      </div>
    </motion.aside>
  );
}