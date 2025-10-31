import { Link } from "wouter";
import { Instagram, Mail } from "lucide-react";
import { OWNER } from "@/const";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-md">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              {OWNER.fullName}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {OWNER.bio}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/work">
                  <a className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    Work
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    Services
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    About
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    Contact
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Connect
            </h3>
            <div className="flex gap-4">
              <a
                href={OWNER.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all"
              >
                <Instagram className="w-5 h-5 text-foreground" />
              </a>
              <a
                href={`mailto:${OWNER.email}`}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border hover:border-primary hover:bg-primary/10 transition-all"
              >
                <Mail className="w-5 h-5 text-foreground" />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-muted-foreground text-sm">
                {OWNER.location}
              </p>
              <a
                href={`mailto:${OWNER.email}`}
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                {OWNER.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {currentYear} {OWNER.fullName}. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm">
              Crafted with AI & creativity
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
