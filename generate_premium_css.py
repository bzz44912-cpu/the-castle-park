import os

css_path = r"c:\Users\Vibobook\fff\the castle park\styles_architecture.css"

with open(css_path, 'a', encoding='utf-8') as f:
    f.write("\n/* ==========================================================================\n")
    f.write("   15. PREMIUM UTILITY FRAMEWORK (AUTO-GENERATED)\n")
    f.write("   Extensive utility classes for ultra-fine control and complex animations.\n")
    f.write("   ========================================================================== */\n\n")

    # Spacing utilities (Margins and Paddings)
    f.write("/* Spacing Utilities */\n")
    for i in range(1, 101):
        f.write(f".m-{i} {{ margin: {i * 0.25}rem !important; }}\n")
        f.write(f".mt-{i} {{ margin-top: {i * 0.25}rem !important; }}\n")
        f.write(f".mb-{i} {{ margin-bottom: {i * 0.25}rem !important; }}\n")
        f.write(f".ml-{i} {{ margin-left: {i * 0.25}rem !important; }}\n")
        f.write(f".mr-{i} {{ margin-right: {i * 0.25}rem !important; }}\n")
        f.write(f".mx-{i} {{ margin-left: {i * 0.25}rem !important; margin-right: {i * 0.25}rem !important; }}\n")
        f.write(f".my-{i} {{ margin-top: {i * 0.25}rem !important; margin-bottom: {i * 0.25}rem !important; }}\n")
        
        f.write(f".p-{i} {{ padding: {i * 0.25}rem !important; }}\n")
        f.write(f".pt-{i} {{ padding-top: {i * 0.25}rem !important; }}\n")
        f.write(f".pb-{i} {{ padding-bottom: {i * 0.25}rem !important; }}\n")
        f.write(f".pl-{i} {{ padding-left: {i * 0.25}rem !important; }}\n")
        f.write(f".pr-{i} {{ padding-right: {i * 0.25}rem !important; }}\n")
        f.write(f".px-{i} {{ padding-left: {i * 0.25}rem !important; padding-right: {i * 0.25}rem !important; }}\n")
        f.write(f".py-{i} {{ padding-top: {i * 0.25}rem !important; padding-bottom: {i * 0.25}rem !important; }}\n")

    # Animation Delays
    f.write("\n/* Animation Delays */\n")
    for i in range(50, 3050, 50):
        f.write(f".delay-{i} {{ animation-delay: {i}ms !important; transition-delay: {i}ms !important; }}\n")

    # Opacity levels
    f.write("\n/* Opacity Levels */\n")
    for i in range(1, 100):
        f.write(f".opacity-{i} {{ opacity: {i / 100} !important; }}\n")

    # Z-index utilities
    f.write("\n/* Z-Index Layers */\n")
    for i in range(1, 101):
        f.write(f".z-{i} {{ z-index: {i} !important; }}\n")

    # Premium Hover Effects
    f.write("\n/* Premium Hover Effects */\n")
    for i in range(1, 21):
        scale = 1 + (i * 0.01)
        f.write(f".hover-scale-{i}:hover {{ transform: scale({scale}) !important; }}\n")
        f.write(f".hover-up-{i}:hover {{ transform: translateY(-{i}px) !important; }}\n")
        f.write(f".hover-down-{i}:hover {{ transform: translateY({i}px) !important; }}\n")
        f.write(f".hover-glow-{i}:hover {{ box-shadow: 0 0 {i * 2}px rgba(194, 157, 89, 0.{i}) !important; }}\n")

    # Glassmorphism Variations
    f.write("\n/* Glassmorphism Variations */\n")
    for i in range(1, 21):
        f.write(f".glass-blur-{i} {{ backdrop-filter: blur({i}px); -webkit-backdrop-filter: blur({i}px); }}\n")
        f.write(f".glass-bg-{i} {{ background: rgba(255, 255, 255, 0.{i:02d}); }}\n")

    # 3D Tilt Perspectives
    f.write("\n/* 3D Perspectives */\n")
    for i in range(1, 11):
        f.write(f".perspective-{i}00 {{ perspective: {i}00px; }}\n")
        f.write(f".rotate-x-{i} {{ transform: rotateX({i}deg); }}\n")
        f.write(f".rotate-y-{i} {{ transform: rotateY({i}deg); }}\n")

print("CSS appended successfully.")
