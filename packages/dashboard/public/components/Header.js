import { useLocation } from 'preact-iso';
import Link from './Link';

const Header = () => {
  const { url } = useLocation();

  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/error">Error</Link>
      </nav>
      <label>
        URL:
        <input readonly value={url} ref={(c) => c && (c.size = c.value.length)} />
      </label>
    </header>
  );
};

export default Header;
