import { useEffect, useState } from "react";

// HTML/Code symbols for software developer theme
const codeSymbols = ['<>', '</>', '{}', '()', '[]', ';'];
const floatingCodeBlocks = ['<div>', '<span>', '<h1>', '<p>', 'const', 'let', 'function', 'return', 'import', 'export'];

export const Background = () => {
  const [codeElements, setCodeElements] = useState([]);
  const [floatingBlocks, setFloatingBlocks] = useState([]);

  useEffect(() => {
    generateCodeElements();
    generateFloatingBlocks();

    const handleResize = () => {
      generateCodeElements();
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generateCodeElements = () => {
    const numberOfElements = Math.floor(
      (window.innerWidth * window.innerHeight) / 20000
    );

    const newElements = [];

    for (let i = 0; i < numberOfElements; i++) {
      newElements.push({
        id: i,
        symbol: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
        size: Math.random() * 12 + 8, // Font size in px
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.4 + 0.3,
        animationDuration: Math.random() * 4 + 2,
        color: Math.random() > 0.5 ? 'text-primary' : 'text-foreground',
      });
    }

    setCodeElements(newElements);
  };

  const generateFloatingBlocks = () => {
    const numberOfBlocks = 6;
    const newBlocks = [];

    for (let i = 0; i < numberOfBlocks; i++) {
      newBlocks.push({
        id: i,
        text: floatingCodeBlocks[Math.floor(Math.random() * floatingCodeBlocks.length)],
        size: Math.random() * 4 + 10, // Font size
        x: Math.random() * 100,
        y: Math.random() * 20,
        delay: Math.random() * 15,
        animationDuration: Math.random() * 8 + 6,
        opacity: Math.random() * 0.3 + 0.2,
      });
    }

    setFloatingBlocks(newBlocks);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {codeElements.map((element) => (
        <div
          key={element.id}
          className={`absolute font-mono ${element.color} animate-pulse-subtle select-none`}
          style={{
            fontSize: element.size + "px",
            left: element.x + "%",
            top: element.y + "%",
            opacity: element.opacity,
            animationDuration: element.animationDuration + "s",
            fontWeight: Math.random() > 0.7 ? 'bold' : 'normal',
          }}
        >
          {element.symbol}
        </div>
      ))}

      {floatingBlocks.map((block) => (
        <div
          key={block.id}
          className="absolute font-mono text-primary animate-float select-none"
          style={{
            fontSize: block.size + "px",
            left: block.x + "%",
            top: block.y + "%",
            opacity: block.opacity,
            animationDelay: block.delay + "s",
            animationDuration: block.animationDuration + "s",
            fontWeight: '500',
          }}
        >
          {block.text}
        </div>
      ))}
    </div>
  );
};

