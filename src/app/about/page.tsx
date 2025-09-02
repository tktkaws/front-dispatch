// app/about/page.tsx
import Header from "@/components/Header";
import Aside from "@/components/Aside";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <Aside />
      <main className="max-w-full mx-auto md:grid md:grid-cols-[240px_1fr] xl:grid-cols-[320px_1fr] gap-8 px-4 md:px-8 mt-8 md:mt-[182px] min-h-[calc(100svh-216px-120px-32px)]">
        <div className="md:col-span-1 relative w-full">
          

          <div className="md:sticky md:top-[182px]">
            <h3 className="font-mono text-sm border-b border-[var(--foreground)]">/ Info</h3>
          <div className="space-y-3 h-[8rem]">
            <dl className="pt-4 grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-sm">
              <dt className="font-semibold">Name</dt>
              <dd className="">Your Name</dd>

              <dt className="font-semibold">Contact</dt>
              <dd className="">your.email@example.com</dd>
            </dl>
          </div>
            <nav className="mb-8 py-4">
              <h2 className="font-mono text-sm border-b border-[var(--foreground)] mb-3">/ Contents</h2>
              <a href="#about" className="mb-2 block hover:underline">
                About
              </a>
              <ul className="space-y-2">
                <li className="before:content-['-'] before:mr-2">
                  <a href="#profile" className="">
                    Profile
                  </a>
                </li>
                <li className="before:content-['-'] before:mr-2">
                  <a href="#skills" className="">
                    Skills
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="md:col-span-1 w-full">
          <article>
            <p className="font-mono text-sm border-b border-[var(--foreground)]">/ Title</p>
            <h1
              id="about"
              className="col-span-4 text-2xl font-bold h-[8rem] grid justify-start items-center md:max-w-[calc(100vw-240px-96px)] xl:max-w-[1000px]"
            >
              About
            </h1>
            <div className="mb-8 py-4">
              <h2 className="font-mono text-sm border-b border-[var(--foreground)]">/ Article</h2>
              <div className="prose pt-8 article-content md:max-w-[calc(100vw-240px-96px)] xl:max-w-[1000px]">
                <h2 id="profile">Profile</h2>
                <p>ここに自己紹介文を記述します。</p>
                <h2 id="skills">Skills</h2>
                <p>ここにスキルセットを記述します。</p>
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
