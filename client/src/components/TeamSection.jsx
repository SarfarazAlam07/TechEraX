import React, { useState, useEffect, useRef } from "react";
import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaGlobe,
} from "react-icons/fa";
import { motion } from "framer-motion";

// Sample Data
const teamMembers = [
  {
    name: "Sarfaraz Alam",
    role: "Founder || CEO || MERN developer  ",
    description:
      "I don't just run the company; I build it. Passionate about creating seamless web experiences from scratch",
    image: "/sarfaraz.jpeg",
    socials: {
      twitter: "https://x.com/SarfarazAlam01",
      linkedin: "https://www.linkedin.com/in/sarfaraz-alam-92b364276/",
      instagram:
        "https://www.instagram.com/mdsarfaraz5231?igsh=MTVhd3RrYTNjZm9kYg==",
      github: "https://github.com/SarfarazAlam07",
    },
    portfolioLink: "https://sarfarazalam.vercel.app/",
  },
  {
    name: "Asif Siddique",
    role: "Co-Founder || CFO || BDM",
    description:
      "Scaling tech through financial precision and strategic growth. I specialize in turning client opportunities into sustainable revenue",
    image: "/asif3.jpeg",
    socials: {
      twitter: "#",
      linkedin: "#",
      instagram:
        "https://www.instagram.com/asif_siddique_0704?igsh=YXk3OHl2Z2MxcG9j",
    },
    portfolioLink: "#portfolio-manuel",
  },
  {
    name: "Sahil Kumar",
    role: "CO-Founder || Frontend Developer",
    description:
      "I build what you see. My focus is on creating fast, beautiful, and mobile-friendly websites that users love.",
    image: "/sahil.jpg",
    socials: {
      github:"https://github.com/sahilt56",
      linkedin: "https://www.linkedin.com/in/s%CA%8C%CA%9C%C9%A9%C9%AD-k%CA%8B%C9%B1%CA%8C%CA%80-955051362?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/sahil.2_?igsh=MWVkdjRuYzYxMjBxbQ==",
    },
    portfolioLink: "#portfolio-tim",
  },
  {
    name: "Dhiraj Kumar",
    role: "CO-Founder || UI UX Designer",
    description:
      "Designing the heart of our products. I ensure every website and app looks beautiful and is easy for everyone to use.",
    image: "/Dheraj.jpeg",
    socials: { twitter: "#", linkedin: "#", instagram: "#" },
    portfolioLink: "#portfolio-david",
  },
    {
    name: "Zugnu Khatoon",
    role: "CO-Founder || AI / ML Engineer",
    description:
      "Making our apps intelligent. I build smart features that automate tasks and solve complex problems for you.",
    image: "/zugnu4.jpeg",
    socials: {
      github: "https://github.com/ZugnuKhatoon07",
      instagram:
        "https://www.instagram.com/itz_chandni_251?igsh=MTVicWJhM3c5cnZwZQ==",
    },
    portfolioLink: "#portfolio-tim",
  },
];

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const TeamSection = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const timerRef = useRef(null);

  // === TIMER LOGIC ===
  useEffect(() => {
    // Check if device is Mobile/Tablet (Screen width <= 1024px)
    const isTouchDevice = window.matchMedia("(max-width: 1024px)").matches;

    if (isTouchDevice && activeCardIndex !== null) {
      if (timerRef.current) clearTimeout(timerRef.current);

      // 4 Seconds Timer (Testing ke liye 3-4s perfect hai)
      timerRef.current = setTimeout(() => {
        setActiveCardIndex(null);
      }, 4000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeCardIndex]);

  const handleCardClick = (index) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveCardIndex(index === activeCardIndex ? null : index);
  };

  return (
    <div className="w-full bg-[#0a0a1a] flex flex-col items-center justify-start md:justify-center pt-8 pb-6 md:min-h-screen md:py-12 font-sans overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        className="text-center mb-20 md:mb-12 px-4 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeInUpVariants}
      >
        <h2 id="ourTeam" className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-600 mb-3">
          Our Team
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
          Meet the minds shaping the future.
        </p>
      </motion.div>

      <motion.div
        className="
          w-full px-8 pb-4 relative z-10
          flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth
          md:grid md:grid-cols-2 lg:grid-cols-4 md:w-auto md:overflow-visible md:justify-center
          scrollbar-hide
        "
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainerVariants}
      >
        {teamMembers.map((member, index) => (
          <TeamCard
            key={index}
            member={member}
            isActive={activeCardIndex === index}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1.5 } }}
        className="md:hidden text-gray-500 text-xs mt-1 animate-pulse relative z-10"
      >
        Swipe left &rarr;
      </motion.p>
    </div>
  );
};

const TeamCard = ({ member, isActive, onClick }) => {
  // === CRITICAL FIX IS HERE ===
  // Pehle: "group-hover:[transform:rotateY(180deg)]" (Yeh mobile pe chipak jata tha)
  // Ab: "md:group-hover:[transform:rotateY(180deg)]" (Sirf medium screen aur upar hover chalega)
  // Mobile par sirf `isActive` (Timer/Click) se control hoga.
  const flipRotationClass = isActive
    ? "[transform:rotateY(180deg)]"
    : "md:group-hover:[transform:rotateY(180deg)]";

  return (
    <motion.div
      variants={fadeInUpVariants}
      className="group h-[400px] w-[300px] flex-shrink-0 snap-center [perspective:1000px] cursor-pointer"
      onClick={onClick}
      whileHover={{ y: -5 }}
    >
      <div
        className={`relative h-full w-full rounded-2xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] ${flipRotationClass}`}
      >
        {/* === FRONT FACE === */}
        <div className="absolute inset-0 h-full w-full rounded-2xl [backface-visibility:hidden]">
          <img
            src={member.image}
            alt={member.name}
            className="h-full w-full rounded-2xl object-cover"
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

          <div className="absolute bottom-5 left-5 text-white">
            <h3 className="text-2xl font-bold">{member.name}</h3>
            <p className="text-cyan-400 text-sm font-medium">{member.role}</p>
          </div>
        </div>

        {/* === BACK FACE === */}
        <div className="absolute inset-0 h-full w-full rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-inner p-6 text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-start">
          <div className="flex items-center gap-4 mb-3 w-full">
            <div className="relative h-16 w-16 flex-shrink-0">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
              />
              <div className="absolute inset-[2px] rounded-full overflow-hidden bg-slate-900">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white text-left leading-tight">
              {member.name}
            </h3>
          </div>

          <div className="w-full text-left mb-2">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
              Role
            </p>
            <p className="text-cyan-400 text-sm font-semibold">{member.role}</p>
          </div>

          <div className="w-full text-left mb-3">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
              Bio
            </p>
            <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
              {member.description}
            </p>
          </div>

          <div className="w-full text-left mb-4 mt-auto">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
              Connect
            </p>
            <div className="flex gap-3">
              {member.socials.twitter && (
                <a
                  href={member.socials.twitter}
                  className="p-2 rounded-full bg-white/10 hover:bg-cyan-500 text-white transition-all backdrop-blur-md"
                >
                  <FaTwitter size={16} />
                </a>
              )}
              {member.socials.linkedin && (
                <a
                  href={member.socials.linkedin}
                  className="p-2 rounded-full bg-white/10 hover:bg-blue-700 text-white transition-all backdrop-blur-md"
                >
                  <FaLinkedin size={16} />
                </a>
              )}
              {member.socials.github && (
                <a
                  href={member.socials.github}
                  className="p-2 rounded-full bg-white/10 hover:bg-gray-600 text-white transition-all backdrop-blur-md"
                >
                  <FaGithub size={16} />
                </a>
              )}
              {member.socials.instagram && (
                <a
                  href={member.socials.instagram}
                  className="p-2 rounded-full bg-white/10 hover:bg-pink-600 text-white transition-all backdrop-blur-md"
                >
                  <FaInstagram size={16} />
                </a>
              )}
            </div>
          </div>

          <a
            href={member.portfolioLink}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-xl text-white font-semibold hover:from-cyan-500 hover:to-blue-600 transition-all shadow-lg active:scale-95 text-sm"
          >
            <FaGlobe /> View Portfolio
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamSection;
