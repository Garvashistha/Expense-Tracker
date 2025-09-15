import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({ title, value, subtitle, icon: Icon, trend, className = '' }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`glass-card p-6 smooth-transition ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-primary/20 rounded-xl">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <p className="text-2xl font-bold text-foreground">{value}</p>
          </div>
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${trend.isPositive ? 'text-green-500' : 'text-primary'}`}>
            <span>{trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      {subtitle && (
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      )}
    </motion.div>
  );
}