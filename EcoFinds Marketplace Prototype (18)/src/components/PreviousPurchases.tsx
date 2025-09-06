import { Purchase } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Calendar, Package, Leaf } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Separator } from './ui/separator';

interface PreviousPurchasesProps {
  purchases: Purchase[];
  onBack: () => void;
}

export function PreviousPurchases({ purchases, onBack }: PreviousPurchasesProps) {
  const totalPurchases = purchases.length;
  const totalSpent = purchases.reduce((sum, purchase) => sum + purchase.totalAmount, 0);
  const totalItems = purchases.reduce((sum, purchase) => 
    sum + purchase.products.reduce((itemSum, item) => itemSum + item.quantity, 0), 0
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <h1 className="text-lg">Purchase History</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Package className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{totalPurchases}</p>
              <p className="text-sm text-muted-foreground">Total Orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <span className="text-2xl">📦</span>
              <p className="text-2xl font-bold">{totalItems}</p>
              <p className="text-sm text-muted-foreground">Items Purchased</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <span className="text-2xl">💰</span>
              <p className="text-2xl font-bold">₹{totalSpent.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Spent</p>
            </CardContent>
          </Card>
        </div>

        {purchases.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg mb-2">No purchases yet</h3>
            <p className="text-muted-foreground mb-6">
              Start shopping to build your sustainable purchase history!
            </p>
            <Button onClick={onBack}>
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {purchases.map((purchase) => (
              <Card key={purchase.id}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Order #{purchase.id}</CardTitle>
                    <Badge variant="outline" className="gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(purchase.purchaseDate).toLocaleDateString()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Purchase Items */}
                  <div className="space-y-3">
                    {purchase.products.map((item, index) => (
                      <div key={`${purchase.id}-${item.product.id}-${index}`}>
                        <div className="flex gap-4">
                          <div className="w-16 h-16 flex-shrink-0">
                            <ImageWithFallback
                              src={item.product.imageUrl}
                              alt={item.product.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium line-clamp-1">{item.product.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  by {item.product.sellerName}
                                </p>
                                <Badge variant="secondary" className="mt-1">
                                  {item.product.category}
                                </Badge>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">
                                  ₹{(item.product.price * item.quantity).toLocaleString()}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {index < purchase.products.length - 1 && (
                          <Separator className="mt-3" />
                        )}
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Order Total */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        {purchase.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {purchase.products.reduce((sum, item) => sum + item.quantity, 0)} items
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">Total: ₹{purchase.totalAmount.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Environmental Impact Summary */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Leaf className="h-6 w-6 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-green-900 mb-2">
                      Your Sustainability Impact
                    </h3>
                    <p className="text-sm text-green-700 mb-3">
                      By choosing {totalItems} second-hand items, you've helped:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                        <span>Saved ~{(totalItems * 12).toFixed(0)}kg of CO2 emissions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                        <span>Extended {totalItems} product lifecycles</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                        <span>Reduced manufacturing demand</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                        <span>Supported circular economy</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}