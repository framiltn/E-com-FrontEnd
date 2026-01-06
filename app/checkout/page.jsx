'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { cartAPI, checkoutAPI, authAPI, getAssetUrl } from '@/lib/api'


export default function CheckoutPage() {
  const router = useRouter()
  const [cart, setCart] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeStep, setActiveStep] = useState(2) // 1: Login, 2: Address, 3: Summary, 4: Payment
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [processing, setProcessing] = useState(false)

  const [address, setAddress] = useState({
    name: '', phone: '', pincode: '', locality: '', address: '', city: '', state: '', landmark: '', type: 'home'
  })

  useEffect(() => {
    checkUser()
    fetchCart()
  }, [])

  const checkUser = async () => {
    try {
      const res = await authAPI.getUser()
      setUser(res.data)
      if (res.data) {
        setAddress(prev => ({ ...prev, name: res.data.name, email: res.data.email }))
        setActiveStep(2) // Skip login if logged in
      } else {
        setActiveStep(1)
      }
    } catch (err) {
      setActiveStep(1)
    }
  }

  const fetchCart = async () => {
    try {
      const response = await cartAPI.get()
      setCart(response.data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeliverHere = (e) => {
    e.preventDefault()
    // Validate address here
    setActiveStep(3)
  }

  const handleContinue = () => {
    setActiveStep(4)
  }

  const handlePlaceOrder = async () => {
    if (processing) return
    setProcessing(true)

    // Simulate payment processing for Online methods
    await new Promise(resolve => setTimeout(resolve, 2000))

    try {
      await checkoutAPI.process({
        shipping_address: address,
        payment_method: paymentMethod
      })
      alert(paymentMethod === 'cod' ? 'Order Placed Successfully!' : 'Payment Successful! Order Placed.')
      router.push('/orders')
    } catch (err) {
      alert('Order Failed: ' + (err.response?.data?.message || err.message))
    } finally {
      setProcessing(false)
    }
  }

  if (loading) return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-[#f1f3f6] font-sans text-sm">


      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 py-8">
        {/* LEFT COLUMN - STEPS */}
        <div className="lg:col-span-2 space-y-4">

          {/* Step 1: Login */}
          <div className="bg-white shadow-sm">
            <div className={`p-4 flex items-center justify-between ${activeStep === 1 ? 'bg-primary text-white' : 'bg-white'}`}>
              <div className="flex items-center gap-4">
                <span className="bg-gray-200 text-primary px-2 py-0.5 rounded-[2px] text-xs font-bold">1</span>
                <h3 className={`font-bold uppercase ${activeStep === 1 ? 'text-white' : 'text-gray-500'}`}>Login</h3>
                {activeStep > 1 && user && (
                  <div className="flex flex-col ml-4">
                    <span className="text-gray-900 font-bold text-sm">{user.name} <span className="font-normal text-gray-600">+91 9999999999</span></span>
                  </div>
                )}
              </div>
              {activeStep > 1 && <button className="text-primary border border-gray-200 px-4 py-1 text-sm font-bold uppercase bg-white">Change</button>}
            </div>
            {activeStep === 1 && (
              <div className="p-6">
                <p className="mb-4">Please login to continue checkout</p>
                <button onClick={() => router.push('/login?redirect=/checkout')} className="bg-primary text-white px-8 py-3 rounded-[2px] font-bold">LOGIN</button>
              </div>
            )}
          </div>

          {/* Step 2: Address */}
          <div className="bg-white shadow-sm">
            <div className={`p-4 flex items-center justify-between ${activeStep === 2 ? 'bg-primary text-white' : 'bg-white'}`}>
              <div className="flex items-center gap-4">
                <span className="bg-gray-200 text-primary px-2 py-0.5 rounded-[2px] text-xs font-bold">2</span>
                <h3 className={`font-bold uppercase ${activeStep === 2 ? 'text-white' : 'text-gray-500'}`}>Delivery Address</h3>
              </div>
            </div>
            {activeStep === 2 && (
              <div className="p-6">
                <form onSubmit={handleDeliverHere} className="space-y-4 max-w-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Name" className="p-3 border rounded-[2px] focus:border-primary outline-none"
                      value={address.name} onChange={e => setAddress({ ...address, name: e.target.value })} required />
                    <input type="text" placeholder="10-digit mobile number" className="p-3 border rounded-[2px] focus:border-primary outline-none"
                      value={address.phone} onChange={e => setAddress({ ...address, phone: e.target.value })} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Pincode" className="p-3 border rounded-[2px] focus:border-primary outline-none"
                      value={address.pincode} onChange={e => setAddress({ ...address, pincode: e.target.value })} required />
                    <input type="text" placeholder="Locality" className="p-3 border rounded-[2px] focus:border-primary outline-none"
                      value={address.locality} onChange={e => setAddress({ ...address, locality: e.target.value })} required />
                  </div>
                  <textarea placeholder="Address (Area and Street)" className="w-full p-3 border rounded-[2px] focus:border-primary outline-none" rows="3"
                    value={address.address} onChange={e => setAddress({ ...address, address: e.target.value })} required ></textarea>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="City/District/Town" className="p-3 border rounded-[2px] focus:border-primary outline-none"
                      value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} required />
                    <input type="text" placeholder="State" className="p-3 border rounded-[2px] focus:border-primary outline-none"
                      value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} required />
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 my-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="type" checked={address.type === 'home'} onChange={() => setAddress({ ...address, type: 'home' })} />
                      <span>Home (All day delivery)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="type" checked={address.type === 'work'} onChange={() => setAddress({ ...address, type: 'work' })} />
                      <span>Work (Delivery between 10 AM - 5 PM)</span>
                    </label>
                  </div>

                  <button type="submit" className="bg-[#fb641b] text-white px-8 py-3 rounded-[2px] font-bold uppercase hover:shadow-lg">
                    Save and Deliver Here
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Step 3: Order Summary */}
          <div className="bg-white shadow-sm">
            <div className={`p-4 flex items-center justify-between ${activeStep === 3 ? 'bg-primary text-white' : 'bg-white'}`}>
              <div className="flex items-center gap-4">
                <span className="bg-gray-200 text-primary px-2 py-0.5 rounded-[2px] text-xs font-bold">3</span>
                <h3 className={`font-bold uppercase ${activeStep === 3 ? 'text-white' : 'text-gray-500'}`}>Order Summary</h3>
                {activeStep > 3 && (
                  <div className="text-gray-600 font-bold text-sm ml-4">
                    {cart?.items?.length} Items
                  </div>
                )}
              </div>
              {activeStep > 3 && <button className="text-primary border border-gray-200 px-4 py-1 text-sm font-bold uppercase bg-white">Change</button>}
            </div>
            {activeStep === 3 && (
              <div className="p-4">
                {cart?.items?.map(item => (
                  <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-4 mb-4 last:border-0">
                    <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center">
                      <img src={getAssetUrl(item.product.images?.[0])} className="max-h-full max-w-full object-contain" alt={item.product.name} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                      <div className="text-xs text-gray-500 mt-1">Seller: RetailNet</div>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-lg font-bold">₹{item.price}</span>
                        <span className="text-sm text-gray-500 line-through">₹{Math.round(item.price * 1.2)}</span>
                        <span className="text-sm text-green-600 font-medium">20% Off</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                  <div className="text-sm">Order verification email will be sent to <span className="font-bold">{user?.email}</span></div>
                  <button onClick={handleContinue} className="bg-[#fb641b] text-white px-10 py-3 rounded-[2px] font-bold uppercase shadow-sm">
                    Continue
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Step 4: Payment */}
          <div className="bg-white shadow-sm">
            <div className={`p-4 flex items-center justify-between ${activeStep === 4 ? 'bg-primary text-white' : 'bg-white'}`}>
              <div className="flex items-center gap-4">
                <span className="bg-gray-200 text-primary px-2 py-0.5 rounded-[2px] text-xs font-bold">4</span>
                <h3 className={`font-bold uppercase ${activeStep === 4 ? 'text-white' : 'text-gray-500'}`}>Payment Options</h3>
              </div>
            </div>
            {activeStep === 4 && (
              <div className="p-6">
                <div className="space-y-4">
                  {/* UPI */}
                  <label className={`flex flex-col p-4 border rounded-[2px] cursor-pointer ${paymentMethod === 'upi' ? 'bg-blue-50 border-blue-200' : 'border-gray-200'}`}>
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="payment"
                        className="h-4 w-4"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                      />
                      <div className="flex-1">
                        <span className="font-medium">UPI</span>
                        <div className="text-xs text-gray-500">Pay by any UPI app</div>
                      </div>
                    </div>
                    {paymentMethod === 'upi' && (
                      <div className="mt-4 pl-8">
                        <input type="text" placeholder="Enter UPI ID" className="p-2 border rounded w-full max-w-xs" />
                        <button className="mt-2 text-primary font-bold text-xs uppercase">Verify</button>
                      </div>
                    )}
                  </label>

                  {/* Wallets */}
                  <label className={`flex items-center gap-4 p-4 border rounded-[2px] cursor-pointer ${paymentMethod === 'wallet' ? 'bg-blue-50 border-blue-200' : 'border-gray-200'}`}>
                    <input
                      type="radio"
                      name="payment"
                      className="h-4 w-4"
                      checked={paymentMethod === 'wallet'}
                      onChange={() => setPaymentMethod('wallet')}
                    />
                    <div className="flex-1">
                      <span className="font-medium">Wallets</span>
                      <div className="text-xs text-gray-500">PhonePe, Paytm, etc</div>
                    </div>
                  </label>

                  {/* Card */}
                  <label className={`flex flex-col p-4 border rounded-[2px] cursor-pointer ${paymentMethod === 'card' ? 'bg-blue-50 border-blue-200' : 'border-gray-200'}`}>
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="payment"
                        className="h-4 w-4"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                      />
                      <div className="flex-1">
                        <span className="font-medium">Credit / Debit / ATM Card</span>
                        <div className="text-xs text-gray-500">Add user card details</div>
                      </div>
                    </div>
                    {paymentMethod === 'card' && (
                      <div className="mt-4 pl-8 space-y-3 max-w-sm">
                        <input type="text" placeholder="Card Number" className="p-2 border rounded w-full" />
                        <div className="flex gap-2">
                          <input type="text" placeholder="MM/YY" className="p-2 border rounded w-1/2" />
                          <input type="text" placeholder="CVV" className="p-2 border rounded w-1/2" />
                        </div>
                      </div>
                    )}
                  </label>

                  {/* COD Removed as per requirements */}
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={processing}
                  className={`mt-6 w-full md:w-auto px-12 py-3 rounded-[2px] font-bold uppercase shadow-sm text-white ${processing ? 'bg-gray-400' : 'bg-[#fb641b]'}`}
                >
                  {processing ? 'Processing...' : 'Pay & Place Order'}
                </button>
              </div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN - PRICE DETAILS */}
        <div className="w-full">
          <div className="bg-white shadow-sm sticky top-20">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-gray-500 font-bold uppercase">Price Details</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex justify-between">
                <span>Price ({cart?.items?.length} items)</span>
                <span>₹{Math.round(cart?.total * 1.2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-600">- ₹{Math.round(cart?.total * 0.2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between border-t border-dashed py-4 font-bold text-lg">
                <span>Total Amount</span>
                <span>₹{cart?.total}</span>
              </div>
              <div className="text-green-600 font-medium text-sm pt-2">
                You will save ₹{Math.round(cart?.total * 0.2)} on this order
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
          </div>
        </div>
      </div>
    </div >
  )
}
