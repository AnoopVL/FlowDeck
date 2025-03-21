import Link from "next/link";
import {
  ArrowRight,
  Layers,
  Zap,
  Share2,
  PenTool,
  Palette,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-primary">
                Flow<span className="text-chart-1">Deck</span>
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="#features"
                className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-muted-foreground hover:text-foreground transition-colors">
                How it works
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50 transition-colors">
                Log in
              </button>
              <button className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Create beautiful diagrams with{" "}
                <span className="text-chart-1">FlowDeck</span>
              </h1>
              <p className="mt-6 text-xl text-muted-foreground">
                The modern diagramming tool for teams. Visualize your ideas,
                workflows, and systems with ease.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 text-base font-medium bg-black text-white rounded-md hover:bg-gray-800 transition-colors inline-flex items-center gap-2">
                  Get started <ArrowRight className="h-4 w-4" />
                </button>
                <button className="px-6 py-3 text-base font-medium border rounded-md hover:bg-gray-50 transition-colors">
                  View examples
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-chart-1/10 to-chart-2/10 rounded-lg shadow-lg overflow-hidden border">
                <img
                  src="https://images.unsplash.com/photo-1611224885990-ab7363d7f2a9?q=80&w=2069&auto=format&fit=crop"
                  alt="FlowDeck Interface"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-background p-4 rounded-lg shadow-lg border">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-chart-1"></div>
                  <div className="h-3 w-3 rounded-full bg-chart-2"></div>
                  <div className="h-3 w-3 rounded-full bg-chart-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">
              Powerful features for your workflow
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              FlowDeck combines simplicity with powerful features to help you
              create stunning diagrams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <div className="h-12 w-12 bg-chart-1/10 rounded-lg flex items-center justify-center mb-4">
                <PenTool className="h-6 w-6 text-chart-1" />
              </div>
              <h3 className="text-xl font-semibold">Intuitive Drawing</h3>
              <p className="mt-2 text-muted-foreground">
                Create diagrams with our easy-to-use drawing tools. No design
                experience required.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <div className="h-12 w-12 bg-chart-2/10 rounded-lg flex items-center justify-center mb-4">
                <Layers className="h-6 w-6 text-chart-2" />
              </div>
              <h3 className="text-xl font-semibold">Smart Components</h3>
              <p className="mt-2 text-muted-foreground">
                Use our library of pre-built components to quickly create
                professional diagrams.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <div className="h-12 w-12 bg-chart-3/10 rounded-lg flex items-center justify-center mb-4">
                <Share2 className="h-6 w-6 text-chart-3" />
              </div>
              <h3 className="text-xl font-semibold">Real-time Collaboration</h3>
              <p className="mt-2 text-muted-foreground">
                Work together with your team in real-time, no matter where they
                are.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <div className="h-12 w-12 bg-chart-4/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-chart-4" />
              </div>
              <h3 className="text-xl font-semibold">Lightning Fast</h3>
              <p className="mt-2 text-muted-foreground">
                Experience smooth performance even with complex diagrams and
                large canvases.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <div className="h-12 w-12 bg-chart-5/10 rounded-lg flex items-center justify-center mb-4">
                <Palette className="h-6 w-6 text-chart-5" />
              </div>
              <h3 className="text-xl font-semibold">Customizable Styles</h3>
              <p className="mt-2 text-muted-foreground">
                Personalize your diagrams with custom colors, fonts, and styles.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <div className="h-12 w-12 bg-chart-1/10 rounded-lg flex items-center justify-center mb-4">
                <ArrowRight className="h-6 w-6 text-chart-1" />
              </div>
              <h3 className="text-xl font-semibold">Export & Share</h3>
              <p className="mt-2 text-muted-foreground">
                Export your diagrams in multiple formats or share them with a
                simple link.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">How FlowDeck works</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes and create beautiful diagrams with ease.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="h-16 w-16 bg-chart-1/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-chart-1">1</span>
              </div>
              <h3 className="text-xl font-semibold">Sign up for free</h3>
              <p className="mt-2 text-muted-foreground">
                Create an account in seconds and get started with FlowDeck.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="h-16 w-16 bg-chart-2/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-chart-2">2</span>
              </div>
              <h3 className="text-xl font-semibold">
                Create your first diagram
              </h3>
              <p className="mt-2 text-muted-foreground">
                Use our intuitive tools to start creating your diagram right
                away.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="h-16 w-16 bg-chart-3/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-chart-3">3</span>
              </div>
              <h3 className="text-xl font-semibold">Share with your team</h3>
              <p className="mt-2 text-muted-foreground">
                Collaborate with your team and share your diagrams with the
                world.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <button className="px-6 py-3 text-base font-medium bg-black text-white rounded-md hover:bg-gray-800 transition-colors inline-flex items-center gap-2">
              Get started for free <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-chart-1/20 to-chart-2/20 rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold">Ready to get started?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join thousands of teams who use FlowDeck to visualize their
                ideas and workflows.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 text-base font-medium bg-black text-white rounded-md hover:bg-gray-800 transition-colors inline-flex items-center gap-2">
                  Get started for free <ArrowRight className="h-4 w-4" />
                </button>
                <button className="px-6 py-3 text-base font-medium border rounded-md hover:bg-gray-50 transition-colors">
                  Schedule a demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-12 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors">
                    Security
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div> */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center">
                <span className="text-xl font-bold text-primary">
                  Flow<span className="text-chart-1">Deck</span>
                </span>
              </div>
              <p className="mt-4 md:mt-0 text-sm text-muted-foreground">
                © {new Date().getFullYear()} FlowDeck. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// import { Button } from "@repo/ui/button";
// import { Card } from "@repo/ui/card";
// import {
//   Pencil,
//   Share2,
//   Users2,
//   Sparkles,
//   Github,
//   Download,
// } from "lucide-react";
// import Link from "next/link";

// function App() {
//   return (
//     <div className="min-h-screen bg-background">
//       {/* Hero Section */}
//       <header className="relative overflow-hidden">
//         <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
//               Collaborative Whiteboarding
//               <span className="text-primary block">Made Simple</span>
//             </h1>
//             <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
//               Create, collaborate, and share beautiful diagrams and sketches
//               with our intuitive drawing tool. No sign-up required.
//             </p>
//             <div className="mt-10 flex items-center justify-center gap-x-6">
//               <Link href={"/signin"}>
//                 <Button variant={"primary"} size="lg" className="h-12 px-6">
//                   Sign in
//                   <Pencil className="ml-2 h-4 w-4" />
//                 </Button>
//               </Link>
//               <Link href="/signup">
//                 <Button variant="outline" size="lg" className="h-12 px-6">
//                   Sign up
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Features Section */}
//       <section className="py-24 bg-muted/50">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
//             <Card className="p-6 border-2 hover:border-primary transition-colors">
//               <div className="flex items-center gap-4">
//                 <div className="p-2 rounded-lg bg-primary/10">
//                   <Share2 className="h-6 w-6 text-primary" />
//                 </div>
//                 <h3 className="text-xl font-semibold">
//                   Real-time Collaboration
//                 </h3>
//               </div>
//               <p className="mt-4 text-muted-foreground">
//                 Work together with your team in real-time. Share your drawings
//                 instantly with a simple link.
//               </p>
//             </Card>

//             <Card className="p-6 border-2 hover:border-primary transition-colors">
//               <div className="flex items-center gap-4">
//                 <div className="p-2 rounded-lg bg-primary/10">
//                   <Users2 className="h-6 w-6 text-primary" />
//                 </div>
//                 <h3 className="text-xl font-semibold">Multiplayer Editing</h3>
//               </div>
//               <p className="mt-4 text-muted-foreground">
//                 Multiple users can edit the same canvas simultaneously. See
//                 who's drawing what in real-time.
//               </p>
//             </Card>

//             <Card className="p-6 border-2 hover:border-primary transition-colors">
//               <div className="flex items-center gap-4">
//                 <div className="p-2 rounded-lg bg-primary/10">
//                   <Sparkles className="h-6 w-6 text-primary" />
//                 </div>
//                 <h3 className="text-xl font-semibold">Smart Drawing</h3>
//               </div>
//               <p className="mt-4 text-muted-foreground">
//                 Intelligent shape recognition and drawing assistance helps you
//                 create perfect diagrams.
//               </p>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-24">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-primary rounded-3xl p-8 sm:p-16">
//             <div className="mx-auto max-w-2xl text-center">
//               <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
//                 Ready to start creating?
//               </h2>
//               <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/80">
//                 Join thousands of users who are already creating amazing
//                 diagrams and sketches.
//               </p>
//               <div className="mt-10 flex items-center justify-center gap-x-6">
//                 <Button size="lg" variant="secondary" className="h-12 px-6">
//                   Open Canvas
//                   <Pencil className="ml-2 h-4 w-4" />
//                 </Button>
//                 <Button
//                   variant="outline"
//                   size="lg"
//                   className="h-12 px-6 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
//                   View Gallery
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="border-t">
//         <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
//           <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
//             <p className="text-sm text-muted-foreground">
//               © 2024 Excalidraw Clone. All rights reserved.
//             </p>
//             <div className="flex space-x-6">
//               <a
//                 href="https://github.com"
//                 className="text-muted-foreground hover:text-primary">
//                 <Github className="h-5 w-5" />
//               </a>
//               <a href="#" className="text-muted-foreground hover:text-primary">
//                 <Download className="h-5 w-5" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default App;
