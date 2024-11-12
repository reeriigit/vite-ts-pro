// src/components/web/Showproduct/Showproduct.tsx
import React, { useState, useEffect } from 'react';
import { ProductPro } from '../../../models/ProductProModel';
import { getProducts } from '../../../controllers/productproController';
// import DetailSetpro from './DetailSetpro';
import './Showproduct.css';

interface ShowproductProps {
  user_id: number;
  search: string;
  find: any; // เปลี่ยน `any` เป็นประเภทที่เหมาะสมถ้าทราบแน่ชัด
}

const Showproduct: React.FC<ShowproductProps> = ({user_id}) => {
  const [products, setProducts] = useState<ProductPro[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductPro | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Error: Data is not an array:', data);
        }
        console.log("list pro all", data);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    loadProducts();
  }, []);

  const handleCardClick = (product: ProductPro) => {
    setSelectedProduct(product);
  };

  const handleClosePopup = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="Showproduct">
      {products.length > 0 ? (
        products.map((product, index) => {
          let images: string[] = [];
          try {
            console.log("img ",product.images[0] )
            images = JSON.parse(product.images); // แปลง JSON สตริงเป็นอาร์เรย์ของสตริง
          } catch (e) {
            console.error('Error parsing images:', e);
          }

          return (
            <div className="product-card" key={index} onClick={() => handleCardClick(product)}>
              {images.length > 0 && (
                <img src={`http://localhost:5000/productimages/${images[0]}`} alt={product.name} />
              )}
              <p className='menuname'>{product.name}</p>
              <p className='detail'>{product.product_description}</p>
              <p className='price'>฿{product.price}</p>
              <p className='promotion'>{product.promo_name}</p>
            </div>
          );
        })
      ) : (
        <p>No products available</p>
      )}

      {selectedProduct && (
        <p></p>
        // <DetailSetpro user_id={user_id} selectedProduct={selectedProduct} handleClosePopup={handleClosePopup} />
      )}
    </div>
  );
};

export default Showproduct;
