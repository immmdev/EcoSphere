import { ShoppingBag, Search, Store, HelpCircle } from "lucide-react";
import HelpLayout from "./HelpLayout";
import CollapsibleSection from "./Collapsible-Section";

export default function Eco() {
  return (
    <HelpLayout
      title="EcoShop Help Center"
      description="Your guide to buying and selling sustainable products on EcoSphere"
      icon={<ShoppingBag className="text-green-700" />}
      breadcrumb="EcoShop Help"
    >
      {/* Shop Overview */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="eco-static-bg p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-3">For Buyers</h3>
          <ul className="text-white space-y-2 text-sm">
            <li>• Browse verified eco-friendly products</li>
            <li>• Read sustainability ratings and reviews</li>
            <li>• Support local and sustainable businesses</li>
            <li>• Track the environmental impact of purchases</li>
          </ul>
        </div>
        <div className="eco-static-bg p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-3">For Sellers</h3>
          <ul className="text-white space-y-2 text-sm">
            <li>• Reach environmentally conscious customers</li>
            <li>• Showcase your sustainable practices</li>
            <li>• Build credibility with eco-certifications</li>
            <li>• Join a community of green entrepreneurs</li>
          </ul>
        </div>
      </div>

      {/* Guides */}
      <div className="space-y-6">
        <CollapsibleSection title="How to Buy on EcoShop">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Shopping Process</h4>
              <div className="space-y-3">
                {[
                  "Browse categories or search products",
                  "Check sustainability ratings",
                  "Read product details and reviews",
                  "Add to cart and checkout securely",
                  "Track delivery and leave reviews"
                ].map((text, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="bg-green-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">{idx + 1}</div>
                    <span className="text-white text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Product Categories</h4>
              <div className="space-y-2">
                {["Home & Garden", "Sustainable Fashion", "Organic Food & Health", "Clean Energy Products"].map((category, i) => (
                  <div key={i} className="bg-white p-3 rounded border border-green-700 text-black flex items-center">
                    <ShoppingBag className="w-5 h-5 text-green-700 mr-3" />
                    <span>{category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="How to Sell on EcoShop">
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              {[
                ["Register", Store, "Create your seller account and verify business details"],
                ["Setup Shop", ShoppingBag, "Customize your storefront and add sustainability certifications"],
                ["List Products", Store, "Add products with detailed sustainability information"]
              ].map(([title, Icon, desc], i) => (
                <div key={i} className="bg-white p-4 rounded border border-green-700 text-center text-black">
                  <Icon className="w-8 h-8 text-green-700 mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">{title}</h4>
                  <p className="text-sm">{desc}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-3">Seller Requirements</h4>
                <ul className="text-white space-y-2 text-sm">
                  <li>• Valid business registration or tax ID</li>
                  <li>• Proof of sustainable practices</li>
                  <li>• Product safety certifications</li>
                  <li>• Shipping and return policies</li>
                  <li>• Environmental impact documentation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">Seller Benefits</h4>
                <ul className="text-white space-y-2 text-sm">
                  <li>• Access to eco-conscious customer base</li>
                  <li>• Marketing tools and analytics</li>
                  <li>• Sustainability badge verification</li>
                  <li>• Community support and networking</li>
                  <li>• Lower fees for certified green businesses</li>
                </ul>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Payment & Security">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Payment Methods</h4>
              <div className="space-y-2">
                {["Credit & Debit Cards", "PayPal", "Bank Transfer", "EcoCoins (Platform Currency)"].map((method, i) => (
                  <div key={i} className="flex items-center p-2 bg-white rounded border border-green-700 text-black">
                    <ShoppingBag className="w-5 h-5 text-green-700 mr-3" />
                    <span>{method}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Security Features</h4>
              <ul className="text-white space-y-2 text-sm">
                <li>• SSL encryption for all transactions</li>
                <li>• Secure escrow payment system</li>
                <li>• Verified seller and buyer badges</li>
                <li>• 24/7 fraud monitoring</li>
                <li>• Dispute resolution system</li>
                <li>• Purchase protection guarantee</li>
              </ul>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Shipping & Returns">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Eco-Friendly Shipping</h4>
              <div className="space-y-3">
                {[
                  ["Carbon-Neutral Delivery", "Offset shipping emissions automatically"],
                  ["Minimal Packaging", "Recyclable and biodegradable materials"],
                  ["Local Pickup", "Arrange pickup from local sellers"]
                ].map(([title, desc], i) => (
                  <div key={i} className="bg-white p-3 rounded border border-green-700 text-black">
                    <div className="font-medium mb-1">{title}</div>
                    <div className="text-sm">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Return Policy</h4>
              <ul className="text-white space-y-2 text-sm">
                <li>• 30-day return window for most items</li>
                <li>• Free returns for damaged or defective products</li>
                <li>• Refurbishment program for returned items</li>
                <li>• Donation option for unwanted returns</li>
                <li>• Easy return process through platform</li>
                <li>• Prepaid return labels available</li>
              </ul>
            </div>
          </div>
        </CollapsibleSection>
      </div>

      {/* Quick Start Actions */}
      <div className="mt-8 eco-static-bg rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Get Started</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            [Search, "Browse Products"],
            [Store, "Become a Seller"],
            [HelpCircle, "Contact Support"]
          ].map(([Icon, label], i) => (
            <div key={i} className="bg-white text-black p-4 rounded text-center hover:shadow transition cursor-pointer">
              <Icon className="w-6 h-6 mb-2 mx-auto" />
              <div className="font-semibold">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </HelpLayout>
  );
}
