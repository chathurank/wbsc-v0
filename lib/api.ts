export async function getProduct(id: string) {
  // Simulating an API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock product data
  const associatedItems = [
    {
      id: "AI1",
      name: "21\" Tandem Plus 563H Undermount Drawer Slide",
      description: "for 5/8\" Material, 100lb Capacity Full Extension",
      price: 24.00,
      pricePerUnit: "EA",
      sku: "B769.4570S",
      itemNumber: "B769.4570S",
      manufacturerNumber: "563H2290B10",
      image: "/placeholder.svg",
      soldIn: "1 EA",
      catalog: "E-57",
      availability: "In Stock",
      minOrderQuantity: 1,
      location: "Brea, CA",
      stock: 156,
      hasPriceScales: true,
      bulkPricing: [
        { quantity: 10, price: 22.80 },
        { quantity: 25, price: 21.60 }
      ]
    },
    {
      id: "AI2",
      name: "Formica 9300 Grey Grafix high-pressure laminate",
      description: "48x96 SH",
      price: 50.76,
      pricePerUnit: "$1.37/SF",
      sku: "093002058408000",
      itemNumber: "093002058408000",
      manufacturerNumber: "SPSP5PSALPB80",
      image: "/placeholder.svg",
      soldIn: "1 SH",
      catalog: "E-57",
      availability: "In Stock",
      minOrderQuantity: 1,
      location: "Brea, CA",
      stock: 42,
      bulkPricing: [
        { quantity: 5, price: 48.22 },
        { quantity: 10, price: 45.68 }
      ]
    },
    // ... add more items as needed
  ]

  return {
    id,
    name: "Professional Woodworking Chisel Set",
    shortDescription: "High-quality chisel set for professional woodworkers",
    description: "This professional-grade woodworking chisel set is perfect for both seasoned craftsmen and enthusiastic hobbyists. Featuring four essential sizes, these chisels are crafted from high-carbon steel for durability and sharpness retention. The ergonomically designed hardwood handles provide comfort and control during use, making them ideal for a wide range of woodworking tasks.",
    sku: `WC-${id}`,
    mpn: `MPN-${id}`,
    brand: "WoodMaster Tools",
    price: 129.99,
    originalPrice: 149.99,
    savings: 20,
    inStock: true,
    minOrderQuantity: 1,
    unit: "set",
    images: [
      { src: "/placeholder.svg?height=600&width=600", alt: "Woodworking Chisel Set" },
      { src: "/placeholder.svg?height=600&width=600", alt: "Chisel Set in Use" },
    ],
    category: {
      name: "Hand Tools",
      slug: "hand-tools",
    },
    variants: [
      { id: "1", name: "Standard Set", price: 129.99 },
      { id: "2", name: "Deluxe Set", price: 179.99 },
    ],
    options: [
      {
        id: "1",
        name: "Handle Material",
        values: ["Hardwood", "Polymer"],
      },
    ],
    priceScales: [
      { quantity: 1, price: 129.99 },
      { quantity: 5, price: 124.99 },
      { quantity: 10, price: 119.99 },
      { quantity: 20, price: 114.99 },
    ],
    itemNumbers: ["WC-001", "WC-002", "WC-003", "WC-004"],
    ezConfigurations: [
      {
        id: "config1",
        name: "Basic Woodworking Set",
        image: "/placeholder.svg?height=200&width=200",
        specs: {
          "Chisel Sizes": "1/4\", 1/2\", 3/4\", 1\"",
          "Handle Material": "Hardwood",
          "Storage": "Canvas Roll"
        }
      },
      {
        id: "config2",
        name: "Professional Carving Kit",
        image: "/placeholder.svg?height=200&width=200",
        specs: {
          "Chisel Sizes": "1/8\", 1/4\", 1/2\", 3/4\", 1\"",
          "Handle Material": "Polymer",
          "Storage": "Wooden Case"
        }
      }
    ],
    specifications: {
      "Number of Pieces": "4",
      "Blade Material": "High-Carbon Steel",
      "Handle Material": "Hardwood",
      "Blade Widths": "1/4\", 1/2\", 3/4\", 1\"",
      "Total Length": "9 inches (each)",
      "Weight": "1.5 lbs (set)",
      "Country of Origin": "Germany",
      "Warranty": "Lifetime limited warranty",
    },
    downloads: [
      { name: "User Manual", url: "/downloads/chisel-set-manual.pdf" },
      { name: "Care Instructions", url: "/downloads/chisel-care-guide.pdf" },
      { name: "Warranty Information", url: "/downloads/warranty-info.pdf" },
    ],
    technicalSpecs: [
      {
        category: "Physical Specifications",
        items: [
          { name: "Number of Pieces", value: "4" },
          { name: "Blade Material", value: "High-Carbon Steel" },
          { name: "Handle Material", value: "Hardwood" },
        ],
      },
      {
        category: "Dimensions",
        items: [
          { name: "Blade Widths", value: "1/4\", 1/2\", 3/4\", 1\"" },
          { name: "Total Length", value: "9 inches (each)" },
        ],
      },
    ],
    associatedItems,
    optionalAccessories: [
      {
        id: "OA1",
        name: "Leather Chisel Roll",
        price: 39.99,
        sku: "LCR-001",
        image: "/placeholder.svg?height=80&width=80",
        availability: "In Stock",
        minOrderQuantity: 1,
        unitOfMeasure: "piece",
        details: {
          "Material": "Full-grain leather",
          "Capacity": "Holds up to 8 chisels",
          "Color": "Brown",
          "Dimensions": "18\" x 12\" when open"
        }
      },
      {
        id: "OA2",
        name: "Sharpening Stone Set",
        price: 49.99,
        sku: "SSS-001",
        image: "/placeholder.svg?height=80&width=80",
        availability: "Low Stock",
        minOrderQuantity: 1,
        unitOfMeasure: "set",
        details: {
          "Grit levels": "1000/4000, 3000/8000",
          "Stone material": "Aluminum oxide",
          "Base material": "Non-slip rubber",
          "Includes": "Flattening stone, honing oil"
        }
      }
    ],
    relatedProducts: [
      { id: "2", name: "Woodworking Mallet", image: "/placeholder.svg?height=200&width=200", price: 34.99 },
      { id: "3", name: "Sharpening Stone", image: "/placeholder.svg?height=200&width=200", price: 24.99 },
      { id: "4", name: "Wood Carving Set", image: "/placeholder.svg?height=200&width=200", price: 79.99 },
    ],
    relatedSearches: ["woodworking tools", "hand chisels", "wood carving tools", "chisel sharpening"],
  };
}

