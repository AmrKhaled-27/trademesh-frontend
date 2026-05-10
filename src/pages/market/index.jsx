import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Market = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  return (
    <div className="p-8 grid grid-cols-3 gap-6">
      {products.map((product) => (
        <Link key={product.id} to={`/products/${product.id}`}>
          <div className="shadow p-4 rounded hover:shadow-lg">
            <img src={product.mainImage} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
