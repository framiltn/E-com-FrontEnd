'use client'
import { useState, useEffect } from 'react'
import { affiliateAPI } from '@/lib/api'
import Navbar from '@/components/Navbar'

export default function AffiliateTree() {
  const [tree, setTree] = useState(null)

  useEffect(() => {
    affiliateAPI.getTree().then(res => setTree(res.data)).catch(console.error)
  }, [])

  const renderNode = (node, level = 1) => (
    <div key={node.id} className={`ml-${level * 8} mb-2`}>
      <div className="card inline-block">
        <p className="font-bold">{node.name}</p>
        <p className="text-sm text-gray-600">Level {level} • ₹{node.total_sales || 0} sales</p>
      </div>
      {node.children?.map(child => renderNode(child, level + 1))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Affiliate Tree</h1>
        <div className="card">
          {tree ? renderNode(tree) : <p>Loading...</p>}
        </div>
      </div>
    </div>
  )
}
