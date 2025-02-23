

export const Banner = () => {
  return (
    <>
      <div
        className="hero py-20 flex max-sm:flex-col max-sm:justify-center"
        style={{
          backgroundImage: `url('https://i.ibb.co.com/MCBNfz5/heroImg.png)`,
        }}
      >
        <div className="hero-overlay md:bg-opacity-10"></div>
        <div className="hero-content max-w-lg ">
          <div className="mx-auto md:ms-auto ">
            <h1 className="mb-5 text-5xl text-blue-700 font-semibold">Navigate the World with Ease</h1>
            <p className="mb-5 text-gray-600 text-base">
            Check visa requirements, apply online, and track your application—all in one place.
            </p>
           
          </div>
        </div>
      </div>
      {/* <div
        id="carouselExampleInterval"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <img
              src="https://i.ibb.co/W5Gh5Jk/New-Project-1.png"
              className="d-block w-100"
              alt="Slide 1"
            />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img
              src="https://i.ibb.co/tmhxDV3/New-Project.png"
              className="d-block w-100"
              alt="Slide 2"
            />
          </div>
          <div className="carousel-item" data-bs-interval="10000">
            <img
              src="https://i.ibb.co/MCBNfz5/heroImg.png"
              className="d-block w-100"
              alt="Slide 3"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev "
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon bg-blue-800 text-blue-50 p-4 rounded-full"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon  bg-blue-800  p-4 rounded-full"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div> */}
    </>
  );
};
