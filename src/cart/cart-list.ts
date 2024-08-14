//6 crear un metodo para renderizar el carrito
import { CartItem } from '../interfaces/cart-item.interface';
import {
	addToCart,
	cartArray,
	getCartTotal,
	reduceCartQuantity,
	removeFromCart
} from './cart';

const $cartList = document.querySelector('#cart-list') as HTMLUListElement;
const $cartTemplate = document.querySelector(
	'#cart-item-template'
) as HTMLTemplateElement;
const $cartTotal = document.querySelector('#cart-total') as HTMLSpanElement;

export const renderCartList = async () => {
	$cartList.innerHTML = '';
	cartArray.forEach((cartItem) => {
		const clone = createCartItem(cartItem, $cartTemplate);

		$cartList.appendChild(clone);
	});

	if (cartArray.length === 0) {
		$cartTotal.innerHTML = `<p>Cart is Empty</p>`;
	} else {
		$cartTotal.textContent = `$${getCartTotal().toFixed(2)}`;
	}
};

const createCartItem = (
	cardItem: CartItem,
	$cartTemplate: HTMLTemplateElement
) => {
	const { id, title, price, quantity } = cardItem;
	const $clone = $cartTemplate.content.cloneNode(true) as HTMLTemplateElement;
	$clone.querySelector("[data-cart='title']")!.textContent = title;
	$clone.querySelector("[data-cart='price']")!.textContent = `$${(
		price * quantity
	).toFixed(2)}`;
	$clone.querySelector("[data-cart='quantity']")!.textContent = `${quantity}`;
	$clone
		.querySelector("[data-cart='increment']")!
		.addEventListener('click', () => {
			addToCart({ id, title, price });
		});

	$clone
		.querySelector("[data-cart='decrement']")!
		.addEventListener('click', () => {
			reduceCartQuantity(id);
		});

	return $clone;
};
