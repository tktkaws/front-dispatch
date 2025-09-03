type TocItem = {
  id: string;
  text: string;
};

type Props = {
  title: string;
  toc: TocItem[];
};

export default function TocNav({ title, toc }: Props) {
  return (
    <nav className="py-4">
      <h2 className="font-mono text-sm border-b mb-3">/ Contents</h2>
      <a href="#" className="hidden md:block text-sm mb-2 hover:underline">
        {title}
      </a>
      <ul className="space-y-2 text-sm">
        {toc.map((item) => (
          <li key={item.id} className="before:content-['-'] before:mr-2">
            <a href={`#${item.id}`} className="hover:underline">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}