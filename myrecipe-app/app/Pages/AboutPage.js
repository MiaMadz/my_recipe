export default function AboutPage() {
  return (
    <div
      className="w-full min-h-screen bg-cover bg-center relative"
      style={{backgroundImage: "url('/images/bg1.png')"}}
    >
      <div
        className="
          absolute 
          top-10 sm:top-12 md:top-16 
          left-0 sm:left-5 md:left-10 
          w-[95%] sm:w-[75%] md:w-[90%] lg:w-[97%] 
          h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px]
        "
        style={{
          backgroundColor: "#C5E1A4",
          borderRadius: "2rem 0 0 0",
          zIndex: 0,
        }}
      />

      <section className="relative w-full max-w-[90%] mx-auto flex flex-col md:flex-row items-center gap-0 px-6 sm:px-10 md:px-15 py-16 md:py-22 z-20">
        <div className="w-full md:w-2/5 flex justify-center md:justify-start">
          <img
            src="/images/aboutpage_pic.png"
            alt="Delicious food"
            className="rounded-2xl w-full max-w-xs sm:max-w-sm md:max-w-xs shadow-lg object-cover"
          />
        </div>

        <div className="w-full md:w-3/5 pl-0 md:pl-4 mt-6 md:-mt-60">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 relative z-10">
            <span className="text-orange-500">About</span>{" "}
            <span className="text-gray-800">Us</span>
          </h1>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed relative z-10">
            Lorem Ipsum chỉ đơn giản là một đoạn văn bản giả, được dùng vào
            việc trình bày và dàn trang phục phục vụ cho in ấn. Lorem Ipsum
            đã được sử dụng như một văn bản chuẩn cho ngành
          </p>
        </div>
      </section>

      <section className="w-full flex justify-end px-6 sm:px-10 md:px-16 lg:px-48 mt-50 md:-mt-60">
        <p className="
          text-gray-700 
          text-base sm:text-lg 
          leading-relaxed 
          max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl 
          text-left
        ">
          Lorem Ipsum chỉ đơn giản là một đoạn văn bản giả, được dùng vào
          việc trình bày và dàn trang phục phục vụ cho in ấn. Lorem Ipsum
          đã được sử dụng như một văn bản chuẩn cho ngành
        </p>
      </section>
    </div>
  );
}