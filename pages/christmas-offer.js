import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Sparkles,
  Code,
  Zap,
  BarChart3,
  Users,
  GraduationCap,
  Briefcase,
  Rocket,
  Trophy,
  Gift,
  Target,
  X,
} from "lucide-react";

export default function ChristmasOfferLanding() {
  useEffect(() => {
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
  }, []);

  const scrollToForm = () => {
    const form = document.getElementById("hubspot-form-container");
    if (!form) return;

    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";

    setTimeout(() => {
      const y = form.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 200);
  };

  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [mounted, setMounted] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [showGraffiti, setShowGraffiti] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useEffect(() => {
    setMounted(true);
    const end = new Date(new Date().getFullYear(), 11, 25, 23, 59, 59);
    end.setHours(end.getHours() + 24);

    const t = setInterval(() => {
      const now = new Date();
      const diff = end - now;
      if (diff <= 0) {
        clearInterval(t);
        setTimeLeft({ h: 0, m: 0, s: 0 });
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft({ d, h, m, s });
    }, 1000);

    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js-na2.hsforms.net/forms/embed/243742367.js";
    script.defer = true;
    script.charset = "utf-8";
    script.type = "text/javascript";

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  const handleGiftClick = () => {
    setGiftOpened(true);
    setTimeout(() => {
      setShowGraffiti(true);
    }, 300);
    setTimeout(() => {
      setShowCoupon(true);
    }, 1200);
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, #0a1628 0%, #184274 50%, #0a1628 100%)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* =====================================================
    ✅ LOGO BAR WITH WHITE BACKGROUND - LOGOS ON LEFT SIDE
====================================================== */}
      <div
        style={{
          background: "#ffffff", // WHITE BACKGROUND
          padding: "10px 0", // Vertical padding only
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: "1500px",
            margin: "0 auto",
            padding: "0 20px",
          }}
        >
          <section
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px", // Space between logos
            }}
          >
            {/* CSHR Logo */}
            <Link href="/" style={{ textDecoration: "none" }}>
              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  background: "rgba(255, 255, 255, 0.9)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src="/Nav Logo/CSHR - Nav Logo.png"
                  alt="CSHR Logo"
                  style={{
                    height: "42px",
                    objectFit: "contain",
                  }}
                />
              </div>
            </Link>

            {/* CSIT Logo */}
            <Link href="/" style={{ textDecoration: "none" }}>
              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  background: "rgba(255, 255, 255, 0.9)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <img
                  src="/Nav Logo/CSIT - Nav Logo.png"
                  alt="CSIT Logo"
                  style={{
                    height: "42px",
                    objectFit: "contain",
                  }}
                />
              </div>
            </Link>
          </section>
        </div>
      </div>
      {/* Premium Grid Pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 203, 14, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 203, 14, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          pointerEvents: "none",
        }}
      />

      {/* Elegant Gradient Orbs */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(46, 71, 125, 0.3) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "-10%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(255, 203, 14, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {/* Floating Sparkles */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `sparkle ${
                Math.random() * 5 + 3
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            <Sparkles
              size={Math.random() * 12 + 8}
              color={
                i % 3 === 0 ? "#2E477D" : i % 3 === 1 ? "#ffcb0e" : "#ffffff"
              }
              opacity={0.5}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8) translateY(0); }
          50% { opacity: 0.9; transform: scale(1.2) translateY(-20px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes giftLidOpen {
          0% { transform: rotateX(0deg) translateY(0); }
          100% { transform: rotateX(-120deg) translateY(-40px); }
        }
        @keyframes giftBoxShake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        @keyframes couponPop {
          0% { transform: scale(0) rotate(-10deg); opacity: 0; }
          60% { transform: scale(1.1) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes graffitiPop {
          0% { 
            opacity: 0; 
            transform: translate(-50%, -50%) scale(0) rotate(-180deg);
          }
          50% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1.2) rotate(10deg);
          }
          70% { 
            transform: translate(-50%, -50%) scale(0.9) rotate(-5deg);
          }
          100% { 
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.5) rotate(0deg);
          }
        }
        @keyframes confettifall {
          0% { transform: translateY(-100%) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .course-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .course-card:hover {
          transform: translateY(-8px);
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 203, 14, 0.2);
        }
        .countdown-box {
          transition: all 0.3s ease;
        }
        .gift-box {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .gift-box:hover {
          transform: scale(1.05);
        }
        .gift-box.shake {
          animation: giftBoxShake 0.5s ease;
        }
        @media (max-width: 768px) {
          .course-card {
            flex-direction: column;
            text-align: center;
          }
        }
          /* =====================================
   FORCE SINGLE-LINE COUNTDOWN ON MOBILE
   ===================================== */
@media (max-width: 640px) {
  .countdown-wrapper {
    flex-wrap: nowrap !important;   /* FORCE single row */
    justify-content: center;
    gap: 8px !important;
  }

  .countdown-box {
    padding: 10px 8px !important;
    min-width: 64px !important;
    border-radius: 14px;
  }

  .countdown-box div:first-child {
    font-size: 22px !important;  /* numbers */
    line-height: 1;
  }

  .countdown-box div:last-child {
    font-size: 9px !important;   /* labels */
    letter-spacing: 0.4px;
  }
}
  /* ===== SHINE TEXT EFFECT (30% OFF) ===== */
@keyframes shineText {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}

.shine-text {
  background: linear-gradient(
    90deg,
    #666 0%,
    #666 40%,
rgb(255, 230, 0) 50%,
    #666 60%,
    #666 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shineText 3s linear infinite;
}
  

    @media (max-width: 640px) {
  .hero-logos {
    justify-content: center !important;
  }
}

    `}</style>

      {/* Gift Box Modal */}
      {(giftOpened || showCoupon) && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={() => {
            setGiftOpened(false);
            setShowCoupon(false);
            setShowGraffiti(false);
          }}
        >
          {/* Confetti Effect */}
          {showGraffiti && (
            <>
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: `${Math.random() * 100}%`,
                    top: "-10%",
                    width: `${Math.random() * 10 + 5}px`,
                    height: `${Math.random() * 10 + 5}px`,
                    background: [
                      "#ffcb0e",
                      "#DC143C",
                      "#2E477D",
                      "#ffa500",
                      "#ffffff",
                    ][Math.floor(Math.random() * 5)],
                    borderRadius: Math.random() > 0.5 ? "50%" : "0",
                    animation: `confettifall ${
                      Math.random() * 2 + 2
                    }s linear forwards`,
                    animationDelay: `${Math.random() * 0.5}s`,
                    pointerEvents: "none",
                  }}
                />
              ))}
            </>
          )}

          {/* Graffiti Pop Effect */}
          {showGraffiti && !showCoupon && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                animation: "graffitiPop 1s ease-out forwards",
                pointerEvents: "none",
                zIndex: 10,
              }}
            >
              <div
                style={{
                  fontSize: "clamp(60px, 15vw, 150px)",
                  fontWeight: "900",
                  background:
                    "linear-gradient(135deg, #ffcb0e, #ffa500, #DC143C, #2E477D)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0 0 60px rgba(255, 203, 14, 0.8)",
                  letterSpacing: "-4px",
                  transform: "rotate(-10deg)",
                  textAlign: "center",
                  fontFamily: "'Impact', sans-serif",
                  filter: "drop-shadow(0 0 30px rgba(255, 203, 14, 0.6))",
                }}
              >
                WOW!
              </div>
            </div>
          )}

          <div onClick={(e) => e.stopPropagation()}>
            {!showCoupon ? (
              <div
                style={{
                  position: "relative",
                  animation: "float 2s ease-in-out infinite",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "200px",
                    height: "200px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "200px",
                      height: "60px",
                      background: "linear-gradient(135deg, #2E477D, #184274)",
                      borderRadius: "12px 12px 0 0",
                      transformOrigin: "bottom",
                      animation: giftOpened
                        ? "giftLidOpen 0.6s ease forwards"
                        : "none",
                      boxShadow: "0 4px 20px rgba(46, 71, 125, 0.5)",
                      zIndex: 2,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "30px",
                        height: "100%",
                        background: "#ffcb0e",
                        boxShadow: "0 2px 10px rgba(255, 203, 14, 0.4)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "-15px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "50px",
                        height: "30px",
                        background: "#ffcb0e",
                        borderRadius: "50%",
                        boxShadow: "0 4px 15px rgba(255, 203, 14, 0.6)",
                      }}
                    />
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      top: "60px",
                      left: 0,
                      width: "200px",
                      height: "140px",
                      background: "linear-gradient(135deg, #DC143C, #B91C1C)",
                      borderRadius: "0 0 12px 12px",
                      boxShadow: "0 8px 30px rgba(220, 20, 60, 0.5)",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "30px",
                        height: "100%",
                        background: "#ffcb0e",
                        boxShadow: "0 2px 10px rgba(255, 203, 14, 0.4)",
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  position: "relative",
                  width: "min(500px, 90vw)",
                  animation: "couponPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                <button
                  onClick={() => {
                    setGiftOpened(false);
                    setShowCoupon(false);
                    setShowGraffiti(false);
                  }}
                  style={{
                    position: "absolute",
                    top: "-15px",
                    right: "-15px",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "#DC143C",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 15px rgba(220, 20, 60, 0.5)",
                    zIndex: 10,
                  }}
                >
                  <X size={20} color="#ffffff" />
                </button>

                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #2E477D 0%, #184274 100%)",
                    borderRadius: "24px",
                    padding: "clamp(24px, 5vw, 48px)",
                    border: "3px solid #ffcb0e",
                    boxShadow:
                      "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 8px rgba(255, 203, 14, 0.1)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Coupon Decoration */}
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      width: "40px",
                      height: "40px",
                      borderTop: "4px solid #ffcb0e",
                      borderLeft: "4px solid #ffcb0e",
                      borderRadius: "8px 0 0 0",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      width: "40px",
                      height: "40px",
                      borderTop: "4px solid #ffcb0e",
                      borderRight: "4px solid #ffcb0e",
                      borderRadius: "0 8px 0 0",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      left: "12px",
                      width: "40px",
                      height: "40px",
                      borderBottom: "4px solid #ffcb0e",
                      borderLeft: "4px solid #ffcb0e",
                      borderRadius: "0 0 0 8px",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      right: "12px",
                      width: "40px",
                      height: "40px",
                      borderBottom: "4px solid #ffcb0e",
                      borderRight: "4px solid #ffcb0e",
                      borderRadius: "0 0 8px 0",
                    }}
                  />

                  <div style={{ textAlign: "center", position: "relative" }}>
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        background: "linear-gradient(135deg, #ffcb0e, #ffa500)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 24px",
                        boxShadow: "0 8px 30px rgba(255, 203, 14, 0.5)",
                      }}
                    >
                      <Gift size={40} color="#2E477D" strokeWidth={2.5} />
                    </div>

                    <h2
                      style={{
                        fontSize: "clamp(24px, 5vw, 36px)",
                        fontWeight: "800",
                        color: "#ffcb0e",
                        marginBottom: "16px",
                        textShadow: "0 2px 10px rgba(255, 203, 14, 0.3)",
                      }}
                    >
                      CHRISTMAS SPECIAL
                    </h2>

                    <div
                      style={{
                        background: "rgba(255, 203, 14, 0.1)",
                        border: "2px dashed #ffcb0e",
                        borderRadius: "16px",
                        padding: "20px",
                        marginBottom: "24px",
                      }}
                    >
                      <div
                        className="shine-text"
                        style={{
                          fontSize: "clamp(40px, 8vw, 64px)",
                          fontWeight: "900",
                          lineHeight: "1",
                          marginBottom: "8px",
                          textTransform: "uppercase",
                          letterSpacing: "3px",
                        }}
                      >
                        30% OFF
                      </div>
                      <div
                        style={{
                          fontSize: "clamp(16px, 3vw, 20px)",
                          color: "#ffcb0e",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          letterSpacing: "2px",
                        }}
                      >
                        Training & Placement Program
                      </div>
                    </div>

                    <div
                      style={{
                        background:
                          "linear-gradient(90deg, #ffcb0e, #ffa500, #ffcb0e)",
                        backgroundSize: "200% auto",
                        animation: "shimmer 3s linear infinite",
                        padding: "12px 24px",
                        borderRadius: "12px",
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#2E477D",
                        marginBottom: "16px",
                        letterSpacing: "2px",
                      }}
                    >
                      CODE: XMAS2025
                    </div>

                    <p
                      style={{
                        fontSize: "14px",
                        color: "rgba(255, 255, 255, 0.7)",
                        margin: 0,
                      }}
                    >
                      Share this code with HR to claim your offer🎄
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section
        style={{
          background:
            "linear-gradient(135deg, rgba(46, 71, 125, 0.3) 0%, rgba(24, 66, 116, 0.3) 100%)",
          padding: "clamp(40px, 8vw, 80px) 24px clamp(60px, 10vw, 100px)",
          textAlign: "center",
          color: "#fff",
          position: "relative",
          borderBottom: "1px solid rgba(255, 203, 14, 0.2)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          {/* Limited Time Offer Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background:
                "linear-gradient(135deg, rgba(46, 71, 125, 0.4), rgba(255, 203, 14, 0.2))",
              backdropFilter: "blur(10px)",
              padding: "10px 24px",
              borderRadius: "100px",
              fontSize: "13px",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              border: "1px solid rgba(255, 203, 14, 0.3)",
            }}
          >
            <Sparkles size={16} color="#ffcb0e" />
            <span style={{ color: "#ffcb0e" }}>Limited Time Offer</span>
          </div>

          {/* Countdown Timer */}
          <div
            className="countdown-wrapper"
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {[
              { label: "Days", value: timeLeft.d },
              { label: "Hours", value: timeLeft.h },
              { label: "Minutes", value: timeLeft.m },
              { label: "Seconds", value: timeLeft.s },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="countdown-box glass-card"
                style={{
                  padding: "24px 28px",
                  borderRadius: "20px",
                  minWidth: "100px",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div
                  style={{
                    fontSize: "40px",
                    fontWeight: "800",
                    background: "linear-gradient(135deg, #ffcb0e, #ffa500)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: "1",
                    marginBottom: "8px",
                  }}
                >
                  {String(value).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "rgba(255, 203, 14, 0.8)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>

          <h1
            style={{
              fontSize: "clamp(36px, 7vw, 72px)",
              fontWeight: "800",
              margin: "0 0 20px",
              lineHeight: "1.1",
              letterSpacing: "-2px",
            }}
          >
            Unlock{" "}
            <span
              className="shine-text"
              style={{
                fontWeight: "900",
                letterSpacing: "3px",
              }}
            >
              30% OFF
            </span>
            <br />
            <span
              style={{
                fontSize: "clamp(20px, 4vw, 36px)",
                fontWeight: "600",
                opacity: 0.95,
                color: "#ffffff",
              }}
            ></span>
          </h1>

          <p
            style={{
              fontSize: "clamp(14px, 3vw, 18px)",
              maxWidth: "650px",
              margin: "0 auto 48px",
              opacity: 0.85,
              lineHeight: "1.7",
              fontWeight: "400",
              padding: "0 16px",
            }}
          >
            Transform your career with industry-leading training. Build real
            projects, master cutting-edge skills, and secure your dream job.
          </p>

          <div
            className="gift-box"
            onClick={handleGiftClick}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "32px",
              position: "relative",
            }}
          >
            <svg
              width="160"
              height="160"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                filter: "drop-shadow(0 14px 35px rgba(0,0,0,0.45))",
                animation: "float 2.8s ease-in-out infinite",
              }}
            >
              {/* BOX BASE */}
              <rect
                x="64"
                y="200"
                width="384"
                height="248"
                rx="20"
                fill="#EB2335"
              />
              <rect
                x="64"
                y="200"
                width="384"
                height="248"
                rx="20"
                fill="#ED3949"
                opacity="0.6"
              />

              {/* LID */}
              <rect
                x="48"
                y="140"
                width="416"
                height="72"
                rx="18"
                fill="#C81D2A"
              />

              {/* VERTICAL RIBBON */}
              <rect x="236" y="140" width="40" height="308" fill="#FFC943" />

              {/* HORIZONTAL RIBBON */}
              <rect x="48" y="172" width="416" height="36" fill="#FFC943" />

              {/* BOW LEFT */}
              <path
                d="M256 120
          C200 60, 120 90, 160 140
           C190 165, 230 160, 256 140Z"
                fill="#FFD966"
              />

              {/* BOW RIGHT */}
              <path
                d="M256 120
          C312 60, 392 90, 352 140
          C322 165, 282 160, 256 140Z"
                fill="#FFD966"
              />

              {/* BOW KNOT */}
              <circle cx="256" cy="140" r="14" fill="#FFB703" />
            </svg>
            <p
              style={{
                marginTop: "16px",
                fontSize: "14px",
                color: "#ffcb0e",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "1px",
                textAlign: "center",
              }}
            >
              🎁 Click to reveal your offer
            </p>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          height: "1px",
          margin: "48px auto 24px",
          background:
            "linear-gradient(90deg, transparent, rgba(255,203,14,0.6), transparent)",
        }}
      />

      <main
        style={{
          maxWidth: "760px",
          margin: "clamp(-30px, -5vw, -50px) auto 0",
          padding: "0 24px clamp(40px, 8vw, 80px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Premium Training Programs */}
        <section style={{ marginBottom: "48px" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "clamp(24px, 5vw, 32px)",
              fontWeight: "800",
              color: "#ffffff",
              marginTop: "32px",
              marginBottom: "32px",
              letterSpacing: "-0.5px",
            }}
          >
            Premium Training Programs
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {[
              {
                title: "Java Full Stack",
                subtitle: "End-to-End Application Development",
                Icon: Code,
                color: "#ffcb0e",
              },
              {
                title: "HR Analytics",
                subtitle: "Analytics for Modern HR Teams",
                Icon: Users,
                color: "#4ade80",
              },
              {
                title: "Zoho Payroll",
                subtitle: "Salary • Compliance • Reporting",
                Icon: Briefcase,
                color: "#60a5fa",
              },
              {
                title: "Data Analytics",
                subtitle: "From Raw Data to Insights",
                Icon: BarChart3,
                color: "#f97316",
              },
            ].map(({ title, subtitle, Icon, color }) => (
              <div
                key={title}
                className="glass-card"
                style={{
                  borderRadius: "20px",
                  padding: "28px 22px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  boxShadow: "0 14px 40px rgba(0,0,0,0.35)",
                  transition: "transform 0.3s ease",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "18px",
                    background: `${color}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                    boxShadow: `0 8px 24px ${color}55`,
                  }}
                >
                  <Icon size={36} color={color} strokeWidth={2.2} />
                </div>

                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "800",
                    color: "#ffffff",
                    marginBottom: "6px",
                  }}
                >
                  {title}
                </h3>

                <p
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.75)",
                    marginBottom: "20px",
                  }}
                >
                  {subtitle}
                </p>

                {/* CTA */}
                <button
                  onClick={scrollToForm}
                  style={{
                    marginTop: "auto",
                    background: "linear-gradient(90deg, #ffcb0e, #ffa500)",
                    color: "#2E477D",
                    fontWeight: "800",
                    fontSize: "14px",
                    padding: "12px 18px",
                    borderRadius: "14px",
                    border: "none",
                    cursor: "pointer",
                    letterSpacing: "1px",
                    boxShadow: "0 6px 20px rgba(255,203,14,0.35)",
                  }}
                >
                  Claim 30% OFF
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* HubSpot Form Render */}
        <div
          className="hs-form-frame"
          data-region="na2"
          data-form-id="51a399dd-a778-4d28-b742-8476032c7d63"
          data-portal-id="243742367"
          style={{ minHeight: "400px" }}
        ></div>

        {/* Why CareerSchool */}
        <div
          className="glass-card"
          style={{
            borderRadius: "clamp(20px, 4vw, 32px)",
            padding: "clamp(20px, 4vw, 36px)",
            marginTop: "64px",
            marginBottom: "32px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            animation: mounted ? "slideUp 0.8s ease-out 0.2s both" : "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                background: "linear-gradient(135deg, #ffcb0e, #ffa500)",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 24px rgba(255, 203, 14, 0.4)",
              }}
            >
              <Trophy size={28} color="#2E477D" />
            </div>
            <h3
              style={{
                fontSize: "clamp(22px, 4vw, 28px)",
                margin: 0,
                fontWeight: "700",
                color: "#ffffff",
                letterSpacing: "-0.5px",
              }}
            >
              Why CareerSchool
            </h3>
          </div>

          <div style={{ display: "grid", gap: "16px" }}>
            {[
              {
                Icon: GraduationCap,
                text: "Industry-aligned curriculum crafted by experts",
                color: "#ffffff",
              },
              {
                Icon: Briefcase,
                text: "Hands-On Projects with 1-to-1 Mentor Support",
                color: "#ffcb0e",
              },
              {
                Icon: Rocket,
                text: "Comprehensive placement & interview preparation",
                color: "#ffffff",
              },
              {
                Icon: Trophy,
                text: "Thousands started here — your turn now",
                color: "#ffa500",
              },
            ].map(({ Icon, text, color }) => (
              <div
                key={text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: "16px",
                  border: "1px solid rgba(255, 203, 14, 0.1)",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    background: `${color}20`,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={22} color={color} strokeWidth={2} />
                </div>

                <span
                  style={{
                    fontSize: "clamp(14px, 2.5vw, 16px)",
                    fontWeight: "500",
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: "1.5",
                  }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* ===============================
   FAQ QUESTIONS
================================ */}
        <div
          className="glass-card"
          style={{
            borderRadius: "clamp(20px, 4vw, 32px)",
            padding: "clamp(20px, 4vw, 36px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          }}
        >
          {/* Heading */}
          <h3
            style={{
              textAlign: "center",
              fontSize: "clamp(22px, 4vw, 28px)",
              fontWeight: "800",
              color: "#ffffff",
              marginBottom: "32px",
              letterSpacing: "-0.5px",
            }}
          >
            FAQ Questions
          </h3>

          {/* FAQ List */}
          <div style={{ display: "grid", gap: "16px" }}>
            {[
              {
                q: "Which courses are included in the 30% Christmas discount?",
                a: "The Christmas discount is applicable to premium career-focused programs, such as: Java Full Stack Development | Data Analytics | HR Analytics | Zoho Payroll",
              },
              {
                q: "Is the Christmas offer available for both online and offline training?",
                a: "Yes. The 30% Christmas offer is valid for: Offline training at Careerschool centers (Chennai & Nellore) | Live online classes accessible from anywhere in India. You can choose the learning mode that suits you best.",
              },
              {
                q: "Why should I choose Careerschool HR & IT Solutions for training and placement?",
                a: "Careerschool stands out for its industry-ready curriculum, live tools exposure, certified trainers, internships, and placement tie-ups across India.",
              },
              {
                q: "How long is the Christmas offer valid?",
                a: "The Christmas offer is a limited-time promotion and is valid only until the offer countdown ends or seats are filled. Early registration is recommended to secure the discounted fee.",
              },
              {
                q: "Is there any seat limit for the Christmas offer?",
                a: "Yes. The Christmas offer has limited seats per batch to ensure quality training and personalized mentorship. Seats are allocated on a first-come, first-served basis.",
              },
              {
                q: "How do I claim the 30% Christmas discount?",
                a: "To claim the Christmas offer: 1.Click on “Claim 30% OFF | 2.Fill out the enquiry form with correct details | 3.Our team will contact you to confirm eligibility | 4.Use the Christmas offer code during enrollment",
              },
            ].map((faq, i) => (
              <div
                key={i}
                style={{
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,203,14,0.15)",
                  overflow: "hidden",
                }}
              >
                {/* Question */}
                <button
                  onClick={() => toggleFaq(i)}
                  style={{
                    width: "100%",
                    padding: "18px 20px",
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    color: "#ffffff",
                    fontSize: "clamp(14px, 2.5vw, 16px)",
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  {faq.q}
                  <span
                    style={{
                      fontSize: "22px",
                      color: "#ffcb0e",
                      fontWeight: "800",
                    }}
                  >
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>

                {/* Answer */}
                {openFaq === i && (
                  <div
                    style={{
                      padding: "16px 20px 20px",
                      fontSize: "clamp(13px, 2.5vw, 15px)",
                      lineHeight: "1.6",
                      color: "rgba(255,255,255,0.85)",
                      borderTop: "1px solid rgba(255,203,14,0.1)",
                      background: "rgba(0,0,0,0.15)",
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
