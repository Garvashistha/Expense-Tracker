import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useTheme } from "@/context/ThemeContext";

interface ExpenseChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  type?: 'pie' | 'bar';
}

export function ExpenseChart({ data, type = 'pie' }: ExpenseChartProps) {
  const { theme } = useTheme();
  
  // Dynamic colors based on theme
  const COLORS = theme === 'dark' 
    ? ['#e50914', '#ff4757', '#ff6b6b', '#ff7979', '#fd79a8', '#fdcb6e', '#6c5ce7', '#74b9ff']
    : ['#3b82f6', '#06b6d4', '#10b981', '#22c55e', '#84cc16', '#eab308', '#f59e0b', '#ef4444'];
  if (type === 'pie') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => [`₹${value.toFixed(2)}`, 'Amount']} />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke={theme === 'dark' ? '#333' : '#e5e7eb'} 
        />
        <XAxis 
          dataKey="name" 
          tick={{ fill: theme === 'dark' ? '#888' : '#6b7280' }} 
        />
        <YAxis 
          tick={{ fill: theme === 'dark' ? '#888' : '#6b7280' }} 
        />
        <Tooltip 
          formatter={(value: number) => [`₹${value.toFixed(2)}`, 'Amount']}
          contentStyle={{ 
            backgroundColor: theme === 'dark' ? 'rgba(15, 15, 15, 0.8)' : 'rgba(255, 255, 255, 0.95)', 
            border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            color: theme === 'dark' ? '#fff' : '#000'
          }}
        />
        <Bar dataKey="value" fill={COLORS[0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}