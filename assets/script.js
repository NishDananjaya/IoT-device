
function createConnectors() {
    const mainImage = document.querySelector('.main-image');
    const featureBoxes = document.querySelectorAll('.feature-box');
    const svg = document.querySelector('.connectors-container');
    const container = document.querySelector('.container');

    const containerRect = container.getBoundingClientRect();
    
    // Set SVG size to match the container
    svg.setAttribute('width', containerRect.width);
    svg.setAttribute('height', containerRect.height);
    
    // Clear existing connectors
    while (svg.lastChild) {
        if (svg.lastChild.tagName === 'defs') break;
        svg.removeChild(svg.lastChild);
    }

    const mainRect = mainImage.getBoundingClientRect();
    const mainCenter = {
        x: mainRect.left - containerRect.left + mainRect.width / 2,
        y: mainRect.top - containerRect.top + mainRect.height / 2
    };

    featureBoxes.forEach(box => {
        const boxRect = box.getBoundingClientRect();
        
        const boxCenter = {
            x: boxRect.left - containerRect.left + boxRect.width / 2,
            y: boxRect.top - containerRect.top + boxRect.height / 2
        };

        const angle = Math.atan2(boxCenter.y - mainCenter.y, boxCenter.x - mainCenter.x);

        const mainIntersect = {
            x: mainCenter.x + (mainRect.width / 2) * Math.cos(angle),
            y: mainCenter.y + (mainRect.height / 2) * Math.sin(angle)
        };

        const boxIntersect = {
            x: boxCenter.x - (boxRect.width / 2) * Math.cos(angle),
            y: boxCenter.y - (boxRect.height / 2) * Math.sin(angle)
        };

        // Adjust control points for horizontal first, then incline
        const cp1x = mainIntersect.x + (boxIntersect.x - mainIntersect.x) * 0.3;
        const cp1y = mainIntersect.y;
        const cp2x = boxIntersect.x - (boxIntersect.x - mainIntersect.x) * 0.3;
        const cp2y = boxIntersect.y;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `
            M ${mainIntersect.x},${mainIntersect.y}
            C ${cp1x},${cp1y} ${cp2x},${cp2y} ${boxIntersect.x},${boxIntersect.y}
        `);
        path.setAttribute('stroke', 'url(#connectorGradient)');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('fill', 'none');
        path.classList.add('connector');

        svg.appendChild(path);
    });
}

function updateConnectors() {
    createConnectors();
    requestAnimationFrame(updateConnectors);
}

updateConnectors();

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(createConnectors, 100);
});

window.addEventListener('load', createConnectors);
