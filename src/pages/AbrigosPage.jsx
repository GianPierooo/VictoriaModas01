import React from 'react';
import ProductsPage from '../components/ProductsPage';

const AbrigosPage = () => {
  const products = [];

  return (
    <ProductsPage 
      products={products}
      title="ABRIGOS Y CHAQUETAS"
      category="abrigos"
      filters={{
        availableSizes: [],
        availableFabrics: []
      }}
    />
  );
};

export default AbrigosPage;
