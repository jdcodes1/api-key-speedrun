export default function ToastManager({ toasts, onDismiss }) {
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`toast-enter flex items-start gap-2 p-3 rounded-lg shadow-lg border text-sm cursor-pointer ${
            toast.type === 'error'
              ? 'bg-red-50 border-red-200 text-red-800'
              : toast.type === 'warning'
              ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
              : toast.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-white border-gborder text-gdark'
          }`}
          onClick={() => onDismiss(toast.id)}
        >
          <span className="shrink-0 mt-0.5">
            {toast.type === 'error' ? '❌' : toast.type === 'warning' ? '⚠️' : toast.type === 'success' ? '✅' : 'ℹ️'}
          </span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  )
}
