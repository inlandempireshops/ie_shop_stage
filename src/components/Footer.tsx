import logo from '~/public/images/white-ie-logo.png';
import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from 'react-icons/fa';


export default function Footer(): React.JSX.Element { 
  return(
    <footer>
      <div id="footer-wrapper" className="wrapper">
        <p>© 2026 IE Shop.</p>

        <Link href="/">
          <Image 
            src={logo} 
            alt="IE Shop Logo" 
            className="footer-logo-image"
            width="200"
            height="200"
          />
        </Link>

        <div className="social-media-container">
          <a href="https://www.instagram.com/theie.shop" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-media-icon" />
          </a>
        </div>
      </div>
    </footer>
  )
}