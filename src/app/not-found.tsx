import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-2xl font-bold font-redhat">404 Not Found</h1>
        <p>ページが見つかりませんでした</p>
      </main>
      <Footer />
    </>
  );
}