import Link from 'next/link'

export default function FlipSubNav() {
    const categories = [
        { name: 'Top Offers', icon: '/images/icon_cat_offers.png', href: '/offers' },
        { name: 'Grocery', icon: '/images/icon_cat_grocery.png', href: '/products?category=grocery' },
        { name: 'Mobiles', icon: '/images/icon_cat_mobile.png', href: '/products?category=mobiles' },
        { name: 'Fashion', icon: '/images/icon_cat_fashion.png', href: '/products?category=fashion' },
        { name: 'Electronics', icon: '/images/icon_cat_electronics.png', href: '/products?category=electronics' },
        { name: 'Home', icon: '/images/icon_cat_home.png', href: '/products?category=home' },
        { name: 'Appliances', icon: '/images/icon_cat_appliances.png', href: '/products?category=appliances' },
        { name: 'Travel', icon: '/images/icon_cat_travel.png', href: '/products?category=travel' },
        { name: 'Beauty, Toys & More', icon: '/images/icon_cat_toys.png', href: '/products?category=beauty' },
    ]

    return (
        <div className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-[1280px] mx-auto px-4">
                <div className="flex justify-between items-center py-3 overflow-x-auto no-scrollbar gap-8">
                    {categories.map((cat, idx) => (
                        <Link key={idx} href={cat.href} className="group flex flex-col items-center cursor-pointer min-w-[64px]">
                            <div className="h-16 w-16 mb-1 relative flex items-center justify-center">
                                <img src={cat.icon} alt={cat.name} className="max-h-full max-w-full object-contain transition-transform group-hover:scale-105" />
                            </div>
                            <span className="text-sm font-bold text-gray-800 group-hover:text-primary whitespace-nowrap">
                                {cat.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
