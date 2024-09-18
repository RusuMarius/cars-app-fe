import { NextResponse } from 'next/server';
import { getProducts, getShoes, getCars } from '../getData'; // Adjust the import path as needed


export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ message: 'Query is required' }, { status: 400 });
    }

    // Perform searches
    const [products, shoes, cars] = await Promise.all([
      getProducts(),
      getShoes(),
      getCars(1), // Adjust page number if needed
    ]);

    const safeToLowerCase = (str: string | undefined) => (str ? str.toLowerCase() : '');

    // Filter results based on the query
    const matchingProducts = products.data.filter((product: any) =>
      safeToLowerCase(product.attributes.title).includes(query.toLowerCase())
    );

    const matchingShoes = shoes.data.filter((shoe: any) =>
      safeToLowerCase(shoe.attributes.title).includes(query.toLowerCase())
    );

    const matchingCars = cars.data.filter((car: any) =>
      safeToLowerCase(car.attributes.title).includes(query.toLowerCase())
    );

    // Combine results with links
    const results = [
      ...matchingProducts.map((product: any) => ({
        type: 'Product',
        title: product.attributes.title,
        link: `/product/${product.id}`,  // Link to the product details page
      })),
      ...matchingShoes.map((shoe: any) => ({
        type: 'Shoe',
        title: shoe.attributes.title,
        link: `/shoe/${shoe.id}`,  // Link to the shoe details page
      })),
      ...matchingCars.map((car: any) => ({
        type: 'Car',
        title: car.attributes.title,
        link: `/car/${car.id}`,  // Link to the car details page
      })),
    ];

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.error('Error processing the search request:', error);
    return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 });
  }
}