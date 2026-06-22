import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";

const SERVICES = [
  {
    id: "home-cleaning",
    name: "Home Cleaning",
    description: "Deep cleaning for residential spaces including bedrooms, living rooms, kitchens, and bathrooms.",
    icon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663781188853/24q9KfkVUe9nyqaM8pa3Ws/icon-home-cleaning-ASXzYRoLbbt4tpgAzMBQaK.webp",
    price: "PKR 3,000",
  },
  {
    id: "office-cleaning",
    name: "Office Cleaning",
    description: "Professional office cleaning including desks, floors, restrooms, and common areas.",
    icon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663781188853/24q9KfkVUe9nyqaM8pa3Ws/icon-office-cleaning-nmSWKSD6JwF7Av8To8R2vj.webp",
    price: "PKR 4,000",
  },
  {
    id: "hotel-cleaning",
    name: "Hotel/Guest House",
    description: "Hospitality-grade cleaning for hotels, guest houses, and commercial accommodations.",
    icon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663781188853/24q9KfkVUe9nyqaM8pa3Ws/icon-hotel-cleaning-YoFKFXarWAR2suzoMbrN7g.webp",
    price: "PKR 5,000",
  },
  {
    id: "water-tank",
    name: "Water Tank Cleaning",
    description: "Professional water tank cleaning with proper sanitization and safety protocols.",
    icon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663781188853/24q9KfkVUe9nyqaM8pa3Ws/icon-water-tank-H7eZSULFGgmJBhZkcST8Ms.webp",
    price: "PKR 2,500",
  },
  {
    id: "sofa-carpet",
    name: "Sofa & Carpet Cleaning",
    description: "Specialized cleaning for sofas, carpets, rugs, and upholstered furniture.",
    icon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663781188853/24q9KfkVUe9nyqaM8pa3Ws/icon-sofa-carpet-TgWyPhNFFhJQ62WiCt2BpQ.webp",
    price: "PKR 2,000",
  },
  {
    id: "construction",
    name: "Post-Construction Cleaning",
    description: "Complete post-construction cleanup including dust, debris, and paint removal.",
    icon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663781188853/24q9KfkVUe9nyqaM8pa3Ws/icon-construction-mrKLXv7xkAhm8sp9fHEh2L.webp",
    price: "PKR 6,000",
  },
  {
    id: "renovation",
    name: "Renovation & Painting",
    description: "Professional renovation and painting services for homes and commercial spaces.",
    icon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663781188853/24q9KfkVUe9nyqaM8pa3Ws/icon-renovation-GFG8tSaDbG5DBAy6Ev5C2D.webp",
    price: "PKR 8,000",
  },
  {
    id: "pest-control",
    name: "Pest Control",
    description: "Safe and effective pest control services for residential and commercial properties.",
    icon: "https://d2xsxph8kpxj0f.cloudfront.net/310519663781188853/24q9KfkVUe9nyqaM8pa3Ws/icon-pest-control-GFG8usTNpYyNp7ucswLYYV.webp",
    price: "PKR 3,500",
  },
];

const WHY_CHOOSE_US = [
  {
    title: "Eco-Friendly Products",
    description: "We use safe, environmentally friendly cleaning products that are gentle on your family and pets.",
    icon: "🌿",
  },
  {
    title: "Trained Staff",
    description: "Our team is professionally trained and certified in all cleaning and renovation techniques.",
    icon: "👥",
  },
  {
    title: "Free Inspection",
    description: "We provide a complimentary inspection and quote before starting any work.",
    icon: "✓",
  },
  {
    title: "Satisfaction Guarantee",
    description: "100% satisfaction guaranteed. We redo any work that doesn't meet your expectations.",
    icon: "⭐",
  },
  {
    title: "Affordable Pricing",
    description: "Competitive rates without compromising on quality. Transparent pricing with no hidden charges.",
    icon: "💰",
  },
  {
    title: "Serving All of GB",
    description: "We serve all areas of Gilgit-Baltistan including Skardu, Khaplu, Shigar, and surrounding regions.",
    icon: "📍",
  },
];

const PROCESS_STEPS = [
  {
    number: 1,
    title: "Call or WhatsApp Us",
    description: "Contact us at +92 317 939 4097 via call or WhatsApp. Describe your requirement and we respond within minutes.",
  },
  {
    number: 2,
    title: "Free Inspection & Quote",
    description: "Our team visits your property at no cost, assesses the work, and provides a clear fixed-price quotation.",
  },
  {
    number: 3,
    title: "We Do the Job",
    description: "Our fully equipped team arrives at the agreed time and completes the work to the highest standard.",
  },
  {
    number: 4,
    title: "Pay After You're Happy",
    description: "Inspect every corner yourself. Only pay when 100% satisfied — by cash, JazzCash or EasyPaisa.",
  },
];

const ABOUT_STATS = [
  { label: "Years in Business", value: "3+" },
  { label: "Jobs Completed", value: "1000+" },
  { label: "Happy Clients", value: "500+" },
  { label: "Service Areas", value: "All of GB" },
];

const TESTIMONIALS = [
  {
    name: "Ali Mehdi",
    location: "Homeowner, Skardu City",
    rating: 5,
    text: "K2 cleaned our entire house before Eid and the results were beyond expectations. Very professional team, very clean work. Highly recommended to everyone in Skardu.",
    initials: "AM",
  },
  {
    name: "Fatima Naz",
    location: "Guest House Owner, Skardu",
    rating: 5,
    text: "We had our guest house deep cleaned before tourist season. The team was punctual, used quality products, and every room was spotless. Will book again every year.",
    initials: "FN",
  },
  {
    name: "Ibrahim Hussain",
    location: "Contractor, Shigar Road",
    rating: 5,
    text: "Post-construction cleaning done perfectly — cement dust, paint stains, everything removed. Very affordable and the team worked until every corner was perfect.",
    initials: "IH",
  },
  {
    name: "Sajida Amjad",
    location: "Homeowner, Kachura Road",
    rating: 5,
    text: "Sofa and carpet cleaning was excellent. Old stains completely removed. Team was polite, fast and left no mess behind. Will 100% recommend to family and friends.",
    initials: "SA",
  },
  {
    name: "Muhammad Karim",
    location: "Resident, Khaplu",
    rating: 5,
    text: "Water tank cleaning done professionally with proper chemicals. Team explained everything clearly. Price was very fair. Our water is now clean and safe for the family.",
    initials: "MK",
  },
  {
    name: "Zahid Baig",
    location: "Property Owner, Roundu",
    rating: 5,
    text: "Renovation and painting by K2 team was excellent quality. Very skilled workers, finished on time, and the result looked even better than we had imagined.",
    initials: "ZB",
  },
];

export default function Home() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [bookingForm, setBookingForm] = useState({
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    location: "",
    description: "",
  });
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const bookingMutation = trpc.booking.submit.useMutation();
  const contactMutation = trpc.contact.submit.useMutation();

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) {
      toast.error("Please select a service");
      return;
    }
    try {
      await bookingMutation.mutateAsync({
        serviceType: SERVICES.find((s) => s.id === selectedService)?.name || selectedService,
        clientName: bookingForm.clientName,
        clientPhone: bookingForm.clientPhone,
        clientEmail: bookingForm.clientEmail || undefined,
        location: bookingForm.location || undefined,
        description: bookingForm.description || undefined,
      });
      toast.success("Booking submitted! We'll contact you shortly.");
      setBookingForm({ clientName: "", clientPhone: "", clientEmail: "", location: "", description: "" });
      setSelectedService(null);
    } catch (error) {
      toast.error("Failed to submit booking. Please try again.");
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await contactMutation.mutateAsync({
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone || undefined,
        subject: contactForm.subject,
        message: contactForm.message,
      });
      toast.success("Message sent! We'll get back to you soon.");
      setContactForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-yellow-500 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full border-3 border-yellow-500 bg-blue-900 flex items-center justify-center">
              <span className="text-white font-black text-lg">K<span className="text-yellow-400">2</span></span>
            </div>
            <div>
              <div className="font-bold text-blue-900">K<span className="text-yellow-500">2</span> CLEANER</div>
              <div className="text-xs text-gray-600">Professional Services</div>
            </div>
          </div>
          <div className="hidden md:flex gap-6 items-center">
            <a href="#services" className="text-sm font-medium hover:text-yellow-500 transition">Services</a>
            <a href="#about" className="text-sm font-medium hover:text-yellow-500 transition">About</a>
            <a href="#contact" className="text-sm font-medium hover:text-yellow-500 transition">Contact</a>
            <a href="https://wa.me/923179394097?text=Hello%20K2%20Cleaners!%20I%20want%20to%20book%20a%20service." className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition text-sm">
              WhatsApp
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663781188853/24q9KfkVUe9nyqaM8pa3Ws/hero-background-5XJsMfsJ83kd4DFSyEoNvq.webp" className="w-full h-full object-cover" alt="background" />
        </div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 } as any} className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-900 bg-opacity-50 px-4 py-2 rounded-full mb-6 border border-yellow-400">
              <span className="text-yellow-300">✓</span>
              <span className="text-sm font-semibold">Trusted by 500+ Clients</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight">
              Professional Cleaning & <span className="text-yellow-400">Renovation Services</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Serving Skardu and all of Gilgit-Baltistan with eco-friendly, certified cleaning and renovation solutions.
            </p>

            {/* Trust Badges */}
            <div className="flex justify-center gap-6 mb-8 flex-wrap">
              <div className="flex flex-col items-center">
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663781188853/24q9KfkVUe9nyqaM8pa3Ws/badge-eco-friendly-2nN6qfzN7hpwtjvQGXPnsg.webp" alt="Eco-Friendly" className="w-16 h-16 mb-2" />
                <span className="text-sm font-semibold">Eco-Friendly</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663781188853/24q9KfkVUe9nyqaM8pa3Ws/badge-insured-eQ4L6A9gKUADpCwCMqMPor.webp" alt="Insured" className="w-16 h-16 mb-2" />
                <span className="text-sm font-semibold">Insured</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663781188853/24q9KfkVUe9nyqaM8pa3Ws/badge-certified-Va7wTfp7VYHcpjVscqVcjn.webp" alt="Certified" className="w-16 h-16 mb-2" />
                <span className="text-sm font-semibold">Certified</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-12 max-w-xl mx-auto">
              <div>
                <div className="text-4xl font-black text-yellow-400">500+</div>
                <div className="text-sm text-gray-300">Happy Clients</div>
              </div>
              <div>
                <div className="text-4xl font-black text-yellow-400">⭐ 5.0</div>
                <div className="text-sm text-gray-300">Star Rating</div>
              </div>
              <div>
                <div className="text-4xl font-black text-yellow-400">3+</div>
                <div className="text-sm text-gray-300">Years in Business</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="https://wa.me/923179394097?text=Hello%20K2%20Cleaners!%20I%20want%20to%20book%20a%20service." className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-yellow-600 transition">
                WhatsApp Booking
              </a>
              <a href="#services" className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-900 transition">
                View Services
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 } as any} className="text-center mb-16">
            <h2 className="text-4xl font-black text-blue-900 mb-2">
              About <span className="text-yellow-500">K2 Cleaners</span>
            </h2>
            <div className="w-16 h-1 bg-yellow-500 mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 } as any}>
              <h3 className="text-3xl font-black text-blue-900 mb-4">Your Trusted Partner in Cleaning & Renovation</h3>
              <p className="text-gray-600 mb-4">
                Founded with a commitment to excellence, K2 Cleaner & Renovators has been serving the Gilgit-Baltistan region for over 3 years. We believe that a clean, well-maintained space is the foundation of a better life.
              </p>
              <p className="text-gray-600 mb-4">
                Our team of professionally trained and certified staff uses only eco-friendly products and the latest cleaning techniques to ensure your satisfaction. We're not just a cleaning service—we're your partner in creating and maintaining beautiful, healthy spaces.
              </p>
              <p className="text-gray-600 mb-6">
                From residential homes to commercial offices, from post-construction cleanup to specialized services like water tank cleaning and pest control, we handle every project with the same level of care and professionalism.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <div>
                  <div className="font-bold text-blue-900">100% Satisfaction Guarantee</div>
                  <div className="text-sm text-gray-600">We redo any work that doesn't meet your expectations</div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 } as any} className="grid grid-cols-2 gap-4">
              {ABOUT_STATS.map((stat, idx) => (
                <Card key={idx} className="p-6 bg-gradient-to-br from-navy-900 to-blue-700 text-white border-none">
                  <div className="text-3xl font-black text-yellow-300 mb-2">{stat.value}</div>
                  <div className="text-sm font-semibold">{stat.label}</div>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 } as any} className="text-center mb-16">
            <h2 className="text-4xl font-black text-blue-900 mb-2">
              Our <span className="text-yellow-500">Services</span>
            </h2>
            <div className="w-16 h-1 bg-yellow-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer comprehensive cleaning and renovation services tailored to your needs.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <motion.div key={service.id} variants={itemVariants}>
                <Card className="p-6 hover:shadow-lg transition cursor-pointer border-2 hover:border-yellow-500" onClick={() => setSelectedService(service.id)}>
                  <img src={service.icon} alt={service.name} className="w-16 h-16 mb-4" />
                  <h3 className="font-bold text-blue-900 mb-2">{service.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                  <div className="bg-yellow-100 text-yellow-600 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                    {service.price}
                  </div>
                  <Button className="w-full bg-blue-900 hover:bg-navy-800 text-white" onClick={() => setSelectedService(service.id)}>
                    Book Now
                  </Button>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Band */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-2">
            Transparent <span className="text-yellow-400">Pricing</span>
          </h2>
          <p className="text-gray-300 mb-8">Starting prices for our most popular services</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {SERVICES.slice(0, 4).map((service) => (
              <div key={service.id} className="bg-gray-800 rounded-lg p-4">
                <div className="text-xs text-gray-400 mb-2">{service.name}</div>
                <div className="text-2xl font-black text-yellow-400">{service.price}</div>
              </div>
            ))}
          </div>
          <div className="bg-yellow-500 inline-block px-6 py-3 rounded-lg font-bold">
            FREE Inspection & Quote
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 } as any} className="text-center mb-16">
            <h2 className="text-4xl font-black text-blue-900 mb-2">
              Why <span className="text-yellow-500">Choose Us</span>
            </h2>
            <div className="w-16 h-1 bg-yellow-500 mx-auto mb-6"></div>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="p-6 border-2 hover:border-yellow-500 transition">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-blue-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 } as any} className="text-center mb-16">
            <h2 className="text-4xl font-black text-blue-900 mb-2">
              How It <span className="text-yellow-500">Works</span>
            </h2>
            <div className="w-16 h-1 bg-yellow-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Booking K2 Cleaner & Renovators is simple, fast and completely hassle-free.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step) => (
              <motion.div key={step.number} variants={itemVariants}>
                <Card className="p-6 border-2 hover:border-yellow-500 transition text-center">
                  <div className="w-12 h-12 bg-yellow-500 text-white rounded-full flex items-center justify-center font-black text-xl mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-bold text-blue-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 } as any} className="text-center mb-16">
            <h2 className="text-4xl font-black text-blue-900 mb-2">
              What Our <span className="text-yellow-500">Customers Say</span>
            </h2>
            <div className="w-16 h-1 bg-yellow-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real reviews from real customers across Skardu and Gilgit-Baltistan.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="p-6 border-2 hover:border-yellow-500 transition">
                  <div className="text-yellow-500 mb-3">{'⭐'.repeat(testimonial.rating)}</div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {testimonial.initials}
                    </div>
                    <div>
                      <div className="font-bold text-blue-900 text-sm">{testimonial.name}</div>
                      <div className="text-xs text-gray-500">{testimonial.location}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 } as any} className="text-center mb-16">
            <h2 className="text-4xl font-black text-blue-900 mb-2">
              Get in <span className="text-yellow-500">Touch</span>
            </h2>
            <div className="w-16 h-1 bg-yellow-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions or want to schedule a free inspection? Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 } as any}>
            <Card className="p-8 border-2 border-yellow-500">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-blue-900 mb-2">Full Name *</label>
                    <Input placeholder="Your name" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-blue-900 mb-2">Email Address *</label>
                    <Input placeholder="your@email.com" type="email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-blue-900 mb-2">Phone Number (Optional)</label>
                  <Input placeholder="Your phone number" value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-blue-900 mb-2">Subject *</label>
                  <Input placeholder="What is this about?" value={contactForm.subject} onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-blue-900 mb-2">Message *</label>
                  <Textarea placeholder="Tell us more about your inquiry..." value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} required className="min-h-32" />
                </div>
                <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3" disabled={contactMutation.isPending}>
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact & Booking CTA */}
      <section id="contact" className="bg-gradient-to-r from-navy-900 to-blue-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 } as any} className="text-center">
            <h2 className="text-4xl font-black mb-4">
              Book Your Service Today — <span className="text-yellow-300">We Come to You</span>
            </h2>
            <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
              Serving Skardu City · Shigar · Khaplu · Roundu · Kachura · Satpara · Ghanche and surrounding areas of Gilgit-Baltistan.
            </p>

            {/* Contact Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                <div className="text-2xl mb-2">📞</div>
                <div className="font-bold">+92 317 939 4097</div>
                <div className="text-sm text-gray-300">Call Us</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                <div className="text-2xl mb-2">💬</div>
                <div className="font-bold">WhatsApp Available</div>
                <div className="text-sm text-gray-300">24/7</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                <div className="text-2xl mb-2">✉️</div>
                <div className="font-bold">k2cleaners.gb@gmail.com</div>
                <div className="text-sm text-gray-300">Email Us</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                <div className="text-2xl mb-2">📍</div>
                <div className="font-bold">Skardu, GB</div>
                <div className="text-sm text-gray-300">Service Area</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
                <div className="text-2xl mb-2">⏰</div>
                <div className="font-bold">Mon–Sat: 8am–8pm</div>
                <div className="text-sm text-gray-300">Working Hours</div>
              </div>
            </div>

            <a href="https://wa.me/923179394097?text=Hello%20K2%20Cleaners!%20I%20want%20to%20book%20a%20service." className="inline-flex items-center gap-2 bg-green-500 hover:bg-yellow-500 text-white px-8 py-4 rounded-lg font-bold text-lg transition">
              <span>💬</span> WhatsApp Us: +92 317 939 4097
            </a>
          </motion.div>
        </div>
      </section>

      {/* Booking Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 } as any} className="bg-white rounded-lg max-w-md w-full p-6 max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-blue-900">
                Book {SERVICES.find((s) => s.id === selectedService)?.name}
              </h3>
              <button onClick={() => setSelectedService(null)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <Input placeholder="Your Name" value={bookingForm.clientName} onChange={(e) => setBookingForm({ ...bookingForm, clientName: e.target.value })} required />
              <Input placeholder="Phone Number" value={bookingForm.clientPhone} onChange={(e) => setBookingForm({ ...bookingForm, clientPhone: e.target.value })} required />
              <Input placeholder="Email (optional)" type="email" value={bookingForm.clientEmail} onChange={(e) => setBookingForm({ ...bookingForm, clientEmail: e.target.value })} />
              <Input placeholder="Location" value={bookingForm.location} onChange={(e) => setBookingForm({ ...bookingForm, location: e.target.value })} />
              <Textarea placeholder="Additional details (optional)" value={bookingForm.description} onChange={(e) => setBookingForm({ ...bookingForm, description: e.target.value })} />
              <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold" disabled={bookingMutation.isPending}>
                {bookingMutation.isPending ? "Submitting..." : "Submit Booking"}
              </Button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="font-black text-lg mb-2">
                K<span className="text-yellow-400">2</span> CLEANER & RENOVATORS
              </div>
              <p className="text-sm text-gray-400 mb-2">Professional Cleaning & Renovation Services</p>
              <p className="text-xs text-gray-500">Your trusted cleaning and renovation partner in Skardu, Gilgit-Baltistan.</p>
              <p className="text-xs text-yellow-400 italic mt-2">"Clean Spaces. Better Living."</p>
            </div>

            <div>
              <h4 className="font-bold text-yellow-400 mb-4 text-sm uppercase">Our Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#services" className="hover:text-yellow-400">Home Cleaning</a></li>
                <li><a href="#services" className="hover:text-yellow-400">Office Cleaning</a></li>
                <li><a href="#services" className="hover:text-yellow-400">Hotel/Guest House</a></li>
                <li><a href="#services" className="hover:text-yellow-400">Water Tank Cleaning</a></li>
                <li><a href="#services" className="hover:text-yellow-400">Sofa & Carpet Cleaning</a></li>
                <li><a href="#services" className="hover:text-yellow-400">Post-Construction</a></li>
                <li><a href="#services" className="hover:text-yellow-400">Renovation & Painting</a></li>
                <li><a href="#services" className="hover:text-yellow-400">Pest Control</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-yellow-400 mb-4 text-sm uppercase">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#services" className="hover:text-yellow-400">Services</a></li>
                <li><a href="#about" className="hover:text-yellow-400">About Us</a></li>
                <li><a href="#contact" className="hover:text-yellow-400">Contact</a></li>
                <li><a href="https://wa.me/923179394097" className="hover:text-yellow-400">Book Now</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-yellow-400 mb-4 text-sm uppercase">Contact Us</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="tel:+923179394097" className="hover:text-yellow-400">📞 +92 317 939 4097</a></li>
                <li><a href="https://wa.me/923179394097" className="hover:text-yellow-400">💬 WhatsApp Available</a></li>
                <li><a href="mailto:k2cleaners.gb@gmail.com" className="hover:text-yellow-400">✉️ k2cleaners.gb@gmail.com</a></li>
                <li>📍 Skardu, Gilgit-Baltistan</li>
              </ul>
              <h4 className="font-bold text-yellow-400 mb-4 text-sm uppercase mt-6">Service Areas</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Skardu City · Kachura</li>
                <li>Shigar · Satpara</li>
                <li>Khaplu · Ghanche</li>
                <li>Roundu · Shyok Valley</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
            <p>© 2026 K2 Cleaner & Renovators. All rights reserved. Skardu, Gilgit-Baltistan, Pakistan.</p>
            <p className="text-yellow-400 mt-2">✦ Clean Spaces. Better Living. ✦</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
