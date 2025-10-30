import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in <span className="bg-gradient-accent bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions? We're here to help. Reach out to our team and we'll get back to you soon.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <Card className="p-6 shadow-card border-0 animate-fade-in">
                <div className="bg-gradient-hero w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Send us an email anytime
                </p>
                <a href="mailto:hello@triplinkafrica.com" className="text-primary hover:underline">
                  hello@triplinkafrica.com
                </a>
              </Card>

              <Card className="p-6 shadow-card border-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
                <div className="bg-gradient-hero w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Call Us</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Mon-Fri from 8am to 6pm EAT
                </p>
                <a href="tel:+254123456789" className="text-primary hover:underline">
                  +254 123 456 789
                </a>
              </Card>

              <Card className="p-6 shadow-card border-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
                <div className="bg-gradient-hero w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Visit Us</h3>
                <p className="text-muted-foreground text-sm">
                  TripLink Africa HQ<br />
                  Nairobi, Kenya<br />
                  East Africa
                </p>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="lg:col-span-2 p-8 shadow-card border-0 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us more about your inquiry..."
                    className="min-h-[150px]"
                  />
                </div>

                <Button variant="hero" size="lg" className="w-full">
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
