import { useEffect, useState } from 'react';
import { dummyDatabase } from '../dummyDatabase';

export const URL =
  'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';

export async function callUrl() {
  try {
    const res = await fetch(URL, {
      headers: {
        authorId: '43',
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export function useGetProducts() {
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    callUrl().then((d) => setProducts(d));
    // setProducts(dummyDatabase);
  }, []);

  return { products, setProducts };
}
