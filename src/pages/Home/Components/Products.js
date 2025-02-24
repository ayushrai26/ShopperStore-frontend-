import { useState, useEffect } from "react";
import Card from './Card';
import '../styles/Product.css';
import { GrNext, GrPrevious } from "react-icons/gr";
import SkeletonCard from "./SkeleteonCard";
function Products({ searchQuery,setCartCount }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 10;

  // Fetch products when search query is present
  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      fetch(`https://dummyjson.com/products/search?q=${searchQuery}`)
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data.products);
          setLoading(false);
          
        })
        .catch(() => setLoading(false));
    } else {
      setSearchResults([]); // Clear search results if query is empty
    }
  }, [searchQuery]);

  // Fetch paginated products when no search query
  useEffect(() => {
    if (!searchQuery) {
      setLoading(true);
      fetch(`https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currPage - 1) * itemsPerPage}`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products);
          setTotalProducts(data.total);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [currPage, searchQuery]);
  
  const prev = () => {
    if (currPage > 1) {
      setCurrPage((prev) => prev - 1);
    }
  };

  const next = () => {
    if (currPage < Math.ceil(totalProducts / itemsPerPage)) {
      setCurrPage((prev) => prev + 1);
    }
  };

  return (
    <>
    {searchQuery && (<div className='heading'>
      <h2>Search Results for "{searchQuery}"</h2>
      </div>)}
    <div className='container'>
      {loading ? 
         Array.from({ length: 10 }).map((_, index) => <SkeletonCard key={index} />)
        
       : searchQuery ? (
        <>
            {searchResults.length > 0 ? (
              searchResults.map((product) => (
                <Card key={product.id} id={product.id} images={product.images[0]} title={product.title} price={product.price} rating={product.rating} setCartCount={setCartCount}/>
              ))
            ) : (
              <p>No products found</p>
            )}
             
          </>
      ) : (
        <>
        
          {products.map((product) => (
            <Card key={product.id} id={product.id} images={product.images[0]} title={product.title} price={product.price} rating={product.rating} setCartCount={setCartCount}/>
          ))}
         
          {!loading&&(<div className='button_cont'>
            <button className='skip_button' onClick={prev} disabled={currPage === 1}>
              <GrPrevious />
            </button>
            <span> Page {currPage} </span>
            <button className='skip_button' onClick={next} disabled={currPage >= Math.ceil(totalProducts / itemsPerPage)}>
              <GrNext />
            </button>
            
          </div>)}
         
        </>
      )}
    </div>
    
    </>
  );
}

export default Products;
