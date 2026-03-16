export const metadata = {
  title: "Gateway Impact Lab — AI Service-Learning Matching",
  description: "AI-powered matching between students and community partners in Ho Chi Minh City. Built on deeper learning principles.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#0D1117" }}>{children}</body>
    </html>
  );
}
