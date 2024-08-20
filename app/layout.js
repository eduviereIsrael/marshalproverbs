import { Inter } from "next/font/google";
import "./poemspage.styles.scss";
import "./haikupage.styles.scss";
import "./components.scss"
import "./verifypage.scss"
import "./dashboard.scss";
import "./globals.scss";
import { App, Footer } from "@/components";
import StoreProvider from "./StoreProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mawshal Proverbs",
  description: "Discover a collection of exquisite poems and stunning wallpapers featuring poetic verses. Perfect for adding a touch of inspiration and beauty to your home or office. Shop now at Poetic Prints!",
  icons: {
    icon: "logo-white.png",
  },
};

export default function RootLayout({ children }) {


  return (
    <html lang="en">
   { true?  <body className={inter.className}>
        <StoreProvider>
            <div className="app" >
              <App>

                {children}
              </App>
              {/* <PaymentOverlay /> */}
            </div>
        </StoreProvider>
        <Footer />
      </body> : 
      <body style={{display: "flex", justifyContent: "center", alignItems: "center"}} >
        <h1>UNDER CONSTRUCTION</h1>
      </body>
      }

    </html>
  );
}
