import React from "react";
import { AlertTriangle, Trash2 } from "lucide-react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  // Agar modal open nahi hai, toh kuch mat dikhao
  if (!isOpen) return null;

  return (
    // Main Container (Z-Index High rakha hai taaki sabse upar dikhe)
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
      
      {/* 1. Backdrop (Kaala Dhundhla Background) */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose} // Bahar click karne par band ho jayega
      ></div>

      {/* 2. Modal Box (White Content) */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 opacity-100">
        
        {/* Icon aur Text Area */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={32} />
          </div>
          
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            {title || "Confirm Deletion"}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            {message || "Are you sure you want to delete this? This action cannot be undone."}
          </p>
        </div>

        {/* Buttons Area */}
        <div className="bg-gray-50 p-4 flex gap-3 border-t border-gray-100">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl font-bold text-slate-700 bg-white border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 transition-colors"
          >
            <Trash2 size={20} /> Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
