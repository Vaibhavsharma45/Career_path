/**
 * CareerPath AI — Intelligent Career Guidance & Skill Development Platform
 * Modern React 18 Application
 */

const { useState, useEffect, useMemo } = React;

// -----------------------------------------------------------------------------
// ICONS COMPONENT (Clean, Modular SVG Icons)
// -----------------------------------------------------------------------------
function Icon({ name, className = "w-4 h-4" }) {
  const iconPaths = {
    "compass": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
      </svg>
    ),
    "code": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    "brain": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z"/>
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z"/>
      </svg>
    ),
    "layout": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
      </svg>
    ),
    "cloud": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
      </svg>
    ),
    "shield": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    "briefcase": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    "cpu": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
        <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
        <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
        <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
        <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
      </svg>
    ),
    "layers": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
    "database": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    "sparkles": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M12 3l1.912 5.888L19.8 10.8l-5.888 1.912L12 18.6l-1.912-5.888L4.2 10.8l5.888-1.912L12 3z"/>
        <path d="M19 16l.8 2.4 2.4.8-2.4.8-.8 2.4-.8-2.4-2.4-.8 2.4-.8.8-2.4z"/>
      </svg>
    ),
    "user-check": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/>
      </svg>
    ),
    "git-merge": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/>
      </svg>
    ),
    "award": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
      </svg>
    ),
    "arrow-right": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
      </svg>
    ),
    "arrow-left": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
      </svg>
    ),
    "bar-chart-2": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    "sliders": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/>
        <line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/>
        <line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>
      </svg>
    ),
    "table": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
      </svg>
    ),
    "layout-grid": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    "check": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
    "alert-circle": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    "chevron-right": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    ),
    "x": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    ),
    "file-text": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    "refresh-cw": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
      </svg>
    ),
    "copy": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
      </svg>
    ),
    "layout-list": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
        <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
      </svg>
    ),
    "check-circle": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    "check-square": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
    "terminal": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
      </svg>
    ),
    "map": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
      </svg>
    ),
    "book-open": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    "target": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      </svg>
    ),
    "printer": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
      </svg>
    ),
    "shield-check": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    "grid": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    "bar-chart": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>
      </svg>
    ),
    "lightbulb": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5h6.18z"/>
      </svg>
    ),
    "plus": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    ),
    "external-link": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
      </svg>
    )
  };

  return iconPaths[name] || iconPaths["compass"];
}

// -----------------------------------------------------------------------------
// ERROR BOUNDARY
// -----------------------------------------------------------------------------
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl border border-red-200 p-8 max-w-md w-full shadow-lg text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Icon name="alert-circle" className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Application Error</h2>
            <p className="text-sm text-slate-600">
              {this.state.error?.message || "An unexpected error occurred while rendering this page."}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-6 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-brand-700 transition cursor-pointer"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// -----------------------------------------------------------------------------
// ASSESSMENT DATA CONFIGURATION
// -----------------------------------------------------------------------------
const ARCHETYPE_PRESETS = [
  {
    name: "Full-Stack Software Engineer",
    category: "Engineering",
    icon: "code",
    ratings: { math_interest: 4, programming_interest: 5, creativity_design_interest: 2, social_communication_interest: 2, data_analysis_interest: 3, problem_solving_interest: 5, leadership_management_interest: 2 },
    work_environment: "Collaborative Team",
    task_orientation: "Building & Construction",
    learning_style: "Project-Based",
    education_level: "Bachelor's Degree",
    experience_level: "Entry-Level / Student",
    declared_skills: ["Python", "JavaScript", "React", "REST APIs", "Git", "SQL"],
    primary_goal: "Building Scalable Software",
    text: "I enjoy building full-stack web applications, writing clean backend code in Python and Java, and designing RESTful APIs and database schemas."
  },
  {
    name: "AI & Data Science Specialist",
    category: "Data & AI",
    icon: "brain",
    ratings: { math_interest: 5, programming_interest: 4, creativity_design_interest: 2, social_communication_interest: 2, data_analysis_interest: 5, problem_solving_interest: 5, leadership_management_interest: 2 },
    work_environment: "Independent Deep Work",
    task_orientation: "Research & Analysis",
    learning_style: "Structured Curriculum",
    education_level: "Bachelor's Degree",
    experience_level: "Entry-Level / Student",
    declared_skills: ["Python", "Pandas", "Scikit-Learn", "SQL", "Statistics", "Git"],
    primary_goal: "AI & Predictive Systems",
    text: "Passionate about machine learning, statistical hypothesis testing, data wrangling with Pandas, and training predictive models and neural networks."
  },
  {
    name: "UI/UX Product Designer",
    category: "Design",
    icon: "layout",
    ratings: { math_interest: 2, programming_interest: 3, creativity_design_interest: 5, social_communication_interest: 4, data_analysis_interest: 2, problem_solving_interest: 3, leadership_management_interest: 3 },
    work_environment: "Collaborative Team",
    task_orientation: "Creative & Visual",
    learning_style: "Visual & Interactive",
    education_level: "Bachelor's Degree",
    experience_level: "Entry-Level / Student",
    declared_skills: ["Figma", "HTML/CSS", "Wireframing", "User Research", "Tailwind CSS"],
    primary_goal: "Modern UI/UX Interfaces",
    text: "I love user-centered design, interactive prototyping in Figma, typography, color palettes, and creating responsive web interfaces in React and CSS."
  },
  {
    name: "Cloud & DevOps Architect",
    category: "Infrastructure",
    icon: "cloud",
    ratings: { math_interest: 3, programming_interest: 4, creativity_design_interest: 2, social_communication_interest: 3, data_analysis_interest: 3, problem_solving_interest: 5, leadership_management_interest: 3 },
    work_environment: "Balanced Hybrid",
    task_orientation: "Building & Construction",
    learning_style: "Project-Based",
    education_level: "Bachelor's Degree",
    experience_level: "Transitioning / Intermediate",
    declared_skills: ["Docker", "Linux", "Git", "Bash", "Python", "AWS"],
    primary_goal: "Cloud & DevOps Infrastructure",
    text: "Passionate about cloud infrastructure on AWS, container orchestration with Kubernetes, Docker pipelines, Linux administration, and Terraform automation."
  },
  {
    name: "Cybersecurity Specialist",
    category: "Security",
    icon: "shield",
    ratings: { math_interest: 4, programming_interest: 4, creativity_design_interest: 2, social_communication_interest: 2, data_analysis_interest: 4, problem_solving_interest: 5, leadership_management_interest: 3 },
    work_environment: "Independent Deep Work",
    task_orientation: "Research & Analysis",
    learning_style: "Hands-on Labs",
    education_level: "Bachelor's Degree",
    experience_level: "Entry-Level / Student",
    declared_skills: ["Linux", "Wireshark", "Networking", "Python", "OWASP"],
    primary_goal: "Cyber Defense & Security",
    text: "Fascinated by defensive security, auditing vulnerabilities with OWASP guidelines, network packet analysis with Wireshark, and cryptography."
  },
  {
    name: "Product & Project Lead",
    category: "Management",
    icon: "briefcase",
    ratings: { math_interest: 2, programming_interest: 2, creativity_design_interest: 3, social_communication_interest: 5, data_analysis_interest: 3, problem_solving_interest: 4, leadership_management_interest: 5 },
    work_environment: "Collaborative Team",
    task_orientation: "Strategy & Coordination",
    learning_style: "Case Study / Practical",
    education_level: "Bachelor's Degree",
    experience_level: "Transitioning / Intermediate",
    declared_skills: ["Agile/Scrum", "Jira", "Sprint Planning", "Stakeholder Communication", "Roadmaps"],
    primary_goal: "Agile Tech Leadership",
    text: "I excel at leading cross-functional teams, Agile sprint ceremonies in Jira, stakeholder coordination, product roadmap planning, and delivery management."
  }
];

const QUESTIONS = [
  { id: "math_interest", title: "1. Mathematics & Quantitative Reasoning", desc: "Calculus, linear algebra, discrete math, probability, and analytical problem formulation." },
  { id: "programming_interest", title: "2. Programming & Software Construction", desc: "Writing algorithms, building applications, modular clean code, and debugging syntax." },
  { id: "creativity_design_interest", title: "3. Creativity & Visual/Product Design", desc: "Visual aesthetics, UI/UX prototyping, typography, wireframes, and design thinking." },
  { id: "social_communication_interest", title: "4. Social Interaction & Communication", desc: "Collaborating with stakeholders, executive presentations, team coordination, and client communication." },
  { id: "data_analysis_interest", title: "5. Data Analysis & Pattern Recognition", desc: "Exploring datasets, SQL querying, statistical metrics, reporting dashboards, and Business Intelligence." },
  { id: "problem_solving_interest", title: "6. Logical Problem Solving & Troubleshooting", desc: "Deconstructing edge cases, troubleshooting systems, and structured analytical deduction." },
  { id: "leadership_management_interest", title: "7. Leadership & Project Management", desc: "Strategic prioritization, Agile/Scrum sprint delivery, risk management, and guiding team members." }
];

const POPULAR_SKILLS = [
  "Python", "JavaScript", "Java", "C++", "SQL", "HTML/CSS", "React", "TypeScript",
  "Docker", "Kubernetes", "Linux", "Git", "AWS", "Figma", "Pandas", "Scikit-Learn",
  "PyTorch", "Tableau", "Power BI", "Jira", "Agile/Scrum", "REST APIs", "Bash", "OWASP"
];

const NLP_KEYWORDS_DICTIONARY = [
  "python", "java", "c++", "javascript", "typescript", "react", "html", "css", "node", "api", "apis",
  "backend", "frontend", "full-stack", "algorithms", "data structures", "git", "clean code", "database",
  "machine learning", "data science", "deep learning", "ai", "neural networks", "statistics", "pandas",
  "numpy", "scikit-learn", "pytorch", "tensorflow", "nlp", "predictive",
  "sql", "power bi", "tableau", "excel", "dashboards", "metrics", "kpi", "reporting", "data warehouse",
  "figma", "ui", "ux", "design", "wireframes", "prototyping", "user research", "typography",
  "cloud", "aws", "docker", "kubernetes", "devops", "linux", "ci/cd", "terraform", "bash", "servers",
  "cybersecurity", "ethical hacking", "penetration testing", "security", "firewall", "wireshark", "cryptography", "owasp",
  "product management", "agile", "scrum", "jira", "leadership", "sprint", "roadmap", "stakeholders",
  "business analysis", "bpmn", "uml", "requirements", "consulting", "workflows"
];

// -----------------------------------------------------------------------------
// MAIN APPLICATION ROOT
// -----------------------------------------------------------------------------
function App() {
  const [currentPage, setCurrentPage] = useState("home");
  
  // Assessment State
  const [assessmentStep, setAssessmentStep] = useState(1);
  const [ratings, setRatings] = useState({
    math_interest: 0,
    programming_interest: 0,
    creativity_design_interest: 0,
    social_communication_interest: 0,
    data_analysis_interest: 0,
    problem_solving_interest: 0,
    leadership_management_interest: 0
  });
  const [workPreferences, setWorkPreferences] = useState({
    work_environment: "Collaborative Team",
    task_orientation: "Building & Construction",
    learning_style: "Project-Based"
  });
  const [candidateBackground, setCandidateBackground] = useState({
    education_level: "Bachelor's Degree",
    experience_level: "Entry-Level / Student",
    declared_skills: [],
    primary_goal: "Building Scalable Software"
  });
  const [customSkillInput, setCustomSkillInput] = useState("");
  const [userText, setUserText] = useState("");
  const [selectedModel, setSelectedModel] = useState("Best Model");
  const [topK, setTopK] = useState(3);
  
  // Results & App State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recommendationResult, setRecommendationResult] = useState(null);
  const [modelEvalData, setModelEvalData] = useState(null);
  const [allCareersCatalog, setAllCareersCatalog] = useState([]);
  const [completedChecklist, setCompletedChecklist] = useState({});
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Load models and careers on mount
  useEffect(() => {
    fetch("/api/models")
      .then(res => res.json())
      .then(data => setModelEvalData(data))
      .catch(err => console.error("Error loading model benchmark:", err));

    fetch("/api/careers")
      .then(res => res.json())
      .then(data => setAllCareersCatalog(data))
      .catch(err => console.error("Error loading career catalog:", err));
  }, []);

  const handleRatingChange = (qId, val) => {
    setRatings(prev => ({ ...prev, [qId]: val }));
  };

  const handleToggleSkill = (skill) => {
    setCandidateBackground(prev => {
      const exists = prev.declared_skills.includes(skill);
      return {
        ...prev,
        declared_skills: exists
          ? prev.declared_skills.filter(s => s !== skill)
          : [...prev.declared_skills, skill]
      };
    });
  };

  const handleAddCustomSkill = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const trimmed = customSkillInput.trim();
    if (trimmed && !candidateBackground.declared_skills.includes(trimmed)) {
      setCandidateBackground(prev => ({
        ...prev,
        declared_skills: [...prev.declared_skills, trimmed]
      }));
      setCustomSkillInput("");
    }
  };

  const handleApplyPreset = (preset) => {
    setRatings(preset.ratings);
    setWorkPreferences({
      work_environment: preset.work_environment,
      task_orientation: preset.task_orientation,
      learning_style: preset.learning_style
    });
    setCandidateBackground({
      education_level: preset.education_level,
      experience_level: preset.experience_level,
      declared_skills: preset.declared_skills,
      primary_goal: preset.primary_goal
    });
    setUserText(preset.text);
    setAssessmentStep(5); // Jump to review step
    setCurrentPage("assessment");
  };

  const detectedKeywords = useMemo(() => {
    if (!userText) return [];
    const textLower = userText.toLowerCase();
    return NLP_KEYWORDS_DICTIONARY.filter(kw => textLower.includes(kw)).slice(0, 8);
  }, [userText]);

  const answeredCount = Object.values(ratings).filter(v => v > 0).length;

  const handleSubmitAssessment = async (e, customRatings = null) => {
    if (e && e.preventDefault) e.preventDefault();
    const activeRatings = customRatings || ratings;
    
    // Auto-fill any unset dimensions with neutral rating (3) to prevent blocking
    const finalRatings = {};
    for (const key of Object.keys(ratings)) {
      finalRatings[key] = (activeRatings[key] && activeRatings[key] > 0) ? activeRatings[key] : 3;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ratings: finalRatings,
          text: userText,
          work_preferences: workPreferences,
          background: candidateBackground,
          model_name: selectedModel,
          top_k: topK
        })
      });

      if (!response.ok) {
        let errMsg = "Error generating career recommendations.";
        try {
          const errJson = await response.json();
          if (typeof errJson.detail === "string") {
            errMsg = errJson.detail;
          } else if (Array.isArray(errJson.detail)) {
            errMsg = errJson.detail.map(d => {
              const field = d.loc ? d.loc.filter(x => x !== 'body').join('.') : 'input';
              return `${field}: ${d.msg}`;
            }).join(' | ');
          }
        } catch (_) {}
        throw new Error(errMsg);
      }

      const result = await response.json();
      setRecommendationResult(result);
      setCurrentPage("recommendations");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err.message || "Failed to connect to recommendation server.");
    } finally {
      setLoading(false);
    }
  };

  const toggleChecklist = (careerDomain, topicName) => {
    const key = `${careerDomain}:${topicName}`;
    setCompletedChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopySummary = () => {
    if (!recommendationResult) return;
    const lines = [
      `=== CareerPath AI Personalized Career Guidance Summary ===`,
      `Model Engine: ${recommendationResult.model_used}`,
      `Evaluated On: O*NET 31.0 Standards\n`,
      ...recommendationResult.top_recommendations.map(r =>
        `#${r.rank} ${r.domain_name} (Fit Score: ${r.match_score}%, O*NET SOC: ${r.onet_soc_code})\n` +
        `Summary: ${r.description.slice(0, 160)}...\n` +
        `Top Required Skills: ${(r.top_skills || []).slice(0, 4).map(s => s.name).join(", ")}\n` +
        `In-Demand Tech: ${(r.hot_technologies || []).slice(0, 6).join(", ")}\n`
      ),
      `Disclaimer: ${recommendationResult.disclaimer || "Exploratory AI career guidance."}`
    ];
    navigator.clipboard.writeText(lines.join("\n"));
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const handleExportJSON = () => {
    if (!recommendationResult) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(recommendationResult, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `careerpath_assessment_report.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDownloadReport = () => {
    window.print();
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Toast Notification */}
      {copiedNotification && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-xl flex items-center space-x-2 text-sm font-medium border border-slate-700 animate-bounce">
          <Icon name="check" className="w-4 h-4 text-emerald-400" />
          <span>Career summary copied to clipboard!</span>
        </div>
      )}

      {/* Top Navigation */}
      <header className="sticky top-0 z-50 glass-nav no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage("home")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-brand-600 flex items-center justify-center text-white shadow-md">
              <Icon name="compass" className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">CareerPath <span className="text-brand-600">AI</span></span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                O*NET 31.0 Platform
              </span>
            </div>
          </div>

          <nav className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto py-1">
            {[
              { id: "home", label: "Overview", icon: "layout-grid" },
              { id: "assessment", label: "Assessment Studio", icon: "sliders" },
              { id: "recommendations", label: "Recommendations", icon: "sparkles", disabled: !recommendationResult },
              { id: "skill_gaps", label: "Skill Gap Analysis", icon: "target", disabled: !recommendationResult },
              { id: "roadmaps", label: "Learning Roadmaps", icon: "map", disabled: !recommendationResult },
              { id: "comparison", label: "Career Comparison", icon: "table" },
              { id: "performance", label: "Model Intelligence", icon: "bar-chart-2" }
            ].map(tab => (
              <button
                key={tab.id}
                disabled={tab.disabled}
                onClick={() => setCurrentPage(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
                  currentPage === tab.id
                    ? "bg-brand-600 text-white shadow-sm"
                    : tab.disabled
                    ? "text-slate-400 cursor-not-allowed opacity-60"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon name={tab.icon} className="w-4 h-4" />
                <span className="hidden lg:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === "home" && (
          <HomePage
            setCurrentPage={setCurrentPage}
            onApplyPreset={handleApplyPreset}
          />
        )}

        {currentPage === "assessment" && (
          <AssessmentWizard
            step={assessmentStep}
            setStep={setAssessmentStep}
            ratings={ratings}
            onRatingChange={handleRatingChange}
            workPreferences={workPreferences}
            setWorkPreferences={setWorkPreferences}
            candidateBackground={candidateBackground}
            setCandidateBackground={setCandidateBackground}
            handleToggleSkill={handleToggleSkill}
            customSkillInput={customSkillInput}
            setCustomSkillInput={setCustomSkillInput}
            handleAddCustomSkill={handleAddCustomSkill}
            userText={userText}
            setUserText={setUserText}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            topK={topK}
            setTopK={setTopK}
            answeredCount={answeredCount}
            detectedKeywords={detectedKeywords}
            loading={loading}
            error={error}
            setError={setError}
            onSubmit={handleSubmitAssessment}
            onApplyPreset={handleApplyPreset}
          />
        )}

        {currentPage === "recommendations" && (
          <RecommendationsHub
            result={recommendationResult}
            ratings={ratings}
            completedChecklist={completedChecklist}
            toggleChecklist={toggleChecklist}
            onReSimulate={handleSubmitAssessment}
            onCopySummary={handleCopySummary}
            onExportJSON={handleExportJSON}
            onDownloadReport={handleDownloadReport}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === "skill_gaps" && (
          <SkillGapView
            result={recommendationResult}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === "roadmaps" && (
          <RoadmapsView
            result={recommendationResult}
            completedChecklist={completedChecklist}
            toggleChecklist={toggleChecklist}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === "comparison" && (
          <CareerComparisonView
            result={recommendationResult}
            catalog={allCareersCatalog}
          />
        )}

        {currentPage === "performance" && <PerformancePage evalData={modelEvalData} />}
      </main>

      {/* Clean Modern Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-slate-500 text-xs no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-800">CareerPath AI</span>
            <span>—</span>
            <span>Enterprise Multi-Modal Career Intelligence & Skill Development</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400">Official O*NET 31.0 Database (U.S. Dept of Labor)</span>
            <span>•</span>
            <span className="text-slate-400">5 ML Models Evaluated</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// -----------------------------------------------------------------------------
// PAGE 1: OVERVIEW (HOME)
// -----------------------------------------------------------------------------
function HomePage({ setCurrentPage, onApplyPreset }) {
  const [previewDomain, setPreviewDomain] = useState(null);

  const DOMAINS_LIST = [
    {
      name: "Software Development",
      soc: "15-1252.00",
      category: "Engineering",
      icon: "code",
      desc: "Architect, build, and maintain mission-critical backend APIs, web systems, and full-stack software applications.",
      skills: ["Complex Problem Solving", "Critical Thinking", "Programming", "System Design"],
      knowledge: ["Computers and Electronics", "Mathematics", "Engineering & Technology"],
      hotTech: ["Amazon Web Services AWS", "Docker", "Git", "Python", "React", "Apache Kafka"]
    },
    {
      name: "Data Science & Machine Learning",
      soc: "15-2051.00",
      category: "Data & AI",
      icon: "brain",
      desc: "Train predictive algorithms, neural network models, and extract statistical patterns from high-dimensional datasets.",
      skills: ["Mathematics", "Data Analysis", "Predictive Modeling", "Hypothesis Testing"],
      knowledge: ["Mathematics", "Computers and Electronics", "Engineering & Technology"],
      hotTech: ["PyTorch", "Scikit-Learn", "Apache Spark", "Pandas", "Python", "SQL"]
    },
    {
      name: "Data Analytics & Business Intelligence",
      soc: "15-2051.01",
      category: "Analytics",
      icon: "bar-chart-2",
      desc: "Transform enterprise databases into actionable executive dashboards, strategic KPIs, and exploratory data visualizations.",
      skills: ["SQL Querying", "Exploratory Analysis", "Data Storytelling", "Statistical Reporting"],
      knowledge: ["Computers and Electronics", "Mathematics", "Administration and Management"],
      hotTech: ["Microsoft Power BI", "Tableau", "SQL", "Microsoft Excel", "Python", "Azure"]
    },
    {
      name: "UI/UX Design & Frontend Systems",
      soc: "15-1255.00",
      category: "Design",
      icon: "layout",
      desc: "Create intuitive, human-centered digital interfaces, interactive wireframes, component design systems, and frontend UI.",
      skills: ["User Empathy", "Visual Hierarchy", "Prototyping", "Design Systems"],
      knowledge: ["Computers and Electronics", "Customer and Personal Service", "Design"],
      hotTech: ["Figma", "Adobe XD", "React.js", "CSS3 / Tailwind", "HTML5", "Adobe Creative Cloud"]
    },
    {
      name: "Cloud & DevOps Engineering",
      soc: "15-1244.00",
      category: "Infrastructure",
      icon: "cloud",
      desc: "Automate server deployment pipelines, maintain zero-downtime infrastructure, and orchestrate containerized environments.",
      skills: ["System Reliability", "Automation Scripting", "Security Hardening", "Networking"],
      knowledge: ["Computers and Electronics", "Telecommunications", "Administration and Management"],
      hotTech: ["Kubernetes", "Docker", "Amazon Web Services AWS", "Ansible", "Linux Bash", "Terraform"]
    },
    {
      name: "Cybersecurity & Information Security",
      soc: "15-1212.00",
      category: "Security",
      icon: "shield",
      desc: "Defend organizational assets from malicious exploits, analyze attack vectors, and enforce cryptographic security standards.",
      skills: ["Vulnerability Auditing", "Network Inspection", "Threat Modeling", "Incident Response"],
      knowledge: ["Computers and Electronics", "Telecommunications", "Administration and Management"],
      hotTech: ["Firewall software", "Wireshark", "Linux", "OWASP", "Amazon Web Services AWS", "Metasploit"]
    },
    {
      name: "Product & IT Project Management",
      soc: "15-1299.09",
      category: "Management",
      icon: "briefcase",
      desc: "Lead cross-functional engineering teams, orchestrate Agile sprints, and translate market requirements into product roadmaps.",
      skills: ["Stakeholder Alignment", "Sprint Planning", "Risk Mitigation", "Agile Leadership"],
      knowledge: ["Administration and Management", "Customer and Personal Service", "Computers and Electronics"],
      hotTech: ["Atlassian JIRA", "Atlassian Confluence", "Agile / Scrum", "Amazon Web Services AWS", "Roadmaps"]
    },
    {
      name: "Business Analysis & Systems Architecture",
      soc: "15-1211.00",
      category: "Architecture",
      icon: "cpu",
      desc: "Bridge operational business workflows with technical enterprise software, conducting feasibility studies and process engineering.",
      skills: ["Requirements Elicitation", "Process Modeling", "Gap Analysis", "Solution Evaluation"],
      knowledge: ["Computers and Electronics", "Customer and Personal Service", "Administration and Management"],
      hotTech: ["Atlassian JIRA", "Microsoft Power BI", "BPMN 2.0", "UML", "SQL", "ERP Systems"]
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto pt-4 pb-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-6">
          <span className="flex h-2 w-2 rounded-full bg-brand-600 animate-pulse"></span>
          <span>Multi-Modal NLP & Machine Learning Career Intelligence</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          Find Your Career Direction With <span className="gradient-text">Precision AI</span>
        </h1>
        <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          CareerPath AI translates your passions, technical interests, work preferences, and existing skills into
          tailored career paths enriched with official <strong>O*NET 31.0</strong> occupational intelligence.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setCurrentPage("assessment")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Start Multi-Step Assessment</span>
            <Icon name="arrow-right" className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentPage("comparison")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-sm shadow-sm transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Compare Career Paths</span>
            <Icon name="table" className="w-4 h-4" />
          </button>
        </div>

        {/* System Stat Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 text-left">
          {[
            { label: "Target Domains", val: "8 Core Disciplines", desc: "Technology & Computing Specialties", icon: "layers" },
            { label: "Occupational Standards", val: "1,016 Occupations", desc: "Official U.S. Dept of Labor O*NET Data", icon: "database" },
            { label: "ML Classifiers", val: "5 Algorithms", desc: "RF, Naive Bayes, LR, DT, KNN Evaluated", icon: "cpu" },
            { label: "Skill Gap Analysis", val: "Actionable Insights", desc: "Benchmark Comparisons & Roadmaps", icon: "target" }
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center space-x-2 text-brand-600 mb-1">
                <Icon name={stat.icon} className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{stat.label}</span>
              </div>
              <div className="font-extrabold text-base text-slate-900">{stat.val}</div>
              <div className="text-[11px] text-slate-500">{stat.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4-Step Intelligent Architecture */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">How the Recommendation Platform Works</h2>
          <p className="mt-2 text-sm text-slate-600">A multi-modal intelligence pipeline fusing quantitative ratings, declared skills, and linguistic signals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Comprehensive Candidate Intake",
              desc: "Collects 7 cognitive rating dimensions, work style preferences, existing skills, and a free-text statement.",
              icon: "user-check",
              accent: "text-blue-600 bg-blue-50"
            },
            {
              step: "02",
              title: "Multi-Modal Feature Fusion",
              desc: "Extracts domain n-gram patterns and combines normalized ratings into a 307-dimensional unified feature space.",
              icon: "cpu",
              accent: "text-indigo-600 bg-indigo-50"
            },
            {
              step: "03",
              title: "Supervised Classification",
              desc: "Predicts multi-class posterior probabilities across all 8 career domains using rigorously trained classifiers.",
              icon: "git-merge",
              accent: "text-purple-600 bg-purple-50"
            },
            {
              step: "04",
              title: "O*NET & Skill Gap Analysis",
              desc: "Maps results against official O*NET standards, identifies competency gaps, and provides 3-stage learning roadmaps.",
              icon: "award",
              accent: "text-emerald-600 bg-emerald-50"
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-slate-50/70 border border-slate-100 hover-card relative">
              <span className="text-[10px] font-black text-slate-400 tracking-wider">PHASE {item.step}</span>
              <div className={`w-10 h-10 rounded-lg ${item.accent} flex items-center justify-center my-3`}>
                <Icon name={item.icon} className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">{item.title}</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Career Domain Catalog */}
      <section>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Supported Career Disciplines</h2>
            <p className="text-sm text-slate-600 mt-1">Directly indexed against official Standard Occupational Classification (SOC) taxonomies</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600">
            8 Disciplines Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DOMAINS_LIST.map((dom, i) => (
            <div key={i} className="p-5 rounded-xl bg-white border border-slate-200 hover-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    SOC {dom.soc}
                  </span>
                  <Icon name={dom.icon} className="w-5 h-5 text-brand-600" />
                </div>
                <h3 className="font-bold text-base text-slate-900">{dom.name}</h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-2">{dom.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {dom.hotTech.slice(0, 3).map((t, idx) => (
                    <span key={idx} className="badge-tech text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setPreviewDomain(dom)}
                  className="w-full py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <span>Inspect Details</span>
                  <Icon name="chevron-right" className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Domain Preview Modal */}
      {previewDomain && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-brand-50 text-brand-700">
                  O*NET SOC {previewDomain.soc}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">{previewDomain.name}</h3>
              </div>
              <button
                onClick={() => setPreviewDomain(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <Icon name="x" className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">{previewDomain.desc}</p>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Core Knowledge Domains</h4>
              <div className="flex flex-wrap gap-1.5">
                {previewDomain.knowledge.map((k, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-medium">
                    {k}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Essential Skills</h4>
              <div className="flex flex-wrap gap-1.5">
                {previewDomain.skills.map((s, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Representative In-Demand Tech</h4>
              <div className="flex flex-wrap gap-1.5">
                {previewDomain.hotTech.map((t, idx) => (
                  <span key={idx} className="badge-tech">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setPreviewDomain(null);
                  setCurrentPage("assessment");
                }}
                className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
              >
                Assess Fit For This Career
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// PAGE 2: MULTI-STEP ASSESSMENT WIZARD (PHASE 2)
// -----------------------------------------------------------------------------
function AssessmentWizard({
  step,
  setStep,
  ratings,
  onRatingChange,
  workPreferences,
  setWorkPreferences,
  candidateBackground,
  setCandidateBackground,
  handleToggleSkill,
  customSkillInput,
  setCustomSkillInput,
  handleAddCustomSkill,
  userText,
  setUserText,
  selectedModel,
  setSelectedModel,
  topK,
  setTopK,
  answeredCount,
  detectedKeywords,
  loading,
  error,
  setError,
  onSubmit,
  onApplyPreset
}) {
  const stepsTitles = [
    "Foundational Aptitudes",
    "Work & Learning Styles",
    "Background & Skills",
    "Aspirations & Goals",
    "Review & Calculate"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Wizard Header & Stepper */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider">Step {step} of 5</span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">{stepsTitles[step - 1]}</h1>
            <p className="text-sm text-slate-600 mt-1">Multi-step career evaluation aligned with O*NET occupational standards.</p>
          </div>
          <div className="flex items-center space-x-1.5">
            {[1, 2, 3, 4, 5].map(s => (
              <button
                key={s}
                onClick={() => setStep(s)}
                className={`w-8 h-8 rounded-full text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                  step === s
                    ? "bg-brand-600 text-white ring-4 ring-brand-100"
                    : s < step
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {s < step ? <Icon name="check" className="w-3.5 h-3.5" /> : s}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Archetype Preset Switcher */}
        {step === 1 && (
          <div className="mt-6 pt-6 border-t border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
              ⚡ Quick-Load Candidate Exploration Personas (One-Click Setup):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ARCHETYPE_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onApplyPreset(p)}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition flex items-center space-x-2.5 cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center text-brand-600 flex-shrink-0">
                    <Icon name={p.icon} className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-bold text-slate-900 truncate">{p.name}</div>
                    <div className="text-[10px] text-slate-500">{p.category}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center space-x-2">
          <Icon name="alert-circle" className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* STEP 1: FOUNDATIONAL APTITUDES */}
      {step === 1 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Icon name="sliders" className="w-5 h-5 text-brand-600" />
              <span>7 Foundational Competency Dimensions</span>
            </h2>
            <span className="text-xs text-slate-500 font-semibold">{answeredCount} of 7 Dimensions Rated</span>
          </div>

          <div className="space-y-5">
            {QUESTIONS.map((q) => {
              const currentVal = ratings[q.id];
              return (
                <div key={q.id} className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 transition">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{q.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{q.desc}</p>
                    </div>
                    {currentVal > 0 ? (
                      <span className="self-start sm:self-auto text-xs font-bold px-2.5 py-0.5 rounded-md bg-brand-50 text-brand-700 border border-brand-200">
                        Level: {currentVal} / 5
                      </span>
                    ) : (
                      <span className="self-start sm:self-auto text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-600">
                        Unset
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map(star => {
                      const labels = ["Minimal", "Developing", "Competent", "Proficient", "Expert"];
                      const isSelected = currentVal === star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => onRatingChange(q.id, star)}
                          className={`py-2 px-1 text-center rounded-lg border font-medium text-xs sm:text-sm rating-pill cursor-pointer ${
                            isSelected ? "selected" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div className="font-extrabold text-sm sm:text-base">{star}</div>
                          <div className="text-[10px] hidden sm:block opacity-80">{labels[star - 1]}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <div className="text-xs font-medium text-slate-500">
              {answeredCount === 7 ? (
                <span className="text-emerald-600 font-semibold flex items-center space-x-1">
                  <Icon name="check" className="w-3.5 h-3.5" />
                  <span>All 7 dimensions rated</span>
                </span>
              ) : (
                <span>{answeredCount} of 7 rated (unrated default to neutral 3/5)</span>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                if (setError) setError(null);
                setStep(2);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Next: Work & Learning Styles</span>
              <Icon name="arrow-right" className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: WORK & LEARNING PREFERENCES */}
      {step === 2 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Icon name="briefcase" className="w-5 h-5 text-brand-600" />
              <span>Work Dynamics & Learning Style Preferences</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">Helps match occupational culture, day-to-day rhythm, and pedagogical preferences.</p>
          </div>

          <div className="space-y-6">
            {/* Preferred Work Environment */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Preferred Work Environment</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "Collaborative Team", desc: "Cross-functional pair programming, frequent discussions, team standups." },
                  { id: "Independent Deep Work", desc: "Uninterrupted focus time, autonomous research, deep analytical problem solving." },
                  { id: "Balanced Hybrid", desc: "Blend of dedicated individual sprint execution and team architectural reviews." }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setWorkPreferences(prev => ({ ...prev, work_environment: opt.id }))}
                    className={`p-4 rounded-xl border text-left transition cursor-pointer ${
                      workPreferences.work_environment === opt.id
                        ? "border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/30"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900">{opt.id}</div>
                    <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Task Orientation */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Primary Task Orientation</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: "Building & Construction", desc: "Hands-on coding, architecting software systems, infrastructure automation." },
                  { id: "Research & Analysis", desc: "Evaluating datasets, statistical modeling, investigating security attack vectors." },
                  { id: "Strategy & Coordination", desc: "Project roadmaps, sprint planning, client negotiation, business process design." },
                  { id: "Creative & Visual", desc: "Interface design, user experience wireframes, aesthetic design systems." }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setWorkPreferences(prev => ({ ...prev, task_orientation: opt.id }))}
                    className={`p-4 rounded-xl border text-left transition cursor-pointer ${
                      workPreferences.task_orientation === opt.id
                        ? "border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/30"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900">{opt.id}</div>
                    <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Learning Style */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Preferred Learning Methodology</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "Project-Based", desc: "Learning by coding end-to-end applications and debugging issues live." },
                  { id: "Structured Curriculum", desc: "Step-by-step theoretical textbooks, formal certifications, and lectures." },
                  { id: "Visual & Interactive", desc: "Interactive sandboxes, visual diagrams, video walkthroughs, and workshops." }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setWorkPreferences(prev => ({ ...prev, learning_style: opt.id }))}
                    className={`p-4 rounded-xl border text-left transition cursor-pointer ${
                      workPreferences.learning_style === opt.id
                        ? "border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/30"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900">{opt.id}</div>
                    <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setStep(1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition flex items-center space-x-1.5 cursor-pointer"
            >
              <Icon name="arrow-left" className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setStep(3);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition flex items-center space-x-2 cursor-pointer"
            >
              <span>Next: Background & Skills</span>
              <Icon name="arrow-right" className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: EDUCATIONAL BACKGROUND & EXISTING SKILLS */}
      {step === 3 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Icon name="award" className="w-5 h-5 text-brand-600" />
              <span>Educational Background & Declared Skill Inventory</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">Directly feeds the O*NET Job Zone readiness evaluation and personalized skill gap analyzer.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Education Level */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Education Status / Attainment</label>
              <select
                value={candidateBackground.education_level}
                onChange={(e) => setCandidateBackground(prev => ({ ...prev, education_level: e.target.value }))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-brand-500 cursor-pointer"
              >
                <option value="High School / Diploma">High School / Vocational Diploma</option>
                <option value="Associate's Degree">Associate's Degree (2-Year College)</option>
                <option value="Bachelor's Degree">Bachelor's Degree (In Progress or Completed)</option>
                <option value="Master's / Graduate">Master's Degree / Graduate Studies</option>
                <option value="Self-Taught / Bootcamp">Self-Taught / Accelerated Bootcamp</option>
              </select>
            </div>

            {/* Experience Tier */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Experience Tier</label>
              <select
                value={candidateBackground.experience_level}
                onChange={(e) => setCandidateBackground(prev => ({ ...prev, experience_level: e.target.value }))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-brand-500 cursor-pointer"
              >
                <option value="Entry-Level / Student">Student / Entry-Level (0–1 years)</option>
                <option value="Transitioning / Intermediate">Intermediate / Career Transitioning (2–4 years)</option>
                <option value="Experienced Professional">Senior / Experienced Professional (5+ years)</option>
              </select>
            </div>
          </div>

          {/* Declared Skills Selection */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Your Existing Skills ({candidateBackground.declared_skills.length} Selected)
              </label>
              <span className="text-[11px] text-slate-400">Click to add/remove</span>
            </div>

            <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
              {POPULAR_SKILLS.map(skill => {
                const isActive = candidateBackground.declared_skills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleToggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                      isActive
                        ? "bg-brand-600 text-white border-brand-600 shadow-xs"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {skill} {isActive && "✓"}
                  </button>
                );
              })}
            </div>

            {/* Add Custom Skill */}
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={customSkillInput}
                onChange={(e) => setCustomSkillInput(e.target.value)}
                placeholder="Add other skill (e.g. Next.js, GraphQL, Snowflake)..."
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddCustomSkill}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center space-x-1 cursor-pointer"
              >
                <Icon name="plus" className="w-3.5 h-3.5" />
                <span>Add Skill</span>
              </button>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setStep(2);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition flex items-center space-x-1.5 cursor-pointer"
            >
              <Icon name="arrow-left" className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setStep(4);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition flex items-center space-x-2 cursor-pointer"
            >
              <span>Next: Goals & Aspirations</span>
              <Icon name="arrow-right" className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: ASPIRATIONS & OPEN GOALS STATEMENT */}
      {step === 4 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Icon name="target" className="w-5 h-5 text-brand-600" />
              <span>Career Aspirations & Open Statement</span>
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Our fitted sublinear <strong>TF-IDF Vectorizer</strong> analyzes your free-text statement to identify domain terminology and contextual affinity.
            </p>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Primary Career Goal Focus</label>
            <select
              value={candidateBackground.primary_goal}
              onChange={(e) => setCandidateBackground(prev => ({ ...prev, primary_goal: e.target.value }))}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-brand-500 cursor-pointer"
            >
              <option value="Building Scalable Software">Building Scalable Software Systems & Distributed Backends</option>
              <option value="AI & Predictive Systems">Training Machine Learning Models & Applied AI Systems</option>
              <option value="Data Analytics & BI">Business Intelligence Reporting & Executive Data Storytelling</option>
              <option value="Modern UI/UX Interfaces">Crafting Delightful User Interfaces & Accessible Frontend Systems</option>
              <option value="Cloud & DevOps Infrastructure">Automating Cloud Deployments & Zero-Downtime Infrastructure</option>
              <option value="Cyber Defense & Security">Defending Critical Networks & Ethical Penetration Auditing</option>
              <option value="Agile Tech Leadership">Leading Engineering Teams & Delivering Agile Product Roadmaps</option>
              <option value="Enterprise Systems Architecture">Designing Enterprise Systems & Business Architecture Integrations</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
              Open Career & Project Statement
            </label>
            <textarea
              rows="4"
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              placeholder="e.g. I enjoy coding in Python, solving algorithmic challenges, building backend web APIs with relational databases, and containerizing apps..."
              className="w-full p-4 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none transition"
            ></textarea>

            {/* Real-time detected NLP tokens */}
            <div className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase mr-1">Detected Signals:</span>
                {detectedKeywords.length > 0 ? (
                  detectedKeywords.map((kw, i) => (
                    <span key={i} className="badge-nlp">
                      <Icon name="check" className="w-3 h-3" />
                      <span>{kw}</span>
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">Type tools or skills to see live NLP signal extraction...</span>
                )}
              </div>
              <span className="text-[11px] text-slate-400 font-mono flex-shrink-0">
                {userText.length} chars
              </span>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setStep(3);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition flex items-center space-x-1.5 cursor-pointer"
            >
              <Icon name="arrow-left" className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setStep(5);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition flex items-center space-x-2 cursor-pointer"
            >
              <span>Next: Review & Confirm</span>
              <Icon name="arrow-right" className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: REVIEW & SUBMIT */}
      {step === 5 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Icon name="check-circle" className="w-5 h-5 text-emerald-600" />
              <span>Step 5: Assessment Summary & Algorithm Selection</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">Review your responses before executing the multi-modal classification pipeline.</p>
          </div>

          {/* Review Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Cognitive Ratings Summary */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center font-bold text-slate-900 border-b pb-1">
                <span>1. Foundational Aptitudes</span>
                <button onClick={() => setStep(1)} className="text-brand-600 hover:underline">Edit</button>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-slate-600">
                {QUESTIONS.map(q => (
                  <div key={q.id} className="flex justify-between pr-2">
                    <span className="truncate">{q.title.split(".")[1]}:</span>
                    <strong className="font-mono text-slate-800">{ratings[q.id] || 0}/5</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Work & Learning Style */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center font-bold text-slate-900 border-b pb-1">
                <span>2. Work & Learning Styles</span>
                <button onClick={() => setStep(2)} className="text-brand-600 hover:underline">Edit</button>
              </div>
              <div className="space-y-1 text-slate-600">
                <div>Environment: <strong className="text-slate-800">{workPreferences.work_environment}</strong></div>
                <div>Orientation: <strong className="text-slate-800">{workPreferences.task_orientation}</strong></div>
                <div>Learning Method: <strong className="text-slate-800">{workPreferences.learning_style}</strong></div>
              </div>
            </div>

            {/* Background & Declared Skills */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center font-bold text-slate-900 border-b pb-1">
                <span>3. Education & Declared Skills</span>
                <button onClick={() => setStep(3)} className="text-brand-600 hover:underline">Edit</button>
              </div>
              <div className="space-y-1 text-slate-600">
                <div>Education: <strong className="text-slate-800">{candidateBackground.education_level}</strong></div>
                <div>Tier: <strong className="text-slate-800">{candidateBackground.experience_level}</strong></div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {candidateBackground.declared_skills.length > 0 ? (
                    candidateBackground.declared_skills.map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-semibold text-slate-700">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400 italic">No existing skills selected</span>
                  )}
                </div>
              </div>
            </div>

            {/* Goals & Signals */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center font-bold text-slate-900 border-b pb-1">
                <span>4. Career Goals & Description</span>
                <button onClick={() => setStep(4)} className="text-brand-600 hover:underline">Edit</button>
              </div>
              <div className="space-y-1 text-slate-600">
                <div>Focus: <strong className="text-slate-800">{candidateBackground.primary_goal}</strong></div>
                <div className="text-[11px] line-clamp-2 text-slate-500 italic">
                  "{userText || "No text statement provided."}"
                </div>
              </div>
            </div>
          </div>

          {/* Model & Output Settings */}
          <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Classifier Engine</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-brand-500 cursor-pointer"
                >
                  <option value="Best Model">Best Model (Recommended - Random Forest)</option>
                  <option value="Random Forest">Random Forest Classifier</option>
                  <option value="Naive Bayes">Naive Bayes (MultinomialNB)</option>
                  <option value="Logistic Regression">Logistic Regression</option>
                  <option value="Decision Tree">Decision Tree Classifier</option>
                  <option value="K-Nearest Neighbors">K-Nearest Neighbors</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Output Count</label>
                <select
                  value={topK}
                  onChange={(e) => setTopK(parseInt(e.target.value))}
                  className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-brand-500 cursor-pointer"
                >
                  <option value={3}>Top 3 Matches</option>
                  <option value={4}>Top 4 Matches</option>
                  <option value={5}>Top 5 Matches</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  setStep(4);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Icon name="arrow-left" className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={onSubmit}
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <React.Fragment>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Calculating Recommendations...</span>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <span>Generate Career Intelligence</span>
                    <Icon name="sparkles" className="w-4 h-4" />
                  </React.Fragment>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// PAGE 3: RECOMMENDATIONS HUB (PHASE 3)
// -----------------------------------------------------------------------------
function RecommendationsHub({
  result,
  ratings,
  completedChecklist,
  toggleChecklist,
  onReSimulate,
  onCopySummary,
  onExportJSON,
  onDownloadReport,
  setCurrentPage
}) {
  const [simulatedRatings, setSimulatedRatings] = useState(ratings || {});
  const topRecs = result.top_recommendations || [];

  const handleSimSliderChange = (qId, val) => {
    setSimulatedRatings(prev => ({ ...prev, [qId]: parseInt(val) }));
  };

  const executeSimulation = () => {
    onReSimulate(null, simulatedRatings);
  };

  return (
    <div className="space-y-8">
      {/* Printable Report Header */}
      <div className="hidden print-only mb-6 border-b pb-4">
        <h1 className="text-2xl font-black">CareerPath AI — Career Guidance & Skill Intelligence Report</h1>
        <p className="text-xs text-slate-500 mt-1">Evaluated on O*NET 31.0 Standards & Multi-Modal Machine Learning</p>
      </div>

      {/* Hero Banner */}
      <div className="gradient-hero rounded-2xl text-white p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 no-print">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md bg-white/10 text-white text-xs font-bold mb-2">
            <Icon name="check-circle" className="w-3.5 h-3.5 text-emerald-400" />
            <span>Algorithm: {result.model_used || "Random Forest"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">Personalized Career Intelligence</h1>
          <p className="mt-1 text-sm text-slate-300">
            Top {topRecs.length} matching career disciplines identified from your multi-modal profile.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onDownloadReport}
            className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/25 text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer shadow-sm"
          >
            <Icon name="printer" className="w-4 h-4" />
            <span>Download Report (PDF)</span>
          </button>
          <button
            onClick={onCopySummary}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer"
          >
            <Icon name="copy" className="w-4 h-4" />
            <span>Export Text</span>
          </button>
          <button
            onClick={onExportJSON}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer"
          >
            <Icon name="file-text" className="w-4 h-4" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={() => setCurrentPage("assessment")}
            className="px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-md cursor-pointer"
          >
            <Icon name="sliders" className="w-4 h-4" />
            <span>Modify Assessment</span>
          </button>
        </div>
      </div>

      {/* Navigation Quick Jump Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 no-print">
        <button
          onClick={() => setCurrentPage("skill_gaps")}
          className="p-4 rounded-xl bg-white border border-slate-200 hover-card text-left transition flex items-center space-x-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <Icon name="target" className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-xs text-slate-900">Skill Gap Analysis</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Inspect candidate strengths vs benchmark gaps</div>
          </div>
        </button>

        <button
          onClick={() => setCurrentPage("roadmaps")}
          className="p-4 rounded-xl bg-white border border-slate-200 hover-card text-left transition flex items-center space-x-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
            <Icon name="map" className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-xs text-slate-900">Personalized Roadmaps</div>
            <div className="text-[11px] text-slate-500 mt-0.5">3-stage roadmap, projects & learning resources</div>
          </div>
        </button>

        <button
          onClick={() => setCurrentPage("comparison")}
          className="p-4 rounded-xl bg-white border border-slate-200 hover-card text-left transition flex items-center space-x-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
            <Icon name="table" className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-xs text-slate-900">Multi-Career Comparison</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Side-by-side Job Zones, skills & education</div>
          </div>
        </button>
      </div>

      {/* Main Recommendation Cards */}
      <div className="space-y-8">
        {topRecs.map((rec) => {
          const rankGradients = [
            "from-emerald-600 to-teal-700",
            "from-blue-600 to-indigo-700",
            "from-purple-600 to-indigo-700",
            "from-amber-600 to-orange-700",
            "from-pink-600 to-rose-700"
          ];
          const badgeGrad = rankGradients[(rec.rank || 1) - 1] || "from-slate-700 to-slate-800";

          const skillsList = rec.top_skills || [];
          const knowledgeList = rec.top_knowledge || [];
          const techList = rec.hot_technologies || [];
          const eduList = rec.education_distribution || [];
          const explanationNarrative = rec.explanation?.narrative || "";
          const matchedKeywords = rec.explanation?.matched_nlp_keywords || [];
          const jobZone = rec.job_zone || {};
          const activities = rec.work_activities || [];

          return (
            <div key={rec.domain_name} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover-card">
              {/* Header */}
              <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${badgeGrad} text-white font-black flex items-center justify-center text-lg shadow-md flex-shrink-0`}>
                    #{rec.rank}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-slate-100 text-slate-700">
                        O*NET SOC {rec.onet_soc_code || "N/A"}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700">
                        {rec.category || "Technology"}
                      </span>
                      {jobZone.zone && (
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                          Job Zone {jobZone.zone}: {jobZone.title}
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">{rec.domain_name}</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Official O*NET Title: {rec.onet_official_title || rec.domain_name}</p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 self-end sm:self-auto">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Alignment Score</span>
                  <div className="text-3xl font-black text-brand-600">{rec.match_score}%</div>
                  <span className="text-[11px] text-slate-500">Model Confidence: {((rec.confidence_probability || 0) * 100).toFixed(1)}%</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Explainable AI Narrative */}
                <div className="p-5 rounded-xl bg-indigo-50/70 border border-indigo-100">
                  <div className="flex items-center space-x-2 text-indigo-900 font-bold text-xs uppercase tracking-wider mb-2">
                    <Icon name="sparkles" className="w-4 h-4 text-indigo-600" />
                    <span>Recommendation Rationale (Why this career?)</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    {explanationNarrative}
                  </p>

                  {matchedKeywords.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-indigo-200/60 flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-bold text-indigo-900">Contextual Signals Matched:</span>
                      {matchedKeywords.map((term, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 rounded-full bg-white text-indigo-800 text-xs font-mono font-medium border border-indigo-200">
                          {term}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* O*NET Summary & Daily Work Activities */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">O*NET 31.0 Occupational Summary</h3>
                    <p className="text-sm text-slate-700 leading-relaxed">{rec.description || "Comprehensive occupational standard provided by O*NET 31.0 database."}</p>
                  </div>

                  {activities.length > 0 && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center space-x-1.5">
                        <Icon name="check-square" className="w-4 h-4 text-brand-600" />
                        <span>Core Day-to-Day Work Activities (O*NET)</span>
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600">
                        {activities.slice(0, 4).map((act, aIdx) => (
                          <li key={aIdx} className="flex items-start space-x-2">
                            <span className="text-brand-600 mt-0.5">•</span>
                            <span className="leading-relaxed">{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Skills, Knowledge & Hot Tech */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                  {/* Required Skills & Knowledge */}
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-4">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center space-x-1.5">
                        <Icon name="check-square" className="w-4 h-4 text-brand-600" />
                        <span>Essential O*NET Skills (Importance)</span>
                      </h4>
                      <div className="space-y-2">
                        {skillsList.slice(0, 4).map((sk, sIdx) => (
                          <div key={sIdx}>
                            <div className="flex justify-between text-xs font-semibold text-slate-800 mb-0.5">
                              <span>{sk.name}</span>
                              <span className="font-mono text-[11px]">{sk.score} / 5.0</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-1.5">
                              <div
                                className="bg-brand-600 h-1.5 rounded-full"
                                style={{ width: `${((sk.score || 3) / 5.0) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {knowledgeList.length > 0 && (
                      <div className="pt-2 border-t border-slate-200/60">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center space-x-1.5">
                          <Icon name="book-open" className="w-4 h-4 text-brand-600" />
                          <span>Foundational Knowledge Domains</span>
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {knowledgeList.slice(0, 4).map((kn, kIdx) => (
                            <span key={kIdx} className="px-2 py-1 rounded bg-white text-slate-700 text-xs font-medium border border-slate-200">
                              {kn.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Hot Tech Tools & Education */}
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center space-x-1.5">
                        <Icon name="terminal" className="w-4 h-4 text-brand-600" />
                        <span>In-Demand Technologies (O*NET 31.0)</span>
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {techList.slice(0, 10).map((tech, tIdx) => (
                          <span key={tIdx} className="badge-tech">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {eduList.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Education Breakdown</span>
                        <div className="flex flex-wrap gap-3 text-xs text-slate-700">
                          {eduList.slice(0, 2).map((edu, eIdx) => (
                            <span key={eIdx} className="font-medium">
                              • {edu.category}: <strong>{edu.percentage}%</strong>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Shortcuts */}
                <div className="pt-2 flex flex-wrap gap-3 no-print">
                  <button
                    onClick={() => setCurrentPage("skill_gaps")}
                    className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Icon name="target" className="w-4 h-4" />
                    <span>View Detailed Skill Gaps for this Role</span>
                  </button>
                  <button
                    onClick={() => setCurrentPage("roadmaps")}
                    className="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Icon name="map" className="w-4 h-4" />
                    <span>Explore 3-Stage Roadmap & Projects</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Multi-Class Posterior Probability Distribution Chart */}
      {result.all_domain_scores && result.all_domain_scores.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center space-x-2">
            <Icon name="bar-chart" className="w-5 h-5 text-brand-600" />
            <span>Multi-Class Posterior Probability Distribution</span>
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            The machine learning classifier computes normalized probabilities summing to 100% across all 8 competing career classes.
          </p>

          <div className="space-y-3">
            {result.all_domain_scores.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-4">
                <span className="w-48 text-xs font-semibold text-slate-700 truncate">{item.domain}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-2.5 rounded-full ${idx === 0 ? "bg-brand-600" : idx === 1 ? "bg-indigo-400" : "bg-slate-300"}`}
                    style={{ width: `${Math.max(item.score, 1)}%` }}
                  ></div>
                </div>
                <span className="w-16 text-right text-xs font-bold text-slate-800">{item.score}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prominent Ethical & Advisory Disclaimer */}
      <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 text-xs space-y-1.5">
        <div className="font-bold text-slate-800 flex items-center space-x-1.5">
          <Icon name="alert-circle" className="w-4 h-4 text-slate-500" />
          <span>Exploratory AI Guidance & Licensing Notice</span>
        </div>
        <p className="leading-relaxed">
          {result.disclaimer || "CareerPath AI recommendations are exploratory decision-support guidance based on self-reported interest assessments and text analysis."}
        </p>
        <p className="text-slate-500 text-[11px] pt-1">
          O*NET® is a trademark of the U.S. Department of Labor, Employment and Training Administration (USDOL/ETA).
        </p>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// PAGE 4: DEDICATED SKILL GAP ANALYSIS (PHASE 4)
// -----------------------------------------------------------------------------
function SkillGapView({ result, setCurrentPage }) {
  if (!result || !result.top_recommendations) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4">
        <Icon name="alert-circle" className="w-8 h-8 text-amber-500 mx-auto" />
        <h3 className="text-lg font-bold text-slate-900">No Assessment Data</h3>
        <p className="text-sm text-slate-600">Please complete the career assessment to generate skill gap insights.</p>
        <button onClick={() => setCurrentPage("assessment")} className="px-6 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-brand-700 transition cursor-pointer">
          Go to Assessment
        </button>
      </div>
    );
  }

  const topRecs = result.top_recommendations || [];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold mb-2">
              <Icon name="target" className="w-4 h-4" />
              <span>Personalized Competency Audit</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Career Skill Gap Analysis & Action Plan</h1>
            <p className="text-sm text-slate-600 mt-1">
              Evaluates your self-assessment against official O*NET benchmark requirements across top matched careers.
            </p>
          </div>
          <button
            onClick={() => setCurrentPage("recommendations")}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer"
          >
            <Icon name="arrow-left" className="w-4 h-4" />
            <span>Back to Recommendations</span>
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {topRecs.map((rec) => {
          const gapData = rec.explanation?.skill_gap_analysis || {};
          const strengths = gapData.strengths || [];
          const gaps = gapData.gaps || [];
          const priorityTools = gapData.priority_technologies_to_learn || [];
          const acquiredTools = gapData.demonstrated_technologies || [];
          const actionableSteps = gapData.actionable_steps || [];
          const eduNote = gapData.education_readiness_note;

          return (
            <div key={rec.domain_name} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-brand-50 text-brand-700">
                    Rank #{rec.rank} Match
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{rec.domain_name}</h2>
                  <p className="text-xs text-slate-500">{rec.onet_official_title} (SOC {rec.onet_soc_code})</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Alignment Score</span>
                  <span className="text-2xl font-black text-brand-600">{rec.match_score}%</span>
                </div>
              </div>

              {eduNote && (
                <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-200 text-xs text-indigo-900 flex items-start space-x-2">
                  <Icon name="award" className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <span>{eduNote}</span>
                </div>
              )}

              {/* Strengths vs Gaps Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Candidate Strengths */}
                <div className="p-5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-3">
                  <h3 className="font-bold text-sm text-emerald-900 flex items-center space-x-2">
                    <Icon name="check-circle" className="w-4 h-4 text-emerald-600" />
                    <span>Demonstrated Strengths ({strengths.length})</span>
                  </h3>
                  <p className="text-xs text-emerald-800">
                    Your self-assessment scores meet or exceed baseline expectations for this occupation:
                  </p>
                  <div className="space-y-2 pt-1">
                    {strengths.map((st, sIdx) => (
                      <div key={sIdx} className="p-2.5 rounded-lg bg-white border border-emerald-200/70 text-xs flex justify-between items-center">
                        <span className="font-semibold text-slate-800">{st.dimension}</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold text-[11px]">
                          {st.user_score} / 5 (Target: {st.benchmark})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Competency Gaps */}
                <div className="p-5 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-3">
                  <h3 className="font-bold text-sm text-amber-900 flex items-center space-x-2">
                    <Icon name="alert-circle" className="w-4 h-4 text-amber-600" />
                    <span>Skill Development Gaps ({gaps.length})</span>
                  </h3>
                  <p className="text-xs text-amber-800">
                    Targeted dimensions where strengthening proficiency will optimize your readiness:
                  </p>
                  <div className="space-y-2 pt-1">
                    {gaps.length > 0 ? (
                      gaps.map((gp, gIdx) => (
                        <div key={gIdx} className="p-2.5 rounded-lg bg-white border border-amber-200/70 text-xs space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-slate-800">{gp.dimension}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${gp.priority === "High" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-800"}`}>
                              {gp.priority} Priority
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Current: <strong className="text-slate-700">{gp.user_score}/5</strong> | Target: <strong className="text-slate-700">{gp.benchmark}/5</strong> (Gap: -{gp.gap})
                          </div>
                          <p className="text-[11px] text-slate-600 italic">{gp.suggestion}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-emerald-700 font-medium">No major foundational skill gaps identified for this discipline!</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Technologies: Acquired vs Priority to Learn */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {acquiredTools.length > 0 && (
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                      <Icon name="check-circle" className="w-4 h-4 text-emerald-600" />
                      <span>Verified Acquired Technologies</span>
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {acquiredTools.map((t, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 text-xs font-semibold">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {priorityTools.length > 0 && (
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                      <Icon name="terminal" className="w-4 h-4 text-brand-600" />
                      <span>Priority In-Demand Technologies to Add</span>
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {priorityTools.map((tool, tIdx) => (
                        <span key={tIdx} className="badge-tech font-semibold">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actionable Next Steps */}
              {actionableSteps.length > 0 && (
                <div className="p-5 rounded-xl bg-brand-50/50 border border-brand-200">
                  <h3 className="font-bold text-sm text-brand-900 mb-2 flex items-center space-x-2">
                    <Icon name="target" className="w-4 h-4 text-brand-600" />
                    <span>Actionable Learning Roadmap Suggestions</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700 list-disc list-inside">
                    {actionableSteps.map((step, sIdx) => (
                      <li key={sIdx} className="leading-relaxed">{step}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// PAGE 5: PERSONALIZED LEARNING ROADMAPS (PHASE 5)
// -----------------------------------------------------------------------------
function RoadmapsView({ result, completedChecklist, toggleChecklist, setCurrentPage }) {
  if (!result || !result.top_recommendations) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4">
        <Icon name="alert-circle" className="w-8 h-8 text-amber-500 mx-auto" />
        <h3 className="text-lg font-bold text-slate-900">No Assessment Data</h3>
        <p className="text-sm text-slate-600">Please complete the career assessment to generate learning roadmaps.</p>
        <button onClick={() => setCurrentPage("assessment")} className="px-6 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-brand-700 transition cursor-pointer">
          Go to Assessment
        </button>
      </div>
    );
  }

  const topRecs = result.top_recommendations || [];
  const [selectedCareer, setSelectedCareer] = useState(topRecs[0]?.domain_name || "");
  const activeRec = topRecs.find(r => r.domain_name === selectedCareer) || topRecs[0];

  const stages = activeRec.learning_stages || {};
  const projects = activeRec.portfolio_projects || [];
  const resources = activeRec.learning_resources || [];

  return (
    <div className="space-y-8">
      {/* Header & Career Selector */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
              <Icon name="map" className="w-4 h-4" />
              <span>3-Stage Career Roadmap</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Personalized Learning Roadmap & Portfolio Projects</h1>
            <p className="text-sm text-slate-600 mt-1">Structured milestones from foundational syntax to production deployment.</p>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Career:</label>
            <select
              value={selectedCareer}
              onChange={(e) => setSelectedCareer(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-brand-500 cursor-pointer"
            >
              {topRecs.map(r => (
                <option key={r.domain_name} value={r.domain_name}>
                  #{r.rank} {r.domain_name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 3 Progressive Stages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["beginner", "intermediate", "advanced"].map((stageKey, idx) => {
          const stage = stages[stageKey];
          if (!stage) return null;
          const stageBadges = ["bg-blue-50 text-blue-700", "bg-indigo-50 text-indigo-700", "bg-purple-50 text-purple-700"];
          return (
            <div key={stageKey} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover-card">
              <div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${stageBadges[idx]}`}>
                  Stage {idx + 1} ({stage.duration})
                </span>
                <h3 className="font-bold text-base text-slate-900 mt-2">{stage.title}</h3>
                
                <div className="mt-4 space-y-2">
                  {(stage.topics || []).map((topic, tIdx) => {
                    const isChecked = !!completedChecklist[`${activeRec.domain_name}:${topic}`];
                    return (
                      <div
                        key={tIdx}
                        onClick={() => toggleChecklist(activeRec.domain_name, topic)}
                        className={`checklist-item p-2 rounded-lg cursor-pointer text-xs flex items-center space-x-2 border transition ${
                          isChecked
                            ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                            : "bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="rounded text-brand-600 focus:ring-brand-500 cursor-pointer"
                        />
                        <span className={isChecked ? "line-through opacity-70" : ""}>{topic}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Target Milestone</span>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{stage.milestone}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Practical Portfolio Projects */}
      {projects.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Icon name="code" className="w-5 h-5 text-brand-600" />
              <span>Recommended Practical Portfolio Projects</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Projects designed to prove competency to recruiters and hiring managers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((proj, pIdx) => (
              <div key={pIdx} className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-900">{proj.title}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700 uppercase">
                      {proj.level}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{proj.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-wrap gap-1.5">
                  {(proj.tech || []).map((t, tIdx) => (
                    <span key={tIdx} className="badge-tech text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Authoritative Learning Resources */}
      {resources.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Icon name="book-open" className="w-5 h-5 text-brand-600" />
              <span>Curated Authoritative Learning Resources</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Official documentation, guides, and free interactive resources.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {resources.map((resItem, rIdx) => (
              <div key={rIdx} className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                  {resItem.type}
                </span>
                <h4 className="font-bold text-xs text-slate-900 mt-2">{resItem.name}</h4>
                <p className="text-xs text-slate-500 mt-1">{resItem.focus}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// PAGE 6: CAREER COMPARISON TOOL (PHASE 6)
// -----------------------------------------------------------------------------
function CareerComparisonView({ result, catalog }) {
  const defaultRecs = result?.top_recommendations?.map(r => r.domain_name) || [];
  const catalogNames = catalog.map(c => c.domain_name);
  const options = catalogNames.length > 0 ? catalogNames : [
    "Software Development", "Data Science & Machine Learning", "Data Analytics & Business Intelligence",
    "UI/UX Design & Frontend Systems", "Cloud & DevOps Engineering", "Cybersecurity & Information Security",
    "Product & IT Project Management", "Business Analysis & Systems Architecture"
  ];

  const [careerA, setCareerA] = useState(defaultRecs[0] || options[0]);
  const [careerB, setCareerB] = useState(defaultRecs[1] || options[1]);
  const [careerC, setCareerC] = useState(defaultRecs[2] || options[2]);

  const [detailA, setDetailA] = useState(null);
  const [detailB, setDetailB] = useState(null);
  const [detailC, setDetailC] = useState(null);

  useEffect(() => {
    if (careerA) fetch(`/api/career/${encodeURIComponent(careerA)}`).then(r => r.json()).then(d => setDetailA(d));
  }, [careerA]);

  useEffect(() => {
    if (careerB) fetch(`/api/career/${encodeURIComponent(careerB)}`).then(r => r.json()).then(d => setDetailB(d));
  }, [careerB]);

  useEffect(() => {
    if (careerC) fetch(`/api/career/${encodeURIComponent(careerC)}`).then(r => r.json()).then(d => setDetailC(d));
  }, [careerC]);

  const careersCompared = [detailA, detailB, detailC].filter(Boolean);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-bold mb-2">
              <Icon name="table" className="w-4 h-4" />
              <span>Side-by-Side Analysis</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Multi-Career Comparison Matrix</h1>
            <p className="text-sm text-slate-600 mt-1">
              Compare Job Zones, essential skills, knowledge areas, educational profiles, and technologies across disciplines.
            </p>
          </div>
        </div>

        {/* 3 Career Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Career A</label>
            <select
              value={careerA}
              onChange={(e) => setCareerA(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-brand-500 cursor-pointer"
            >
              {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Career B</label>
            <select
              value={careerB}
              onChange={(e) => setCareerB(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-brand-500 cursor-pointer"
            >
              {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Career C</label>
            <select
              value={careerC}
              onChange={(e) => setCareerC(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-brand-500 cursor-pointer"
            >
              {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4 w-48">Dimension</th>
                {careersCompared.map(c => (
                  <th key={c.domain_name} className="p-4 font-bold text-slate-900">
                    <div className="text-sm">{c.domain_name}</div>
                    <div className="text-[10px] font-mono text-slate-400">SOC {c.onet_soc_code}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {/* Job Zone */}
              <tr className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900 bg-slate-50/50">O*NET Job Zone</td>
                {careersCompared.map(c => (
                  <td key={c.domain_name} className="p-4">
                    <span className="font-bold text-brand-600">Job Zone {c.job_zone?.zone}: {c.job_zone?.title}</span>
                    <p className="text-[11px] text-slate-500 mt-1">{c.job_zone?.experience}</p>
                  </td>
                ))}
              </tr>

              {/* Category */}
              <tr className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Discipline Category</td>
                {careersCompared.map(c => (
                  <td key={c.domain_name} className="p-4">
                    <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold text-xs">
                      {c.category}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Top Essential Skills */}
              <tr className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Top Essential Skills</td>
                {careersCompared.map(c => (
                  <td key={c.domain_name} className="p-4 space-y-1">
                    {(c.top_skills || []).slice(0, 4).map((s, idx) => (
                      <div key={idx} className="flex justify-between text-xs">
                        <span>{s.name}</span>
                        <strong className="font-mono text-slate-500">{s.score}/5</strong>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>

              {/* Foundational Knowledge */}
              <tr className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Knowledge Domains</td>
                {careersCompared.map(c => (
                  <td key={c.domain_name} className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {(c.top_knowledge || []).slice(0, 3).map((k, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]">
                          {k.name}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* In-Demand Tech */}
              <tr className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900 bg-slate-50/50">In-Demand Tech Stack</td>
                {careersCompared.map(c => (
                  <td key={c.domain_name} className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {(c.hot_technologies || []).slice(0, 5).map((t, idx) => (
                        <span key={idx} className="badge-tech text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Typical Education */}
              <tr className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Typical Education</td>
                {careersCompared.map(c => (
                  <td key={c.domain_name} className="p-4 text-xs text-slate-600">
                    {(c.education_distribution || []).slice(0, 2).map((edu, idx) => (
                      <div key={idx}>• {edu.category}: <strong>{edu.percentage}%</strong></div>
                    ))}
                  </td>
                ))}
              </tr>

              {/* RIASEC Vocational Interests */}
              <tr className="hover:bg-slate-50">
                <td className="p-4 font-bold text-slate-900 bg-slate-50/50">RIASEC Interests</td>
                {careersCompared.map(c => {
                  const riasec = c.riasec_interests || {};
                  const topTwo = Object.entries(riasec).sort((a,b) => b[1] - a[1]).slice(0, 2);
                  return (
                    <td key={c.domain_name} className="p-4 text-xs">
                      {topTwo.map(([trait, score], idx) => (
                        <div key={idx} className="font-semibold text-slate-700">
                          {trait}: <span className="font-mono text-brand-600">{score.toFixed(1)}</span>
                        </div>
                      ))}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// PAGE 7: MODEL METHODOLOGY & BENCHMARK (PHASE 9 & 10)
// -----------------------------------------------------------------------------
function PerformancePage({ evalData }) {
  const [selectedCM, setSelectedCM] = useState("Random Forest");

  if (!evalData || !evalData.models) {
    return (
      <div className="text-center py-16">
        <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600">Loading benchmark metrics...</p>
      </div>
    );
  }

  const modelSlugs = {
    "Logistic Regression": "logistic_regression",
    "K-Nearest Neighbors": "k_nearest_neighbors",
    "Decision Tree": "decision_tree",
    "Random Forest": "random_forest",
    "Naive Bayes": "naive_bayes"
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-bold mb-2">
              <Icon name="shield-check" className="w-4 h-4" />
              <span>Untouched Test Partition Evaluation (N={evalData.test_samples})</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Machine Learning Benchmark & Methodology</h1>
            <p className="text-sm text-slate-600 mt-1">
              Comparative analysis of 5 classification algorithms evaluated on combined psychometric + TF-IDF vectors.
            </p>
          </div>
          <div className="p-3 bg-brand-50 border border-brand-200 rounded-xl text-center flex-shrink-0">
            <span className="text-[10px] font-bold text-brand-800 uppercase block">Selected Production Model</span>
            <span className="text-lg font-black text-brand-600">{evalData.best_model_name}</span>
            <span className="text-xs text-brand-700 block">CV Macro F1: {((evalData.best_cv_macro_f1 || 1.0) * 100).toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Models Benchmark Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Icon name="table" className="w-5 h-5 text-brand-600" />
              <span>5-Algorithm Empirical Benchmark (Untouched Test Split)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Evaluated across all 8 classes with strict data leakage prevention</p>
          </div>
          <span className="text-xs text-slate-500 font-mono">Stratified 80% Dev / 20% Test</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">Algorithm</th>
                <th className="p-4">CV Macro F1 (5-Fold)</th>
                <th className="p-4">Test Accuracy</th>
                <th className="p-4">Precision (Macro)</th>
                <th className="p-4">Recall (Macro)</th>
                <th className="p-4">F1-Score (Macro)</th>
                <th className="p-4">Selection Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {Object.entries(evalData.models).map(([name, m]) => {
                const isBest = name === evalData.best_model_name;
                const cvF1 = m.cv_validation?.cv_macro_f1_mean ? (m.cv_validation.cv_macro_f1_mean * 100).toFixed(1) + "%" : "N/A";
                return (
                  <tr key={name} className={isBest ? "bg-brand-50/40" : "hover:bg-slate-50"}>
                    <td className="p-4 font-bold text-slate-900 flex items-center space-x-2">
                      <span>{name}</span>
                      {isBest && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-600 text-white font-bold">
                          PRODUCTION
                        </span>
                      )}
                    </td>
                    <td className="p-4 font-mono font-bold text-slate-900">{cvF1}</td>
                    <td className="p-4 font-mono font-bold text-slate-900">{(m.accuracy * 100).toFixed(2)}%</td>
                    <td className="p-4 font-mono">{(m.precision_macro * 100).toFixed(2)}%</td>
                    <td className="p-4 font-mono">{(m.recall_macro * 100).toFixed(2)}%</td>
                    <td className="p-4 font-mono font-bold text-brand-700">{(m.f1_macro * 100).toFixed(2)}%</td>
                    <td className="p-4">
                      {isBest ? (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                          Selected Model
                        </span>
                      ) : (
                        <span className="text-xs text-slate-500">Evaluated Baseline</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual Chart Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Model Comparison Bar Chart Image */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center space-x-2">
            <Icon name="bar-chart-2" className="w-5 h-5 text-brand-600" />
            <span>Multi-Model Benchmark Comparison</span>
          </h3>
          <p className="text-xs text-slate-500 mb-4">Empirical evaluation across all 5 candidate classifiers</p>
          <div className="rounded-xl overflow-hidden border border-slate-100 bg-slate-50 p-2">
            <img
              src="/static/eval_plots/model_comparison.png"
              alt="Model Comparison Bar Chart"
              className="w-full h-auto rounded-lg shadow-xs"
            />
          </div>
        </div>

        {/* Confusion Matrix Interactive Viewer */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <Icon name="grid" className="w-5 h-5 text-brand-600" />
                  <span>Confusion Matrix Heatmap</span>
                </h3>
                <p className="text-xs text-slate-500">Predicted vs True labels on untouched test set</p>
              </div>
              <div className="flex flex-wrap items-center gap-1">
                {Object.keys(evalData.models).map((mName) => (
                  <button
                    key={mName}
                    onClick={() => setSelectedCM(mName)}
                    className={`px-2 py-1 rounded text-xs font-bold transition cursor-pointer ${
                      selectedCM === mName
                        ? "bg-brand-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {mName.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-100 bg-slate-50 p-2 text-center">
              <img
                src={`/static/eval_plots/confusion_matrix_${modelSlugs[selectedCM]}.png`}
                alt={`Confusion Matrix for ${selectedCM}`}
                className="w-full h-auto rounded-lg shadow-xs mx-auto"
              />
            </div>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 text-center">
            Viewing test partition confusion matrix for: <strong>{selectedCM}</strong>
          </div>
        </div>
      </div>

      {/* Architecture Trade-Offs & Disclosures */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
          <Icon name="lightbulb" className="w-5 h-5 text-amber-500" />
          <span>Model Architecture Trade-Offs</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <h4 className="font-bold text-slate-900">Ensemble Bagging (Random Forest)</h4>
            <p className="leading-relaxed">
              In a 307-dimensional space combining 7 scaled psychometric ratings with 300 TF-IDF features,
              randomized tree partitioning mitigates variance inflation while outputting calibrated probabilities.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <h4 className="font-bold text-slate-900">Generative Modeling (Naive Bayes)</h4>
            <p className="leading-relaxed">
              Multinomial Naive Bayes exhibits exceptional speed and 100% test score with Laplace smoothing,
              though its feature independence assumption yields concentrated posterior confidence curves.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <h4 className="font-bold text-slate-900">Curse of Dimensionality (KNN)</h4>
            <p className="leading-relaxed">
              K-Nearest Neighbors computes distance across all 307 dimensions simultaneously.
              In high-dimensional sparse text vectors, distance metrics concentrate, reducing discriminatory power to ~81.25%.
            </p>
          </div>
        </div>

        {/* Limitations Disclosure */}
        <div className="mt-4 p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-xs">
          <strong className="text-slate-800 block mb-1">Scientific Integrity & Data Limitations Disclosure:</strong>
          {evalData.limitations_and_disclaimer}
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// RENDER ROOT
// -----------------------------------------------------------------------------
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
