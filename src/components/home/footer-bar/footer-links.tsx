import Link from "next/link";

export function FooterLinks() {
  return (
    <div className="flex gap-4">
      {footerLinks?.map(({ title, link }) => (
        <Link
          className="text-muted leading-loose text-sm"
          key={`footer_link_${title}`}
          href={link}
        >
          {title}
        </Link>
      ))}
    </div>
  );
}

const footerLinks = [
  { title: "Privacy Policy", link: "/privacy-policy" },
  { title: "Terms of Use", link: "/terms-of-use" },
];
