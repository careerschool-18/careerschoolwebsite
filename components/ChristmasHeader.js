// components/FullImage.jsx
"use client";

export default function FullImage({
  heroSrc = "/Zoho images/careerschool-zoho-main.png",
  zohoLogo = "/Zoho images/ZOHO LOGO - Zoho Card.png",
  payrollLogo = "/Zoho images/Zoho Payroll Logo - Zoho Card.png",
  cshrLogo = "/Zoho images/CSHR LOGO White - Zoho Card.png",
}) {
  return (
    <section className="w-full bg-white pt-0 pb-8">
      {/* HERO WRAPPER */}
      <div className="w-full">
        <div className="relative w-full">
          {/* HERO IMAGE */}
          <img
            src={heroSrc}
            alt="Careerschool and Zoho team announcing the training partnership"
            className="w-full h-[70vh] sm:h-screen object-cover block"
            loading="eager"
          />

          {/* OVERLAY */}
          <div
            className="absolute inset-0 flex items-end p-4 sm:p-12"
            style={{
              background:
                "linear-gradient(180deg, rgba(2,6,23,0.0) 0%, rgba(2,6,23,0.35) 60%, rgba(2,6,23,0.55) 100%)",
            }}
          >
            <div
              className="flex flex-col gap-3 w-full sm:max-w-[520px]"
              style={{
                padding: "12px 16px",
                background: "rgba(8,12,20,0.36)",
                backdropFilter: "blur(6px)",
                borderRadius: "14px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {/* BADGE */}
              <div
                className="self-start px-3 py-1 rounded-full text-[12px] sm:text-[14px] font-semibold uppercase tracking-widest"
                style={{
                  background: "rgba(234,179,8,0.12)",
                  border: "1px solid rgba(250,204,21,0.6)",
                  color: "#ffd86b",
                }}
              >
                Official Zoho Authorized Training Partner
              </div>

              {/* LOGOS */}
              <div className="flex flex-wrap items-center gap-3">
                <img src={zohoLogo} className="h-8 sm:h-10 object-contain" />
                <img src={payrollLogo} className="h-8 sm:h-10 object-contain" />
                <span className="hidden sm:block w-px h-8 bg-white/10" />
                <img src={cshrLogo} className="h-10 sm:h-12 object-contain" />
              </div>

              {/* TAGLINE */}
              <p className="text-[14px] sm:text-[16px] leading-snug text-slate-200">
                A FOCUSED PARTNERSHIP TO BUILD JOB-READY TALENTS.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================================
          TWO-COLUMN SECTION
      ================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 w-full max-w-[1120px] mx-auto mt-6 gap-4 px-4">
        {/* LEFT IMAGE */}
        <div
          className="relative bg-[#0b1120] rounded-2xl sm:rounded-[35px] overflow-hidden"
          style={{
            border: "1px solid rgba(15,23,42,0.65)",
            boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
          }}
        >
          <img
            src="/Zoho images/careerschool-zoho-training.png"
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT VIDEO */}
        <div
          className="relative bg-[#0b1120] rounded-2xl sm:rounded-[20px] overflow-hidden"
          style={{
            border: "1px solid rgba(15,23,42,0.65)",
            boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
          }}
        >
          <div className="aspect-video w-full">
            <iframe
              src="https://www.youtube.com/embed/Sbd5RsKO6_Y?autoplay=1&mute=1&rel=0&playsinline=1"
              title="Zoho Collaboration Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
