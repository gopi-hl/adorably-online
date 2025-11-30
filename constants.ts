

import { DesignPrompt } from './types';

export const DESIGN_PROMPTS: DesignPrompt[] = [
  {
    id: 1,
    title: "Glassmorphism Card with Animated Gradient",
    category: "Card",
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
    description: "Text with a moving 'aurora' gradient background clipped to the characters. The background shifts slowly using background-position animation.",
    useCases: ["Headlines", "Brand Logos", "Feature Highlights", "Loading Text"],
    implementationTips: ["Use background-clip: text", "Animate background-position", "Use a wide background gradient"],
    accessibility: "Ensure high contrast against the page background."
  },
  {
    id: 17,
    title: "Cyberpunk Glitch Text",
    category: "Animation",
    description: "Text that periodically distorts (skews/shifts) with RGB split channels using clip-path and text-shadow animations.",
    useCases: ["Error Pages", "Tech Branding", "Cyberpunk Themes", "Alerts"],
    implementationTips: ["Use ::before/::after for RGB layers", "Keyframe clip-path changes", "Randomize delays"],
    accessibility: "Avoid high-frequency flashing (seizure risk)."
  },
  {
    id: 18,
    title: "Neumorphic Soft UI Switch",
    category: "Interaction",
    description: "A toggle switch using soft shadows (light and dark) to create a plasticky, extruded look. Animated 'pressed' state.",
    useCases: ["Settings Panels", "Light Mode Apps", "Calculator UI", "Dashboards"],
    implementationTips: ["Use dual box-shadows (white + dark)", "Background color must match element color", "Inset shadow for active state"],
    accessibility: "Ensure visible state change beyond just shadow (e.g. color)."
  },
  {
    id: 19,
    title: "Holographic Foil Card",
    category: "Card",
    description: "A card with a pearlescent, rainbow gradient that shifts as you hover, simulating a holographic foil sticker.",
    useCases: ["Collectibles", "NFT Showcases", "Premium Memberships", "Achievements"],
    implementationTips: ["Use mix-blend-mode: overlay", "Radial gradient tracking mouse", "Brightness/Contrast filters"],
    accessibility: "Decorative effect, ensure content is readable."
  },
  {
    id: 20,
    title: "Typewriter Effect",
    category: "Animation",
    description: "Text that reveals character by character with a blinking cursor at the end.",
    useCases: ["Hero Headlines", "Code Snippets", "Chatbots", "Storytelling"],
    implementationTips: ["Animate width from 0 to 100%", "Use step-end easing for cursor", "Monospace font works best"],
    accessibility: "Screen readers should read the full text."
  },
  {
    id: 21,
    title: "Magic Border Beam",
    category: "Card",
    description: "A card with a glowing line (beam) that travels around its border continuously.",
    useCases: ["Featured Items", "Active States", "Loading Placeholders", "Pricing Cards"],
    implementationTips: ["Absolute positioned div with conic gradient", "Mask the center", "Rotate animation"],
    accessibility: "Purely decorative."
  },
  {
    id: 22,
    title: "Grid Beams Background",
    category: "Background",
    description: "A grid where illuminated beams randomly shoot along the grid lines, fading out.",
    useCases: ["Tech backgrounds", "Data visualization context", "Hero sections", "Waitlists"],
    implementationTips: ["CSS Grid or SVG", "Delay animations randomly", "Fade out opacity"],
    accessibility: "Low contrast background."
  },
  {
    id: 23,
    title: "Meteor Shower",
    category: "Background",
    description: "Streaks of light (meteors) falling diagonally across a dark background, fading out.",
    useCases: ["Space themes", "Night mode backgrounds", "Success screens", "Landing pages"],
    implementationTips: ["Rotate elements 45deg", "Animate transform and opacity", "Box shadow for tail"],
    accessibility: "Avoid excessive motion."
  },
  {
    id: 24,
    title: "Sparkles Effect",
    category: "Animation",
    description: "Random stars/sparkles popping in and out around an element or background.",
    useCases: ["Celebrations", "New Features", "AI Magic buttons", "Success states"],
    implementationTips: ["SVG stars", "Scale up/down animation", "Random positioning"],
    accessibility: "Decorative."
  },
  {
    id: 25,
    title: "MacOS Dock Zoom",
    category: "Interaction",
    description: "A row of icons that magnify in a wave pattern as the cursor moves over them.",
    useCases: ["Navigation bars", "Toolbars", "Galleries", "Menus"],
    implementationTips: ["Calculate distance from mouse to icon center", "Map distance to scale", "Transition width/height"],
    accessibility: "Ensure scale doesn't hide other content."
  },
  {
    id: 26,
    title: "Skeleton Shimmer Loading",
    category: "Interaction",
    description: "Placeholder shapes with a moving gradient shimmer to indicate loading.",
    useCases: ["Data fetching states", "Image placeholders", "Card loading", "Initial render"],
    implementationTips: ["Linear gradient background", "Animate background-position", "Grey tones"],
    accessibility: "Indicates progress."
  },
  {
    id: 27,
    title: "Radar Pulse",
    category: "Animation",
    description: "Concentric circles fading out and expanding from a center point like a radar ping.",
    useCases: ["Live status", "Map markers", "Searching...", "Recording indicators"],
    implementationTips: ["Multiple divs", "Scale and Opacity animation", "Staggered delays"],
    accessibility: "Ensure it's not too rapid."
  },
  {
    id: 28,
    title: "Ripple Button",
    category: "Interaction",
    description: "Clicking a button creates an expanding circle ripple effect from the click point.",
    useCases: ["Material Design buttons", "Interactive elements", "Touch feedback", "CTAs"],
    implementationTips: ["Overflow hidden on button", "Absolute circle at click coords", "Animate scale"],
    accessibility: "Visual feedback."
  },
  {
    id: 29,
    title: "Sliding Tabs Underline",
    category: "Interaction",
    description: "Tabs where the active underline slides smoothly to the new active tab instead of jumping.",
    useCases: ["Navigation menus", "Settings categories", "Content switchers", "Filters"],
    implementationTips: ["Absolute positioned line", "Update left/width based on active tab ref", "Transition all"],
    accessibility: "Use ARIA tabs roles."
  },
  {
    id: 30,
    title: "Stacked Notifications",
    category: "Card",
    description: "Toast notifications that stack vertically, scaling down and moving back as new ones arrive.",
    useCases: ["App alerts", "Feed updates", "Message inbox", "Activity logs"],
    implementationTips: ["Absolute positioning", "Scale/Translate based on index", "Z-index management"],
    accessibility: "Live regions for screen readers."
  },
  {
    id: 31,
    title: "Blur Focus Cards",
    category: "Interaction",
    description: "Hovering one card blurs/dims all other cards in the group to focus attention.",
    useCases: ["Galleries", "Team pages", "Portfolio grids", "Feature lists"],
    implementationTips: ["Group hover effect", "Peer or Group-hover selectors", "Transition filter"],
    accessibility: "Ensure focus state does same."
  },
  {
    id: 32,
    title: "Interactive Grid Pattern",
    category: "Background",
    description: "A grid background where squares light up or change color when hovered.",
    useCases: ["Hero backgrounds", "Tech aesthetic", "Interactive art", "Landing pages"],
    implementationTips: ["CSS Grid", "Javascript for hover state", "Fade out transition"],
    accessibility: "Decorative."
  },
  {
    id: 33,
    title: "Button Shine Sweep",
    category: "Animation",
    description: "A gleam of light sweeps across a button to draw attention.",
    useCases: ["Primary CTAs", "Upgrade buttons", "Special offers", "Submit actions"],
    implementationTips: ["Angled gradient overlay", "Animate left/transform", "Overflow hidden"],
    accessibility: "Don't loop forever if distracting."
  },
  {
    id: 34,
    title: "Sun/Moon Theme Toggle",
    category: "Interaction",
    description: "An animated switch that morphs between a sun and a moon with cloud/star details.",
    useCases: ["Theme switchers", "Mode toggles", "Settings", "Visual delight"],
    implementationTips: ["SVG morphing", "Rotate/Scale transitions", "Color transition"],
    accessibility: "Label clearly."
  },
  {
    id: 35,
    title: "Dot Pulse Loader",
    category: "Animation",
    description: "Three dots that scale up and down in a wave pattern.",
    useCases: ["Typing indicators", "Wait states", "Processing", "Buffering"],
    implementationTips: ["Keyframe scale", "Staggered animation delay", "Flex layout"],
    accessibility: "Aria-label 'Loading'."
  },
  {
    id: 36,
    title: "Circular Progress Ring",
    category: "Animation",
    description: "A chart ring that fills up to a percentage with a smooth stroke animation.",
    useCases: ["Stats", "Health goals", "Upload progress", "Skills"],
    implementationTips: ["SVG stroke-dasharray", "Animate stroke-dashoffset", "Round linecap"],
    accessibility: "Show text value."
  },
  {
    id: 37,
    title: "Wave Footer",
    category: "Background",
    description: "Animated wave shapes at the bottom of a section simulating flowing water.",
    useCases: ["Footers", "Section dividers", "Playful themes", "Hero bottoms"],
    implementationTips: ["SVG paths", "Animate translateX", "Multiple layers opacity"],
    accessibility: "Decorative."
  },
  {
    id: 38,
    title: "Code Typing Terminal",
    category: "Animation",
    description: "A window looking like a terminal where code is typed out automatically.",
    useCases: ["Developer portfolios", "SaaS docs", "Feature demos", "Hero sections"],
    implementationTips: ["Monospace font", "Typewriter logic", "Syntax highlighting colors"],
    accessibility: "Read out code."
  },
  {
    id: 39,
    title: "Avatar Stack",
    category: "Layout",
    description: "A horizontal stack of user avatars that reveal fully on hover.",
    useCases: ["Social proof", "Team members", "Comments", "Collaborators"],
    implementationTips: ["Negative left margin", "Hover translate/z-index", "Border for separation"],
    accessibility: "List of names."
  },
  {
    id: 40,
    title: "Breadcrumb Collapse",
    category: "Layout",
    description: "Breadcrumbs that collapse into dots when too long and expand on hover.",
    useCases: ["Navigation", "File paths", "Deep hierarchies", "Mobile headers"],
    implementationTips: ["Max-width", "Text-overflow ellipsis", "Hover expansion"],
    accessibility: "Full path available."
  },
  {
    id: 41,
    title: "Badge Pulse",
    category: "Animation",
    description: "A status badge (e.g. 'Live') with a pulsating ring to indicate activity.",
    useCases: ["Status indicators", "Live events", "Online users", "Notifications"],
    implementationTips: ["Pseudo-element ring", "Scale and fade animation", "Red/Green colors"],
    accessibility: "Color blind safe."
  },
  {
    id: 42,
    title: "Input Focus Expand",
    category: "Interaction",
    description: "An input field that expands its width and glows when focused.",
    useCases: ["Search bars", "Forms", "Comment fields", "Chat inputs"],
    implementationTips: ["Transition width", "Box-shadow focus", "Blue accent"],
    accessibility: "Focus visible."
  },
  {
    id: 43,
    title: "Search Bar Expand",
    category: "Interaction",
    description: "A search icon that expands into a full input field when clicked.",
    useCases: ["Headers", "Mobile menus", "Toolbars", "Compact UIs"],
    implementationTips: ["Width transition", "Opacity fade for input", "Ref focus"],
    accessibility: "Keyboard expand."
  },
  {
    id: 44,
    title: "Tooltip Animated",
    category: "Interaction",
    description: "A tooltip that scales and fades in from the trigger element.",
    useCases: ["Info icons", "Help text", "Definitions", "Context"],
    implementationTips: ["Opacity/Scale transition", "Absolute positioning", "Arrow pointer"],
    accessibility: "Aria-describedby."
  },
  {
    id: 45,
    title: "Accordion Spring",
    category: "Interaction",
    description: "An accordion that opens with a springy bounce animation.",
    useCases: ["FAQs", "Menus", "Details", "Spoilers"],
    implementationTips: ["Max-height transition", "Cubic-bezier easing", "Overflow hidden"],
    accessibility: "Aria-expanded."
  }
];