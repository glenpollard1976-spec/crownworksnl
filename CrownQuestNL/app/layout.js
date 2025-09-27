
export const metadata = {
  title: "CrownQuestNL — Crown Land & Business Services",
  description: "Simplifying Crown Land and powering local business in Newfoundland & Labrador.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
