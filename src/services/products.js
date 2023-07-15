import axios from "axios";

//get all products 
export const getProducts = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_FAKE_STORE_API}/products`);
  return res.data;
};

// get products with limit results
export const getProductsLimit = async (limit) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_FAKE_STORE_API}/products?limit=${limit}`
    );
    return res.data;
  };
  

//get single product
export const getProduct = async (id) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_FAKE_STORE_API}/products/${id}`);
  return res.data;
};

//add new product
export const addProduct = async (product) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_FAKE_STORE_API}/products`, {
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
    });
    return res.data;
  };
  
  //update product
  export const updateProduct = async (product) => {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_FAKE_STORE_API}/products/${product.id}`,
      {
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
      }
    );
    return res.data;
  };
  
  //delete product
  export const deleteProduct = async (id) => {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_FAKE_STORE_API}/products/${id}`
    );
    return res.data;
  };
  

//get all categories
export const getCategories = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_FAKE_STORE_API}/products/categories`
  );
  return res.data;
};

//get products by category
export const getProductsByCategory = async (category) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_FAKE_STORE_API}/products/category/${category}`
  );
  return res.data;
};

