import { motion } from 'framer-motion'

// Animated card wrapper used by service/benefit grids.
export default function Card({ index = 0, className = '', children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.1 }}
      className={`card-base p-7 hover:-translate-y-1.5 hover:shadow-glow ${className}`}
    >
      {children}
    </motion.div>
  )
}
