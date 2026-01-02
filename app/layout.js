export const metadata = {
  title: 'Social Media Username Generator',
  description: 'Generate creative social media usernames from your name',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
