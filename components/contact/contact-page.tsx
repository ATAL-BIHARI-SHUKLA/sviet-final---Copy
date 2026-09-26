"use client";

import Image from "next/image";
import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const containerClass = "mx-auto max-w-[1280px] px-6";
const inputClass =
  "w-full rounded-lg bg-gray-100 px-4 py-3 text-sm text-gray-700 outline-none";
const primaryButtonClass =
  "rounded-full bg-black px-6 py-3  font-semibold transition hover:bg-gray-900";

const campusLocations = [
  {
    name: "Main Campus - Banur",
    address:
      "Village Ramnagar, Near Banur, Tehsil Rajpura, District Patiala, Punjab - 140601",
    phone: "+91-94652-33333",
    tollFree: "1800-120-1200",
    email: "admission@sviet.ac.in",
    mapUrl:
      "https://maps.google.com/?q=Swami+Vivekanand+Institute+Banur+Punjab",
  },
  {
    name: "Admissions Office",
    address: "Admin Block, SVGOI Campus, Banur, Punjab",
    phone: "+91-94652-33333",
    email: "admission@sviet.ac.in",
    timings: "Mon-Sat: 9:00 AM - 5:00 PM",
  },
];

const faqItems = [
  {
    question: "What is the admission procedure at SVGOI?",
    answer:
      "Applications can be submitted online at admission.sviet.ac.in or directly at the campus. After submission, shortlisted candidates are called for counselling and document verification.",
  },
  {
    question: "What programs does SVGOI offer?",
    answer:
      "SVGOI offers 50+ programs across Engineering, Management, Pharmacy, Computer Applications, Hotel Management, Law, Education, Paramedical, and more.",
  },
  {
    question: "Is hostel facility available?",
    answer:
      "Yes, separate hostel facilities are available for boys and girls with all modern amenities including Wi-Fi, mess, laundry, and 24/7 security.",
  },
  {
    question: "What is the scholarship policy?",
    answer:
      "SVGOI offers RNR scholarships based on merit and financial need. Scholarships range from partial to 100% fee waiver. Check eligibility using the scholarship checker on our website.",
  },
  {
    question: "What is the placement record?",
    answer:
      "SVGOI has a near 95% placement record with a highest package of 60 LPA. 2,200+ companies visit campus annually including Amazon, TCS, Infosys, Wipro, and Deloitte.",
  },
];

type ContactFormErrors = Partial<
  Record<"name" | "email" | "phone" | "subject" | "message", string>
>;

const indianMobilePattern = /^[6-9]\d{9}$/;

export function ContactPageComponent() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const nextErrors: ContactFormErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Full name is required.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (!indianMobilePattern.test(formData.phone.trim())) {
      nextErrors.phone = "Enter a valid Indian mobile number.";
    }

    if (!formData.subject.trim()) {
      nextErrors.subject = "Subject is required.";
    }

    if (!formData.message.trim()) {
      nextErrors.message = "Message is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    window.open("https://admission.sviet.ac.in", "_blank");
  };

  return (
    <>
      {/* SECTION 1: HERO */}
      <section className="relative h-96 overflow-hidden md:h-[500px]">
        <Image
          src="/assets/img/contact.jpg"
          alt="SVGOI campus"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className={`${containerClass} relative h-full flex items-center`}>
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-white">GET IN TOUCH</h1>
            <p className="mt-6 max-w-md text-lg text-white/90">
              Have questions? We&apos;re here to help. Reach out to us through
              any of the channels below.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: CONTACT FORM + INFO */}
      <section className={`${containerClass} py-16`}>
        <div className="grid gap-10 md:grid-cols-2">
          {/* LEFT: FORM */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              Send us a Message
            </h2>
            <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-4"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                    className={inputClass}
                  />
                  {errors.name ? (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    required
                    className={inputClass}
                  />
                  {errors.email ? (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="How can we help?"
                    required
                    className={inputClass}
                  />
                  {errors.subject ? (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.subject}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91-XXXX-XXXX-XX"
                    className={inputClass}
                  />
                  {errors.phone ? (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help..."
                    rows={5}
                    required
                    className={inputClass}
                  />
                  {errors.message ? (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.message}
                    </p>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className={`${primaryButtonClass} w-full md:w-auto text-white`}
                >
                  Send Message
                </button>
              </form>
          </div>

          {/* RIGHT: CONTACT DETAILS */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">
                Contact Information
              </h3>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900">Phone</h4>
                <p className="mt-2 text-gray-600">+91-94652-33333</p>
                <p className="text-gray-600">1800-120-1200</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">Email</h4>
                <p className="mt-2 text-gray-600">admission@sviet.ac.in</p>
                <p className="text-gray-600">info@sviet.ac.in</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">Office Hours</h4>
                <p className="mt-2 text-gray-600">
                  Monday - Saturday: 09:00 AM - 05:00 PM
                </p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: QUICK ACTION CARDS */}
      <section className={`${containerClass} py-16`}>
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Quick Contact Options
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Card 1: Call */}
          <div className="rounded-2xl border border-gray-100 p-8 text-center transition hover:border-gray-300">
            <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <FaPhone className="text-2xl text-gray-900" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">Call Us</h3>
            <p className="mt-3 text-gray-600">
              Speak directly with our admissions team
            </p>
            <a
              href="tel:+911762508005"
              className="mt-4 inline-block text-black font-semibold hover:text-gray-700"
            >
              +91-94652-33333
            </a>
          </div>

          {/* Card 2: Email */}
          <div className="rounded-2xl border border-gray-100 p-8 text-center transition hover:border-gray-300">
            <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <FaEnvelope className="text-2xl text-gray-900" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">Email Us</h3>
            <p className="mt-3 text-gray-600">
              We&apos;ll respond within 24 hours
            </p>
            <a
              href="mailto:admission@sviet.ac.in"
              className="mt-4 inline-block text-black font-semibold hover:text-gray-700"
            >
              admission@sviet.ac.in
            </a>
          </div>

          {/* Card 3: Visit */}
          {/* <div className="rounded-2xl border border-gray-100 p-8 text-center transition hover:border-gray-300">
            <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <FaMapMarkerAlt className="text-2xl text-gray-900" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">
              Visit Campus
            </h3>
            <p className="mt-3 text-gray-600">Schedule a campus visit today</p>
            <button className="mt-4 font-semibold text-black hover:text-gray-700">
              Schedule Visit →
            </button>
          </div> */}
        </div>
      </section>

      {/* SECTION 4: CAMPUS LOCATIONS */}
      <section className={`${containerClass} py-16`}>
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Our Campuses</h2>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          {campusLocations.map((location, index) => (
            <div key={index} className="rounded-2xl border border-gray-100 p-8">
              <h3 className="text-2xl font-semibold text-gray-900">
                {location.name}
              </h3>
              <p className="mt-4 text-gray-600">{location.address}</p>
              <p className="mt-2 font-semibold text-gray-900">
                {location.phone}
              </p>
              {location.tollFree ? (
                <p className="mt-2 font-semibold text-gray-900">
                  {location.tollFree}
                </p>
              ) : null}
              {location.email ? (
                <p className="mt-2 text-gray-600">{location.email}</p>
              ) : null}
              {location.timings ? (
                <p className="mt-2 text-gray-600">{location.timings}</p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: MAP EMBED */}
      <section className="py-16">
        <div className="relative h-96 w-full overflow-hidden rounded-2xl md:h-[500px]">
          <iframe
            src="https://maps.google.com/maps?q=Swami%20Vivekanand%20Institute%20of%20Engineering%20%26%20Technology%2C%20Zirakpur-Patiala%20Highway%2C%20Ram%20Nagar%2C%20Banur%2C%20Punjab%20140601&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, position: "absolute", top: 0, left: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Swami Vivekanand Institute Location"
          />
        </div>
      </section>

      {/* SECTION 6: FAQ */}
      <section className={`${containerClass} py-16`}>
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-600">
            Can&apos;t find what you&apos;re looking for? Check our FAQ section.
          </p>
        </div>
        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <div key={index} className="rounded-2xl border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900">{item.question}</h3>
              <p className="mt-3 text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: CTA */}
   
    </>
  );
}
