#!/usr/bin/env python3
"""
Simple screenshot tool using Selenium WebDriver (macOS Safari)
"""
import subprocess
import time
import os

# Create screenshots directory
os.makedirs('screenshots', exist_ok=True)

print("Taking screenshots using Safari...")
print("Note: This requires Safari's 'Allow Remote Automation' to be enabled")
print("Safari > Develop > Allow Remote Automation")

# URLs to screenshot
urls = [
    ('coldlava-hero', 'https://coldlava.ai'),
    ('salesdeck-hero', 'https://sales-rep-onboarding-final.vercel.app'),
]

for name, url in urls:
    print(f"\n📸 Opening {url}...")
    subprocess.run(['open', '-a', 'Safari', url])
    time.sleep(3)  # Wait for page load

    # Take screenshot using macOS screencapture
    output = f'screenshots/{name}.png'
    print(f"   Saving to {output}")
    print("   Please click on the Safari window, then press Enter...")
    input()

    subprocess.run(['screencapture', '-w', output])
    print(f"   ✓ Saved {output}")

print("\n✅ All screenshots saved to screenshots/")
print("\nScreenshots taken:")
for name, _ in urls:
    print(f"  - screenshots/{name}.png")
