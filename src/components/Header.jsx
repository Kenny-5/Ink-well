import logo from "../assets/logo.jpg";

export default function Header() {
  return (
    <header className="bg-[#FAFAFA] text-[#333333] shadow-md sticky top-0 z-50 border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        
        {/* logo*/}
        <a href="/" className="flex items-center space-x-3">
          <img 
            src={logo} 
            alt="InkWell Logo" 
            className="h-16 w-auto object-contain" 
          />
          <span className="text-3xl font-bold tracking-wide">InkWell</span>
        </a>

        {/* navigation */}
        <nav className="space-x-10">
          <a
            href="/"
            className="text-lg font-semibold text-[#666666] hover:text-[#333333] 
                       hover:underline hover:decoration-[#666666] hover:decoration-2 
                       hover:underline-offset-2 transition-all duration-200"
          >
            Home
          </a>
          <a
            href="/new"
            className="text-lg font-semibold text-[#666666] hover:text-[#333333] 
                       hover:underline hover:decoration-[#666666] hover:decoration-2 
                       hover:underline-offset-2 transition-all duration-200"
          >
            New Post
          </a>
          <a
            href="/contact"
            className="text-lg font-semibold text-[#666666] hover:text-[#333333] 
                       hover:underline hover:decoration-[#666666] hover:decoration-2 
                       hover:underline-offset-2 transition-all duration-200"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
