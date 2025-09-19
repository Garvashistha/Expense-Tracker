import { motion } from 'framer-motion';
import { Sun, Moon, Palette } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
    >
      <Button
        onClick={toggleTheme}
        variant="outline"
        size="sm"
        className="glass-card border-border/50 bg-background/80 backdrop-blur-md hover:bg-background/90 transition-all duration-300 group"
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 0 : 180 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="mr-2"
        >
          {isDark ? (
            <Moon className="h-4 w-4 text-primary" />
          ) : (
            <Sun className="h-4 w-4 text-primary" />
          )}
        </motion.div>
        <span className="text-xs font-medium">
          {isDark ? 'Dark' : 'Light'}
        </span>
        <Palette className="ml-2 h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity" />
      </Button>
    </motion.div>
  );
}