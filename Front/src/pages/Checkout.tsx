import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Link } from "react-router-dom";

export default function Checkout() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-zinc-900 to-slate-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Card className="w-full max-w-md shadow-2xl rounded-2xl bg-white/90 backdrop-blur p-6">
          <CardContent className="flex flex-col items-center gap-6">
            <CheckCircle2 className="text-green-500 w-16 h-16" />
            <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
            <h2 className="text-xl font-semibold text-center text-gray-700">
              Compra realizada com sucesso!
            </h2>
            <p className="text-center text-gray-600">
              Seu pedido foi confirmado e está sendo processado.
            </p>
            <Button
              asChild
              className="mt-4 w-full text-white bg-blue-600 hover:bg-blue-700"
            >
              <Link to="/">Continue comprando</Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
