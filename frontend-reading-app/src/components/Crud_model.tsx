

export default function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md">
        <div className="bg-white/75 p-10 rounded-4xl border border-white/30 shadow-lg w-116 relative transition-transform transform scale-95 hover:scale-100">
          <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500" onClick={onClose}>
            ✖
          </button>
          {children}
        </div>
      </div>
    );
  }
  