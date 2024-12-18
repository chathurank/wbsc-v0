export function SamGovBadge() {
  return (
    <div className="inline-flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="2" fill="#1A4480"/>
            <path d="M12 3L14.5 8H9.5L12 3Z" fill="#E31C3D"/>
            <path d="M14.5 8H9.5V13H14.5V8Z" fill="#E31C3D"/>
            <path d="M9.5 13H4.5L7 18H12L9.5 13Z" fill="#E31C3D"/>
            <path d="M19.5 13H14.5L12 18H17L19.5 13Z" fill="#E31C3D"/>
          </svg>
        </div>
        <span className="font-bold text-[#1A4480]">SAM.GOV</span>
      </div>
      <div className="text-center">
        <div className="text-xs font-medium text-gray-600">Approved</div>
        <div className="text-xs font-medium text-gray-600">US Government Vendor</div>
        <div className="text-xs text-gray-500 mt-1">Cage Code: 1UXJ6</div>
      </div>
    </div>
  )
}

