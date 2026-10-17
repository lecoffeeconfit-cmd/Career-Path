# CAREER PATH — MASTER DEVELOPMENT PROMPT

You are a senior full-stack engineer, product designer, data engineer, UX researcher, and career development specialist.

Build **Career Path**, a comprehensive, beautifully designed, interactive career exploration, labor-market intelligence, and personalized career-planning website.

The goal is to create a platform that helps users discover careers, compare their prospects, understand exactly how to qualify, and develop the knowledge, habits, activities, and experiences that may improve their readiness and performance in their chosen occupations.

This must be a genuinely functional product, not just a landing page or an attractive prototype.

## 1. Preserve the existing project

The existing project is a Next.js, React, TypeScript, and Tailwind application.

Before making changes:

- Inspect the entire repository and existing architecture.
- Preserve existing working functionality and project structure wherever reasonable.
- Reuse installed dependencies when suitable.
- Keep GitHub and Netlify deployment compatibility.
- Do not unnecessarily recreate the project or overwrite working configurations.
- Add environment variable examples for external APIs.
- Never expose API keys in client-side code.
- Use responsive, accessible, production-quality components.

Implement directly in the existing repository.

## 2. Product design and visual identity

Create a distinctive, premium-quality interface with a modern career and education technology identity.

Visual characteristics:

- Elegant navy, midnight blue, teal, cyan, and violet accents.
- Light, dark, and system appearance modes.
- Spacious layouts, rounded cards, precise typography, and tasteful glass effects.
- Animated diagrams and numerical visualizations.
- Sophisticated transitions when users explore occupations.
- Smooth scrolling and scroll-triggered reveals.
- Animated salary indicators, counters, and skill meters.
- Interactive timelines, branching diagrams, radial charts, and geographic maps.
- Meaningful hover effects and intuitive navigation.
- Excellent desktop and mobile experiences.

Use Framer Motion or Motion, Recharts, and a suitable mapping library where appropriate.

Use performance-aware rendering, lazy loading, and reduced-motion accessibility support.

Avoid excessive animation that distracts from the information or slows down the website.

Make it feel like a professionally designed product combining career exploration, education planning, and labor-market analytics.

## 3. Main website architecture

Create these primary sections:

1. Home
2. Explore Careers
3. Career Finder
4. Compare Careers
5. Education & Pathways
6. Skills & Activities
7. Career Opportunity Map
8. My Career Plan
9. Resources & Methodology

Every major section must be functional and connected to shared career data.

Create intuitive navigation, global search, breadcrumbs, filters, and contextual links between related pages.

Do not create disconnected pages that duplicate occupational information.

## 4. Comprehensive occupational directory

Build a searchable, well-organized career directory based on recognized occupational classification systems, especially SOC and O*NET.

Organize occupations by broad industry or career family, then specialization and specific occupations.

Support fields such as:

- Healthcare and Medicine
- Technology and Software
- Engineering
- Business and Management
- Finance and Accounting
- Law and Public Safety
- Military and Public Service
- Science and Research
- Education
- Skilled Trades
- Construction
- Manufacturing
- Creative Arts and Design
- Media and Entertainment
- Sales and Marketing
- Hospitality and Tourism
- Agriculture and Environment
- Transportation and Logistics
- Social Services
- Entrepreneurship and related career pathways

Include common job titles, alternate titles, occupational codes, and related careers.

Users should be able to search by occupation, skills, interests, college majors, job titles, and broad career fields.

Provide filters including salary, required education, employment outlook, work environment, physical demands, career length, geographic location, and level of responsibility.

Build reusable occupation detail pages generated from structured data rather than manually hardcoding every career.

## 5. Salary, employment, and labor-market intelligence

Each occupation detail page should show, wherever verified data exists:

- Median annual pay
- Median hourly pay
- Available percentile or wage-distribution information
- Employment level
- Projected employment growth or decline
- Estimated annual openings
- Education typically required for entry
- Relevant work experience and training requirements
- Work environment and typical work schedule
- Regional salary variation
- Industry-specific information
- Sources, reference year, and last verified date

Integrate authoritative public data such as:

- U.S. Bureau of Labor Statistics
- Occupational Outlook Handbook
- Occupational Employment and Wage Statistics
- Employment Projections
- O*NET
- CareerOneStop
- U.S. Census Bureau
- College Scorecard
- NCES
- State workforce and labor-market datasets where available

Investigate official current data access methods and licensing before implementation.

Build a data ingestion and normalization layer that connects occupational codes across providers.

Cache data appropriately and handle unavailable endpoints, API failures, rate limits, and missing fields gracefully.

**Never fabricate salary, employment, education, career-success, or probability statistics.**

Clearly distinguish employment levels, employment rates, unemployment rates, growth forecasts, and job-opening estimates. These are different measures.

If a genuine occupation-specific employment rate cannot be calculated from available data, display the verified metrics instead, with appropriate explanations.

Do not mislabel data or imply that national figures represent local figures.

## 6. Individual career detail pages

Create comprehensive pages for specific occupations.

Each should include:

**Overview**
What the occupation does, common responsibilities, job titles, and typical work environments.

**Financial outlook**
Pay distributions, regional comparisons, and potential earnings progression where supported.

**Employment outlook**
Employment level, projected growth, openings, demand indicators, and historical trends where available.

**Daily working life**
Typical responsibilities, tasks, schedules, work styles, physical demands, and environments.

**Education**
Degrees, majors, certifications, licenses, and alternative entry routes.

**Skills**
Technical knowledge, subject expertise, practical experience, cognitive abilities, and interpersonal skills.

**Preparation activities**
Relevant extracurricular activities, sports, hobbies, projects, volunteering, and work experiences.

**Career pathway**
An interactive route from a user's current education and experience level to the occupation.

**Related careers**
Similar careers with comparisons explaining their similarities and differences.

**Sources**
Transparent citations and data collection methodology.

Use tabs or meaningful expandable sections to keep information organized rather than overwhelming users.

## 7. Career Finder: personalized discovery

Create an interactive career discovery experience.

Ask users about:

- Interests and preferred subjects
- Personality-related work preferences
- Strengths and transferable skills
- Activities they enjoy
- Preferred work environments
- Desired salary
- Geographic preferences
- Education budget
- Willingness to study or train
- Desired work-life balance
- Physical activity preferences
- Career priorities
- Current educational and professional experience

Allow users to skip questions.

Produce a ranked selection of potentially suitable occupations.

Explain why each recommendation appeared.

Include a visual breakdown covering interest alignment, skill alignment, working environment, salary preferences, and education requirements.

Use transparent weighted matching logic. Make preference weights configurable where practical.

Do not imply that the score is a scientifically validated probability of career success.

Avoid treating personality questionnaires as definitive aptitude tests or excluding users from occupations based on their demographics or disability status.

Allow users to adjust priorities and immediately see recommendations change.

## 8. Education and degree-to-career pathways

Make education planning a central feature.

For every occupation, identify available routes such as:

- High school preparation
- Community college
- Associate degrees
- Bachelor's degrees
- Graduate and professional degrees
- Certificate programs
- Trade schools
- Apprenticeships
- Military training routes where applicable
- Professional licensing
- Self-directed learning and portfolio development
- Relevant work experience

Not every career requires a degree, so avoid assuming college is always the best route.

Map degree and major programs to related occupational classifications when reliable mappings exist.

Show recommended academic subjects, possible prerequisite sequences, relevant college majors, and examples of specialization areas.

Include estimates of time, educational cost, and career readiness milestones only when supported by reliable sources or clearly labeled user-editable assumptions.

Where available, provide links to actual educational programs.

Explain differences between mandatory credentials, typical employer preferences, and optional credentials.

Show multiple routes to the same career rather than forcing one educational path.

## 9. What to study: detailed knowledge preparation

Go deeper than listing degrees.

For each occupation, provide a structured knowledge map with:

- Foundational subjects
- Intermediate concepts
- Advanced subjects
- Required technical competencies
- Related academic disciplines
- Recommended coursework
- Practical projects
- Hands-on experiences
- Professional reading and resources
- Optional specialization topics

For example, a software engineering pathway could include mathematics, computational thinking, programming fundamentals, data structures, system design, databases, testing, deployment, and portfolio projects.

A medical career would require entirely different scientific foundations, supervised training, and professional licensing.

Show prerequisites between topics using an interactive dependency graph.

Create a clear distinction between essential, recommended, and optional preparation.

Users should be able to mark skills as completed, in progress, or not started.

## 10. Sports, habits, hobbies, and extracurricular activities

This is an important and distinctive part of Career Path.

Build a research-informed module exploring which activities may help users develop transferable attributes relevant to particular careers.

Possible activity categories:

- Team sports
- Individual sports
- Endurance activities
- Wrestling and martial arts
- Water polo and swimming
- Debate and public speaking
- Chess and strategy games
- Music and performing arts
- Robotics and programming competitions
- Volunteering
- Leadership clubs
- Team projects
- Creative hobbies
- Research activities
- Fitness and exercise
- Structured practice
- Community involvement
- Internships and mentoring

For each occupation, identify potentially relevant attributes such as:

- Discipline
- Persistence
- Physical fitness
- Stress management
- Teamwork
- Communication
- Spatial reasoning
- Analytical thinking
- Leadership
- Creativity
- Attention to detail
- Emotional regulation
- Adaptability
- Decision-making under uncertainty

Create relationships connecting activities to transferable skills, and transferable skills to occupational demands.

Example:

Wrestling → repeated practice and physical conditioning → potentially relevant transferable skills → demanding occupations where these skills are useful.

Another example:

Debate → structured argumentation and public speaking → communication and reasoning → law, consulting, sales, public relations, and management.

Users should understand **why** an activity may be relevant, not simply receive a list.

Very important scientific standards:

- Clearly differentiate demonstrated findings, correlational evidence, expert reasoning, and speculative hypotheses.
- Do not assume participation in any particular sport causes career success.
- Do not claim wrestling or water polo predicts Navy SEAL success without credible supporting evidence.
- Account for selection effects and potential confounding factors when explaining research.
- Do not construct fake performance percentages, selection rates, or predictive scores.
- Describe activity recommendations as skill-building opportunities rather than guarantees of performance.
- Do not present a sport or hobby as mandatory when it is not.
- Accommodate alternative activities for people with different physical abilities and access to resources.

Create evidence indicators and source references for individual activity-career relationships.

Include a dedicated explanation of correlation versus causation.

## 11. Interactive career roadmap

Build a visually engaging, branching career roadmap engine.

Users can select:

- Target occupation
- Current education level
- Existing credentials
- Skills already acquired
- Previous work experience
- Location
- Budget
- Available weekly study time
- Preferred career preparation route

Generate an editable plan with appropriate milestones.

Example structure:

Career goal → preparation requirements → education or training → skill development → projects or work experience → certification or licensing → job search → career entry → advancement.

Show multiple valid pathways when available.

Each milestone should contain:

- Description
- Suggested resources
- Prerequisites
- Estimated effort where defensible
- Completion status
- Editable target date
- Next recommended actions

Present the roadmap as an animated connected-node diagram, with zooming, panning, expandable milestones, and an accessible text-based alternative.

Allow users to save plans and track progress locally.

Support browser storage initially; design persistence so authenticated synchronization can be introduced later without rebuilding the app.

## 12. Career comparison engine

Allow side-by-side comparison of at least three careers.

Compare:

- Salary
- Employment and outlook
- Education requirements
- Time to prepare
- Potential educational costs
- Work environments
- Lifestyle preferences
- Typical tasks
- Skill requirements
- Geographic opportunity
- Career mobility

Create visual comparisons, including bar charts, radar charts where suitable, and animated metric transitions.

Allow users to change comparison priorities.

Never force incomparable measurements into a single misleading score.

Include a clear explanation of tradeoffs.

## 13. Geographic opportunity maps

Create an interactive map-based labor-market explorer.

Allow users to select occupations and inspect available location-specific information.

Support state-level data first and more granular regions where reliable data exists.

Possible layers include:

- Median wages
- Employment levels
- Employment concentration
- Regional wage differences
- Available growth indicators
- Education and training programs
- Cost-of-living comparisons when reliable data is available

Use interactive maps with legends, tooltips, hover states, zooming, location selection, and smooth data transitions.

Use geographic identifiers and occupational codes consistently.

Clearly label unavailable regional information.

Do not imply an available job vacancy exists merely because an occupation has a high employment level.

Include the relevant source and year for each map metric.

## 14. Career skill visualization

Create interactive skill diagrams.

Features should include:

- Occupational skill profiles
- Importance and level indicators from O*NET where available
- Skill relationships
- Related occupations sharing similar skills
- User-reported experience levels
- Skill gaps
- Suggested projects or learning activities
- Cross-career transferable skills

Build visually striking skill graphs, radar displays, progress rings, and related-career networks.

Ensure graphs have meaningful labels, descriptions, and nonvisual alternatives.

Do not confuse O*NET occupational importance ratings with a measurement of an individual's ability.

## 15. Salary and education investment tools

Build interactive planning calculators.

Include:

- Education cost estimates
- Training duration
- Opportunity cost
- Potential student debt inputs
- Estimated salary comparison
- Career change scenarios
- Break-even projections
- Earnings comparison over time

Allow users to modify key assumptions.

Separate official data from scenario-based projections.

Display clear assumptions, limitations, and uncertainty.

Do not represent hypothetical projections as guaranteed outcomes.

## 16. Personalized user dashboard

Build a dashboard where users can:

- Save careers
- Bookmark educational pathways
- Save career comparisons
- Create several potential career plans
- Track completed learning milestones
- Record skill progress
- Record relevant extracurricular activities
- Revisit recommended careers
- See next suggested actions

Use clean progress visualizations and animated milestone completion.

Store anonymous users' progress locally first.

Provide an architecture suitable for optional accounts and synchronization later.

Avoid requiring registration just to explore careers.

## 17. Resources, evidence, and research transparency

Every evidence-based claim should have traceable supporting information.

Create a transparent sourcing system with:

- Source organization
- Dataset or publication title
- Publication year
- Data reference year
- Source URL
- Date retrieved where available
- Geographic coverage
- Relevant limitations

Use structured references within career, education, activity, and labor-market data.

Create a public methodology page covering occupational matching, recommendations, missing data, educational pathways, and the limits of predictive claims.

Where APIs are unavailable, implement graceful fallback behavior using legally usable, clearly identified datasets.

Never silently substitute fabricated numbers.

## 18. Data engineering and backend structure

Design the application with clean separation between UI, data retrieval, domain models, and calculation logic.

Create reusable TypeScript types for:

- Occupation
- Career field
- Occupation classification
- Wage observation
- Employment observation
- Employment projection
- Education pathway
- Degree or program
- Skill and knowledge competency
- Activity
- Research reference
- Geographic area
- Personalized recommendation
- Saved career plan

Normalize codes and maintain mappings between occupational and educational taxonomies.

Use server-side API access for protected credentials and secret values.

Implement caching and validation, plus understandable loading and error states.

Include realistic, clearly labeled examples only where necessary for demonstration.

Do not pretend example records are official live data.

## 19. Performance, accessibility, and quality

The application must work beautifully on desktop, tablet, and mobile.

Use:

- Responsive layout systems
- Accessible menus and controls
- Keyboard navigation
- Proper contrast
- Reduced-motion support
- Efficient animation
- Chart accessibility
- Lazy-loaded maps and heavy graphs
- Search optimization
- Appropriate page metadata
- Semantic headings
- Loading and error states

Use meaningful automated tests for data normalization, recommendation logic, pathway generation, and financial calculations.

Run linting, type checking, testing, and production build checks.

Fix errors caused by the implementation.

## 20. Implementation order

Do not attempt to solve everything by generating a collection of static mockup pages.

Implement coherent, working vertical slices.

Suggested order:

**Phase 1 — Functional foundation**
- Repository inspection
- Design system
- Navigation
- Data schemas
- Career directory
- Career detail pages
- Working search and filters
- Actual occupational data integration

**Phase 2 — Career intelligence**
- Salary and employment visualizations
- Education requirements
- Career comparison
- Geographic opportunity map

**Phase 3 — Personalized guidance**
- Career Finder
- Personalized matching
- Education pathway engine
- Learning and competency maps

**Phase 4 — Development and progress**
- Activities and transferable skills
- Evidence references
- Interactive career roadmap
- Progress tracking
- Saved careers and dashboards

**Phase 5 — Advanced tools and refinement**
- Financial modeling
- Advanced visualizations
- Additional geographic and educational data
- Performance optimization
- Accessibility testing
- Final visual polish

Complete as much functioning work as possible during this development task. If the entire scope cannot be completed in one pass, leave the project in a working state and explicitly document the implemented features, remaining work, and next development priorities.

## 21. Critical acceptance criteria

The result must satisfy these standards:

1. The user can browse real occupational data organized into meaningful career fields.
2. A career page provides useful employment, salary, education, and skills information.
3. Users can explore multiple routes toward a career.
4. The career discovery system responds meaningfully to user inputs.
5. Users can compare careers using available, properly labeled data.
6. Career maps and graphics are interactive rather than decorative.
7. Activity and habit recommendations explain relevant skills and supporting evidence.
8. A user can create and maintain an actionable career development plan.
9. Missing data is handled transparently.
10. The website is polished, responsive, and deployable through the existing GitHub and Netlify workflow.

Throughout implementation, prioritize accuracy, usability, and genuine functionality over an artificially impressive number of pages.

**Ultimate product vision:**

Career Path should answer five essential questions for every user:

- What careers might fit me?
- Which career offers the opportunities and lifestyle I want?
- What exactly do I need to learn and do to qualify?
- Which activities and habits can help me build relevant abilities?
- What should I do next to make progress?

Build the product around answering these questions exceptionally well.