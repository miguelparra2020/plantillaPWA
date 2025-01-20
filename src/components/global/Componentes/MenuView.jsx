// components/Counter.jsx
import { useState } from "react";
import { generalConfig } from "@util/generalConfig";

const MenuView = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu); // Cambia el estado
  };

  return (
    <div>
      <div className="fixed bottom-16 right-4 z-50" >
      <button onClick={toggleMenu} type="button" className="inline-flex items-center justify-center w-12 h-12 
      font-medium bg-gray-600 rounded-full hover:bg-gray-700 group ring-4 focus:ring-4 ring-gray-200  focus:ring-gray-500
      focus:outline-none ">
        <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
        </svg>
        <span className="sr-only">Menú</span>
      </button>
    </div>

{openMenu && (
    <div id="menu-content" >
    <div id="drawer-navigation" className="h-[80vh] p-4  overflow-y-auto transition-transform z-2000  bg-gray-100 
    w-[100%] " aria-labelledby="drawer-navigation-label">
        <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase ">Menu</h5>
        <button onClick={toggleMenu} type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" 
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 
        absolute top-2.5 end-2.5 inline-flex items-center justify-center">
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
        <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">

            {generalConfig.GeneralMenu.linksPages.map((item) => (
                <>
                {item.active && 
                    <li>
                    <a href={item.href} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                      className={['bi', item.icon]} viewBox="0 0 16 16">

                            <path d={item.path1}/>
                            <path d={item.path2}/>
                        </svg>
                        <span className="ms-3">{item.text}</span>
                    </a>
                    </li>
                } 
                    
                </>
            ))}
        
        </ul>
    </div>
    </div>
</div>  
)}
       

    </div>
  );
};

export default MenuView;
