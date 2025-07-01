import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function NavigationMenu() {
  return (
    <nav className="navigation-menu">
      <div className="navigation-menu__content">
        <Link href="/" className="navigation-menu__item">
          <HomeIcon /> Home
        </Link>
        <Link href="/contribute" className="navigation-menu__item">
          <AddCircleIcon/> Contribute
        </Link>
        <Link href="/about" className="navigation-menu__item">
          <InfoIcon /> About
        </Link>
      </div>
    </nav>
  );
}
