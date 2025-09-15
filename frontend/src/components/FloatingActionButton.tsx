import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function FloatingActionButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate('/add')}
      className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-primary rounded-full shadow-glow flex items-center justify-center group hover:scale-110 smooth-transition z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Plus className="w-6 h-6 text-white group-hover:rotate-90 smooth-transition" />
    </motion.button>
  );
}