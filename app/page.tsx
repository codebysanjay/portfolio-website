import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <About />
      <Projects />
      <Blog />
      <section id="contact" className="py-20 bg-background/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>
            <p className="text-lg text-center text-muted-foreground mb-12">
              Have a project in mind or want to collaborate? Feel free to reach out!
            </p>
            <Contact />
          </div>
        </div>
      </section>
    </main>
  );
} 