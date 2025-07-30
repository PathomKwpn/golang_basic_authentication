import { GoMoon } from "react-icons/go";
import { WiDaySunny } from "react-icons/wi";

//icons
import { CiSettings } from "react-icons/ci";

const Header = () => {
  const hearderItems = [
    { label: "theme", link: "#", icon: <span>🎨</span> },
    {
      label: "settings",
      link: "#",
      icon: <CiSettings className="h-5 w-5 fill-current" />,
    },
    { label: "profile", link: "#", icon: <span>👤</span> },
    // Add more items as needed
  ];
  return (
    <header className="navbar flex justify-end bg-base-100 shadow-lg px-6 border-b-1 border-base-300">
      <div className="flex items-center gap-1">
        {hearderItems.map((item) => {
          if (item.label === "profile") {
            return (
              <div className="flex mx-2">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full ring-primary ring-offset-base-100 ring-2 ring-offset-2">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src="/src/assets/Avatar1.png"
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </a>
                    </li>
                    <li>
                      <a>Settings</a>
                    </li>
                    <li>
                      <a>Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            );
          }
          if (item.label === "theme") {
            return (
              <button className="btn btn-ghost flex border-base-100 items-center justify-center rounded-full h-8 w-8">
                <label className="swap swap-rotate">
                  <input
                    type="checkbox"
                    className="theme-controller"
                    value="dark"
                  />
                  <WiDaySunny className="swap-off h-5 w-5 fill-current" />
                  <GoMoon className="swap-on h-5 w-5 fill-current" />
                </label>
              </button>
            );
          }
          return (
            <a
              key={item.label}
              href={item.link}
              className="btn btn-ghost border-base-100 w-8 h-8 rounded-full p-1 text-xl"
            >
              {item.icon}
            </a>
          );
        })}
      </div>
    </header>
  );
};

export default Header;
