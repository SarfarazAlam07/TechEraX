import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Trash2 } from "lucide-react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            <div className="p-6 text-center">
              <div className="w-14 h-14 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{title || "Confirm Deletion"}</h3>
              <p className="text-slate-500 text-sm">{message || "Are you sure you want to delete this item? This action cannot be undone."}</p>
            </div>
            <div className="bg-gray-50 p-4 flex gap-3 border-t border-gray-100">
              <button onClick={onClose} className="flex-1 py-2.5 rounded-xl font-bold text-slate-600 bg-white border border-gray-200 hover:bg-gray-100">Cancel</button>
              <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2 shadow-lg shadow-red-500/30"><Trash2 size={18} /> Delete</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default ConfirmationModal;
