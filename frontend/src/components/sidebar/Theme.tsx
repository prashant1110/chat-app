const Theme = () => {
  const handleClick = (image: string) => {
    document.body.style.backgroundImage = `url(/${image})`;
    document.body.style.backgroundSize="cover"
    document.body.style.backgroundRepeat="no-repeat"
    document.body.style.backgroundPosition="center"
    document.body.style.height="100vh"
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1">
        Theme
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        <li>
          <a onClick={() => handleClick("bg.jpg")}>Default</a>
        </li>
        <li>
          <a onClick={() => handleClick("happy.jpg")}>Happy</a>
        </li>
        <li>
          <a onClick={() => handleClick("cold2.jpeg")}>Cold</a>
        </li>
        <li>
          <a onClick={() => handleClick("asthetic.jpg")}>Asthetic</a>
        </li>
        <li>
          <a onClick={() => handleClick("nature.jpg")}>Nature</a>
        </li>
      </ul>
    </div>
  );
};

export default Theme;
