import Hero from "./components/Hero";
import VideoSection from "./components/VideoSection";
import Features from "./components/Features";
import Partners from "./components/Partners/Partners";

export default function Home() {
    return (
        <main>
            <Hero />
            <VideoSection />
            <Features />
            <Partners />
        </main>
    );
}
