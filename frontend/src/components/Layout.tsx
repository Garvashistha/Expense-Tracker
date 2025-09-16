import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { FloatingActionButton } from "./FloatingActionButton";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-gradient-dark">
      <Sidebar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-6 overflow-auto"
      >
        {children}
        <FloatingActionButton />
      </motion.main>
    </div>
  );
}
