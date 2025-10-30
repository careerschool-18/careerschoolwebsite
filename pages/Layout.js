// app/layout.js
export const metadata = {
  title: "Careerschool HR & IT Solutions | Best Training, Internship & Placement in Chennai & Nellore",
  description:
    "India’s #1 Training & Placement Institute for Python, Full Stack Development, Java, Web Development, Digital Marketing, Data Analytics, HR and more. Learn, Intern & Get Placed with Careerschool!",
  keywords:
    "careerschool, career school, careerschool hr solutions, careerschool it solutions, python full stack training, java full stack training, data analytics training, data analysis course, digital marketing training, ai and machine learning course, power bi training, sql training, excel course, finance internship, internship in chennai, internship in nellore, training institute in chennai, training institute in nellore, software training, web development course, full stack course, placement support, job oriented training, college placement training, campus drive, career guidance, online training, offline training, certification course, professional courses, mba student training, engineering student training, arts student training, job seekers course, fresher training, career school chennai, career school nellore",
  robots: "index, follow",
  authors: [{ name: "Careerschool HR & IT Solutions" }],
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* 👇 Custom meta tags */}
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
      </head>
      <body>{children}</body>
    </html>
  );
}
