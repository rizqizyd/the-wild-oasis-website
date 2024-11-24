import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  // whenever we do this in component, it will make the entire route dynamic
  // because this authentication works with cookies and headers
  // reading cookies actually switches the route to dynamic rendering
  const session = await auth();
  // console.log(session);

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <img
                src={session.user.image}
                className="h-8 rounded-full"
                alt={session.user.name}
                referrerPolicy="no-referrer" // sometimes neccessary to correctly display the image coming from google
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
