export const menu = [
    {
        id: 1,
        title: "Products Page",
        icon: "fa-brands fa-product-hunt",
        items: [
            {
                id: 1,
                title: "Products",
                path: "/products"
            },
            {
                id: 2,
                title: "Brands",
                path: "/brands"
            }
        ]
    },
    {
        id: 2,
        title: "Orders Page",
        icon: "fa-solid fa-chart-simple",
        items: [
            {
                id: 1,
                title: "Order",
                path: "/orders"
            },
            {
                id: 2,
                title: "Order Item",
                path: "/ordersitems"
            }
        ]
    },
    {
        id: 3,
        title: "Users Page",
        icon: "fa-solid fa-table",
        items: [
            {
                id: 1,
                title: "Account",
                path: "/account"
            },
            {
                id: 2,
                title: "Wish List",
                path: "/wishlists"
            }
        ]
    },
];

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

