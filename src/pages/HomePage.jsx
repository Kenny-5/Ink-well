import heroImg from '../assets/hero.jpg';

export default function HomePage() {
  return (
    <main className="bg-[#FFFFFF] text-[#333333] min-h-screen flex flex-col font-inter">
      
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        {/* Darker overlay for readability */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold tracking-wide mb-4 text-white">
            Welcome to InkWell
          </h1>
          <p className="text-[#E5E5E5] text-lg md:text-xl mb-6">
            Your space for sharing ideas, stories, and creativity.
          </p>
          <a
            href="/new"
            className="mt-6 inline-block px-8 py-3 bg-[#666666] text-[#FFFFFF] font-semibold rounded-lg hover:bg-[#333333] transition-colors duration-200"
          >
            Create a New Post
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 bg-[#FAFAFA] text-center">
        <h2 className="text-3xl font-playfair font-bold mb-8">About InkWell</h2>
        <div className="max-w-3xl mx-auto text-left">
          <p className="text-lg leading-relaxed text-[#333333]">
            InkWell is a creative space designed to bring ideas to life. 
            Just like the traditional inkwell that fuels the writer’s pen, 
            our platform serves as a <span className="font-semibold">source of inspiration, 
            connection, and expression</span> for modern creators.
          </p>
          <p className="text-lg leading-relaxed mt-4 text-[#333333]">
            Whether you’re a writer, designer, developer, or simply someone with a story to share, 
            InkWell gives you the tools and environment to 
            <span className="font-semibold"> create, share, and connect </span> in a meaningful way.
          </p>
          <p className="text-lg leading-relaxed mt-4 text-[#333333]">
            We believe in simplicity, elegance, and purpose-driven design helping you focus less 
            on distractions and more on what matters: <span className="font-semibold">your ideas</span>.
          </p>
        </div>
      </section>
    </main>
  );
}
