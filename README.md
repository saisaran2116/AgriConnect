# Farmers Market Direct - Prototype

A minimal working prototype demonstrating direct connection between farmers and customers.

## 🚀 Quick Start

1. Open `index.html` in your web browser
2. That's it! No server setup required.

## 🎯 Core Features Demonstrated

### Customer View (Default)
- View all available produce from farmers
- Clean, card-based product display
- Real-time updates when farmers add new products

### Farmer View
- Simple form to list produce with:
  - Product name
  - Price per kg
  - Image URL
- Instant visibility to customers
- Success notifications

## 🔄 How to Test the Flow

1. **Start in Customer View**: The app opens showing "Available Produce" (empty initially)
2. **Switch to Farmer View**: Click "Farmer View" button
3. **Add a Product**: Fill out the form with:
   - Product Name: "Fresh Tomatoes"
   - Price: "25"
   - Image URL: "https://images.unsplash.com/photo-1546470427-5a4a0b4b8b8b?w=400&h=300&fit=crop"
4. **Submit**: Click "List My Produce"
5. **See Instant Results**: The product appears immediately in the list below
6. **Switch Back**: Click "Customer View" to see the product from customer perspective
7. **Add More**: Repeat with different products to see the full marketplace effect

## 🛠️ Technical Implementation

- **Frontend**: Pure HTML, CSS, and JavaScript
- **Data Storage**: In-memory array (resets on page refresh)
- **No Dependencies**: Runs entirely in the browser
- **Responsive Design**: Works on desktop and mobile

## 🎨 Design Features

- Modern gradient background
- Glass-morphism design elements
- Smooth animations and transitions
- Card-based product layout
- Mobile-responsive grid
- Error handling for broken images

## 📱 Demo Data

To see the app with sample data, uncomment the last line in `script.js`:
```javascript
// Change this line:
// addSampleData();

// To this:
addSampleData();
```

## 🏆 Hackathon Ready

This prototype perfectly demonstrates the core value proposition:
- **Farmers can instantly list produce**
- **Customers can immediately see available products**
- **Real-time updates without complex infrastructure**
- **Clean, professional interface**

Perfect for a 12-hour hackathon demo!
