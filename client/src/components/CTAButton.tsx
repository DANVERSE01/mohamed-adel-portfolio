import { Link } from "wouter";

export default function CTAButton() {
  return (
    <div className="text-center py-8">
      <Link href="/contact">
        <a className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg">
          Get Your Free Strategy Session
        </a>
      </Link>
    </div>
  );
}
