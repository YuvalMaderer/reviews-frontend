import {
  AlarmClock,
  BarChart3,
  CirclePlay,
  Droplet,
  Laptop,
  Layers,
  Rocket,
} from "lucide-react";

const Homepage = () => {
  return (
    <div className="relative h-[730px]">
      <img
        src="src/images/0a9313aafc4735dfd99dda1369bf6171.jpg"
        alt="Background Image"
        className="w-full h-screen object-cover blur-sm"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
        <p className="text-white text-xl mt-4">
          Welcome to the best review site
        </p>
        <h1 className="text-white text-9xl font-bold">BizGenius Reviews</h1>
        <p className="text-white text-xl mt-4">
          Streamline feedback and boost your reputation with our business review
          app
        </p>
        <br />
        <CirclePlay className="size-24 text-white hover:text-red-teal cursor-pointer transition duration-200 ease-in-out" />
      </div>
      <div className="flex justify-center gap-10 items-center relative bottom-28">
        {[
          {
            src: "src/images/137f4e75bf88429461f6f97b8aa9392f.jpg",
            title: "Enhanced Feedback",
            text: "Streamline review collection and insights.",
            opacity: "opacity-60",
          },
          {
            src: "src/images/58883ef2b7e6d63cf6b15ce54368d800.jpg",
            title: "Increased Visibility",
            text: "Showcase positive reviews to attract customers.",
            opacity: "opacity-70",
          },
          {
            src: "src/images/c0a0cbd04b31bab637517b8a5f94e8d7.jpg",
            title: "Improved Reputation",
            text: "Address feedback to manage reputation.",
            opacity: "opacity-80",
          },
        ].map((item, index) => (
          <div key={index} className="relative">
            <img
              src={item.src}
              alt={`Image ${index + 1}`}
              className="w-[300px] h-[200px] object-cover"
            />
            <div
              className={`absolute inset-0 bg-teal-800 ${item.opacity} z-10`}
            ></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center p-4 z-20 text-center">
              <h3 className="text-white font-bold">{item.title}</h3>
              <p className="text-white mt-2">{item.text}</p>
              <button className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-100 text-xs">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center p-4 md:p-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6">
          SOMETHING NEW
        </h1>
        <hr className="w-32 md:w-40 border-t border-black mb-4 md:mb-6" />
        <p className="max-w-[500px] text-center text-gray-600">
          Stay ahead of the curve with our freshest reviews and insights. Our
          team is constantly updating our database with the latest products,
          services, and experiences. Dive into the most recent trends and see
          what’s hot right now.
        </p>
      </div>
      <div className="flex justify-center items-center">
        <img
          className="w-[900px]"
          src="src/images/removethe_bg-removebg-preview.png"
          alt=""
        />
      </div>
      <div className="flex justify-center items-center">
        <p className="text-xs max-w-[400px] text-center">
          This review app is a game-changer for anyone looking to provide and
          read insightful feedback with ease. Its user-friendly interface and
          intuitive design make it incredibly simple to navigate, whether you're
          submitting a review or browsing through others. The app's advanced
          filtering options allow you to sort reviews by various criteria,
          helping you quickly find the most relevant insights.
        </p>
      </div>

      <br />

      <div className="grid grid-rows-2 grid-cols-3">
        <div className="bg-teal-800 flex flex-col items-center justify-center p-4 text-white h-[200px]">
          <Rocket />
          <h1 className="text-lg font-bold">Increased Visibility</h1>
          <p className="text-sm text-gray-200">
            Boosts brand presence and awareness.
          </p>
        </div>
        <div className="bg-teal-600 flex flex-col items-center justify-center p-4 text-white h-[200px]">
          <Laptop />
          <h1 className="text-lg font-bold">Customer Insights</h1>
          <p className="text-sm text-gray-200">
            Understand customer preferences and issues.
          </p>
        </div>
        <div className="bg-teal-800 flex flex-col items-center justify-center p-4 text-white h-[200px]">
          <Layers />
          <h1 className="text-lg font-bold">Enhanced Credibility</h1>
          <p className="text-sm text-gray-200">
            Builds trust through positive feedback.
          </p>
        </div>
        <div className="bg-teal-600 flex flex-col items-center justify-center p-4 text-white h-[200px]">
          <Droplet />
          <h1 className="text-lg font-bold">Improved SEO</h1>
          <p className="text-sm text-gray-200">
            Positive reviews can improve search rankings.
          </p>
        </div>
        <div className="bg-teal-800 flex flex-col items-center justify-center p-4 text-white h-[200px]">
          <AlarmClock />
          <h1 className="text-lg font-bold">Higher Engagement</h1>
          <p className="text-sm text-gray-200">
            Encourages customer interaction and loyalty.
          </p>
        </div>
        <div className="bg-teal-600 flex flex-col items-center justify-center p-4 text-white h-[200px]">
          <BarChart3 />
          <h1 className="text-lg font-bold">Performance Tracking</h1>
          <p className="text-sm text-gray-200">
            Monitor and respond to business performance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
