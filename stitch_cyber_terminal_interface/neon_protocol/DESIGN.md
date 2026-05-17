---
name: Neon Protocol
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#849495'
  outline-variant: '#3a494b'
  surface-tint: '#00dbe7'
  primary: '#e1fdff'
  on-primary: '#00363a'
  primary-container: '#00f2ff'
  on-primary-container: '#006a71'
  inverse-primary: '#00696f'
  secondary: '#d7ffc5'
  on-secondary: '#053900'
  secondary-container: '#2ff801'
  on-secondary-container: '#0f6d00'
  tertiary: '#fff5f5'
  on-tertiary: '#67001d'
  tertiary-container: '#ffcfd2'
  on-tertiary-container: '#c0003e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#74f5ff'
  primary-fixed-dim: '#00dbe7'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#79ff5b'
  secondary-fixed-dim: '#2ae500'
  on-secondary-fixed: '#022100'
  on-secondary-fixed-variant: '#095300'
  tertiary-fixed: '#ffdadb'
  tertiary-fixed-dim: '#ffb2b8'
  on-tertiary-fixed: '#40000f'
  on-tertiary-fixed-variant: '#91002d'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-lg:
    fontFamily: JetBrains Mono
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  code-snippet:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
spacing:
  unit: 4px
  gutter: 16px
  margin: 24px
  container-max-width: 1440px
---

## Brand & Style

This design system is a high-fidelity tribute to the Cyberpunk genre and Terminal User Interfaces (TUI). It targets developers, power users, and digital enthusiasts who value information density, technical precision, and a retro-futuristic aesthetic. 

The visual style is **Cyber-Brutalist**. It utilizes sharp edges, monospaced typography, and structural ASCII-inspired elements to create a UI that feels like a kernel-level operating system. The interface should feel alive—evoking the flickering glow of a high-resolution CRT monitor in a dark room. Every element is intentional, data-rich, and optimized for speed and utility.

## Colors

The palette is anchored in a "Deep Space" black to maximize the contrast of luminous accents. 

- **Primary (Electric Blue):** Used for focus states, active prompts, and critical data streams. High glow intensity.
- **Secondary (Neon Green):** Reserved for "Success" states, system status "Online," and secondary navigation elements.
- **Tertiary (Cyber Pink):** Used sparingly for "Warning" or "Error" states and high-priority alerts.
- **Neutral/Surface:** The background is a pure black (#050505), while elevated modules and containers use a dark gray (#121212) to create subtle separation.
- **Scanline/Overlay:** A 2% opacity white or primary-color horizontal pattern should overlay the entire viewport to simulate CRT hardware.

## Typography

Typography is exclusively monospaced to maintain grid alignment and technical authenticity. 

- **Weight:** Use "Bold" for headers to create hierarchy, but "Regular" for most data entry and body text to preserve legibility.
- **Glow:** Headlines and active labels should have a subtle `text-shadow` using the primary or secondary color to simulate light bleed.
- **Alignment:** Strictly left-aligned. Avoid centered text to maintain the "terminal" feel.
- **Case:** Use `uppercase` for labels, status indicators, and button text to emphasize the institutional/systemic nature of the interface.

## Layout & Spacing

The layout is a **High-Density Modular Grid**. Content is organized into clearly defined rectangular "Nodes" or "Modules."

- **The Grid:** Use a 12-column grid for desktop. Modules should snap strictly to these columns.
- **Borders as Spacing:** Unlike modern "invisible" spacing, this system uses thin (1px) borders to define space. 
- **Density:** Information density should be high. Reduce vertical padding within lists and tables to allow as much data as possible on a single screen.
- **Mobile:** On mobile, modules stack vertically. ASCII borders should remain intact but may simplify (e.g., removing side connectors) to maximize horizontal space for text.

## Elevation & Depth

Depth is not communicated via shadows, but through **Tonal Layering** and **Luminosity**.

- **Z-Axis:** Instead of drop shadows, use `z-index` stacking with 1px solid borders. Higher elements (like Modals/Dropdowns) should have a slightly brighter border color and a solid background to obscure elements behind them.
- **Glow Effects:** Use `box-shadow: 0 0 10px [color]` for focused elements rather than to create height.
- **Glitch/Flicker:** Interaction with "higher" elements should trigger a brief "flicker" animation (0.1s opacity shift) to simulate a system processing a new window.

## Shapes

The shape language is strictly **Sharp (0px)**. Curves do not exist in this system. 

- **ASCII Borders:** Use character-based or SVG-simulated ASCII symbols for container corners: `┌ ┐ └ ┘`. 
- **Bevels:** For a more "hardware" feel, buttons or container headers may use a 45-degree clipped corner (chamfer) rather than a radius.
- **Separators:** Use `├ ─ ┤` characters for internal horizontal dividers within a module.

## Components

- **Terminal Windows:** Containers with a top bar featuring the file path or system status on the left and `[X] [_] [^]` ASCII icons on the right.
- **Buttons:** 1px solid borders. Hover state triggers a full color fill (invert text color) with a slight "glitch" jitter.
- **Progress Bars:** Use bracketed ASCII style: `[████████░░░░] 65%`.
- **Inputs:** Prompt-style inputs starting with a `> ` character. The cursor should be a solid blinking block `█`.
- **Data Tables:** Rigid grids with 1px borders between all cells. Row hover should highlight the entire line in a dim version of the primary color.
- **Toggle Switches:** Retro-mechanical style. `[ OFF ]` vs `[[ ON ]]` where the active state uses the secondary neon green.
- **Status Tags:** Small rectangular boxes with labels like `[ CRITICAL ]` or `[ STABLE ]`.