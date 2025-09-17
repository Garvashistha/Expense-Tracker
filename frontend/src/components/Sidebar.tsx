import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Plus, 
  CreditCard, 
  BarChart3, 
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/add', icon: Plus, label: 'Add Expense' },
  { to: '/transactions', icon: CreditCard, label: 'Transactions' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

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

        <nav className="space-y-2">
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
      </div>
    </motion.aside>
  );
}