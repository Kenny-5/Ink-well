
export default function Footer() {
  return (
    <footer className="bg-[#F0F0F0] text-[#333333] border-t border-[#E5E5E5] mt-auto">
      <div className="container mx-auto py-6 px-6 text-center">
        <p className="text-sm font-medium">
          {/* This line makes sure the year updates by itself, 
            so i don’t have to change it manually every January */}
          © {new Date().getFullYear()} InkWell. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
