'use client'
import { useState, useEffect } from 'react'
import api, { getAssetUrl } from '@/lib/api'
import Navbar from '@/components/Navbar'

export default function SellerProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [images, setImages] = useState([])
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category_id: 1,
    brand: '',
    commission_level: '9-6-3'
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await api.get('/seller/products')
      setProducts(response.data.data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (product) => {
    setEditingId(product.id)
    setImages(product.images || [])
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category_id: product.category?.id || 1,
      brand: product.brand || '',
      commission_level: product.commission_level || '9-6-3'
    })
    setShowForm(true)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const data = new FormData()
    data.append('image', file)

    setUploading(true)
    try {
      const res = await api.post(`/seller/products/${editingId}/images`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setImages([...images, res.data.data])
      fetchProducts() // Refresh list to update thumbnails
    } catch (error) {
      alert('Upload failed: ' + (error.response?.data?.message || error.message))
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteImage = async (imageId) => {
    if (!confirm('Delete this image?')) return
    try {
      await api.delete(`/seller/products/${editingId}/images/${imageId}`)
      setImages(images.filter(img => img.id !== imageId))
      fetchProducts()
    } catch (error) {
      alert('Failed to delete image')
    }
  }

  const handleSetPrimary = async (imageId) => {
    try {
      await api.post(`/seller/products/${editingId}/images/${imageId}/primary`)
      setImages(images.map(img => ({
        ...img,
        is_primary: img.id === imageId
      })))
      fetchProducts()
    } catch (error) {
      alert('Failed to set primary image')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!editingId) return

    try {
      await api.put(`/seller/products/${editingId}`, formData)
      setShowForm(false)
      setEditingId(null)
      setImages([])
      setFormData({ name: '', description: '', price: '', stock: '', category_id: 1, brand: '', commission_level: '9-6-3' })
      fetchProducts()
      alert('Product updated successfully')
    } catch (error) {
      alert('Failed to update product')
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setImages([])
    setFormData({ name: '', description: '', price: '', stock: '', category_id: 1, brand: '', commission_level: '9-6-3' })
  }

  const deleteProduct = async (id) => {
    if (!confirm('Delete this product?')) return
    try {
      await api.delete(`/seller/products/${id}`)
      fetchProducts()
    } catch (error) {
      alert('Failed to delete product')
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">Loading...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Products</h1>
        </div>

        {showForm && (
          <div className="card mb-8">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>

            {/* Image Management Section */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-4">Product Images</h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {images.map((img) => (
                  <div key={img.id} className="relative group aspect-square bg-white rounded-lg border overflow-hidden">
                    <img
                      src={getAssetUrl(img.url)}
                      alt="Product"
                      className="w-full h-full object-cover"
                    />
                    {img.is_primary && (
                      <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                        Primary
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      {!img.is_primary && (
                        <button
                          onClick={() => handleSetPrimary(img.id)}
                          className="p-1 bg-white rounded text-xs hover:bg-gray-100"
                          title="Set as Primary"
                        >
                          ★
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteImage(img.id)}
                        className="p-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}

                <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-blue-50 transition aspect-square">
                  <span className="text-2xl text-gray-400">+</span>
                  <span className="text-sm text-gray-500 mt-1">Upload Image</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                </label>
              </div>
              {uploading && <p className="text-sm text-blue-600">Uploading...</p>}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Product Name *</label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Brand</label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  required
                  rows={3}
                  className="input-field"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1200"
                    className="input-field"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Stock *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    className="input-field"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Commission Level *</label>
                  <select
                    className="input-field"
                    value={formData.commission_level}
                    onChange={(e) => setFormData({ ...formData, commission_level: e.target.value })}
                  >
                    <option value="6-4-2">6-4-2</option>
                    <option value="9-6-3">9-6-3</option>
                    <option value="12-8-4">12-8-4</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <button type="submit" className="btn-primary">
                  Update Product
                </button>
                <button type="button" onClick={handleCancel} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {products.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-500">No products yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {products.map((product) => {
              const primaryImage = product.images?.find(i => i.is_primary) || product.images?.[0]

              return (
                <div key={product.id} className="card flex gap-4 items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {primaryImage ? (
                      <img
                        src={getAssetUrl(primaryImage.url)}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-gray-600">₹{product.price} | Stock: {product.stock}</p>
                    <span className="text-sm text-gray-500">Status: {product.status}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="btn-secondary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
