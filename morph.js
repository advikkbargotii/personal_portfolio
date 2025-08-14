/*
    INTERACTIVE MORPHING SHAPE (CIRCLE ↔ ARROW)
    
    This module creates an interactive visual element that:
    - Starts as a circle
    - Smoothly morphs into a downward-pointing arrow as the cursor approaches
    - Morphs back to a circle when the cursor moves away
    - Uses proximity-based animation (not just hover)
    - Provides smooth visual transitions using Flubber library
*/

document.addEventListener('DOMContentLoaded', () => {
    const svg = document.getElementById('morph-svg');
    const path = document.getElementById('morph-path');

    if (!svg || !path) {
        console.error('Morph SVG elements not found!');
        return;
    }

    // Define SVG paths for circle and arrow shapes
    const circlePath = 'M50,10 A40,40 0 1,1 49.99,10 Z'; // Near-perfect circle
    const arrowPath = 'M50,85 L25,55 L40,55 L40,15 L60,15 L60,55 L75,55 Z'; // Downward arrow

    // Fallback interpolation function if Flubber fails to load
    const createFallbackInterpolator = (fromPath, toPath) => {
        return (t) => {
            // Simple fallback: switch between paths at t=0.5
            return t < 0.5 ? fromPath : toPath;
        };
    };

    let interpolator;

    // Initialize interpolator with Flubber or fallback
    try {
        if (typeof flubber !== 'undefined') {
            interpolator = flubber.interpolate(circlePath, arrowPath, {
                maxSegmentLength: 4 // Smoother morphing with smaller segments
            });
            console.log('✅ Flubber loaded successfully');
        } else {
            throw new Error('Flubber not available');
        }
    } catch (error) {
        console.warn('⚠️ Flubber failed to load, using fallback:', error.message);
        interpolator = createFallbackInterpolator(circlePath, arrowPath);
    }

    // Animation state management
    let currentRAF = null;
    let targetT = 0;      // Target interpolation value (0 = circle, 1 = arrow)
    let currentT = 0;     // Current interpolation value
    const easing = 0.4;   // Even faster easing for snappy response
    const threshold = 0.005; // Smaller threshold for quicker animation stops


    // Cache SVG bounds for better performance
    let cachedBounds = null;
    let boundsUpdateTime = 0;
    const boundsUpdateInterval = 100; // Update bounds every 100ms
    
    const getCachedBounds = () => {
        const now = Date.now();
        if (!cachedBounds || (now - boundsUpdateTime) > boundsUpdateInterval) {
            cachedBounds = svg.getBoundingClientRect();
            boundsUpdateTime = now;
        }
        return cachedBounds;
    };

    // Throttle mouse move events for better performance
    let lastMouseMoveTime = 0;
    const mouseMoveThrottle = 4; // ~250fps (1000/4 = 250) - even more responsive

    // Handle mouse movement and calculate proximity-based morphing
    const handleMouseMove = (e) => {
        const now = Date.now();
        if (now - lastMouseMoveTime < mouseMoveThrottle) return;
        lastMouseMoveTime = now;

        const bounds = getCachedBounds();
        const centerX = bounds.left + bounds.width * 0.5;
        const centerY = bounds.top + bounds.height * 0.5;

        // Calculate distance from cursor to shape center (optimized)
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distanceSquared = dx * dx + dy * dy; // Skip sqrt for performance
        
        // Use squared distances to avoid expensive sqrt calculation
        const maxDistanceSquared = Math.pow(Math.max(bounds.width, bounds.height) * 0.8, 2);

        // Calculate target morphing value based on proximity
        const proximityRatio = Math.max(0, 1 - (distanceSquared / maxDistanceSquared));
        const newTargetT = Math.pow(proximityRatio, 1.2); // Slightly less aggressive curve
        
        // Always update targetT for immediate response (especially when moving away)
        targetT = newTargetT;
        
        // Start animation loop if not already running
        if (!currentRAF) {
            currentRAF = requestAnimationFrame(animateMorph);
        }
    };

    // Smooth animation loop for morphing transitions
    const animateMorph = () => {
        // Smoothly interpolate from current to target state
        const diff = targetT - currentT;
        currentT += diff * easing;

        // Update the SVG path using interpolator
        try {
            const newPath = interpolator(currentT);
            path.setAttribute('d', newPath);
        } catch (error) {
            console.warn('Interpolation error:', error);
            // Fallback to direct path switching
            path.setAttribute('d', currentT < 0.5 ? circlePath : arrowPath);
        }

        // Continue animation loop if shape is still changing
        if (Math.abs(diff) > 0.001) {
            currentRAF = requestAnimationFrame(animateMorph);
        } else {
            // Animation complete - ensure final state is exact
            try {
                path.setAttribute('d', interpolator(targetT));
            } catch (error) {
                path.setAttribute('d', targetT > 0.5 ? arrowPath : circlePath);
            }
            cancelAnimationFrame(currentRAF);
            currentRAF = null;
        }
    };

    // Reset to circle when mouse leaves the interaction area
    const handleMouseLeave = () => {
        targetT = 0; // Morph back to circle
        
        if (!currentRAF) {
            currentRAF = requestAnimationFrame(animateMorph);
        }
    };

    // Attach event listeners to the hero section for larger interaction area
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mousemove', handleMouseMove);
        heroSection.addEventListener('mouseleave', handleMouseLeave);
        console.log('✅ Interactive morphing shape initialized');
    } else {
        console.error('❌ Hero section not found - morphing events not attached');
    }

    // Optional: Add touch support for mobile devices
    const handleTouchMove = (e) => {
        e.preventDefault(); // Prevent scrolling while interacting
        const touch = e.touches[0];
        if (touch) {
            handleMouseMove({
                clientX: touch.clientX,
                clientY: touch.clientY
            });
        }
    };

    const handleTouchEnd = () => {
        handleMouseLeave();
    };

    // Add touch event listeners
    if (heroSection) {
        heroSection.addEventListener('touchmove', handleTouchMove, { passive: false });
        heroSection.addEventListener('touchend', handleTouchEnd);
        heroSection.addEventListener('touchcancel', handleTouchEnd);
    }

    // Debug logging for development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🔧 Debug mode: Interactive morphing shape ready');
        console.log('📋 Shapes defined:', { circlePath, arrowPath });
        console.log('🎛️ Animation settings:', { easing, maxInteractionDistance: 'dynamic' });
    }
});

// Utility function for developers to manually test morphing
window.testMorph = (t) => {
    const path = document.getElementById('morph-path');
    if (path && typeof flubber !== 'undefined') {
        const circlePath = 'M50,10 A40,40 0 1,1 49.99,10 Z';
        const arrowPath = 'M50,85 L25,55 L40,55 L40,15 L60,15 L60,55 L75,55 Z';
        const interpolator = flubber.interpolate(circlePath, arrowPath);
        path.setAttribute('d', interpolator(Math.max(0, Math.min(1, t))));
        console.log(`🧪 Manual morph test: t=${t}`);
    }
};
