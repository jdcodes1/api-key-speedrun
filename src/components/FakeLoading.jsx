export default function FakeLoading({ message }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-glight">
      {/* Google-style spinner */}
      <div className="relative w-10 h-10 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gblue animate-spin"></div>
      </div>
      <p className="text-sm text-gray-500">{message || 'Loading...'}</p>
    </div>
  )
}
