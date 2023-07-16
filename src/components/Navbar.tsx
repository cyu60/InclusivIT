import Link from "next/link";

export function Navbar() {
  return <nav className="flex items-center justify-between bg-green-700 p-6 text-white">
    <div className="text-2xl font-bold">InclusivIT!</div>
    <div className="space-x-4">
      <Link href="/">
        <div className="hover:text-green-300">Home</div>
      </Link>
    </div>
  </nav>;
}
