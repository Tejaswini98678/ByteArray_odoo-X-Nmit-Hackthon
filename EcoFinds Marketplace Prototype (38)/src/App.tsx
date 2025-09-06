import { useState, useEffect } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { ProductFeed } from "./components/ProductFeed";
import { AddProduct } from "./components/AddProduct";
import { MyListings } from "./components/MyListings";
import { ProductDetail } from "./components/ProductDetail";
import { UserDashboard } from "./components/UserDashboard";
import { Cart } from "./components/Cart";
import { PreviousPurchases } from "./components/PreviousPurchases";
import { Toaster } from "./components/ui/sonner";

export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  phone: string;
  address: string;
  profilePictureUrl?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  sellerId: string;
  sellerName: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Purchase {
  id: string;
  products: CartItem[];
  totalAmount: number;
  purchaseDate: string;
  status: string;
}

type Screen =
  | "login"
  | "feed"
  | "add-product"
  | "my-listings"
  | "product-detail"
  | "dashboard"
  | "cart"
  | "purchases";

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("login");
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  // Mock data initialization
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: "1",
        title: "Vintage Leather Jacket",
        description:
          "Beautiful vintage leather jacket in excellent condition. Perfect for casual wear.",
        category: "Clothing",
        price: 7050,
        imageUrl:
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
        sellerId: "2",
        sellerName: "Sarah Johnson",
        createdAt: "2024-01-15",
      },
      {
        id: "2",
        title: 'MacBook Pro 13"',
        description:
          'MacBook Pro 13" 2019 model. Works perfectly, minor scratches on the lid.',
        category: "Electronics",
        price: 53950,
        imageUrl:
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
        sellerId: "3",
        sellerName: "Mike Chen",
        createdAt: "2024-01-20",
      },
      {
        id: "3",
        title: "Wooden Coffee Table",
        description:
          "Handcrafted wooden coffee table. Solid oak construction with beautiful grain.",
        category: "Furniture",
        price: 9960,
        imageUrl:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
        sellerId: "4",
        sellerName: "Emma Davis",
        createdAt: "2024-01-18",
      },
      {
        id: "4",
        title: "Professional Camera",
        description:
          "Canon EOS R6 with 24-70mm lens. Excellent condition, barely used.",
        category: "Electronics",
        price: 99600,
        imageUrl:
          "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400",
        sellerId: "5",
        sellerName: "David Wilson",
        createdAt: "2024-01-22",
      },
      {
        id: "5",
        title: "Designer Handbag",
        description:
          "Authentic designer handbag. Gently used with original dustbag.",
        category: "Accessories",
        price: 29050,
        imageUrl:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
        sellerId: "6",
        sellerName: "Lisa Anderson",
        createdAt: "2024-01-25",
      },
      {
        id: "6",
        title: "Classic Novel Collection",
        description:
          "Set of 12 vintage classic novels including Pride & Prejudice, 1984, and more. Good condition.",
        category: "Books",
        price: 3735,
        imageUrl: "https://images.unsplash.com/photo-1622490836804-4069f1f6df53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYm9va3MlMjBzdGFja3xlbnwxfHx8fDE3NTcxNDcxMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        sellerId: "7",
        sellerName: "Robert Kim",
        createdAt: "2024-01-26",
      },
      {
        id: "7",
        title: "Nike Running Shoes",
        description:
          "Barely used Nike running shoes, size 10. Excellent grip and comfort for daily runs.",
        category: "Sports",
        price: 6225,
        imageUrl: "https://images.unsplash.com/photo-1719523677291-a395426c1a87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc2hvZXMlMjBzbmVha2Vyc3xlbnwxfHx8fDE3NTcxMTkzNjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
        sellerId: "8",
        sellerName: "Jennifer Lopez",
        createdAt: "2024-01-27",
      },
      {
        id: "8",
        title: "Wooden Dining Chair",
        description:
          "Solid oak dining chair with comfortable cushion. Perfect for any dining room setup.",
        category: "Furniture",
        price: 5395,
        imageUrl: "https://images.unsplash.com/photo-1702018706865-e5306a8fa007?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW5pbmclMjBjaGFpciUyMHdvb2RlbnxlbnwxfHx8fDE3NTcxNDcxMTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        sellerId: "9",
        sellerName: "Carlos Martinez",
        createdAt: "2024-01-28",
      },
      {
        id: "9",
        title: "Garden Tool Set",
        description:
          "Complete garden tool set including watering can, pruners, and hand trowels. Great for gardening enthusiasts.",
        category: "Home & Garden",
        price: 2905,
        imageUrl: "https://images.unsplash.com/photo-1640306107674-23b73a335f12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjB0b29scyUyMHdhdGVyaW5nJTIwY2FufGVufDF8fHx8MTc1NzE0NzExN3ww&ixlib=rb-4.1.0&q=80&w=1080",
        sellerId: "10",
        sellerName: "Amy Chen",
        createdAt: "2024-01-29",
      },
      {
        id: "10",
        title: "Vintage Film Camera",
        description:
          "Beautiful vintage 35mm film camera in working condition. Perfect for film photography enthusiasts.",
        category: "Electronics",
        price: 14940,
        imageUrl: "https://images.unsplash.com/photo-1689934402781-f8672d269143?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2FtZXJhJTIwZmlsbXxlbnwxfHx8fDE3NTcwOTkxOTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
        sellerId: "11",
        sellerName: "Thomas Wright",
        createdAt: "2024-01-30",
      },
      {
        id: "11",
        title: "Warm Winter Coat",
        description:
          "High-quality winter coat with hood. Size M. Kept me warm through many winters!",
        category: "Clothing",
        price: 7885,
        imageUrl: "https://images.unsplash.com/photo-1706765779494-2705542ebe74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBjb2F0JTIwamFja2V0fGVufDF8fHx8MTc1NzEzMDAyNnww&ixlib=rb-4.1.0&q=80&w=1080",
        sellerId: "12",
        sellerName: "Maria Rodriguez",
        createdAt: "2024-02-01",
      },
      {
        id: "12",
        title: "Wireless Headphones",
        description:
          "Premium noise-canceling wireless headphones. Great sound quality, barely used with original case.",
        category: "Electronics",
        price: 12035,
        imageUrl: "https://images.unsplash.com/photo-1752055833666-bfca5443136b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzJTIwYXVkaW98ZW58MXx8fHwxNzU3MDk3NzY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
        sellerId: "13",
        sellerName: "Kevin Park",
        createdAt: "2024-02-02",
      },
      {
        id: "13",
        title: "Modern Desk Lamp",
        description:
          "Adjustable LED desk lamp with multiple brightness settings. Perfect for studying or work.",
        category: "Home & Garden",
        price: 3320,
        imageUrl: "https://images.unsplash.com/photo-1735807026641-dc0b979564bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNrJTIwbGFtcCUyMG1vZGVybnxlbnwxfHx8fDE3NTcxNDcxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        sellerId: "14",
        sellerName: "Rachel Green",
        createdAt: "2024-02-03",
      },
      {
        id: "14",
        title: "Vintage Wrist Watch",
        description:
          "Classic mechanical wrist watch with leather strap. Keeps perfect time and looks elegant.",
        category: "Accessories",
        price: 9960,
        imageUrl: "https://images.unsplash.com/photo-1611291223002-62f62dbba1a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3cmlzdCUyMHdhdGNoJTIwdmludGFnZXxlbnwxfHx8fDE3NTcxNDcxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        sellerId: "15",
        sellerName: "Daniel Foster",
        createdAt: "2024-02-04",
      },
      {
        id: "15",
        title: "Mountain Bike",
        description:
          "21-speed mountain bike in great condition. Perfect for trails and city commuting.",
        category: "Sports",
        price: 23240,
        imageUrl: "https://images.unsplash.com/photo-1726813828002-775d4b8e30ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWN5Y2xlJTIwbW91bnRhaW4lMjBiaWtlfGVufDF8fHx8MTc1NzE0NzEyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
        sellerId: "16",
        sellerName: "Jessica Taylor",
        createdAt: "2024-02-05",
      },
      {
        id: "16",
        title: "Glass Coffee Table",
        description:
          "Modern glass coffee table with metal legs. Adds elegance to any living room.",
        category: "Furniture",
        price: 11620,
        imageUrl: "https://images.unsplash.com/photo-1647967527216-adea2f078e07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjB0YWJsZSUyMGdsYXNzfGVufDF8fHx8MTc1NzE0NzEzMXww&ixlib=rb-4.1.0&q=80&w=1080",
        sellerId: "17",
        sellerName: "Brandon Lee",
        createdAt: "2024-02-06",
      },
      {
        id: "17",
        title: "Stainless Steel Cookware",
        description:
          "Professional stainless steel pot set. Perfect for cooking enthusiasts. Includes 3 different sizes.",
        category: "Home & Garden",
        price: 7055,
        imageUrl: "https://images.unsplash.com/photo-1624016030785-ff5a4f36dde9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwcG90JTIwa2l0Y2hlbnxlbnwxfHx8fDE3NTcxNDcxMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        sellerId: "18",
        sellerName: "Nicole Wang",
        createdAt: "2024-02-07",
      },
      {
        id: "18",
        title: "Designer Sunglasses",
        description:
          "Stylish designer sunglasses with UV protection. Comes with original case and cleaning cloth.",
        category: "Accessories",
        price: 7055,
        imageUrl: "https://images.unsplash.com/photo-1718967807877-f2e04ffc7343?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzJTIwZmFzaGlvbnxlbnwxfHx8fDE3NTcwOTQ4MDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
        sellerId: "19",
        sellerName: "Steven Miller",
        createdAt: "2024-02-08",
      },
      {
        id: "19",
        title: "iPhone 12 Pro",
        description:
          "iPhone 12 Pro 128GB in space gray. Excellent condition with original charger and box.",
        category: "Electronics",
        price: 37350,
        imageUrl: "https://images.unsplash.com/photo-1675953935267-e039f13ddd79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlJTIwcGhvbmV8ZW58MXx8fHwxNzU3MDkwNDYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        sellerId: "20",
        sellerName: "Ashley Brown",
        createdAt: "2024-02-09",
      },
      {
        id: "20",
        title: "Yoga Mat & Accessories",
        description:
          "Premium yoga mat with carrying strap and yoga blocks. Perfect for home workouts and studio classes.",
        category: "Sports",
        price: 4565,
        imageUrl: "https://images.unsplash.com/photo-1746796751590-a8c0f15d4900?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWF0JTIwZml0bmVzc3xlbnwxfHx8fDE3NTcwNDIxNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        sellerId: "21",
        sellerName: "Monica Davis",
        createdAt: "2024-02-10",
      },
      {
        id: "21",
        title: "Literature Collection",
        description:
          "Curated collection of modern literature including Pulitzer winners. Perfect for book lovers.",
        category: "Books",
        price: 5395,
        imageUrl: "https://images.unsplash.com/photo-1638324143657-7f41d6a92a3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rc2hlbGYlMjBub3ZlbHN8ZW58MXx8fHwxNzU3MTQ3MTM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
        sellerId: "22",
        sellerName: "Jonathan Smith",
        createdAt: "2024-02-11",
      },
      {
        id: "22",
        title: "Wool Winter Scarf",
        description:
          "Cozy wool scarf in navy blue. Perfect accessory for cold weather. Barely worn.",
        category: "Clothing",
        price: 2075,
        imageUrl: "https://images.unsplash.com/photo-1604843206973-fe1e58bf974e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBzY2FyZiUyMHdvb2x8ZW58MXx8fHwxNzU3MTQ3MTM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
        sellerId: "23",
        sellerName: "Samantha White",
        createdAt: "2024-02-12",
      },
      {
        id: "23",
        title: "Gaming Keyboard",
        description:
          "Mechanical gaming keyboard with RGB lighting. Cherry MX switches for ultimate gaming experience.",
        category: "Electronics",
        price: 9130,
        imageUrl: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBrZXlib2FyZHxlbnwxfHx8fDE3NTcxMDYzNzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
        sellerId: "24",
        sellerName: "Alex Johnson",
        createdAt: "2024-02-13",
      },
      {
        id: "24",
        title: "Ergonomic Office Chair",
        description:
          "Comfortable ergonomic office chair with lumbar support. Great for long work sessions.",
        category: "Furniture",
        price: 16185,
        imageUrl: "https://images.unsplash.com/photo-1688578735122-f37256f1b8b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBjaGFpciUyMGVyZ29ub21pY3xlbnwxfHx8fDE3NTcxNDcxMzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
        sellerId: "25",
        sellerName: "Ryan Thompson",
        createdAt: "2024-02-14",
      },
      {
        id: "25",
        title: "Succulent Garden Set",
        description:
          "Beautiful collection of succulent plants in decorative pots. Perfect for indoor gardening beginners.",
        category: "Home & Garden",
        price: 2490,
        imageUrl: "https://images.unsplash.com/photo-1621512366232-0b7b78983782?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMHBvdCUyMHN1Y2N1bGVudHxlbnwxfHx8fDE3NTcxMjE5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        sellerId: "26",
        sellerName: "Emily Zhang",
        createdAt: "2024-02-15",
      },
    ];
    setProducts(mockProducts);
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Mock login - in real app, this would make API call
    const mockUser: User = {
      id: "1",
      email,
      username: email.split("@")[0],
      fullName: "John Doe",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, City, State 12345",
      profilePictureUrl: undefined,
    };
    setUser(mockUser);
    setCurrentScreen("feed");
  };

  const handleSignUp = (
    email: string,
    password: string,
    username: string,
  ) => {
    // Mock signup
    const mockUser: User = {
      id: "1",
      email,
      username,
      fullName: "",
      phone: "",
      address: "",
      profilePictureUrl: undefined,
    };
    setUser(mockUser);
    setCurrentScreen("dashboard"); // Go to dashboard to complete profile
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setCurrentScreen("login");
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id,
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) =>
      prev.filter((item) => item.product.id !== productId),
    );
  };

  const updateCartQuantity = (
    productId: string,
    quantity: number,
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const addProduct = (
    product: Omit<
      Product,
      "id" | "sellerId" | "sellerName" | "createdAt"
    >,
  ) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      sellerId: user!.id,
      sellerName: user!.username,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (
    productId: string,
    updates: Partial<Product>,
  ) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, ...updates }
          : product,
      ),
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) =>
      prev.filter((product) => product.id !== productId),
    );
  };

  const completePurchase = () => {
    if (cart.length === 0) return;

    const totalAmount = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
    const purchase: Purchase = {
      id: Date.now().toString(),
      products: [...cart],
      totalAmount,
      purchaseDate: new Date().toISOString().split("T")[0],
      status: "Completed",
    };

    setPurchases((prev) => [purchase, ...prev]);
    setCart([]);
    setCurrentScreen("purchases");
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "login":
        return (
          <LoginScreen
            onLogin={handleLogin}
            onSignUp={handleSignUp}
          />
        );
      case "feed":
        return (
          <ProductFeed
            products={products}
            onProductSelect={(product) => {
              setSelectedProduct(product);
              setCurrentScreen("product-detail");
            }}
            onAddToCart={addToCart}
            onNavigate={setCurrentScreen}
            user={user}
            cartCount={cart.reduce(
              (sum, item) => sum + item.quantity,
              0,
            )}
            onLogout={handleLogout}
          />
        );
      case "add-product":
        return (
          <AddProduct
            onAddProduct={addProduct}
            onBack={() => setCurrentScreen("feed")}
          />
        );
      case "my-listings":
        return (
          <MyListings
            products={products.filter(
              (p) => p.sellerId === user?.id,
            )}
            onEditProduct={(product) => {
              setSelectedProduct(product);
              setCurrentScreen("add-product");
            }}
            onDeleteProduct={deleteProduct}
            onBack={() => setCurrentScreen("feed")}
            onAddNew={() => setCurrentScreen("add-product")}
          />
        );
      case "product-detail":
        return selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setCurrentScreen("feed")}
            onAddToCart={addToCart}
          />
        ) : null;
      case "dashboard":
        return (
          <UserDashboard
            user={user!}
            onUpdateUser={updateUser}
            onBack={() => setCurrentScreen("feed")}
          />
        );
      case "cart":
        return (
          <Cart
            items={cart}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onBack={() => setCurrentScreen("feed")}
            onCheckout={completePurchase}
          />
        );
      case "purchases":
        return (
          <PreviousPurchases
            purchases={purchases}
            onBack={() => setCurrentScreen("feed")}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderScreen()}
      <Toaster />
    </div>
  );
}