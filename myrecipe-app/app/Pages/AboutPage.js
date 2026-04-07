export default function AboutPage() {
  return (
    <div
      className="w-full min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/images/bg_myrecipe.png')",
      }}
    >
      { }
      <div
        className="absolute top-15 left-20 w-317.5 h-70"
        style={{
          backgroundColor: "#C5E1A4",
          borderRadius: "1rem 0 0 0",
          zIndex: 0,
        }}
      />

      { }
      <section className="relative w-full max-w-[90%] mx-auto flex flex-col md:flex-row items-center gap-0 px-15 py-22 z-20">
        { }
        <div className="w-full md:w-2/5 flex justify-center md:justify-start">
          <img
            src="/images/aboutpage_pic.png"
            alt="Delicious food"
            className="rounded-2xl w-full max-w-xs shadow-lg object-cover"
          />
        </div>

        { }
        <div className="w-full md:w-3/5 pl-0 md:pl-2 -mt-12 md:-mt-55">
          <h1 className="text-6xl font-bold mb-6 relative z-10">
            <span className="text-orange-500">About</span>{" "}
            <span className="text-gray-800">Us</span>
          </h1>

          <p className="text-gray-700 text-base leading-relaxed relative z-10">
            Lorem Ipsum chỉ đơn giản là một đoạn văn bản giả, được dùng vào
            việc trình bày và dàn trang phục phục vụ cho in ấn. Lorem Ipsum
            đã được sử dụng như một văn bản chuẩn cho ngành
          </p>
        </div>
      </section>

      { }
      <section className="w-full flex items-center justify-start px-8 -mt-65 md:pl-143">
        <p className="text-gray-700 text-lg leading-relaxed max-w-3xl text-left">
          Lorem Ipsum chỉ đơn giản là một đoạn văn bản giả, được dùng vào
          việc trình bày và dàn trang phục phục vụ cho in ấn. Lorem Ipsum
          đã được sử dụng như một văn bản chuẩn cho ngành
        </p>
      </section>
    </div>
  );
}