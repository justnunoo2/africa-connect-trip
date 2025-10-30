import { Link } from "react-router-dom";
import { Compass, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-hero text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-accent p-2 rounded-lg">
                <Compass className="h-6 w-6 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold">TripLink Africa</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Discover Africa's hidden gems. Connect with local experiences and create unforgettable memories.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/destinations" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/accommodations" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Accommodations
                </Link>
              </li>
              <li>
                <Link to="/experiences" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Experiences
                </Link>
              </li>
              <li>
                <Link to="/group-trips" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Group Trips
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">hello@triplinkafrica.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">+254 123 456 789</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} TripLink Africa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
