import logo from "@/assets/images/logo-icon.png";

const Sidebar = () => {
  return (
    <nav className="order-first hidden w-60 overflow-y-auto  px-2 md:block dark:bg-[#101010]">
      <div className="sticky top-0 flex items-center  py-5">
        <img src={logo} alt="logo" className="h-10" />
        <h1 className="text-primary px-2 text-xl font-bold">Skinn BB</h1>
      </div>
      <ul className="pb-5"></ul>
    </nav>
  );
};

export default Sidebar;
