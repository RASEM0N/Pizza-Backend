import { generateProductItem } from './lib';

const addIndex = <T>(array: T[]) => {
	return array.map((obj, index) => ({ id: index + 1, ...obj }));
};

export const carts = [
	{
		userId: 1,
		totalAmount: 0,
		token: '11111',
	},
	{
		userId: 2,
		totalAmount: 0,
		token: '222222',
	},
];

export const cartItems = [
	{
		productItemId: 1,
		cartId: 1,
		quantity: 2,
		ingredients: {
			connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
		},
	},
];

export const users = [
	{
		fullName: 'User Test',
		email: 'user@test.ru',
		password: '123456789',
		verified: new Date(),
	},
	{
		fullName: 'Admin Admin',
		email: 'admin@test.ru',
		password: '123456789',
		verified: new Date(),
	},
];

export const categories = [
	{
		name: 'Пиццы',
	},
	{
		name: 'Завтрак',
	},
	{
		name: 'Закуски',
	},
	{
		name: 'Коктейли',
	},
	{
		name: 'Напитки',
	},
];

export const ingredients = addIndex([
	{
		name: 'Сырный бортик',
		price: 179,
		imgUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png',
	},
	{
		name: 'Сливочная моцарелла',
		price: 79,
		imgUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
	},
	{
		name: 'Сыры чеддер и пармезан',
		price: 79,
		imgUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
	},
	{
		name: 'Острый перец халапеньо',
		price: 59,
		imgUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
	},
	{
		name: 'Нежный цыпленок',
		price: 79,
		imgUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
	},
	{
		name: 'Шампиньоны',
		price: 59,
		imgUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
	},
	{
		name: 'Ветчина',
		price: 79,
		imgUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
	},
	{
		name: 'Пикантная пепперони',
		price: 79,
		imgUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3',
	},
	{
		name: 'Острая чоризо',
		price: 79,
		imgUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
	},
	{
		name: 'Маринованные огурчики',
		price: 59,
		imgUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B',
	},
	{
		name: 'Свежие томаты',
		price: 59,
		imgUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
	},
	{
		name: 'Красный лук',
		price: 59,
		imgUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
	},
	{
		name: 'Сочные ананасы',
		price: 59,
		imgUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
	},
	{
		name: 'Итальянские травы',
		price: 39,
		imgUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
	},
	{
		name: 'Сладкий перец',
		price: 59,
		imgUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
	},
	{
		name: 'Кубики брынзы',
		price: 79,
		imgUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
	},
	{
		name: 'Митболы',
		price: 79,
		imgUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png',
	},
]);

export const products = [
	{
		name: 'Омлет с ветчиной и грибами',
		imgUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7970321044479C1D1085457A36EB.webp',
		categoryId: 2,
	},
	{
		name: 'Омлет с пепперони',
		imgUrl: 'https://media.dodostatic.net/image/r:292x292/11EE94ECF33B0C46BA410DEC1B1DD6F8.webp',
		categoryId: 2,
	},
	{
		name: 'Кофе Латте',
		imgUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
		categoryId: 2,
	},
	{
		name: 'Дэнвич ветчина и сыр',
		imgUrl: 'https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.webp',
		categoryId: 3,
	},
	{
		name: 'Куриные наггетсы',
		imgUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D618B5C7EC29350069AE9532C6E.webp',
		categoryId: 3,
	},
	{
		name: 'Картофель из печи с соусом 🌱',
		imgUrl: 'https://media.dodostatic.net/image/r:292x292/11EED646A9CD324C962C6BEA78124F19.webp',
		categoryId: 3,
	},
	{
		name: 'Додстер',
		imgUrl: 'https://media.dodostatic.net/image/r:292x292/11EE796F96D11392A2F6DD73599921B9.webp',
		categoryId: 3,
	},
	{
		name: 'Острый Додстер 🌶️🌶️',
		imgUrl: 'https://media.dodostatic.net/image/r:292x292/11EE796FD3B594068F7A752DF8161D04.webp',
		categoryId: 3,
	},
	{
		name: 'Банановый молочный коктейль',
		imgUrl: 'https://media.dodostatic.net/image/r:292x292/11EEE20B8772A72A9B60CFB20012C185.webp',
		categoryId: 4,
	},
	{
		name: 'Карамельное яблоко молочный коктейль',
		imgUrl: 'https://media.dodostatic.net/image/r:292x292/11EE79702E2A22E693D96133906FB1B8.webp',
		categoryId: 4,
	},
	{
		name: 'Молочный коктейль с печеньем Орео',
		imgUrl: 'https://media.dodostatic.net/image/r:292x292/11EE796FA1F50F8F8111A399E4C1A1E3.webp',
		categoryId: 4,
	},
	{
		name: 'Классический молочный коктейль 👶',
		imgUrl: 'https://media.dodostatic.net/image/r:292x292/11EE796F93FB126693F96CB1D3E403FB.webp',
		categoryId: 4,
	},
	{
		name: 'Ирландский Капучино',
		imgUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61999EBDA59C10E216430A6093.webp',
		categoryId: 5,
	},
	{
		name: 'Кофе Карамельный капучино',
		imgUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61AED6B6D4BFDAD4E58D76CF56.webp',
		categoryId: 5,
	},
	{
		name: 'Кофе Кокосовый латте',
		imgUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61B19FA07090EE88B0ED347F42.webp',
		categoryId: 5,
	},
	{
		name: 'Кофе Американо',
		imgUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61B044583596548A59078BBD33.webp',
		categoryId: 5,
	},
	{
		name: 'Кофе Латте',
		imgUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
		categoryId: 5,
	},
];

export const stories = [
	{
		previewImageUrl:
			'https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496',
	},
	{
		previewImageUrl:
			'https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640',
	},
	{
		previewImageUrl:
			'https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020',
	},
	{
		previewImageUrl:
			'https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958',
	},
	{
		previewImageUrl:
			'https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737',
	},
	{
		previewImageUrl:
			'https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284',
	},
];

export const storyItems = [
	{
		storyId: 1,
		sourceUrl:
			'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE',
	},
	{
		storyId: 1,
		sourceUrl:
			'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE',
	},
	{
		storyId: 1,
		sourceUrl:
			'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE',
	},
	{
		storyId: 1,
		sourceUrl:
			'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE',
	},
	{
		storyId: 1,
		sourceUrl:
			'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE',
	},
];

export const productsWithIngredients = [
	{
		name: 'Пепперони фреш',
		imgUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
		categoryId: 1,
		ingredients: { connect: ingredients.slice(0, 5) },
	},
	{
		name: 'Сырная',
		imgUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
		categoryId: 1,
		ingredients: { connect: ingredients.slice(5, 10) },
	},
	{
		name: 'Чоризо фреш',
		imgUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
		categoryId: 1,
		ingredients: { connect: ingredients.slice(10, 40) },
	},
];

export const productWithIngredientsItems = (entities: any[]) => {
	return entities.reduce(
		(result, { id }) => [
			...result,
			generateProductItem({ productId: id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: id, pizzaType: 2, size: 40 }),
		],
		[],
	);
};
