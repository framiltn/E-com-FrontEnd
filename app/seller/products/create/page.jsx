'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import api, { categoryAPI } from '@/lib/api'
import Navbar from '@/components/Navbar'
import Navbar from '@/components/Navbar'

export default function CreateProductPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
    brand: '',
    commission_level: '6-4-2'
  })
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll()
      // Backend returns direct array, not wrapped in data.data
      const cats = Array.isArray(response.data) ? response.data : response.data.data || []
      setCategories(cats)
      if (cats.length > 0) {
        setFormData(prev => ({ ...prev, category_id: cats[0].id }))
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleImageChange = (e) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // 1. Create Product
      const productResponse = await api.post('/seller/products', formData)
      const productId = productResponse.data.data.id

      // 2. Upload Images
      if (images.length > 0) {
        for (const image of images) {
          const imageFormData = new FormData()
          imageFormData.append('image', image)
          await api.post(`/seller/products/${productId}/images`, imageFormData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
        }
      }

      alert('Product created successfully!')
      router.push('/seller/products')
    } catch (error) {
      console.error('Error creating product:', error)
      alert('Error creating product: ' + (error.response?.data?.message || error.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Create Product</h1>

        <form onSubmit={handleSubmit} className="card space-y-4">
          <div>
            <label className="block font-medium mb-2">Product Name</label>
            <input type="text" required className="input-field" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>

          <div>
            <label className="block font-medium mb-2">Description</label>
            <textarea required className="input-field" rows="4" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-2">Price (₹)</label>
              <input type="number" required className="input-field" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
            </div>
            <div>
              <label className="block font-medium mb-2">Stock</label>
              <input type="number" required className="input-field" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">Category</label>
            <select
              required
              className="input-field"
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">Brand</label>
            <input type="text" className="input-field" value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} />
          </div>

          <div>
            <label className="block font-medium mb-2">Commission Level</label>
            <select className="input-field" value={formData.commission_level} onChange={(e) => setFormData({ ...formData, commission_level: e.target.value })}>
              <option value="6-4-2">6-4-2%</option>
              <option value="9-6-3">9-6-3%</option>
              <option value="12-8-4">12-8-4%</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">Product Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="input-field"
              onChange={handleImageChange}
            />
            <p className="text-sm text-gray-500 mt-1">You can select multiple images.</p>
          </div>

          <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">
            {loading ? 'Creating...' : 'Create Product'}
          </button>
        </form>
      </div>

    </div>
  )
}
