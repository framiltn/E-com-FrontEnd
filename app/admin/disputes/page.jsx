'use client'

export default function AdminDisputesPage() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dispute Resolution</h1>
      </div>

      <div className="bg-white rounded-[2px] shadow-sm p-12 text-center">
        <div className="text-6xl mb-4">⚖️</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">No Active Disputes</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          There are currently no open disputes between buyers and sellers. When a dispute is raised, it will appear here for moderation.
        </p>
      </div>
    </div>
  )
}
