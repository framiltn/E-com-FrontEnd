'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import FlipHero from '@/components/FlipHero'
import FlipSection from '@/components/FlipSection'
import FlipGridSection from '@/components/FlipGridSection'
import ProductGrid from '@/components/ProductGrid'
import { authAPI } from '@/lib/api'

export default function Home() {
  const router = useRouter()
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUserRole = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setRole('guest')
        setLoading(false)
        return
      }

      try {
        const res = await authAPI.getUser()
        const userRole = res.data.role
        setRole(userRole)
      } catch (error) {
        console.error('Failed to fetch user role:', error)
        setRole('guest')
      } finally {
        setLoading(false)
      }
    }

    checkUserRole()
  }, [])

  const checkUserRole = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setRole('guest')
      setLoading(false)
      return
    }

    try {
      const res = await authAPI.getUser()
      const userRole = res.data.role
      setRole(userRole)

      // Redirect Admin to Dashboard
      if (userRole === 'admin') {
        router.push('/admin/dashboard')
      }
    } catch (error) {
      console.error('Error fetching user role:', error)
      setRole('guest')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex justify-center items-center h-[calc(100vh-64px)]">
        <div className="w-10 h-10 border-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>
      </div>
    )
  }

  // If redirected, don't show content
  if (role === 'admin') {
    return null
  }

  const beautyProducts = [
    { name: 'Mascara', img: '/images/prod_beauty_mascara.webp', price: 'From ₹399', brand: 'Lakme, Maybelline' },
    { name: 'Eyeshadow', img: '/images/prod_beauty_palette.webp', price: 'Min. 30% Off', brand: 'Swiss Beauty' },
    { name: 'Lipstick', img: '/images/prod_beauty_lipstick.webp', price: 'From ₹199', brand: 'Sugar, Elle 18' },
    { name: 'Compact', img: '/images/prod_beauty_powder.webp', price: 'Up to 40% Off', brand: 'Faces Canada' },
    { name: 'Soft Toys', img: '/images/icon_cat_toys.png', price: 'From ₹499', brand: 'Disney, Hamleys' },
    { name: 'Party Snacks', img: '/images/icon_cat_grocery.png', price: 'Buy 1 Get 1', brand: 'Lays, Doritos' },
  ];

  const homeProducts = [
    { name: 'King Bed', img: '/images/prod_home_bed.webp', price: 'From ₹12,999', brand: 'Wakefit, Sleepyhead' },
    { name: 'Luxury Sofa', img: '/images/prod_home_sofa.webp', price: 'Min. 40% Off', brand: 'Bharat Lifestyle' },
    { name: 'Swing', img: '/images/prod_home_swing.webp', price: 'From ₹5,999', brand: 'DecorNation' },
    { name: 'Plants', img: '/images/prod_home_plant.webp', price: 'From ₹299', brand: 'Ugaoo, Nurturing' },
    { name: 'Wall Decor', img: '/images/prod_home_decor_wall_real.png', price: 'Up to 70% Off', brand: 'Best Deal' },
    { name: 'Showpiece', img: '/images/prod_home_showpiece_real.png', price: 'From ₹199', brand: 'Home Centre' },
  ];

  return (
    <div className="min-h-screen bg-secondary font-sans text-sm">
      {/* Main Content for Buyers/Guests */}
      <main className="pb-8">
        {/* Main Layout */}
        <div className="p-2 space-y-2">
          <FlipHero />

          {/* Grid Layout Model */}
          <FlipGridSection items={[
            {
              title: 'Best of Smart Tech',
              link: '/products?category=smart-tech',
              products: [
                { name: 'Smart Watches', img: '/images/prod_ext_watch_real.webp', offer: 'Min. 50% Off' },
                { name: 'Wireless Earbuds', img: '/images/prod_ext_earbuds.webp', offer: 'Special Offer' },
                { name: 'Smart Bands', img: '/images/prod_ext_band_final.webp', offer: 'From ₹999' },
                { name: 'Smart Speakers', img: '/images/prod_ext_speaker.webp', offer: 'New Launch' }
              ]
            },
            {
              title: 'Gaming & Accessories',
              link: '/products?category=gaming',
              products: [
                { name: 'Gaming Keyboards', img: '/images/prod_ext_keyboard_final.webp', offer: 'Min. 30% Off' },
                { name: 'Gaming Mouse', img: '/images/prod_ext_mouse_final.webp', offer: 'From ₹499' },
                { name: 'Gaming Laptops', img: '/images/prod_ext_gaming_laptop.webp', offer: 'Top Rated' },
                { name: 'Headsets', img: '/images/prod_ext_headphones.webp', offer: 'Shop Now' }
              ]
            },
            {
              title: 'Top Rated Gear',
              link: '/products?category=gear',
              products: [
                { name: 'Trimmers', img: '/images/prod_ext_trimmer_final.webp', offer: 'Min. 60% Off' },
                { name: 'Power Banks', img: '/images/prod_ext_powerbank.webp', offer: 'From ₹399' },
                { name: 'Mobile Cables', img: '/images/prod_ext_charger.webp', offer: 'Buy 1 Get 1' },
                { name: 'Selfie Sticks', img: '/images/prod_ext_stick.webp', offer: 'Best Seller' }
              ]
            }
          ]} />

          {/* Best of Electronics */}
          <div className="flex gap-2">
            <div className="flex-1 w-0 min-w-0"> {/* Prevent overflow */}
              <FlipSection title="Best of Electronics" />
            </div>
            {/* Right Side Ad - Optional */}
            <div className="hidden xl:block w-[230px] flex-shrink-0 bg-white p-2 shadow-sm">
              <img src="/images/ad_side_gaming.png" alt="Ad" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Beauty, Food, Toys & More */}
          <FlipSection title="Beauty, Food, Toys & More" linkText="VIEW ALL" products={beautyProducts} />

          {/* 3 Column Grid Ad */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 my-4">
            {[
              '/images/ad_grid_laptops.png',
              '/images/ad_grid_camera.png',
              '/images/ad_grid_accessories.png',
            ].map((src, i) => (
              <div key={i} className="bg-white shadow-sm overflow-hidden">
                <img src={src} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>

          {/* Home & Kitchen Essentials */}
          <FlipSection title="Home & Kitchen Essentials" products={homeProducts} />

          {/* More Products grid for browsing */}
          <div className="bg-white shadow-sm p-4 mt-4">
            <h2 className="text-xl font-bold mb-4">Suggested for You</h2>
            <ProductGrid />
          </div>
        </div>
      </main>
    </div>
  )
}
