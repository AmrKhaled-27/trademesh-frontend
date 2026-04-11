# Design System Specification: Architectural Precision

## 1. Overview & Creative North Star

This design system is built to move beyond the "generic e-commerce template." Our Creative North Star is **"The Architectural Precision."** We treat digital space like high-end physical architecture: structured, breathable, and defined by material transitions rather than artificial outlines.

To achieve a premium, editorial feel for a trade-focused platform, we leverage intentional asymmetry and a rigid adherence to tonal depth. By utilizing the contrast between the organic warmth of Emerald Green and the industrial weight of Deep Charcoal, we create a space that feels both technologically advanced and humanly trustworthy. We break the "grid-box" fatigue by allowing high-quality imagery to bleed across containers and using extreme typography scales to establish a clear, authoritative voice.

## 2. Colors & Materiality

The palette is rooted in Earth and Stone. We strictly prohibit blue tones to maintain a unique brand signature in a sea of "tech-blue" competitors.

### The Color Tokens

- **Primary (Emerald):** `#006c49` (Base) | `#10b981` (Container/Action). Use Emerald as a precision tool—to guide the eye, not to overwhelm the canvas.
- **Secondary (Charcoal):** `#555f6f` (Base) | `#1f2937` (Text/Deep Accents). This provides the "weight" and professional gravity of the system.
- **Neutral (Soft Gray/White):** `#f8f9fa` (Background) | `#ffffff` (Surface).

### The "No-Line" Rule

Standard 1px borders are strictly prohibited for sectioning or containment. Boundaries must be defined through **Background Color Shifts**.

- Transition from `surface` (#f8f9fa) to `surface_container_low` (#f3f4f5) to denote a new content block.
- Use tonal contrast to define edges. If a card needs to stand out, do not outline it; place a `surface_container_lowest` (#ffffff) card on a `surface_container` (#edeeef) background.

### Surface Hierarchy & Nesting

Think of the UI as layers of fine paper.

1. **Base:** `surface` (The foundation).
2. **Sectioning:** `surface_container_low` (Subtle areas like footers or sidebars).
3. **Elevation:** `surface_container_lowest` (Pure white cards or modals that "float" toward the user).

### The "Glass & Gradient" Rule

To add "soul" to the professional efficiency:

- **Signature Gradients:** For primary Hero CTAs, use a subtle linear gradient from `primary` (#006c49) to `primary_container` (#10b981) at a 135-degree angle.
- **Glassmorphism:** For floating navigation bars or overlay chips, use `surface` at 80% opacity with a `20px` backdrop-blur. This ensures the high-quality trade imagery remains visible but the UI remains legible.

## 3. Typography

We use a dual-typeface strategy to balance editorial sophistication with functional clarity.

- **Display & Headlines (Manrope):** Our "Architectural" voice. Manrope’s geometric yet warm proportions convey modern professionalism. Use `display-lg` (3.5rem) for hero statements with tight letter-spacing (-0.02em) to create an authoritative, "bold" trade presence.
- **Body & UI (Inter):** Our "Efficient" voice. Inter is used for all functional data, product descriptions, and labels. Its high x-height ensures readability at small scales (`body-sm` at 0.75rem).

**Typographic Intent:**
Use exaggerated scale shifts. A `display-md` headline paired directly with a `body-md` subline creates a high-fashion editorial look that signals "premium" more effectively than a standard medium-sized header.

## 4. Elevation & Depth

Depth is a functional tool, not a decorative one. We achieve hierarchy through **Tonal Layering**.

- **The Layering Principle:** Avoid shadows where color shifts can do the work. A `surface_container_highest` element naturally feels "closer" than a `surface_dim` element.
- **Ambient Shadows:** If a component (like a Quick-Buy Modal) must float, use an Ambient Shadow: `y: 12px, blur: 32px, color: rgba(31, 41, 55, 0.06)`. Note the color—it is a tinted Charcoal, never pure black, to mimic natural light.
- **The "Ghost Border" Fallback:** In rare cases where accessibility requires an edge (e.g., input fields on white backgrounds), use the `outline_variant` (#bbcabf) at **15% opacity**. It should be felt, not seen.
- **Roundedness Scale:**
- **Containers/Cards:** `md` (0.75rem / 12px) for a modern, approachable feel.
- **Buttons/Inputs:** `DEFAULT` (0.5rem / 8px) to maintain a sense of precision and "tool-like" efficiency.

## 5. Key Components

### Buttons

- **Primary:** Gradient fill (`primary` to `primary_container`), `DEFAULT` (8px) corners, and white text. Add a subtle `primary_fixed` shadow on hover.
- **Secondary:** `surface_container_highest` background with `on_surface` text. No border.
- **Tertiary:** Text-only in `primary` weight, with an underline that appears only on hover.

### Cards & Lists

- **The Divider Forbid:** Never use horizontal lines to separate list items. Use vertical white space (16px–24px) or a subtle alternating background color (`surface` vs `surface_container_low`).
- **Image-First:** Product cards should feature "bleed" imagery (edge-to-edge) with text content nested in a `surface_container_lowest` section below, creating a stacked material effect.

### Input Fields

- **State:** Default state uses `surface_container_high` (#e7e8e9) as a solid background. No border.
- **Focus:** Transition background to `surface_container_lowest` (#ffffff) and add a 2px `primary` (#006c49) bottom-accent bar only.

### Selection Chips

- Use `md` (0.75rem) rounding. Unselected: `surface_container_low`. Selected: `primary` with `on_primary` text. This makes filtering feel tactile and responsive.

## 6. Do's and Don'ts

### Do:

- **Do** use generous whitespace (at least 80px between major sections) to convey a "premium" brand.
- **Do** use Manrope for all price displays to give them a distinct, high-end character.
- **Do** use asymmetrical layouts (e.g., a large image on the left offset by a high-floating text card on the right).

### Don't:

- **Don't** use 100% black (#000000) for text. Use `on_surface` (#191c1d) to keep the contrast soft and professional.
- **Don't** use standard "drop shadows" with high opacity. They make the UI feel "dirty" and dated.
- **Don't** add blue to any part of the system—even in "success" or "info" states. Use Emerald for success and Charcoal for info.
- **Don't** use dividers. If you feel you need a line, you probably need more whitespace.
