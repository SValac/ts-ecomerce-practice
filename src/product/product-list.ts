/* 

1 obter lista de produtos desde api
2 renderizar la lista de produtos
3 crear la tarjera card con el template de html

*/

import { addToCart } from '../cart/cart';
import { Product } from '../interfaces/product.interface';

//1 obter lista de produtos desde api
const getProducts = async (): Promise<Product[]> => {
	const response = await fetch('https://fakestoreapi.com/products');
	const products = (await response.json()) as Product[];
	return products;
};

//2 renderizar la lista de produtos
export const renderProductsList = async () => {
	const $productsList = document.querySelector(
		'#products-list'
	) as HTMLDivElement;
	const $productTemplate = document.querySelector(
		'#product-template'
	) as HTMLTemplateElement;
	const products = await getProducts();

	products.forEach((product) => {
		const clone = createProductCard(product, $productTemplate);
		$productsList.appendChild(clone);
	});
};

// 3 crear la tarjera card con el template de html
const createProductCard = (
	product: Product,
	$productTemplate: HTMLTemplateElement
) => {
	const { title, id, image, price } = product;
	const clone = $productTemplate.content.cloneNode(
		true
	) as HTMLTemplateElement;
	clone.querySelector('img')!.src = image;
	clone.querySelector('h2')!.textContent = title;
	clone.querySelector('p span')!.textContent = `$${price}`;
	clone.querySelector('button')!.addEventListener('click', () => {
		console.log(`$Producto ${title} con id ${id} agregado al carrito`);
		addToCart({ title, id, price });
	});

	return clone;
};
