import "./main.scss";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SkipLink from "@/components/SkipLink";

export const metadata = {
  title: "IDS Datasets Page",
  description: "Explore a dataset from the data catalogue",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NEXT_MANUAL_SIG_HANDLE) {
    process.on("SIGTERM", () => {
      console.log("Received SIGTERM: cleaning up");
      process.exit(0);
    });

    process.on("SIGINT", () => {
      console.log("Received SIGINT: cleaning up");
      process.exit(0);
    });
  }
  return (
    <html lang="en" className="govuk-template">
      <body className="govuk-template__body">
        <SkipLink />
        <Header borderColour="blue-border" />
        {children}
        <Footer />
      </body>
    </html>
  );
}
