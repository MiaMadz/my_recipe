import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from './Components/Providers'
import NavBar from './Components/NavBar'

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                  <NavBar />
                  {children}
                </Providers>
            </body>
        </html>
    )
}
