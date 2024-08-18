import prisma from "./db";

async function main() {
  const products = [
    {
      name: "Smartphone Pro X",
      image: "https://via.placeholder.com/300x300.png?text=Smartphone+Pro+X",
      description: "Latest model with advanced features",
      price: 99900,
    },
    {
      name: "Wireless Earbuds Elite",
      image:
        "https://via.placeholder.com/300x300.png?text=Wireless+Earbuds+Elite",
      description: "High-quality sound with long battery life",
      price: 14900,
    },
    {
      name: '4K Smart TV 55"',
      image: 'https://via.placeholder.com/300x300.png?text=4K+Smart+TV+55"',
      description: "Crystal clear picture with smart features",
      price: 59900,
    },
    {
      name: "Gaming Laptop Ultra",
      image: "https://via.placeholder.com/300x300.png?text=Gaming+Laptop+Ultra",
      description: "Powerful laptop for ultimate gaming experience",
      price: 149900,
    },
    {
      name: "Fitness Tracker Watch",
      image:
        "https://via.placeholder.com/300x300.png?text=Fitness+Tracker+Watch",
      description: "Track your health and fitness goals",
      price: 9900,
    },
    {
      name: "Robotic Vacuum Cleaner",
      image:
        "https://via.placeholder.com/300x300.png?text=Robotic+Vacuum+Cleaner",
      description: "Effortless cleaning with smart navigation",
      price: 39900,
    },
    {
      name: "Electric Coffee Maker",
      image:
        "https://via.placeholder.com/300x300.png?text=Electric+Coffee+Maker",
      description: "Brew perfect coffee every time",
      price: 7900,
    },
    {
      name: "Bluetooth Portable Speaker",
      image: "https://via.placeholder.com/300x300.png?text=Bluetooth+Speaker",
      description: "Rich sound in a compact design",
      price: 12900,
    },
    {
      name: "Digital SLR Camera",
      image: "https://via.placeholder.com/300x300.png?text=Digital+SLR+Camera",
      description: "Capture professional-quality photos",
      price: 89900,
    },
    {
      name: "Air Purifier Deluxe",
      image: "https://via.placeholder.com/300x300.png?text=Air+Purifier+Deluxe",
      description: "Clean air for a healthier home",
      price: 29900,
    },
    {
      name: "Electric Toothbrush Pro",
      image:
        "https://via.placeholder.com/300x300.png?text=Electric+Toothbrush+Pro",
      description: "Advanced cleaning for optimal oral health",
      price: 8900,
    },
    {
      name: "Wireless Charging Pad",
      image:
        "https://via.placeholder.com/300x300.png?text=Wireless+Charging+Pad",
      description: "Convenient charging for compatible devices",
      price: 3900,
    },
    {
      name: "Smart Home Security Camera",
      image: "https://via.placeholder.com/300x300.png?text=Security+Camera",
      description: "Monitor your home from anywhere",
      price: 19900,
    },
    {
      name: "Ergonomic Office Chair",
      image:
        "https://via.placeholder.com/300x300.png?text=Ergonomic+Office+Chair",
      description: "Comfortable seating for long work hours",
      price: 24900,
    },
    {
      name: "Noise-Cancelling Headphones",
      image:
        "https://via.placeholder.com/300x300.png?text=Noise-Cancelling+Headphones",
      description: "Immersive audio experience",
      price: 34900,
    },
    {
      name: "Multi-function Instant Pot",
      image: "https://via.placeholder.com/300x300.png?text=Instant+Pot",
      description: "All-in-one cooking solution",
      price: 11900,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("Seed data inserted successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
