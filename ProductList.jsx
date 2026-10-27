import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../CartSlice';
import CartItem from './CartItem';
import AboutUs from './AboutUs';
import './ProductList.css';

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/07/54/snake-plant-5939187_1280.jpg", cost: "$15", description: "Produces oxygen at night, improving indoor air quality." },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/08/11/plant-3530460_1280.jpg", cost: "$12", description: "Exceptional at filtering common toxins from the air." },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2018/02/03/15/30/peace-lily-3127856_1280.jpg", cost: "$18", description: "Features beautiful white blooms and removes mold spores." },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/05/27/18/31/fern-5228511_1280.jpg", cost: "$14", description: "Adds lush green foliage and acts as a natural humidifier." },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/04/04/16/00/rubber-plant-5002167_1280.jpg", cost: "$20", description: "Effective at absorbing airborne chemicals and toxins." },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/09/12/35/aloe-3303573_1280.jpg", cost: "$10", description: "Known for soothing gel and air-purifying qualities." }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2016/04/19/08/14/lavender-1338049_1280.jpg", cost: "$20", description: "Calming scent that promotes relaxation and better sleep." },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2017/05/18/21/54/jasmine-2324673_1280.jpg", cost: "$22", description: "Sweet fragrance that fills rooms during evening hours." },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2016/09/10/17/17/rosemary-1659728_1280.jpg", cost: "$14", description: "Aromatic culinary herb with a refreshing herbal aroma." },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/08/10/20/09/mint-1584285_1280.jpg", cost: "$8", description: "Fresh, invigorating fragrance and great for teas." },
        { name: "Eucalyptus", image: "https://cdn.pixabay.com/photo/2020/09/20/14/09/eucalyptus-5587786_1280.jpg", cost: "$25", description: "Refreshing medicinal scent that clears sinuses." },
        { name: "Geranium", image: "https://cdn.pixabay.com/photo/2017/07/04/18/06/geranium-2471676_1280.jpg", cost: "$16", description: "Delicate scented flowers with a lemon-rose aroma." }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://cdn.pixabay.com/photo/2021/04/02/10/44/zz-plant-6144415_1280.jpg", cost: "$16", description: "Thrives in low light and requires minimal watering." },
        { name: "Pothos", image: "https://cdn.pixabay.com/photo/2020/07/15/18/05/pothos-5408882_1280.jpg", cost: "$10", description: "Extremely resilient vine plant that tolerates neglect." },
        { name: "Cactus", image: "https://cdn.pixabay.com/photo/2016/11/04/22/38/cacti-1799277_1280.jpg", cost: "$9", description: "Stores water efficiently, perfect for sunny windowsills." },
        { name: "Succulent Mix", image: "https://cdn.pixabay.com/photo/2016/11/29/13/28/ball-cactus-1869389_1280.jpg", cost: "$12", description: "Diverse shapes and colors with minimal water needs." },
        { name: "Cast Iron Plant", image: "https://cdn.pixabay.com/photo/2019/09/25/15/51/plant-4503719_1280.jpg", cost: "$19", description: "Nearly indestructible foliage plant for dark corners." },
        { name: "Jade Plant", image: "https://cdn.pixabay.com/photo/2020/06/09/04/24/jade-plant-5276949_1280.jpg", cost: "$15", description: "Traditional succulent symbol of good luck and prosperity." }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prevState => ({
      ...prevState,
      [plant.name]: true
    }));
  };

  return (
    <div>
      <div className="navbar">
        <div className="nav-logo" onClick={() => setShowCart(false)}>
          Paradise Nursery
        </div>
        <div className="nav-links">
          <span onClick={() => setShowCart(false)}>Home</span>
          <span onClick={() => setShowCart(false)}>Plants</span>
          <div className="cart-icon" onClick={() => setShowCart(true)}>
            🛒 <span className="cart-count">{totalCartQuantity}</span>
          </div>
        </div>
      </div>

      {!showCart ? (
        <div className="product-listing">
          <AboutUs />
          {plantsArray.map((category, index) => (
            <div key={index} className="category-section">
              <h2>{category.category}</h2>
              <div className="product-grid">
                {category.plants.map((plant, plantIndex) => (
                  <div key={plantIndex} className="product-card">
                    <img src={plant.image} alt={plant.name} className="product-image" />
                    <h3>{plant.name}</h3>
                    <p className="product-price">{plant.cost}</p>
                    <p className="product-desc">{plant.description}</p>
                    <button
                      className={`add-to-cart-btn ${addedToCart[plant.name] ? 'added' : ''}`}
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
