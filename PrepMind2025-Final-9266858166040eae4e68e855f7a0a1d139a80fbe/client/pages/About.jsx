import { Card, CardContent } from "@/components/ui/card";
import { Brain, Code, Shield, Users, Zap, Heart, Settings } from "lucide-react";
import Layout from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="min-h-screen bg-background text-foreground dark:bg-background dark:text-foreground py-12 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4">{/* Using theme colors */}
              <span className="text-foreground dark:text-foreground">About PrepMind</span>
            </h1>
            <p className="text-xl text-muted-foreground dark:text-muted-foreground max-w-3xl mx-auto">
              PrepMind is built to help students prepare for SAT, ACT, and AP
              exams with instant practice, clear explanations, and AI-powered
              tutoring—completely free.
            </p>
          </div>

          {/* Mission Statement */}
          <Card className="bg-card dark:bg-card shadow-card dark:shadow-md border border-border dark:border-border rounded-lg mb-12 transition-shadow duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-foreground dark:text-foreground">
                Our Mission
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground dark:text-muted-foreground">
                We believe that quality test preparation should be accessible to every student. 
                PrepMind harnesses the power of AI to provide personalized, effective, and 
                completely free test prep resources to help students achieve their academic goals.
              </p>
            </CardContent>
          </Card>

          {/* Features Grid - Flip Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* AI-Powered Learning */}
            <div className="flip-card">
              <div className="flip-content">
                <div className="flip-back">
                  <div className="flip-back-content">
                    <Brain className="w-12 h-12 text-emerald-400 mb-4" />
                    <strong>AI-Powered Learning</strong>
                  </div>
                </div>
                <div className="flip-front">
                  <div className="flip-front-content">
                    <h3 className="text-xl font-semibold mb-4 text-white">AI-Powered Learning</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Our advanced AI generates unlimited practice questions tailored to your needs,
                      with instant feedback and detailed explanations to accelerate your learning.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Comprehensive Coverage */}
            <div className="flip-card">
              <div className="flip-content">
                <div className="flip-back">
                  <div className="flip-back-content">
                    <Code className="w-12 h-12 text-emerald-400 mb-4" />
                    <strong>Comprehensive Coverage</strong>
                  </div>
                </div>
                <div className="flip-front">
                  <div className="flip-front-content">
                    <h3 className="text-xl font-semibold mb-4 text-white">Comprehensive Coverage</h3>
                    <p className="text-gray-300 leading-relaxed">
                      From SAT and ACT to 15+ AP subjects, PrepMind covers all major standardized tests
                      with authentic question styles and up-to-date content.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform & Security */}
            <div className="flip-card">
              <div className="flip-content">
                <div className="flip-back">
                  <div className="flip-back-content">
                    <Shield className="w-12 h-12 text-emerald-400 mb-4" />
                    <strong>Platform & Security</strong>
                  </div>
                </div>
                <div className="flip-front">
                  <div className="flip-front-content">
                    <h3 className="text-xl font-semibold mb-4 text-white">Platform & Security</h3>
                    <p className="text-gray-300 leading-relaxed">
                      The platform is hosted on secure cloud infrastructure with proper SSL certificates and is developed to ensure reliability and safety.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Student-Focused */}
            <div className="flip-card">
              <div className="flip-content">
                <div className="flip-back">
                  <div className="flip-back-content">
                    <Users className="w-12 h-12 text-emerald-400 mb-4" />
                    <strong>Student-Focused</strong>
                  </div>
                </div>
                <div className="flip-front">
                  <div className="flip-front-content">
                    <h3 className="text-xl font-semibold mb-4 text-white">Student-Focused</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Built by educators who understand the challenges students face, PrepMind adapts
                      to individual learning styles and provides personalized guidance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technology Section */}
          <Card className="bg-card dark:bg-card shadow-card dark:shadow-md border border-border dark:border-border rounded-lg mb-12 transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-foreground dark:text-foreground">
                  Powered by Advanced AI
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground dark:text-foreground">
                    Meta-Llama-3.1
                  </h3>
                  <p className="text-muted-foreground dark:text-muted-foreground">
                    Powered by state-of-the-art language models through Together AI API for intelligent question generation and explanations.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground dark:text-foreground">
                    Adaptive Learning
                  </h3>
                  <p className="text-muted-foreground dark:text-muted-foreground">
                    AI continuously learns from your responses to provide increasingly personalized practice sessions.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground dark:text-foreground">
                    Instant Feedback
                  </h3>
                  <p className="text-muted-foreground dark:text-muted-foreground">
                    Get immediate explanations and learn from mistakes with detailed step-by-step solutions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Specifications Section */}
          <Card className="bg-card dark:bg-card shadow-card dark:shadow-md border border-border dark:border-border rounded-lg mb-12 transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-foreground dark:text-foreground">
                  Technical Specifications
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-base">
                <div>
                  <h3 className="font-semibold text-xl mb-2 text-foreground dark:text-foreground">
                    Frontend Technology
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground dark:text-muted-foreground">
                    <li className="whitespace-nowrap">React.js for dynamic interface.</li>
                    <li className="whitespace-nowrap">Tailwind CSS for utility-first design.</li>
                    <li className="whitespace-nowrap">JavaScript (ES6+).</li>
                    <li className="whitespace-nowrap">Component-based architecture.</li>
                  </ul>
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="font-semibold text-xl mb-4 text-foreground dark:text-foreground text-center">
                    Code on GitHub
                  </h3>
                  <a
                    href="https://github.com/Jeetski2980/PrepMind-Ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                  >
                    <svg width="40" height="40" fill="#0092E4" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="github">
                      <path d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z"></path>
                    </svg>
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2 text-foreground dark:text-foreground">
                    Backend & AI
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground dark:text-muted-foreground">
                    <li className="whitespace-nowrap">Node.js backend infrastructure.</li>
                    <li className="whitespace-nowrap">RESTful API design.</li>
                    <li className="whitespace-nowrap">Together AI integration.</li>
                    <li className="whitespace-nowrap">Real-time response generation.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>


        </div>
      </div>
    </Layout>
  );
}
