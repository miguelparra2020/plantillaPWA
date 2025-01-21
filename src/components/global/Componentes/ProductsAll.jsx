const ProductsAll = () => {
    const products = [
        { id: 1, name: "Samsung Galaxy A15 4G Dual SIM 256 GB azul claro 8 GB RAM", category: "Celulares y Teléfonos", 
            price: "614900", img: "https://http2.mlstatic.com/D_NQ_NP_2X_909012-MLA74352948165_022024-F.webp" },
        { id: 2, name: "Xiaomi Redmi 14c 256 Gb 8gb Ram Dual Sim Midnight Black", category: "Celulares y Teléfonos", price: "553900", img: "https://http2.mlstatic.com/D_NQ_NP_2X_853653-MLA79378565020_092024-F.webp" },
        { id: 3, name: "Torre Cpu Gamer Ryzen 7 5700g Vega 8 1tb 32gb Led 22 Pc", category: "Computación", price: "2654910", img: "https://http2.mlstatic.com/D_NQ_NP_2X_891591-MCO78620566430_082024-F.webp" },
        { id: 4, name: "Torre Gamer Amd Ryzen 7 5700x Ddr4 32gb Ssd 1tb Rtx 4060 8gb", category: "Computación", price: "4559905", img: "https://http2.mlstatic.com/D_NQ_NP_2X_934360-MCO81263759994_122024-F.webp" },
        { id: 5, name: "Todo En Uno Lenovo Thincentre C I5 12450h Ssd 2tb + Ram 32gb Color Negro 110v", category: "Computación", price: "3769900", img: "https://http2.mlstatic.com/D_NQ_NP_2X_965327-MLU75689241324_042024-F.webp" },
        { id: 6, name: "Portátil HP 15-ef2517la Amd Ryzen 5-5500U 12GB 512GB SSD FreeDOS", category: "Portátiles", price: "1479000", img: "https://http2.mlstatic.com/D_NQ_NP_2X_630705-MLA71631242649_092023-F.webp" },
        { id: 7, name: "Portatil Lenovo V14 Core I5 13420h 24gb 512gb Ssd Iron Grey", category: "Portátiles", price: "1999900", img: "https://http2.mlstatic.com/D_NQ_NP_2X_715845-MCO80337483132_112024-F.webp" },
        { id: 8, name: "Portátil Acer Aspire 3 15.6 I3-1215u Ram 8gb M.2 512gb Color Gris", category: "Portátiles", price: "1295429", img: "https://http2.mlstatic.com/D_NQ_NP_2X_643003-MLU78564245518_082024-F.webp" },
        { id: 9, name: "Asus X1504ZA-NJ Portatil Vivobook Core I3 1215u Ram 12gb Ssd 512gb Fhd Color Gris", category: "Portátiles", price: "1404900", img: "https://http2.mlstatic.com/D_NQ_NP_2X_864688-MLA80223025147_102024-F.webp" },
    ];

    const ratings = [1, 2, 3, 4, 5]

    return (
        <div className="d-flex flex-col w-full items-center justify-center">

<form
  className="max-w-lg mx-auto fixed inset-0 flex items-start justify-center top-20 z-50 py-4"
>
  <div className="flex">
    <label
      htmlFor="search-dropdown"
      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
    >
      Buscar
    </label>
    <button
      id="dropdown-button"
      data-dropdown-toggle="dropdown"
      className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
      type="button"
    >
      All categories
      <svg
        className="w-2.5 h-2.5 ms-2.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </button>
    <div
      id="dropdown"
      className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
    >
      <ul
        className="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdown-button"
      >
        <li>
          <button
            type="button"
            className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Mockups
          </button>
        </li>
        <li>
          <button
            type="button"
            className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Templates
          </button>
        </li>
        <li>
          <button
            type="button"
            className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Design
          </button>
        </li>
        <li>
          <button
            type="button"
            className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Logos
          </button>
        </li>
      </ul>
    </div>
    <div className="relative w-full">
      <input
        type="search"
        id="search-dropdown"
        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
        placeholder="Buscar producto..."
        required
      />
      <button
        type="submit"
        className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <span className="sr-only">Buscar</span>
      </button>
    </div>
  </div>
</form>


<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-screen-lg mx-auto items-center justify-center justify-items-center mt-14">
            {products && products.map((product, index) => (
                <div key={index} className="w-[92%] mt-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <a href="/">
                        <img className="p-8 rounded-t-lg w-[300px] h-[300px] object-fill" src={product.img} alt="Imagen de producto" width={"300px"} height={"300px"}/>
                    </a>
                    <div className="px-5 pb-5">
                        <a href="#">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                {product.name.length > 20 ? product.name.slice(0, 25) + "..." : product.name}</h5>
                        </a>
                        <div class="flex items-center mt-2.5 mb-5">
                    <div class="flex items-center space-x-1 rtl:space-x-reverse">
                    {ratings.map((rating, index) => (
                            <svg
                            key={index}
                            className={`w-4 h-4 ${rating <= 4 ? "text-yellow-300" : "text-gray-200 dark:text-gray-600"}`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                            >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                        ))}
                    </div>
                        <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
                    </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-gray-900">
                                ${new Intl.NumberFormat("de-DE").format(
                                    product.price.length > 9 
                                        ? parseFloat(product.price.slice(0, 9)) 
                                        : parseFloat(product.price)
                                )}
                            </span>
                            <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ver producto...</a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </div>
        
    );
};

export default ProductsAll;
