

import { DesignPrompt } from './types';

export const DESIGN_PROMPTS: DesignPrompt[] = [
  {
    id: 1,
    title: "Glassmorphism Card with Animated Gradient",
    category: "Card",
    componentType: "Content",
    description: "Create a card with frosted glass effect (backdrop-blur-xl, bg-white/10) and an animated gradient border that rotates continuously. The border should shimmer through purple, blue, and pink. Include subtle inner glow.",
    useCases: [
      "Credit card or payment method displays",
      "Premium feature highlights on pricing pages",
      "User profile cards in dark mode apps",
      "Floating modal windows or HUDs"
    ],
    implementationTips: [
      "Ensure the background behind the card has enough visual detail for the blur to be noticeable.",
      "Use `backdrop-filter: blur()` for the glass effect.",
      "Add a thin white border with low opacity (e.g., `border-white/10`) to define edges.",
      "The animated border is often achieved using a pseudo-element with a conic or linear gradient that rotates."
    ],
    accessibility: "Ensure text contrast remains high (WCAG AA standard) against the semi-transparent background. Avoid relying solely on the glass effect to convey hierarchy."
  },
  {
    id: 2,
    title: "Bento Grid with Hover Depth",
    category: "Layout",
    componentType: "Content",
    description: "Create a 4x4 bento grid where each cell has different sizes. On hover, cells should lift with transform: translateZ(40px) and cast layered shadows. Adjacent cells should slightly tilt away creating a 'magnetic repel' effect.",
    useCases: [
      "Dashboard analytics overviews",
      "Portfolio project galleries",
      "Feature comparison grids",
      "Navigation hubs or 'Link in Bio' pages"
    ],
    implementationTips: [
      "Use CSS Grid for the layout (`grid-template-columns` and `grid-row/col-span`).",
      "Apply `perspective: 1000px` to the parent container to enable 3D transforms.",
      "Use `transform-style: preserve-3d` on elements if you plan to rotate them.",
      "For the 'magnetic' effect on neighbors, you may need JavaScript to calculate mouse position relative to adjacent cards."
    ],
    accessibility: "Ensure the tab order follows the logical visual flow. Scale effects should not be too jarring for users with vestibular disorders (prefers-reduced-motion)."
  },
  {
    id: 3,
    title: "Hero Section with Parallax Layers",
    category: "Layout",
    componentType: "Hero Section",
    description: "Create a hero with 3 layers of the same headline text at different opacities (100%, 20%, 5%) and scales, offset by subtle amounts. On scroll/mouse move, each layer moves at different speeds creating depth.",
    useCases: [
      "Landing page headers",
      "Creative portfolio introductions",
      "Storytelling or editorial content headers",
      "404 error pages"
    ],
    implementationTips: [
      "Use `transform: translate()` driven by `mousemove` or `scroll` events.",
      "Separate layers by z-index and opacity.",
      "Apply `will-change: transform` to optimize performance.",
      "Keep the movement subtle; large movements can feel cheap or cause motion sickness."
    ],
    accessibility: "Respect `prefers-reduced-motion` media query by disabling the parallax effect. Ensure the main text layer is readable and not obscured by the background layers."
  },
  {
    id: 4,
    title: "Floating Feature Cards Orbital",
    category: "Animation",
    componentType: "Utility",
    description: "Create 5-6 feature cards that orbit around a central element in 3D space using CSS transforms. Cards should face the viewer, have glass morphism, and the orbit should be elliptical with varying speeds.",
    useCases: [
      "Showcasing integrations or ecosystem partners",
      "Visualizing core product features orbiting a central value prop",
      "Loading screens for complex apps",
      "Interactive team member displays"
    ],
    implementationTips: [
      "Use absolute positioning and `animation` with keyframes for the orbit path.",
      "To keep cards facing forward while orbiting, apply a counter-rotation animation to the cards themselves.",
      "Use `animation-delay` to stagger the starting positions.",
      "Pause animation on hover using `:hover` or JS to allow users to interact with cards."
    ],
    accessibility: "Provide a pause button or ensure it pauses on hover. Ensure content is accessible via keyboard navigation even if moving."
  },
  {
    id: 5,
    title: "Split-Screen Comparison Slider",
    category: "Interaction",
    componentType: "Utility",
    description: "Create a before/after comparison with a draggable divider. Each side shows different design states. The divider should have a glowing line effect with a circular handle.",
    useCases: [
      "Image retouching comparisons",
      "Code diff views (Original vs Refactored)",
      "Dark mode vs Light mode previews",
      "Product version upgrades"
    ],
    implementationTips: [
      "Use a parent container with two absolute positioned children.",
      "Use `clip-path: inset()` on the top layer to reveal the bottom layer based on slider position.",
      "Map the mouse/touch X position to a percentage (0-100%).",
      "Add `cursor: ew-resize` to indicate interaction."
    ],
    accessibility: "Make the slider usable with keyboard arrow keys. Add proper ARIA roles (`role='slider'`) and labels."
  },
  {
    id: 6,
    title: "Stacked Card Carousel",
    category: "Card",
    componentType: "Content",
    description: "Create a card stack where the front card is full size, and cards behind progressively scale down (0.95, 0.9), translate up, and decrease opacity. Clicking reveals next card with smooth 3D flip animation.",
    useCases: [
      "Flashcards for learning apps",
      "Tinder-style swipe interfaces",
      "Testimonial rotators",
      "Onboarding walkthrough steps"
    ],
    implementationTips: [
      "Manage an array of items and a `currentIndex` state.",
      "Calculate `scale`, `translateY`, and `zIndex` based on the item's distance from the current index.",
      "Use CSS transitions for smooth movement when the index changes.",
      "Add a 'swiping' gesture support for mobile using touch events."
    ],
    accessibility: "Allow keyboard navigation (Left/Right arrows) to cycle through cards. Ensure hidden cards are not focusable until they become active."
  },
  {
    id: 7,
    title: "Morphing Blob Background",
    category: "Background",
    componentType: "Utility",
    description: "Create an animated SVG blob that continuously morphs between 4-5 organic shapes using CSS animations. Apply gradient fill with blur filter. Layer 2-3 blobs for depth.",
    useCases: [
      "Login/Signup page backgrounds",
      "Subtle movement behind static text content",
      "Brand identity for creative agencies",
      "Loading states"
    ],
    implementationTips: [
      "Use simple `div`s with `border-radius` percentages like `60% 40% 30% 70% / 60% 30% 70% 40%` and animate them.",
      "Alternatively, use SVG paths and SMIL or CSS animation for more complex shapes.",
      "Use `filter: blur(XL)` and `mix-blend-mode` (screen/overlay) to blend colors beautifully.",
      "Keep animation speeds slow (10s+) for a calming effect."
    ],
    accessibility: "Ensure the background doesn't interfere with text readability. Use high contrast text overlays."
  },
  {
    id: 8,
    title: "Text Reveal Clip-Path",
    category: "Animation",
    componentType: "Utility",
    description: "Create a headline where each word reveals with a clip-path: inset() animation, staggered by 0.1s. Words slide up from behind a 'mask' while simultaneously fading in.",
    useCases: [
      "Hero section headlines",
      "Animated quotes or testimonials",
      "Section dividers",
      "Loading completion states"
    ],
    implementationTips: [
      "Wrap each word or line in a `span` or `div`.",
      "Apply `clip-path: inset(0 0 100% 0)` initially (or similar) to hide it.",
      "Animate `clip-path` to `inset(0)` and `transform: translateY(0)` simultaneously.",
      "Use `animation-delay` based on the index of the word for the stagger effect."
    ],
    accessibility: "Ensure the full text is available to screen readers. Sometimes splitting text into spans can mess up screen readers; use `aria-label` on the parent with the full sentence."
  },
  {
    id: 9,
    title: "Isometric Card Grid",
    category: "Layout",
    componentType: "Content",
    description: "Create a grid of cards transformed to isometric view (rotateX(60deg) rotateZ(-45deg)). Cards should have visible 'thickness'. On hover, individual cards lift straight up with enhanced shadow.",
    useCases: [
      "Pricing tier comparisons",
      "Server/Database status monitoring visuals",
      "Infrastructure diagrams",
      "Game inventory UI"
    ],
    implementationTips: [
      "Apply the isometric rotation to the container or individual cards: `rotateX(60deg) rotateZ(-45deg) rotateY(0deg)`.",
      "Create 'thickness' using `::before` and `::after` pseudo-elements positioned to form the sides.",
      "Use `translateZ` on hover to lift the card.",
      "Ensure z-index is handled correctly so cards layer properly."
    ],
    accessibility: "Isometric text can be hard to read. Use this mainly for graphical elements or icons, or ensure the text rotation is corrected or easily readable on hover."
  },
  {
    id: 10,
    title: "Magnetic Button with Distortion",
    category: "Interaction",
    componentType: "Utility",
    description: "Create a button that 'follows' the cursor when hovering nearby. The button surface should subtly warp/distort toward the cursor. Include a glow effect that intensifies near the cursor.",
    useCases: [
      "Primary Call-to-Action buttons",
      "Navigation menu triggers",
      "Interactive portfolio links",
      "Sticky footer actions"
    ],
    implementationTips: [
      "Track mouse position relative to the button center.",
      "Translate the button by a fraction of the distance (e.g., `x * 0.3`).",
      "Reset position to `(0,0)` on `mouseleave`.",
      "Use `transform: translate()` for performance."
    ],
    accessibility: "Ensure the button remains clickable and doesn't move away too fast. The movement should be subtle."
  },
  {
    id: 11,
    title: "Scrolling Marquee Fade Edges",
    category: "Animation",
    componentType: "Utility",
    description: "Create an infinite horizontal marquee of logos/text that scrolls smoothly. Apply mask-image linear-gradient for faded edges. Pause on hover.",
    useCases: [
      "Client logo walls",
      "Recent news tickers",
      "Testimonial snippets",
      "Tag/Category clouds"
    ],
    implementationTips: [
      "Duplicate the content list (A, B, C -> A, B, C, A, B, C) to create a seamless loop.",
      "Animate `translateX` from `0` to `-50%`.",
      "Use `mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent)` for the fade effect.",
      "Use `animation-play-state: paused` on `:hover`."
    ],
    accessibility: "Users with attention disorders may find constant movement distracting. Provide a pause control or respect `prefers-reduced-motion`."
  },
  {
    id: 12,
    title: "Layered Paper Cut Effect",
    category: "Background",
    componentType: "Utility",
    description: "Create a section with 3-4 overlapping curved dividers at the top/bottom, each a slightly different shade. Animate layers on scroll so they separate/parallax at different rates.",
    useCases: [
      "Section transitions on landing pages",
      "Footer backgrounds",
      "Storytelling scroll experiences",
      "Header designs"
    ],
    implementationTips: [
      "Use SVG shapes or `clip-path: ellipse/path` for the curves.",
      "Stack absolute positioned divs with varying `z-index`.",
      "Use slightly different colors or opacity levels for each layer.",
      "Apply parallax using scroll position to modify `translateY` of each layer at different speeds."
    ],
    accessibility: "Purely decorative. Ensure sufficient contrast for content placed on top of these layers."
  },
  {
    id: 13,
    title: "Spotlight Cursor Effect",
    category: "Interaction",
    componentType: "Utility",
    description: "Create a dark overlay on a section that has a radial gradient 'hole' following the cursor, revealing content underneath. The spotlight should have soft edges.",
    useCases: [
      "Feature discovery / Onboarding",
      "Hidden easter eggs",
      "Gallery view interactions",
      "Landing page 'flashlight' effects"
    ],
    implementationTips: [
      "Use a full-size absolute `div` overlay.",
      "Update `mask-image` or `background` (radial gradient) using mouse coordinates.",
      "Example: `background: radial-gradient(circle at ${x}px ${y}px, transparent 100px, black 100%)` if using an overlay to hide.",
      "Alternatively, use `mask-image` to reveal."
    ],
    accessibility: "Do not hide critical information behind the spotlight. It should be a delight factor, not a barrier."
  },
  {
    id: 14,
    title: "3D Flip Cards with Reflection",
    category: "Card",
    componentType: "Content",
    description: "Create cards that flip 180° on hover revealing back content. Below each card, add a reflection using transform: scaleY(-1) with mask-image gradient fading down.",
    useCases: [
      "Product details (Front: Image, Back: Specs)",
      "Team member profiles (Front: Photo, Back: Bio)",
      "Game cards",
      "Quiz flashcards"
    ],
    implementationTips: [
      "Container needs `perspective`.",
      "Inner wrapper needs `transform-style: preserve-3d` and the transition.",
      "Front/Back faces need `backface-visibility: hidden`.",
      "Reflection is a duplicate element or pseudo-element with `transform: scaleY(-1)` and a fading mask."
    ],
    accessibility: "Ensure the flip can be triggered via keyboard focus, not just hover."
  },
  {
    id: 15,
    title: "Animated Mesh Gradient",
    category: "Background",
    componentType: "Utility",
    description: "Create a full-section background with 4-5 large gradient circles (blur: 100px+) that slowly drift and rotate. Layer a subtle noise texture on top.",
    useCases: [
      "SaaS landing page backgrounds",
      "App headers",
      "Mobile app splash screens",
      "Modern slide decks"
    ],
    implementationTips: [
      "Place several absolute divs with different background colors and high blur (`blur-3xl`).",
      "Animate their position and scale independently.",
      "Overlay a transparent PNG/SVG with noise texture and `opacity: 0.05` for a grainy look.",
      "Use `mix-blend-mode` to blend overlapping colors."
    ],
    accessibility: "Ensure contrast for text on top. Avoid high-speed movements."
  },
  {
    id: 16,
    title: "Aurora Borealis Text",
    category: "Animation",
    componentType: "Utility",
    description: "Text with a moving 'aurora' gradient background clipped to the characters. The background shifts slowly using background-position animation.",
    useCases: ["Headlines", "Brand Logos", "Feature Highlights", "Loading Text"],
    implementationTips: ["Use background-clip: text", "Animate background-position", "Use a wide background gradient"],
    accessibility: "Ensure high contrast against the page background."
  },
  {
    id: 17,
    title: "Cyberpunk Glitch Text",
    category: "Animation",
    componentType: "Utility",
    description: "Text that periodically distorts (skews/shifts) with RGB split channels using clip-path and text-shadow animations.",
    useCases: ["Error Pages", "Tech Branding", "Cyberpunk Themes", "Alerts"],
    implementationTips: ["Use ::before/::after for RGB layers", "Keyframe clip-path changes", "Randomize delays"],
    accessibility: "Avoid high-frequency flashing (seizure risk)."
  },
  {
    id: 18,
    title: "Neumorphic Soft UI Switch",
    category: "Interaction",
    componentType: "Form",
    description: "A toggle switch using soft shadows (light and dark) to create a plasticky, extruded look. Animated 'pressed' state.",
    useCases: ["Settings Panels", "Light Mode Apps", "Calculator UI", "Dashboards"],
    implementationTips: ["Use dual box-shadows (white + dark)", "Background color must match element color", "Inset shadow for active state"],
    accessibility: "Ensure visible state change beyond just shadow (e.g. color)."
  },
  {
    id: 19,
    title: "Holographic Foil Card",
    category: "Card",
    componentType: "Content",
    description: "A card with a pearlescent, rainbow gradient that shifts as you hover, simulating a holographic foil sticker.",
    useCases: ["Collectibles", "NFT Showcases", "Premium Memberships", "Achievements"],
    implementationTips: ["Use mix-blend-mode: overlay", "Radial gradient tracking mouse", "Brightness/Contrast filters"],
    accessibility: "Decorative effect, ensure content is readable."
  },
  {
    id: 20,
    title: "Typewriter Effect",
    category: "Animation",
    componentType: "Utility",
    description: "Text that reveals character by character with a blinking cursor at the end.",
    useCases: ["Hero Headlines", "Code Snippets", "Chatbots", "Storytelling"],
    implementationTips: ["Animate width from 0 to 100%", "Use step-end easing for cursor", "Monospace font works best"],
    accessibility: "Screen readers should read the full text."
  },
  {
    id: 21,
    title: "Magic Border Beam",
    category: "Card",
    componentType: "Content",
    description: "A card with a glowing line (beam) that travels around its border continuously.",
    useCases: ["Featured Items", "Active States", "Loading Placeholders", "Pricing Cards"],
    implementationTips: ["Absolute positioned div with conic gradient", "Mask the center", "Rotate animation"],
    accessibility: "Purely decorative."
  },
  {
    id: 22,
    title: "Grid Beams Background",
    category: "Background",
    componentType: "Utility",
    description: "A grid where illuminated beams randomly shoot along the grid lines, fading out.",
    useCases: ["Tech backgrounds", "Data visualization context", "Hero sections", "Waitlists"],
    implementationTips: ["CSS Grid or SVG", "Delay animations randomly", "Fade out opacity"],
    accessibility: "Low contrast background."
  },
  {
    id: 23,
    title: "Meteor Shower",
    category: "Background",
    componentType: "Utility",
    description: "Streaks of light (meteors) falling diagonally across a dark background, fading out.",
    useCases: ["Space themes", "Night mode backgrounds", "Success screens", "Landing pages"],
    implementationTips: ["Rotate elements 45deg", "Animate transform and opacity", "Box shadow for tail"],
    accessibility: "Avoid excessive motion."
  },
  {
    id: 24,
    title: "Sparkles Effect",
    category: "Animation",
    componentType: "Utility",
    description: "Random stars/sparkles popping in and out around an element or background.",
    useCases: ["Celebrations", "New Features", "AI Magic buttons", "Success states"],
    implementationTips: ["SVG stars", "Scale up/down animation", "Random positioning"],
    accessibility: "Decorative."
  },
  {
    id: 25,
    title: "MacOS Dock Zoom",
    category: "Interaction",
    componentType: "Navigation",
    description: "A row of icons that magnify in a wave pattern as the cursor moves over them.",
    useCases: ["Navigation bars", "Toolbars", "Galleries", "Menus"],
    implementationTips: ["Calculate distance from mouse to icon center", "Map distance to scale", "Transition width/height"],
    accessibility: "Ensure scale doesn't hide other content."
  },
  {
    id: 26,
    title: "Skeleton Shimmer Loading",
    category: "Interaction",
    componentType: "Feedback",
    description: "Placeholder shapes with a moving gradient shimmer to indicate loading.",
    useCases: ["Data fetching states", "Image placeholders", "Card loading", "Initial render"],
    implementationTips: ["Linear gradient background", "Animate background-position", "Grey tones"],
    accessibility: "Indicates progress."
  },
  {
    id: 27,
    title: "Radar Pulse",
    category: "Animation",
    componentType: "Feedback",
    description: "Concentric circles fading out and expanding from a center point like a radar ping.",
    useCases: ["Live status", "Map markers", "Searching...", "Recording indicators"],
    implementationTips: ["Multiple divs", "Scale and Opacity animation", "Staggered delays"],
    accessibility: "Ensure it's not too rapid."
  },
  {
    id: 28,
    title: "Ripple Button",
    category: "Interaction",
    componentType: "Utility",
    description: "Clicking a button creates an expanding circle ripple effect from the click point.",
    useCases: ["Material Design buttons", "Interactive elements", "Touch feedback", "CTAs"],
    implementationTips: ["Overflow hidden on button", "Absolute circle at click coords", "Animate scale"],
    accessibility: "Visual feedback."
  },
  {
    id: 29,
    title: "Sliding Tabs Underline",
    category: "Interaction",
    componentType: "Navigation",
    description: "Tabs where the active underline slides smoothly to the new active tab instead of jumping.",
    useCases: ["Navigation menus", "Settings categories", "Content switchers", "Filters"],
    implementationTips: ["Absolute positioned line", "Update left/width based on active tab ref", "Transition all"],
    accessibility: "Use ARIA tabs roles."
  },
  {
    id: 30,
    title: "Stacked Notifications",
    category: "Card",
    componentType: "Content",
    description: "Toast notifications that stack vertically, scaling down and moving back as new ones arrive.",
    useCases: ["App alerts", "Feed updates", "Message inbox", "Activity logs"],
    implementationTips: ["Absolute positioning", "Scale/Translate based on index", "Z-index management"],
    accessibility: "Live regions for screen readers."
  },
  {
    id: 31,
    title: "Blur Focus Cards",
    category: "Interaction",
    componentType: "Content",
    description: "Hovering one card blurs/dims all other cards in the group to focus attention.",
    useCases: ["Galleries", "Team pages", "Portfolio grids", "Feature lists"],
    implementationTips: ["Group hover effect", "Peer or Group-hover selectors", "Transition filter"],
    accessibility: "Ensure focus state does same."
  },
  {
    id: 32,
    title: "Interactive Grid Pattern",
    category: "Background",
    componentType: "Utility",
    description: "A grid background where squares light up or change color when hovered.",
    useCases: ["Hero backgrounds", "Tech aesthetic", "Interactive art", "Landing pages"],
    implementationTips: ["CSS Grid", "Javascript for hover state", "Fade out transition"],
    accessibility: "Decorative."
  },
  {
    id: 33,
    title: "Button Shine Sweep",
    category: "Animation",
    componentType: "Utility",
    description: "A gleam of light sweeps across a button to draw attention.",
    useCases: ["Primary CTAs", "Upgrade buttons", "Special offers", "Submit actions"],
    implementationTips: ["Angled gradient overlay", "Animate left/transform", "Overflow hidden"],
    accessibility: "Don't loop forever if distracting."
  },
  {
    id: 34,
    title: "Sun/Moon Theme Toggle",
    category: "Interaction",
    componentType: "Form",
    description: "An animated switch that morphs between a sun and a moon with cloud/star details.",
    useCases: ["Theme switchers", "Mode toggles", "Settings", "Visual delight"],
    implementationTips: ["SVG morphing", "Rotate/Scale transitions", "Color transition"],
    accessibility: "Label clearly."
  },
  {
    id: 35,
    title: "Dot Pulse Loader",
    category: "Animation",
    componentType: "Feedback",
    description: "Three dots that scale up and down in a wave pattern.",
    useCases: ["Typing indicators", "Wait states", "Processing", "Buffering"],
    implementationTips: ["Keyframe scale", "Staggered animation delay", "Flex layout"],
    accessibility: "Aria-label 'Loading'."
  },
  {
    id: 36,
    title: "Circular Progress Ring",
    category: "Animation",
    componentType: "Feedback",
    description: "A chart ring that fills up to a percentage with a smooth stroke animation.",
    useCases: ["Stats", "Health goals", "Upload progress", "Skills"],
    implementationTips: ["SVG stroke-dasharray", "Animate stroke-dashoffset", "Round linecap"],
    accessibility: "Show text value."
  },
  {
    id: 37,
    title: "Wave Footer",
    category: "Background",
    componentType: "Utility",
    description: "Animated wave shapes at the bottom of a section simulating flowing water.",
    useCases: ["Footers", "Section dividers", "Playful themes", "Hero bottoms"],
    implementationTips: ["SVG paths", "Animate translateX", "Multiple layers opacity"],
    accessibility: "Decorative."
  },
  {
    id: 38,
    title: "Code Typing Terminal",
    category: "Animation",
    componentType: "Utility",
    description: "A window looking like a terminal where code is typed out automatically.",
    useCases: ["Developer portfolios", "SaaS docs", "Feature demos", "Hero sections"],
    implementationTips: ["Monospace font", "Typewriter logic", "Syntax highlighting colors"],
    accessibility: "Read out code."
  },
  {
    id: 39,
    title: "Avatar Stack",
    category: "Layout",
    componentType: "Content",
    description: "A horizontal stack of user avatars that reveal fully on hover.",
    useCases: ["Social proof", "Team members", "Comments", "Collaborators"],
    implementationTips: ["Negative left margin", "Hover translate/z-index", "Border for separation"],
    accessibility: "List of names."
  },
  {
    id: 40,
    title: "Breadcrumb Collapse",
    category: "Layout",
    componentType: "Navigation",
    description: "Breadcrumbs that collapse into dots when too long and expand on hover.",
    useCases: ["Navigation", "File paths", "Deep hierarchies", "Mobile headers"],
    implementationTips: ["Max-width", "Text-overflow ellipsis", "Hover expansion"],
    accessibility: "Full path available."
  },
  {
    id: 41,
    title: "Badge Pulse",
    category: "Animation",
    componentType: "Feedback",
    description: "A status badge (e.g. 'Live') with a pulsating ring to indicate activity.",
    useCases: ["Status indicators", "Live events", "Online users", "Notifications"],
    implementationTips: ["Pseudo-element ring", "Scale and fade animation", "Red/Green colors"],
    accessibility: "Color blind safe."
  },
  {
    id: 42,
    title: "Input Focus Expand",
    category: "Interaction",
    componentType: "Form",
    description: "An input field that expands its width and glows when focused.",
    useCases: ["Search bars", "Forms", "Comment fields", "Chat inputs"],
    implementationTips: ["Transition width", "Box-shadow focus", "Blue accent"],
    accessibility: "Focus visible."
  },
  {
    id: 43,
    title: "Search Bar Expand",
    category: "Interaction",
    componentType: "Form",
    description: "A search icon that expands into a full input field when clicked.",
    useCases: ["Headers", "Mobile menus", "Toolbars", "Compact UIs"],
    implementationTips: ["Width transition", "Opacity fade for input", "Ref focus"],
    accessibility: "Keyboard expand."
  },
  {
    id: 44,
    title: "Tooltip Animated",
    category: "Interaction",
    componentType: "Utility",
    description: "A tooltip that scales and fades in from the trigger element.",
    useCases: ["Info icons", "Help text", "Definitions", "Context"],
    implementationTips: ["Opacity/Scale transition", "Absolute positioning", "Arrow pointer"],
    accessibility: "Aria-describedby."
  },
  {
    id: 45,
    title: "Accordion Spring",
    category: "Interaction",
    componentType: "Utility",
    description: "An accordion that opens with a springy bounce animation.",
    useCases: ["FAQs", "Menus", "Details", "Spoilers"],
    implementationTips: ["Max-height transition", "Cubic-bezier easing", "Overflow hidden"],
    accessibility: "Aria-expanded."
  },
  {
    id: 46,
    title: "Perspective Dashboard Hero",
    category: "Hero",
    componentType: "Hero Section",
    description: "A 3D tilted dashboard interface that floats gently. Uses perspective transform to create depth.",
    useCases: ["SaaS Landing Pages", "App Showcases", "Feature Highlights", "Software Portfolios"],
    implementationTips: ["perspective: 2000px", "rotateX(20deg) rotateY(-10deg)", "Box shadow layering"],
    accessibility: "Purely decorative, ensure content is legible."
  },
  {
    id: 47,
    title: "Floating Phone Mockup",
    category: "Hero",
    componentType: "Hero Section",
    description: "A sleek mobile phone container that floats up and down with internal scrolling content.",
    useCases: ["Mobile App Landing Pages", "Feature Walkthroughs", "Device Previews", "Hero Images"],
    implementationTips: ["Border-radius masking", "Animation float", "Inner shadow for bezel"],
    accessibility: "Decorative."
  },
  {
    id: 48,
    title: "Retro Horizon Grid",
    category: "Hero",
    componentType: "Hero Section",
    description: "A vaporwave-style perspective grid floor that moves endlessly towards the viewer.",
    useCases: ["Tech backgrounds", "Retro themes", "Music sites", "Creative portfolios"],
    implementationTips: ["Perspective container", "Linear gradient grid", "Animate background position"],
    accessibility: "Low contrast background."
  },
  {
    id: 49,
    title: "Modern SaaS Hero",
    category: "Hero",
    componentType: "Hero Section",
    description: "High-converting layout with centered typography, dual CTA buttons, and a 'peeking' dashboard interface that fades in from the bottom.",
    useCases: ["SaaS Startups", "Product Launches", "Enterprise Software", "Marketing Sites"],
    implementationTips: ["Text-center", "Gradient text for emphasis", "Perspective 3D transform for dashboard preview"],
    accessibility: "Clear H1, distinct CTA buttons."
  },
  {
    id: 50,
    title: "Split Screen Foundation",
    category: "Hero",
    componentType: "Hero Section",
    description: "A robust 50/50 layout: Bold typography and lead capture form on the left, interactive abstract 3D visual on the right.",
    useCases: ["Consulting Firms", "Agency Portfolios", "Webinars", "Ebooks"],
    implementationTips: ["Grid cols-2", "Order-1/Order-2 for mobile stacking", "Sticky alignment"],
    accessibility: "Logical reading order."
  },
  {
    id: 51,
    title: "Cinematic Glow Hero",
    category: "Hero",
    componentType: "Hero Section",
    description: "Dark mode heavy hero with a massive, pulsing background glow, floating particles, and stark white typography.",
    useCases: ["Gaming", "Crypto/Web3", "High-end Fashion", "Movie/Media"],
    implementationTips: ["Radial gradient background", "Animate pulse opacity", "Mix-blend-mode overlay"],
    accessibility: "Ensure text contrast against glow."
  },
  // === NEW REUSABLE UI COMPONENTS (52-71) ===
  {
    id: 52,
    title: "Magnetic Button",
    category: "Interaction",
    componentType: "Utility",
    description: "A button that follows the cursor with a magnetic pull effect. The button smoothly translates towards the mouse position within its bounds, creating an engaging interactive experience.",
    useCases: ["Call-to-action buttons", "Navigation links", "Interactive portfolios", "Gaming interfaces"],
    implementationTips: ["Track mouse position relative to button center", "Apply transform translate based on distance", "Use transition for smooth return on mouse leave", "Add scale effect on hover"],
    accessibility: "Ensure button remains clickable and keyboard accessible. Motion should respect prefers-reduced-motion."
  },
  {
    id: 53,
    title: "Ripple Button",
    category: "Interaction",
    componentType: "Utility",
    description: "Material Design inspired button with expanding ripple effect on click. The ripple originates from the click position and expands outward with a fade animation.",
    useCases: ["Form submissions", "Action buttons", "Mobile-first interfaces", "Touch interactions"],
    implementationTips: ["Track click coordinates", "Create ripple element at click position", "Animate scale and opacity", "Remove ripple after animation"],
    accessibility: "Provides visual feedback for click actions. Ensure focus states are visible."
  },
  {
    id: 54,
    title: "Glowing Text",
    category: "Animation",
    componentType: "Utility",
    description: "Text with animated neon glow effects using drop-shadow filters. Supports multiple color themes including rainbow gradients with pulsing intensity.",
    useCases: ["Hero headlines", "Brand names", "Gaming UI", "Cyberpunk themes"],
    implementationTips: ["Use drop-shadow filter for glow", "Layer multiple shadows for intensity", "Animate brightness/opacity", "Use background-clip for gradient text"],
    accessibility: "Ensure base text color has sufficient contrast. Glow is decorative enhancement."
  },
  {
    id: 55,
    title: "Typing Text Animation",
    category: "Animation",
    componentType: "Utility",
    description: "Typewriter effect that types out text character by character with a blinking cursor. Supports multiple strings that cycle through with delete animation.",
    useCases: ["Hero sections", "Terminal-style interfaces", "Code demonstrations", "Interactive storytelling"],
    implementationTips: ["Use setTimeout for character timing", "Track current character index", "Implement delete mode for cycling", "Add cursor blink animation"],
    accessibility: "Provide complete text in aria-label. Consider prefers-reduced-motion."
  },
  {
    id: 56,
    title: "Glitch Text Effect",
    category: "Animation",
    componentType: "Utility",
    description: "Cyberpunk-style glitch animation using CSS pseudo-elements with offset color layers. Creates a digital distortion effect with configurable intensity.",
    useCases: ["Error states", "Sci-fi themes", "Gaming interfaces", "Edgy branding"],
    implementationTips: ["Use ::before and ::after pseudo-elements", "Offset with clip-path", "Apply different colors (cyan/red)", "Randomize animation timing"],
    accessibility: "Use sparingly. Provide alternative for users sensitive to flashing."
  },
  {
    id: 57,
    title: "Parallax 3D Card",
    category: "Card",
    componentType: "Content",
    description: "Card component with 3D perspective tilt that responds to mouse movement. Includes glare effect and depth shadow that follow the tilt angle.",
    useCases: ["Product cards", "Portfolio items", "Profile cards", "Feature highlights"],
    implementationTips: ["Use perspective transform on parent", "Calculate rotateX/Y from mouse position", "Add glare overlay at mouse position", "Transition on mouse leave"],
    accessibility: "Content must be readable regardless of tilt angle."
  },
  {
    id: 58,
    title: "Morphing Blob Background",
    category: "Background",
    componentType: "Utility",
    description: "Organic animated blob shapes that continuously morph using CSS border-radius animations. Perfect for ambient backgrounds with blur effects.",
    useCases: ["Hero backgrounds", "Section dividers", "Loading screens", "Ambient decoration"],
    implementationTips: ["Animate border-radius with many values", "Use blur filter", "Layer multiple blobs", "Apply mix-blend-mode"],
    accessibility: "Purely decorative. Ensure sufficient contrast for overlaid content."
  },
  {
    id: 59,
    title: "Floating Particles",
    category: "Background",
    componentType: "Utility",
    description: "Ambient floating particles that drift upward or in random directions. Configurable count, size, color, and speed for various atmospheres.",
    useCases: ["Hero sections", "Night/space themes", "Celebration effects", "Ambient backgrounds"],
    implementationTips: ["Generate particles with random positions", "Use CSS animation for movement", "Vary animation duration per particle", "Apply subtle opacity changes"],
    accessibility: "Decorative only. Keep particle count reasonable for performance."
  },
  {
    id: 60,
    title: "Gradient Border Wrapper",
    category: "Card",
    componentType: "Content",
    description: "Container with animated gradient border that rotates through colors. Supports multiple gradient presets (rainbow, sunset, ocean) with glow effects.",
    useCases: ["Featured content cards", "Subscription tiers", "Special announcements", "NFT displays"],
    implementationTips: ["Use pseudo-element for gradient", "Animate background-position", "Inner container with solid background", "Add blur for glow effect"],
    accessibility: "Border is decorative. Ensure content inside has proper contrast."
  },
  {
    id: 61,
    title: "Skeleton Loader",
    category: "Animation",
    componentType: "Feedback",
    description: "Customizable skeleton loading placeholders with shimmer animation. Supports various shapes including text lines, circles, and cards.",
    useCases: ["Content loading states", "Image placeholders", "List loading", "Form loading"],
    implementationTips: ["Use linear-gradient for shimmer", "Animate background-position", "Match skeleton to final content shape", "Provide multiple variants"],
    accessibility: "Use aria-busy and aria-live for loading states."
  },
  {
    id: 62,
    title: "Animated Number Counter",
    category: "Animation",
    componentType: "Data Display",
    description: "Numbers that animate from start to end value with easing. Triggers on scroll into view with customizable duration and formatting.",
    useCases: ["Statistics displays", "Dashboard metrics", "Achievement counters", "Pricing displays"],
    implementationTips: ["Use requestAnimationFrame", "Apply easing function", "Intersection Observer for trigger", "Format with separators"],
    accessibility: "Provide final value in aria-label. Don't rely solely on animation."
  },
  {
    id: 63,
    title: "Spotlight Cursor Effect",
    category: "Interaction",
    componentType: "Utility",
    description: "A radial gradient spotlight that follows the cursor position, creating a flashlight effect over content. Great for dark themes.",
    useCases: ["Dark mode emphasis", "Feature exploration", "Interactive galleries", "Mystery reveals"],
    implementationTips: ["Track mouse position", "Position radial gradient at cursor", "Use pointer-events: none on overlay", "Smooth transition for performance"],
    accessibility: "Decorative effect only. Content must be accessible without it."
  },
  {
    id: 64,
    title: "Text Reveal Animation",
    category: "Animation",
    componentType: "Utility",
    description: "Text that reveals word-by-word or character-by-character with staggered animations. Triggers on scroll or hover with directional options.",
    useCases: ["Hero headlines", "Section intros", "Quote displays", "Dramatic reveals"],
    implementationTips: ["Split text into spans", "Apply staggered animation-delay", "Use overflow hidden for clip effect", "Intersection Observer for trigger"],
    accessibility: "Full text should be available to screen readers immediately."
  },
  {
    id: 65,
    title: "Infinite Marquee",
    category: "Animation",
    componentType: "Utility",
    description: "Seamlessly looping horizontal or vertical scroll animation. Perfect for logo walls, testimonials, or news tickers with pause on hover.",
    useCases: ["Client logos", "Testimonial carousels", "News tickers", "Skill/tech stacks"],
    implementationTips: ["Duplicate content for seamless loop", "CSS animation translateX", "Calculate duration from content width", "Pause on hover"],
    accessibility: "Provide alternative static view. Respect prefers-reduced-motion."
  },
  {
    id: 66,
    title: "Radial Progress Circle",
    category: "Animation",
    componentType: "Feedback",
    description: "Circular progress indicator using SVG stroke-dasharray animation. Supports gradient colors and animated fill on scroll.",
    useCases: ["Skill levels", "Loading progress", "Goal tracking", "Statistics visualization"],
    implementationTips: ["SVG circle with stroke-dasharray", "Calculate circumference", "Animate stroke-dashoffset", "Rotate -90deg for top start"],
    accessibility: "Provide percentage in accessible text. Use role='progressbar'."
  },
  {
    id: 67,
    title: "Animated Tooltip",
    category: "Interaction",
    componentType: "Utility",
    description: "Tooltip component with smooth enter/exit animations. Supports multiple positions (top, bottom, left, right) and style variants.",
    useCases: ["Help text", "Feature hints", "Abbreviation explanations", "Icon labels"],
    implementationTips: ["Position absolute to trigger", "Animate opacity and transform", "Use delay before showing", "Arrow using border trick"],
    accessibility: "Use aria-describedby. Ensure keyboard accessible via focus."
  },
  {
    id: 68,
    title: "Fancy Toggle Switch",
    category: "Interaction",
    componentType: "Form",
    description: "Premium toggle switch with smooth thumb animation and optional glow effect. Supports icons inside track and multiple size variants.",
    useCases: ["Settings toggles", "Dark mode switch", "Feature flags", "Boolean inputs"],
    implementationTips: ["Use checkbox input for accessibility", "Style with pseudo-elements", "Animate translateX for thumb", "Add focus-visible ring"],
    accessibility: "Use proper checkbox input with label. Ensure focus states visible."
  },
  {
    id: 69,
    title: "Shimmer Card",
    category: "Card",
    componentType: "Content",
    description: "Card with a diagonal shimmer animation that sweeps across the surface. Creates a premium, polished look for featured content.",
    useCases: ["Featured products", "Premium tiers", "New items", "Highlighted content"],
    implementationTips: ["Linear gradient at angle", "Animate translateX across card", "Use overflow hidden", "Trigger on hover or continuous"],
    accessibility: "Animation is decorative. Content should be accessible."
  },
  {
    id: 70,
    title: "3D Hover Tilt",
    category: "Interaction",
    componentType: "Utility",
    description: "Wrapper component that adds 3D perspective tilt on hover with configurable intensity, glare effect, and smooth return animation.",
    useCases: ["Image galleries", "Card hover effects", "Interactive elements", "Product displays"],
    implementationTips: ["Apply perspective to parent", "Calculate tilt from mouse position", "Add glare overlay", "Smooth transition on leave"],
    accessibility: "Purely visual enhancement. Content unchanged by tilt."
  },
  {
    id: 71,
    title: "Magnetic Cursor",
    category: "Interaction",
    componentType: "Utility",
    description: "Custom cursor that replaces default cursor with styled element. Magnetizes towards interactive elements with trail effect option.",
    useCases: ["Creative portfolios", "Agency sites", "Interactive experiences", "Art galleries"],
    implementationTips: ["Hide default cursor", "Track mouse with requestAnimationFrame", "Detect magnetic elements with data attribute", "Add trail with delayed positions"],
    accessibility: "Ensure all interactions work without custom cursor. Provide fallback."
  },
  // === NEW SAAS COMPONENTS WITH REACT MOTION (72-91) ===
  {
    id: 72,
    title: "Animated Pricing Cards",
    category: "Card",
    componentType: "Marketing",
    description: "Premium pricing cards with staggered reveal animations, hover lift effects, animated checkmarks, and highlighted tier with glowing border. Built with Framer Motion spring physics.",
    useCases: ["SaaS pricing pages", "Subscription tiers", "Plan comparisons", "Upgrade prompts"],
    implementationTips: ["Use spring animations for natural feel", "Stagger feature list items", "Add badge animation for highlighted tier", "Scale on hover with shadow depth"],
    accessibility: "Ensure pricing information is readable. Focus states for keyboard navigation."
  },
  {
    id: 73,
    title: "Testimonial Showcase",
    category: "Layout",
    componentType: "Marketing",
    description: "5 testimonial variants: Cards Grid, Masonry Wall, Featured Large, Minimal Style, and Video Testimonials. Each with smooth transitions and hover effects using Framer Motion.",
    useCases: ["Social proof sections", "Customer stories", "Reviews display", "Case study highlights"],
    implementationTips: ["Use AnimatePresence for smooth transitions", "Implement drag gesture for carousel", "Stagger card animations on scroll", "Add quote icon animation"],
    accessibility: "Include author attribution. Ensure quotes are properly marked up."
  },
  {
    id: 74,
    title: "Animated Stats Counter",
    category: "Animation",
    componentType: "Data Display",
    description: "Animated number counters with 3 variants: Cards with icons, Inline gradient style, and Minimal with animated borders. Numbers animate on scroll into view with spring physics.",
    useCases: ["Metrics display", "Achievement counters", "Dashboard KPIs", "Social proof numbers"],
    implementationTips: ["Use useSpring for smooth counting", "Intersection Observer trigger", "Add trend indicators", "Format large numbers with separators"],
    accessibility: "Provide final values in aria-label. Don't rely solely on animation."
  },
  {
    id: 75,
    title: "Process Timeline",
    category: "Layout",
    componentType: "Data Display",
    description: "Animated timeline with 2 variants: Vertical with scroll-linked line animation and Horizontal with staggered steps. Supports completed, current, and upcoming states with pulse effects.",
    useCases: ["Onboarding flows", "Feature roadmaps", "How it works sections", "Project milestones"],
    implementationTips: ["Use useScroll for progress line", "Pulse animation for current step", "Stagger step reveals on scroll", "Counter-rotate icons to stay upright"],
    accessibility: "Use proper list semantics. Ensure status is communicated beyond color."
  },
  {
    id: 76,
    title: "Feature Bento Grid",
    category: "Layout",
    componentType: "Content",
    description: "Masonry-style bento grid with staggered reveal animations, spotlight hover effect, and configurable spans. Built with Framer Motion for smooth entrance and hover states.",
    useCases: ["Feature showcases", "Dashboard layouts", "Portfolio grids", "Service highlights"],
    implementationTips: ["Use CSS Grid with span classes", "Add mouse-tracking spotlight effect", "Stagger entrance animations", "Animate borders on hover"],
    accessibility: "Maintain logical reading order. Ensure all content is keyboard accessible."
  },
  {
    id: 77,
    title: "Logo Cloud",
    category: "Layout",
    componentType: "Marketing",
    description: "3 variants for displaying partner/client logos: Grid with hover effects, Infinite scroll marquee, and Simple fade layout. Supports grayscale filter with color on hover.",
    useCases: ["Client logos", "Partner badges", "Integration showcases", "Trust signals"],
    implementationTips: ["Duplicate logos for seamless scroll", "Fade edges with mask-image", "Pause on hover", "Grayscale to color transition"],
    accessibility: "Include alt text for all logos. Marquee should respect prefers-reduced-motion."
  },
  {
    id: 78,
    title: "CTA Banner",
    category: "Card",
    componentType: "Marketing",
    description: "4 CTA banner variants: Gradient with shimmer, Glass morphism, Dark solid, and Bordered. Includes animated background patterns, floating elements, and spring button animations.",
    useCases: ["Newsletter signups", "Free trial prompts", "Upgrade CTAs", "Contact sections"],
    implementationTips: ["Animate background gradient position", "Add floating decorative elements", "Use spring physics for buttons", "Include noise texture overlay"],
    accessibility: "Clear call-to-action text. Sufficient contrast for all variants."
  },
  {
    id: 79,
    title: "Feature Tabs",
    category: "Interaction",
    componentType: "Navigation",
    description: "3 tab variants: Pills with sliding background, Underline with animated indicator, and Cards with selection state. Smooth content transitions using AnimatePresence.",
    useCases: ["Feature comparisons", "Settings panels", "Content switchers", "Multi-step forms"],
    implementationTips: ["Use layoutId for tab indicator", "AnimatePresence for content", "Spring physics for smooth motion", "Stagger card entrances"],
    accessibility: "Use ARIA tabs pattern. Ensure keyboard navigation works correctly."
  },
  {
    id: 80,
    title: "Integration Orbit",
    category: "Animation",
    componentType: "Utility",
    description: "Circular orbiting integration logos around a central element. Supports pause on hover, tooltip on item hover, and counter-rotation to keep items upright.",
    useCases: ["Integration showcases", "Ecosystem visualization", "Technology stack", "Partner networks"],
    implementationTips: ["Use transform rotate for orbit", "Counter-rotate items to stay upright", "Pause animation on hover", "Show tooltip for hovered item"],
    accessibility: "Provide list of integrations for screen readers. Pause should be keyboard accessible."
  },
  {
    id: 81,
    title: "Notification Toast",
    category: "Interaction",
    componentType: "Feedback",
    description: "Animated toast notification system with 4 types (success, error, warning, info), auto-dismiss with progress bar, and stacked positioning. Includes useToast hook.",
    useCases: ["Success messages", "Error alerts", "System notifications", "Action confirmations"],
    implementationTips: ["Use AnimatePresence for enter/exit", "Spring physics for slide in", "Progress bar tied to duration", "Support action buttons"],
    accessibility: "Use aria-live for announcements. Ensure toasts don't block content."
  },
  {
    id: 82,
    title: "Morphing Text",
    category: "Animation",
    componentType: "Utility",
    description: "6 text animation variants: Fade, Slide up, Flip 3D, Blur, Typewriter with cursor, and Scramble effect. Cycles through array of texts with configurable interval.",
    useCases: ["Hero headlines", "Role/title cycling", "Feature highlights", "Loading messages"],
    implementationTips: ["AnimatePresence for smooth transitions", "Scramble uses random characters", "Typewriter has blinking cursor", "Support prefix/suffix text"],
    accessibility: "Full text available to screen readers. Respect prefers-reduced-motion."
  },
  {
    id: 83,
    title: "Floating Dashboard",
    category: "Hero",
    componentType: "Hero Section",
    description: "4 dashboard mockup variants: 3D Tilt following mouse, Float with gentle animation, Parallax on scroll, and Perspective with scroll reveal. Includes glow effect and browser chrome.",
    useCases: ["SaaS hero sections", "Product showcases", "App previews", "Feature demos"],
    implementationTips: ["Use perspective transform", "Track mouse for 3D tilt", "Add glare effect overlay", "Include browser chrome for context"],
    accessibility: "Decorative element. Ensure actual content is accessible separately."
  },
  {
    id: 84,
    title: "Animated FAQ",
    category: "Interaction",
    componentType: "Utility",
    description: "4 FAQ variants: Classic Accordion with spring animation, Cards Grid with modal, Minimal with plus icon rotation, and Chat-style with progressive reveal.",
    useCases: ["FAQ sections", "Help documentation", "Support pages", "Knowledge bases"],
    implementationTips: ["Use AnimatePresence for expand/collapse", "Spring physics for smooth open", "Rotate icon on toggle", "Chat variant reveals progressively"],
    accessibility: "Use proper disclosure pattern. ARIA expanded states required."
  },
  {
    id: 85,
    title: "Scroll Reveal Section",
    category: "Animation",
    componentType: "Utility",
    description: "Multiple scroll-triggered animations: Fade, Slide variants, Scale, Blur, and Split. Plus ParallaxSection, ScaleOnScroll, RotateOnScroll, OpacityOnScroll, and StickySection.",
    useCases: ["Section entrances", "Content reveals", "Scroll storytelling", "Landing page effects"],
    implementationTips: ["Use useInView for trigger", "useScroll for progress-based effects", "Support staggered children", "Configure threshold for trigger point"],
    accessibility: "Content must be accessible without animation. Respect prefers-reduced-motion."
  },
  {
    id: 86,
    title: "Animated Navigation",
    category: "Layout",
    componentType: "Navigation",
    description: "4 navigation variants: Default with dropdowns, Floating pill style, Minimal inline, and Centered layout. Supports hide on scroll, transparency, and mobile menu.",
    useCases: ["Site headers", "App navigation", "Landing pages", "Dashboard layouts"],
    implementationTips: ["Track scroll for hide/show", "AnimatePresence for mobile menu", "Dropdown with hover delay", "Floating variant with shadow"],
    accessibility: "Full keyboard navigation. Mobile menu properly announced."
  },
  {
    id: 87,
    title: "Glowing Card",
    category: "Card",
    componentType: "Content",
    description: "4 glow variants: Default with outer glow, Spotlight following cursor, Border with rotating gradient, and Ambient with pulsing multi-layer glow. Configurable color and intensity.",
    useCases: ["Featured content", "Premium features", "Call-to-action cards", "Highlight sections"],
    implementationTips: ["Use blur filter for glow", "Track mouse for spotlight", "Conic gradient for border", "Layer multiple glows for ambient"],
    accessibility: "Glow is decorative. Content must be accessible without effect."
  },
  {
    id: 88,
    title: "Stacked Cards",
    category: "Card",
    componentType: "Content",
    description: "4 card stack variants: Stack with click to cycle, Fan with hover selection, Tinder with swipe gestures, and Deck with navigation arrows. All with spring physics.",
    useCases: ["Flashcards", "Onboarding steps", "Swipe interfaces", "Content carousels"],
    implementationTips: ["Use drag gestures for swipe", "Calculate offset for stacking", "Spring physics for smooth motion", "Support keyboard navigation"],
    accessibility: "Keyboard alternatives for swipe. Announce current card to screen readers."
  },
  {
    id: 89,
    title: "Elastic Slider",
    category: "Interaction",
    componentType: "Form",
    description: "4 slider variants: Default with thumb, Gradient with animated fill, Glow with shadow effect, and Stepped with marks. All support drag gestures and spring animations.",
    useCases: ["Volume controls", "Price filters", "Settings adjustment", "Range selection"],
    implementationTips: ["Track drag for value update", "Spring for elastic feel", "Pulse effect while dragging", "Step snapping with marks"],
    accessibility: "Use proper slider ARIA pattern. Keyboard increment support required."
  },
  {
    id: 90,
    title: "Testimonial Carousel",
    category: "Card",
    componentType: "Marketing",
    description: "3D carousel testimonials with drag gesture support, perspective rotation, auto-play with pause on hover, and navigation dots. Built with Framer Motion for smooth 3D transforms.",
    useCases: ["Customer testimonials", "Reviews showcase", "Quote rotator", "Social proof"],
    implementationTips: ["Use perspective for 3D effect", "Calculate rotation from drag", "Swipe detection with thresholds", "Auto-play with intersection"],
    accessibility: "Include pause control. Full quotes available to screen readers."
  }
];