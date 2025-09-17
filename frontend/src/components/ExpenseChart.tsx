import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface ExpenseChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  type?: 'pie' | 'bar';
}

const COLORS = ['#e50914', '#ff4757', '#ff6b6b', '#ff7979', '#fd79a8', '#fdcb6e', '#6c5ce7', '#74b9ff'];

export function ExpenseChart({ data, type = 'pie' }: ExpenseChartProps) {
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
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="name" tick={{ fill: '#888' }} />
        <YAxis tick={{ fill: '#888' }} />
        <Tooltip 
          formatter={(value: number) => [`₹${value.toFixed(2)}`, 'Amount']}
          contentStyle={{ 
            backgroundColor: 'rgba(15, 15, 15, 0.8)', 
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px'
          }}
        />
        <Bar dataKey="value" fill="#e50914" />
      </BarChart>
    </ResponsiveContainer>
  );
}