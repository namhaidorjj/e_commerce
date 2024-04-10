/** @format */
import { useContext, useEffect, useMemo, useState } from "react";
import LoadingPage from "@/components/LoadingPage";
import { Box } from "@/components/bags/Box";
import Search from "./Search";
import { Bag } from "@/utils/types/bagType";
import { instance } from "@/utils/instance";
import { SearchValueContext } from "@/contexts/SearchValue";

export default function GucciMain() {
  const [products, setProducts] = useState<Bag[]>([]);
  const [loading, setloading] = useState(false);
  const { searchValue, setSearchValue } = useContext(SearchValueContext);
  const [domData, setDomData] = useState<Bag[]>([]);
  const [skip, setSkip] = useState(1);
  const fetchProducts = async () => {
    setloading(true);
    try {
      const response = await instance.get(`/gucciBag/${skip}`);
      setProducts(response.data.bags);
      setDomData(response.data.bags);
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [skip]);
  const filteringBySearchValue = useMemo(async () => {
    setDomData(
      products.filter((el) => {
        return el.bagName?.toLowerCase().includes(searchValue.toLowerCase());
      })
    );
  }, [searchValue]);
  return (
    <div className="bg-white flex flex-col items-center">
      <Search />
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-0.5 lg:gap-0">
          {domData.map((bag) => (
            <Box bags={bag} />
          ))}
        </div>
      )}
      <button
        onClick={() => setSkip(skip + 1)}
        className="lg:bg-white py-3 px-5 rounded-xl my-10 lg:text-black lg:w-[250px] lg:border-[2px] lg:hover:bg-black lg:hover:text-white lg:hover:border-black
      w-[150px] bg-black text-white">
        Load More
      </button>
    </div>
  );
}
