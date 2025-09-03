import Link from "next/link";
import type { Tag } from "@/types/content";

type Props = {
  date: string;
  tags?: Tag[];
};

export default function BlogInfo({ date, tags }: Props) {
  return (
    <div className="mb-4 md:mb-0">
      <h2 className="font-mono text-sm border-b">/ Info</h2>
      <div className="space-y-3 md:h-[8rem]">
        <dl className="pt-4 grid grid-cols-[25%_1fr] gap-x-4 gap-y-2 font-mono text-sm">
          <dt className="">Date</dt>
          <dd className="">{date}</dd>

          <dt className="">Tags</dt>
          <dd className="">
            {tags && tags.length > 0 && (
              <ul className="grid gap-2">
                {tags.map((tag) => (
                  <li key={tag.id} className="">
                    <Link
                      href={`/?tags=${tag.id}`}
                      scroll={false}
                      className="hover:underline"
                    >
                      {tag.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </dd>
        </dl>
      </div>
    </div>
  );
}

