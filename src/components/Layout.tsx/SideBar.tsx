import logo from "../../assets/logo.svg";
import { MainMenuItems, OtherMenuItems } from "../../data/menu";
import { MenuItemType } from "../../types/data";

const SideBar = () => {
  return (
    <div className="w-[240px] bg-[#0C110D] h-full fixed left-0 flex-col flex">
      <section className="flex items-center gap-2 px-8 py-6 border-b-[0.5px] border-b-[#C8CBD9]">
        <img src={logo} alt="logo" className="w-6" />
        <p className="font-bold text-xs text-white">BEAM</p>
      </section>
      <section className="p-10 px-8 text-white flex-col">
        <h2 className="text-sm">MAIN</h2>
        <ul className="flex flex-col gap-5 mt-4">
          {MainMenuItems.map((item: MenuItemType, index: number) => {
            const active = window.location.pathname
              .toLowerCase()
              .includes(item.title.toLowerCase());
            return (
              <li
                className="cursor-pointer flex gap-2 items-center"
                key={index}
              >
                <img src={item.image} className="w-3" alt={item.title} />
                <span
                  className={`text-xs ${
                    active ? "text-[#FFDE02]" : "text-[#D9D8D5]"
                  }`}
                >
                  {item.title}
                </span>
              </li>
            );
          })}
        </ul>
        <div className="h-[1px] w-full bg-[#C8CBD9] my-14"></div>
        <h2 className="text-sm">OTHERS</h2>
        <ul className="flex flex-col gap-5 mt-4">
          {OtherMenuItems.map((item: MenuItemType, index: number) => {
            const active = window.location.pathname
              .toLowerCase()
              .includes(item.title.toLowerCase());
            return (
              <li
                className="cursor-pointer flex gap-2 items-center"
                key={index}
              >
                <img src={item.image} className="w-3" alt={item.title} />
                <span
                  className={`text-xs ${
                    active ? "text-[#FFDE02]" : "text-[#D9D8D5]"
                  }`}
                >
                  {item.title}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default SideBar;
