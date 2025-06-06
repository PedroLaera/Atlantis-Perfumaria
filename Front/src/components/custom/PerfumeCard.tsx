import { motion } from "framer-motion";

interface PerfumeCardProps {
  image: string;
  title: string;
  description: string;
}

export const PerfumeCard = ({
  image,
  title,
  description,
}: PerfumeCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden w-72 m-4 cursor-pointer transform hover:shadow-2xl"
    >
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};
