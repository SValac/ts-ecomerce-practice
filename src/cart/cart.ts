import { CartItem } from '../interfaces/cart-item.interface';
import { renderCartList } from './cart-list';

//1 definir la variable de cart, array de cartItems
export const cartArray: CartItem[] = JSON.parse(
	localStorage.getItem('cart') || '[]'
);

//2 creat un metodo para agregar un item al carrito
interface addItemToCart {
	id: number;
	title: string;
	price: number;
}
export const addToCart = ({ id, title, price }: addItemToCart) => {
	const itemInCart = cartArray.find((cartItem) => cartItem.id === id);
	if (itemInCart) {
		itemInCart.quantity++;
	} else {
		cartArray.push({ id, title, price, quantity: 1 });
	}
	console.log(cartArray);
	localStorage.setItem('cart', JSON.stringify(cartArray));
	renderCartList();
};

export const reduceCartQuantity = (id: number) => {
	const itemIndex = cartArray.findIndex((cartItem) => cartItem.id === id);
	if (cartArray[itemIndex].quantity > 1) {
		cartArray[itemIndex].quantity--;
	} else {
		removeFromCart(id);
	}
	localStorage.setItem('cart', JSON.stringify(cartArray));
	renderCartList();
};
//3 crear un metodo para remover un item del carrito
export const removeFromCart = (id: number) => {
	const itemIndex = cartArray.findIndex((cartItem) => cartItem.id === id);
	cartArray.splice(itemIndex, 1);
	localStorage.setItem('cart', JSON.stringify(cartArray));
	renderCartList();
};
//4 crear un metodo para limpiar el carrito
export const resetCart = () => {
	cartArray.splice(0, cartArray.length);
	localStorage.setItem('cart', JSON.stringify(cartArray));
};
//5 crear un metodo para obtener el total
export const getCartTotal = () => {
	return cartArray.reduce(
		(total, cartItem) => total + cartItem.price * cartItem.quantity,
		0
	);
};
